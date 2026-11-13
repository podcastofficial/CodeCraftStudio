import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getSql } from "@/lib/db";
import { projectSchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const sql = getSql();
    const rows = await sql`SELECT * FROM projects ORDER BY created_at DESC`;
    return NextResponse.json({ projects: rows });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not load projects." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = projectSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid project data." }, { status: 400 });
  try {
    const p = parsed.data; const sql = getSql();
    const rows = await sql`
      INSERT INTO projects (title, slug, category, description, image_url, demo_url, github_url, technologies, featured, published)
      VALUES (${p.title}, ${p.slug}, ${p.category || null}, ${p.description || null}, ${p.image_url || null}, ${p.demo_url || null}, ${p.github_url || null}, ${p.technologies}, ${p.featured}, ${p.published})
      RETURNING *
    `;
    return NextResponse.json({ project: rows[0] }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not create project. Check whether the slug already exists." }, { status: 500 });
  }
}