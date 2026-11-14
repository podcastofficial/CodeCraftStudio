import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/auth";
import { getSql } from "@/lib/db";
import { projectSchema } from "@/lib/validation";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

async function readId(ctx: Ctx) {
  const id = Number((await ctx.params).id);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

function refreshPublicPages() {
  revalidatePath("/miniapp");
  revalidatePath("/portfolio");
}

export async function PATCH(request: Request, ctx: Ctx) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = await readId(ctx);
  if (!id) return NextResponse.json({ error: "Invalid project id." }, { status: 400 });

  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  const parsed = projectSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid project data." }, { status: 400 });

  try {
    const p = parsed.data;
    const sql = getSql();
    const rows = await sql`
      UPDATE projects SET
        title=${p.title}, slug=${p.slug}, category=${p.category || null}, description=${p.description || null},
        image_url=${p.image_url || null}, demo_url=${p.demo_url || null}, github_url=${p.github_url || null},
        technologies=${p.technologies}, featured=${p.featured}, published=${p.published}, updated_at=NOW()
      WHERE id=${id}
      RETURNING *
    `;
    if (!rows.length) return NextResponse.json({ error: "Project not found." }, { status: 404 });
    refreshPublicPages();
    return NextResponse.json({ project: rows[0] });
  } catch (error) {
    console.error(error);
    if ((error as { code?: string }).code === "23505") {
      return NextResponse.json({ error: "Another project already uses this slug." }, { status: 409 });
    }
    return NextResponse.json({ error: "Could not update project." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, ctx: Ctx) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = await readId(ctx);
  if (!id) return NextResponse.json({ error: "Invalid project id." }, { status: 400 });
  try {
    const sql = getSql();
    const rows = await sql`DELETE FROM projects WHERE id=${id} RETURNING id`;
    if (!rows.length) return NextResponse.json({ error: "Project not found." }, { status: 404 });
    refreshPublicPages();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not delete project." }, { status: 500 });
  }
}
