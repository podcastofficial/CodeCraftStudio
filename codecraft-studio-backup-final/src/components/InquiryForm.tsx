"use client";
import { FormEvent, useState } from "react";

export function InquiryForm() {
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ok:boolean; message:string}|null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setResult(null);
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST", headers: {"content-type":"application/json"}, body: JSON.stringify(data)
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Could not submit your inquiry.");
      form.reset();
      setResult({ok:true,message:"Your inquiry has been received. We will follow up through Telegram."});
    } catch (error) {
      setResult({ok:false,message:error instanceof Error ? error.message : "Something went wrong."});
    } finally { setBusy(false); }
  }

  return <form className="form" onSubmit={submit}>
    <div className="field"><label htmlFor="name">Your name *</label><input id="name" name="name" required minLength={2} maxLength={120} placeholder="Enter your name"/></div>
    <div className="field"><label htmlFor="telegram_username">Telegram username</label><input id="telegram_username" name="telegram_username" maxLength={100} placeholder="@username"/></div>
    <div className="field"><label htmlFor="project_type">What do you need? *</label><select id="project_type" name="project_type" required defaultValue=""><option value="" disabled>Select a service</option><option>Website Development</option><option>Telegram Mini App</option><option>Telegram Bot</option><option>Custom Software / API</option><option>Other</option></select></div>
    <div className="field"><label htmlFor="budget">Approximate budget</label><select id="budget" name="budget" defaultValue=""><option value="">Prefer to discuss</option><option>Under $100</option><option>$100–$250</option><option>$250–$500</option><option>$500–$1,000</option><option>$1,000+</option></select></div>
    <div className="field"><label htmlFor="message">Project details *</label><textarea id="message" name="message" required minLength={10} maxLength={4000} placeholder="Describe your idea, key features and goals..."/></div>
    <div className="field" style={{position:"absolute",left:"-10000px"}} aria-hidden="true"><label htmlFor="website">Leave this field empty</label><input id="website" name="website" tabIndex={-1} autoComplete="off"/></div>
    <button className="btn" type="submit" disabled={busy}>{busy ? "Sending..." : "Submit project inquiry ↗"}</button>
    {result && <div className={`notice ${result.ok ? "" : "error"}`} role="status">{result.message}</div>}
    <small style={{color:"#64748b"}}>By submitting, you agree that we may use these details to respond to your project inquiry.</small>
  </form>;
}