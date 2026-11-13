import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getSql } from "@/lib/db";
import { z } from "zod";

export const runtime = "nodejs";
const statusSchema = z.object({ id: z.coerce.number().int().positive(), status: z.enum(["new","contacted","in_progress","completed","rejected"]) });

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const sql = getSql();
    const rows = await sql`SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 300`;
    return NextResponse.json({ inquiries: rows });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not load inquiries." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = statusSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid inquiry status." }, { status: 400 });
  try {
    const sql = getSql();
    const rows = await sql`UPDATE inquiries SET status=${parsed.data.status}, updated_at=NOW() WHERE id=${parsed.data.id} RETURNING id, status`;
    if (!rows.length) return NextResponse.json({ error: "Inquiry not found." }, { status: 404 });
    return NextResponse.json({ inquiry: rows[0] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not update inquiry." }, { status: 500 });
  }
}