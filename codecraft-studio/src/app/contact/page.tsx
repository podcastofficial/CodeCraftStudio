import type { Metadata } from "next";
import { InquiryForm } from "@/components/InquiryForm";
export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const username = process.env.NEXT_PUBLIC_TELEGRAM_USERNAME;
  const telegram = username ? `https://t.me/${username.replace(/^@/, "")}` : "";

  return <>
    <section className="page-hero"><div className="container"><div className="eyebrow">Start a project</div><h1>Whatever your idea, let’s talk.</h1><p>Website, app, SaaS, AI tool, Telegram product, business system or something completely custom — tell us what you have in mind.</p></div></section>
    <section className="section"><div className="container contact-layout">
      <div><h2>Project inquiry</h2><p style={{color:"#64748b",lineHeight:1.7}}>Not sure what category your project belongs to? No problem. Describe the problem, your idea and the features you need. Fields marked required must be completed. Please do not include passwords, private keys or other sensitive credentials.</p><InquiryForm /></div>
      <aside className="card"><div className="icon-box">✈</div><h3>Prefer Telegram?</h3><p>Contact CodeCraft Studio directly on Telegram.</p>{telegram ? <a className="btn" href={telegram} target="_blank" rel="noreferrer">Open Telegram ↗</a> : <p className="notice">Set NEXT_PUBLIC_TELEGRAM_USERNAME in your environment to enable the direct Telegram link.</p>}<p style={{fontSize:12,color:"#64748b",marginTop:18}}>We use inquiry details only to review and respond to your project request. Add a full privacy policy before public advertising.</p></aside>
    </div></section>
  </>;
}
