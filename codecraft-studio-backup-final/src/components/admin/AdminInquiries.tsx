"use client";
import { useEffect,useState } from "react";
type Inquiry={id:number;name:string;telegram_username:string|null;project_type:string;budget:string|null;message:string;status:string;created_at:string};
export function AdminInquiries(){
 const [items,setItems]=useState<Inquiry[]>([]);const [error,setError]=useState("");
 async function load(){const r=await fetch("/api/admin/inquiries");const j=await r.json();if(!r.ok)throw new Error(j.error);setItems(j.inquiries);}
 useEffect(()=>{load().catch(e=>setError(e.message));},[]);
 async function update(id:number,status:string){const r=await fetch("/api/admin/inquiries",{method:"PATCH",headers:{"content-type":"application/json"},body:JSON.stringify({id,status})});const j=await r.json();if(!r.ok){setError(j.error);return;}await load();}
 return <>{error&&<div className="notice error">{error}</div>}{items.length===0?<p>No inquiries found.</p>:<div style={{overflowX:"auto"}}><table className="data-table"><thead><tr><th>Lead</th><th>Project</th><th>Message</th><th>Status</th></tr></thead><tbody>{items.map(i=><tr key={i.id}><td><b>#{i.id} {i.name}</b><br/><small>{i.telegram_username||"No Telegram username"}</small><br/><small>{new Date(i.created_at).toLocaleString()}</small></td><td>{i.project_type}<br/><small>{i.budget||"Budget not specified"}</small></td><td style={{minWidth:220}}>{i.message}</td><td><select value={i.status} onChange={e=>update(i.id,e.target.value)}><option value="new">New</option><option value="contacted">Contacted</option><option value="in_progress">In progress</option><option value="completed">Completed</option><option value="rejected">Rejected</option></select></td></tr>)}</tbody></table></div>}</>;
}