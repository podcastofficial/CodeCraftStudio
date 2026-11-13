import Link from "next/link";
import { SectionTitle } from "@/components/SectionTitle";
import { services, starterProjects } from "@/lib/content";

export default function HomePage() {
  return <>
    <section className="hero"><div className="container hero-grid">
      <div><div className="eyebrow">Digital Development Studio</div><h1>From Any Idea to a Digital Product.</h1>
        <p>Websites, apps, SaaS platforms, AI tools, Telegram products, business systems and custom software. Tell us what you want to build — we’ll help shape the right digital solution.</p>
        <div className="hero-actions"><Link className="btn" href="/contact">Start Your Project ↗</Link><Link className="btn ghost" href="/services">Explore What We Build</Link></div>
      </div>
      <div className="hero-card"><div className="eyebrow">One studio. Many possibilities.</div><div className="preview-grid">
        <div className="preview-tile"><span>01 / WEB</span><strong>Websites & Stores</strong><span>Business sites, e-commerce and marketplaces</span></div>
        <div className="preview-tile"><span>02 / APPS</span><strong>Apps & SaaS</strong><span>Mobile apps and custom web platforms</span></div>
        <div className="preview-tile"><span>03 / AI & BOTS</span><strong>AI & Automation</strong><span>Assistants, bots and smart workflows</span></div>
        <div className="preview-tile"><span>04 / SYSTEMS</span><strong>Custom Software</strong><span>Dashboards, APIs and business systems</span></div>
      </div></div>
    </div></section>
    <section className="section"><div className="container"><SectionTitle kicker="What we build" title="Digital solutions for almost any idea" description="We work across different technologies and project types. The list below is a starting point, not a limit — if your idea is different, tell us about it."/>
      <div className="cards">{services.map((s) => <article className="card" key={s.title}><div className="icon-box">{s.icon}</div><h3>{s.title}</h3><p>{s.summary}</p><Link href="/services" className="kicker">Explore capability →</Link></article>)}</div>
      <p style={{marginTop:26}}><Link className="btn secondary" href="/contact">Have a different idea? Tell us about it ↗</Link></p>
    </div></section>
    <section className="section soft"><div className="container"><SectionTitle kicker="Selected work" title="A glimpse of what we build" description="Explore selected examples. We can plan and develop many other types of digital products beyond the examples shown here."/>
      <div className="project-grid">{starterProjects.map((p) => <article className="project-card" key={p.slug}><div className="project-visual">⌘</div><div className="project-body"><span className="tag">{p.category}</span><h3>{p.title}</h3><p>{p.description}</p><Link className="kicker" href={`/portfolio/${p.slug}`}>View project →</Link></div></article>)}</div>
      <p style={{marginTop:24}}><Link className="btn secondary" href="/portfolio">View portfolio</Link></p>
    </div></section>
    <section className="section"><div className="container"><SectionTitle kicker="Our process" title="A clear path from idea to launch" description="A practical workflow keeps expectations aligned and makes progress visible."/>
      <div className="steps">{[["01","Discover","Understand your idea, users and goals."],["02","Plan","Define scope, features and milestones."],["03","Build","Design, develop and test the solution."],["04","Launch","Deploy, hand over and support the release."]].map(([n,t,d])=><div className="step" key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p></div>)}</div>
    </div></section>
    <section className="section"><div className="container"><div className="cta"><div><h2>If you can imagine it, let’s scope it.</h2><p>Share your idea — even if it is not listed on this website. We’ll discuss the requirements and a practical way to build it.</p></div><Link className="btn secondary" href="/contact">Discuss Your Project ↗</Link></div></div></section>
  </>;
}
