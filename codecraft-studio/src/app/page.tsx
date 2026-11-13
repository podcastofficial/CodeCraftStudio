import Link from "next/link";
import { SectionTitle } from "@/components/SectionTitle";
import { services, starterProjects } from "@/lib/content";

export default function HomePage() {
  return <>
    <section className="hero"><div className="container hero-grid">
      <div><div className="eyebrow">Digital Development Studio</div><h1>We Build Digital Experiences That Matter.</h1>
        <p>From professional websites to powerful Telegram Mini Apps and custom bots, we turn your ideas into useful digital products.</p>
        <div className="hero-actions"><Link className="btn" href="/contact">Start Your Project ↗</Link><Link className="btn ghost" href="/portfolio">Explore Our Work</Link></div>
      </div>
      <div className="hero-card"><div className="eyebrow">What we create</div><div className="preview-grid">
        <div className="preview-tile"><span>01 / WEB</span><strong>Websites</strong><span>Modern digital presence</span></div>
        <div className="preview-tile"><span>02 / MINI APP</span><strong>Telegram Apps</strong><span>Experiences inside Telegram</span></div>
        <div className="preview-tile"><span>03 / BOT</span><strong>Custom Bots</strong><span>Automation and workflows</span></div>
        <div className="preview-tile"><span>04 / API</span><strong>Integrations</strong><span>Connected systems</span></div>
      </div></div>
    </div></section>
    <section className="section"><div className="container"><SectionTitle kicker="What we do" title="Digital solutions built around your goals" description="From the first idea to a working product, we focus on clear scope, thoughtful design and dependable implementation."/>
      <div className="cards">{services.map((s) => <article className="card" key={s.title}><div className="icon-box">{s.icon}</div><h3>{s.title}</h3><p>{s.summary}</p><Link href="/services" className="kicker">Explore service →</Link></article>)}</div>
    </div></section>
    <section className="section soft"><div className="container"><SectionTitle kicker="Selected work" title="A glimpse of what we build" description="Explore project examples. Project descriptions and links should be updated with verified screenshots and live demos before launch."/>
      <div className="project-grid">{starterProjects.map((p) => <article className="project-card" key={p.slug}><div className="project-visual">⌘</div><div className="project-body"><span className="tag">{p.category}</span><h3>{p.title}</h3><p>{p.description}</p><Link className="kicker" href={`/portfolio/${p.slug}`}>View project →</Link></div></article>)}</div>
      <p style={{marginTop:24}}><Link className="btn secondary" href="/portfolio">View all projects</Link></p>
    </div></section>
    <section className="section"><div className="container"><SectionTitle kicker="Our process" title="A clear path from idea to launch" description="A practical workflow keeps expectations aligned and makes progress visible."/>
      <div className="steps">{[["01","Discover","Understand your idea, users and goals."],["02","Plan","Define scope, features and milestones."],["03","Build","Design, develop and test the solution."],["04","Launch","Deploy, hand over and support the release."]].map(([n,t,d])=><div className="step" key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p></div>)}</div>
    </div></section>
    <section className="section"><div className="container"><div className="cta"><div><h2>Have an idea? Let’s build it.</h2><p>Tell us what you want to create and start a project conversation.</p></div><Link className="btn secondary" href="/contact">Discuss Your Project ↗</Link></div></div></section>
  </>;
}