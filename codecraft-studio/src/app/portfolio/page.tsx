import type { Metadata } from "next";
import Link from "next/link";
import { starterProjects } from "@/lib/content";
import { SectionTitle } from "@/components/SectionTitle";
export const metadata: Metadata = { title: "Portfolio" };
export default function PortfolioPage() {
  return <><section className="page-hero"><div className="container"><div className="eyebrow">Selected work</div><h1>Projects, experiments and digital products.</h1><p>Explore examples of websites, Telegram products and custom software solutions.</p></div></section>
    <section className="section"><div className="container"><SectionTitle kicker="Portfolio" title="Built with purpose" description="Replace these starter entries with verified project screenshots, current status and working demo links."/>
      <div className="project-grid">{starterProjects.map(p=><article className="project-card" key={p.slug}><div className="project-visual">⌘</div><div className="project-body"><span className="tag">{p.category}</span><h3>{p.title}</h3><p>{p.description}</p><Link className="kicker" href={`/portfolio/${p.slug}`}>View details →</Link></div></article>)}</div>
    </div></section></>;
}