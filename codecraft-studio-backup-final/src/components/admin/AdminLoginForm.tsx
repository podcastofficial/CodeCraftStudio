"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
export function AdminLoginForm() {
  const [error,setError]=useState(""); const [busy,setBusy]=useState(false); const router=useRouter();
  async function submit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setError("");
    const form=e.currentTarget; const data=Object.fromEntries(new FormData(form).entries());
    try {
      const res=await fetch("/api/admin/login",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(data)});
      const body=await res.json(); if(!res.ok) throw new Error(body.error||"Login failed.");
      router.push("/admin"); router.refresh();
    } catch(err) { setError(err instanceof Error?err.message:"Login failed."); }
    finally { setBusy(false); }
  }
  return <form className="form" onSubmit={submit}><div className="field"><label>Email</label><input type="email" name="email" required autoComplete="username"/></div><div className="field"><label>Password</label><input type="password" name="password" required autoComplete="current-password"/></div><button className="btn" disabled={busy}>{busy?"Signing in...":"Sign in"}</button>{error&&<div className="notice error">{error}</div>}</form>;
}