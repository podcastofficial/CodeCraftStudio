"use client";
import { useEffect,useState,FormEvent } from "react";
type Project={id:number;title:string;slug:string;category:string|null;published:boolean;featured:boolean};
export function AdminProjects(){
 const [items,setItems]=useState<Project[]>([]); const [error,setError]=useState(""); const [busy,setBusy]=useState(false);
 async function load(){const r=await fetch("/api/admin/projects");const j=await r.json();if(!r.ok)throw new Error(j.error);setItems(j.projects);}
 useEffect(()=>{load().catch(e=>setError(e.message));},[]);
 async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setBusy(true);setError("");const f=e.currentTarget;const d=Object.fromEntries(new FormData(f).entries());const payload={...d,technologies:String(d.technologies||"").split(",").map(x=>x.trim()).filter(Boolean),featured:d.featured==="on",published:d.published==="on"};try{const r=await fetch("/api/admin/projects",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(payload)});const j=await r.json();if(!r.ok)throw new Error(j.error);f.reset();await load();}catch(e){setError(e instanceof Error?e.message:"Could not save project.");}finally{setBusy(false);}}
 return <><form className="form" onSubmit={submit} style={{marginBottom:30}}><h3>Add project</h3>
 <div className="field"><label>Title</label><input name="title" required maxLength={200}/></div>
 <div className="field"><label>Slug (lowercase-with-hyphens)</label><input name="slug" required pattern="[a-z0-9]+(?:-[a-z0-9]+)*"/></div>
 <div className="field"><label>Category</label><input name="category"/></div>
 <div className="field"><label>Description</label><textarea name="description"/></div>
 <div className="field"><label>Image URL</label><input name="image_url" type="url"/></div>
 <div className="field"><label>Demo URL</label><input name="demo_url" type="url"/></div>
 <div className="field"><label>GitHub URL</label><input name="github_url" type="url"/></div>
 <div className="field"><label>Technologies (comma separated)</label><input name="technologies" placeholder="Next.js, TypeScript, PostgreSQL"/></div>
 <label><input type="checkbox" name="featured"/> Featured</label><label><input type="checkbox" name="published" defaultChecked/> Published</label>
 <button className="btn" disabled={busy}>{busy?"Saving...":"Create project"}</button></form>
 {error&&<div className="notice error">{error}</div>}<h3>Saved projects</h3>{items.length===0?<p>No database projects found yet.</p>:<table className="data-table"><thead><tr><th>Title</th><th>Slug</th><th>Published</th></tr></thead><tbody>{items.map(p=><tr key={p.id}><td>{p.title}</td><td>{p.slug}</td><td>{p.published?"Yes":"No"}</td></tr>)}</tbody></table>}</>;
}