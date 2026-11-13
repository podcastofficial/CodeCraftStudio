import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { AdminInquiries } from "@/components/admin/AdminInquiries";
import { AdminLogout } from "@/components/admin/AdminLogout";
import Link from "next/link";
export const dynamic="force-dynamic";
export default async function AdminInquiriesPage(){
 if(!(await isAdminAuthenticated())) redirect("/admin/login");
 return <main className="admin-shell"><div className="admin-top"><div className="container" style={{display:"flex",justifyContent:"space-between"}}><strong>CodeCraft Studio · Admin</strong><AdminLogout/></div></div><div className="container admin-layout"><aside className="admin-side"><b>Workspace</b><Link href="/admin">Overview</Link><Link href="/admin/projects">Projects</Link><Link href="/admin/inquiries">Inquiries</Link><Link href="/">View Website ↗</Link></aside><section className="admin-panel"><h1>Inquiries</h1><p style={{color:"#64748b"}}>Review client project requests and update their status.</p><AdminInquiries/></section></div></main>;
}