import { TELEGRAM_URL } from "@/lib/contact";
import Link from "next/link";
import { SectionTitle } from "@/components/SectionTitle";
import { Pricing } from "@/components/Pricing";
import { Faq } from "@/components/Faq";
import { Testimonials } from "@/components/Testimonials";
import { services, starterProjects } from "@/lib/content";

export default function HomePage() {
  const botUser = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME;
  return <>
    <section className="hero"><div className="container hero-grid">
      <div><div className="eyebrow">Ideas Into Digital Reality</div><h1>We build digital experiences that matter.</h1>
        <p>From professional websites to Telegram Mini Apps, AI tools and custom software, we turn your ideas into useful digital products.</p>
        <div className="hero-actions"><a className="btn" href={TELEGRAM_URL} target="_blank" rel="noreferrer">Start Your Project ↗</a><Link className="btn ghost" href="/portfolio">Explore Our Work</Link>{botUser && <a className="btn ghost" href={`https://t.me/${botUser}`} target="_blank" rel="noreferrer">Open on Telegram</a>}</div>
      </div>
      <div className="hero-card"><div className="eyebrow">What we create</div><div className="preview-grid">
        <div className="preview-tile"><span>WEB</span><strong>Websites</strong><span>Modern digital presence</span></div>
        <div className="preview-tile"><span>MINI APP</span><strong>Telegram Apps</strong><span>Experiences inside Telegram</span></div>
        <div className="preview-tile"><span>AI</span><strong>AI Tools</strong><span>Smart workflows</span></div>
        <div className="preview-tile"><span>API</span><strong>Integrations</strong><span>Connected systems</span></div>
      </div></div>
    </div></section>
    <section className="section"><div className="container"><SectionTitle kicker="What we do" title="Digital solutions built around your goals" description="From the first idea to a working product, we focus on clear scope, thoughtful design and dependable implementation." />
      <div className="cards">{services.slice(0, 6).map(s => <article className="card" key={s.title}><div className="icon-box">{s.icon}</div><h3>{s.title}</h3><p>{s.summary}</p><Link href="/services" className="kicker">Explore service →</Link></article>)}</div>
      <p style={{marginTop:24}}><Link className="btn secondary" href="/services">See all services</Link></p>
    </div></section>
    <section className="section soft"><div className="container"><SectionTitle kicker="Selected work" title="A glimpse of what we build" description="Project examples. Verified screenshots and live demos are added as projects go live." />
      <div className="project-grid">{starterProjects.map(p => <article className="project-card" key={p.slug}><div className="project-visual">✦</div><div className="project-body"><span className="tag">{p.category}</span><h3>{p.title}</h3><p>{p.description}</p><Link className="kicker" href={`/portfolio/${p.slug}`}>View project →</Link></div></article>)}</div>
    </div></section>
    <section className="section"><div className="container"><SectionTitle kicker="Our process" title="A clear path from idea to launch" description="A practical workflow keeps expectations aligned and makes progress visible." />
      <div className="steps">{[["1","Discover","Understand your idea, users and goals."],["2","Plan","Define scope, features and milestones."],["3","Build","Design, develop and test the solution."],["4","Launch","Deploy, hand over and support the release."]].map(([n,t,d]) => <div className="step" key={n}><b>Step {n}</b><h3>{t}</h3><p>{d}</p></div>)}</div>
    </div></section>
    <Testimonials />
    <section className="section soft"><div className="container"><SectionTitle kicker="Packages" title="Pick a starting point" description="Every project is scoped individually. These packages show what is usually included." /><Pricing /></div></section>
    <section className="section"><div className="container"><SectionTitle kicker="FAQ" title="Questions we hear often" description="Quick answers before you get in touch." /><Faq limit={4} /><p style={{marginTop:22}}><Link className="kicker" href="/faq">See all questions →</Link></p></div></section>
    <section className="section"><div className="container"><div className="cta"><div><h2>Have an idea? Let’s build it.</h2><p>Tell us what you want to create and start a project conversation.</p></div><a className="btn secondary" href={TELEGRAM_URL} target="_blank" rel="noreferrer">Discuss Your Project ↗</a></div></div></section>
  </>;
}
