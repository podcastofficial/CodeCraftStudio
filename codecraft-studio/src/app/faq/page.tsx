import { TELEGRAM_URL } from "@/lib/contact";
import type { Metadata } from "next";
import { Faq } from "@/components/Faq";

export const metadata: Metadata = { title: "FAQ", description: "Answers about process, pricing, timelines and support at CodeCraft Studio." };

export default function FaqPage() {
  return <>
    <section className="page-hero"><div className="container"><div className="eyebrow">FAQ</div><h1>Frequently asked questions.</h1><p>Everything you may want to know before starting a project.</p></div></section>
    <section className="section"><div className="container"><Faq /><p style={{marginTop:28,color:"#64748b"}}>Still have a question? <a className="kicker" href={TELEGRAM_URL} target="_blank" rel="noreferrer">Contact us →</a></p></div></section>
  </>;
}
