import type { Metadata } from "next";
import Link from "next/link";
import { starterProjects } from "@/lib/content";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore selected digital product examples from CodeCraft Studio, including web, Telegram and custom software concepts."
};

export default function PortfolioPage() {
  return <>
    <section className="page-hero"><div className="container"><div className="eyebrow">Selected work</div><h1>Examples of what we can create.</h1><p>Our work can span websites, applications, automation, AI tools, business platforms and custom software. These selected entries are examples, not the limit of what we can build.</p></div></section>
    <section className="section"><div className="container"><SectionTitle kicker="Portfolio" title="Built around real requirements" description="Explore the selected starter examples below. Ask us about a different project type, feature set or industry-specific solution."/>
      <div className="project-grid">{starterProjects.map(p=><article className="project-card" key={p.slug}><div className="project-visual">⌘</div><div className="project-body"><span className="tag">{p.category}</span><h3>{p.title}</h3><p>{p.description}</p><Link className="kicker" href={`/portfolio/${p.slug}`}>View details →</Link></div></article>)}</div>
      <div className="notice" style={{marginTop:24}}>Have a project that is not shown here? We can discuss a custom build based on your goals, requirements and technical scope.</div>
      <p style={{marginTop:24}}><Link className="btn" href="/contact">Discuss Your Project ↗</Link></p>
    </div></section>
  </>;
}
