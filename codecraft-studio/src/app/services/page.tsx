import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/content";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Services",
  description: "Websites, mobile apps, SaaS, AI tools, Telegram bots, business systems, APIs, automation and custom software development."
};

export default function ServicesPage() {
  return <>
    <section className="page-hero"><div className="container"><div className="eyebrow">Our capabilities</div><h1>What do you want to build?</h1><p>From a simple business website to a complex custom platform, CodeCraft Studio helps plan and develop digital products around your requirements.</p></div></section>
    <section className="section"><div className="container"><SectionTitle kicker="What we offer" title="A wide range of digital development services" description="Explore common project types we can work on. Every solution is scoped according to its features, integrations, timeline and technical needs."/>
      <div className="cards">{services.map(s=><article className="card" key={s.title}><div className="icon-box">{s.icon}</div><h3>{s.title}</h3><p>{s.summary}</p><p>{s.details}</p><Link className="kicker" href="/contact">Discuss this project →</Link></article>)}</div>
    </div></section>
    <section className="section soft"><div className="container"><SectionTitle kicker="Not seeing your idea?" title="Your project does not need to fit a predefined box" description="We can combine multiple capabilities or explore a custom solution for your specific workflow, audience or industry."/><div className="cta"><div><h2>Have a unique requirement?</h2><p>Describe the problem you want to solve. We’ll review the scope, suggest an approach and discuss the next steps.</p></div><Link className="btn secondary" href="/contact">Tell Us Your Idea ↗</Link></div></div></section>
  </>;
}
