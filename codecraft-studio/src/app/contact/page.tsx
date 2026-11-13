import type { Metadata } from "next";
import { InquiryForm } from "@/components/InquiryForm";
export const metadata: Metadata = { title: "Contact" };
export default function ContactPage() {
  const username = process.env.NEXT_PUBLIC_TELEGRAM_USERNAME;
  const telegram = username ? `https://t.me/${username.replace(/^@/, "")}` : "";
  return <><section className="page-hero"><div className="container"><div className="eyebrow">Start a project</div><h1>Tell us what you want to build.</h1><p>Share a few details. We’ll review your brief and follow up through Telegram.</p></div></section>
    <section className="section"><div className="container" style={{display:"grid",gridTemplateColumns:"minmax(0,1.4fr) minmax(240px,.6fr)",gap:40}}>
      <div><h2>Project inquiry</h2><p style={{color:"#64748b",lineHeight:1.7}}>Fields marked required must be completed. Please do not include passwords, private keys or other sensitive credentials.</p><InquiryForm /></div>
      <aside className="card"><div className="icon-box">✈</div><h3>Prefer Telegram?</h3><p>Contact CodeCraft Studio directly on Telegram.</p>{telegram ? <a className="btn" href={telegram} target="_blank" rel="noreferrer">Open Telegram ↗</a> : <p className="notice">Set NEXT_PUBLIC_TELEGRAM_USERNAME in your environment to enable the direct Telegram link.</p>}<p style={{fontSize:12,color:"#64748b",marginTop:18}}>We use inquiry details only to review and respond to your project request. Add a full privacy policy before public advertising.</p></aside>
    </div></section></>;
}