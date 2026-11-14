"use client";
import { FormEvent, useEffect, useState } from "react";

type Project = {
  id: number; title: string; slug: string; category: string | null; description: string | null;
  image_url: string | null; demo_url: string | null; github_url: string | null;
  technologies: string[]; featured: boolean; published: boolean;
};

export function AdminProjects() {
  const [items, setItems] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function load() {
    const r = await fetch("/api/admin/projects");
    const j = await r.json();
    if (!r.ok) throw new Error(j.error);
    setItems(j.projects);
  }
  useEffect(() => { load().catch((e) => setError(e.message)); }, []);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const form = e.currentTarget;
    const d = Object.fromEntries(new FormData(form).entries());
    const payload = {
      ...d,
      technologies: String(d.technologies || "").split(",").map((x) => x.trim()).filter(Boolean),
      featured: d.featured === "on",
      published: d.published === "on"
    };
    try {
      const r = await fetch(editing ? `/api/admin/projects/${editing.id}` : "/api/admin/projects", {
        method: editing ? "PATCH" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload)
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error);
      if (!editing) form.reset();
      setEditing(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save project.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(p: Project) {
    if (!window.confirm(`Delete "${p.title}"? This cannot be undone.`)) return;
    setError("");
    try {
      const r = await fetch(`/api/admin/projects/${p.id}`, { method: "DELETE" });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error);
      if (editing?.id === p.id) setEditing(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete project.");
    }
  }

  function startEdit(p: Project) {
    setEditing(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return <>
    <form key={editing?.id ?? "new"} className="form" onSubmit={submit} style={{ marginBottom: 30 }}>
      <h3>{editing ? `Edit project: ${editing.title}` : "Add project"}</h3>
      <div className="field"><label>Title</label><input name="title" required maxLength={200} defaultValue={editing?.title ?? ""} /></div>
      <div className="field"><label>Slug (lowercase-with-hyphens)</label><input name="slug" required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" defaultValue={editing?.slug ?? ""} /></div>
      <div className="field"><label>Category</label><input name="category" defaultValue={editing?.category ?? ""} /></div>
      <div className="field"><label>Description</label><textarea name="description" defaultValue={editing?.description ?? ""} /></div>
      <div className="field"><label>Image URL</label><input name="image_url" type="url" defaultValue={editing?.image_url ?? ""} /></div>
      <div className="field"><label>Demo URL</label><input name="demo_url" type="url" defaultValue={editing?.demo_url ?? ""} /></div>
      <div className="field"><label>GitHub URL</label><input name="github_url" type="url" defaultValue={editing?.github_url ?? ""} /></div>
      <div className="field"><label>Technologies (comma separated)</label><input name="technologies" placeholder="Next.js, TypeScript, PostgreSQL" defaultValue={editing?.technologies.join(", ") ?? ""} /></div>
      <label><input type="checkbox" name="featured" defaultChecked={editing?.featured ?? false} /> Featured</label>
      <label><input type="checkbox" name="published" defaultChecked={editing?.published ?? true} /> Published</label>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button className="btn" disabled={busy}>{busy ? "Saving..." : editing ? "Save changes" : "Create project"}</button>
        {editing && <button type="button" className="btn" onClick={() => setEditing(null)} disabled={busy}>Cancel edit</button>}
      </div>
    </form>
    {error && <div className="notice error">{error}</div>}
    <h3>Saved projects</h3>
    {items.length === 0 ? <p>No database projects yet. Until you publish one, visitors see the starter examples.</p> :
      <div style={{ overflowX: "auto" }}><table className="data-table">
        <thead><tr><th>Title</th><th>Slug</th><th>Published</th><th>Actions</th></tr></thead>
        <tbody>{items.map((p) => <tr key={p.id}>
          <td>{p.title}{p.featured ? " ★" : ""}</td><td>{p.slug}</td><td>{p.published ? "Yes" : "No"}</td>
          <td style={{ whiteSpace: "nowrap" }}>
            <button type="button" onClick={() => startEdit(p)}>Edit</button>{" "}
            <button type="button" onClick={() => remove(p)}>Delete</button>
          </td>
        </tr>)}</tbody>
      </table></div>}
  </>;
}
