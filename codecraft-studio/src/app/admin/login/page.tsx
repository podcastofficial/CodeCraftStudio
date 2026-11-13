import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
export const metadata = { title: "Admin Login" };
export default function AdminLoginPage() {
  return <main className="section" style={{background:"#f4f7fb",minHeight:"75vh"}}><div className="container" style={{maxWidth:460}}><div className="card"><div className="kicker">Private workspace</div><h1>Admin Login</h1><p style={{color:"#64748b"}}>Sign in to manage CodeCraft Studio.</p><AdminLoginForm/></div></div></main>;
}