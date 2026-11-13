import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { AdminLogout } from "@/components/admin/AdminLogout";
export const dynamic = "force-dynamic";
export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  return <main className="admin-shell"><div className="admin-top"><div className="container" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><strong>CodeCraft Studio · Admin</strong><AdminLogout/></div></div><div className="container admin-layout"><aside className="admin-side"><b>Workspace</b><Link href="/admin">Overview</Link><Link href="/admin/projects">Projects</Link><Link href="/admin/inquiries">Inquiries</Link><Link href="/">View Website ↗</Link></aside><section className="admin-panel"><div className="kicker">Dashboard</div><h1>Welcome back.</h1><p style={{color:"#64748b"}}>Manage your portfolio and incoming project requests from this workspace.</p><div className="cards"><div className="card"><h3>Projects</h3><p>Manage the work displayed on your public portfolio.</p><Link className="kicker" href="/admin/projects">Manage projects →</Link></div><div className="card"><h3>Inquiries</h3><p>Review new leads and update their status.</p><Link className="kicker" href="/admin/inquiries">Open inquiries →</Link></div></div><div className="notice" style={{marginTop:22}}>Complete the database setup in database/schema.sql before using project and inquiry management.</div></section></div></main>;
}