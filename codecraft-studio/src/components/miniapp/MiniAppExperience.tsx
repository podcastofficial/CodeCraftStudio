"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  ArrowRight, ArrowUpRight, Bot, BriefcaseBusiness, Check, ChevronRight,
  Code2, Cpu, Database, Globe2, Layers3, Menu, MessageCircle, MonitorSmartphone,
  Palette, Send, ShieldCheck, Sparkles, Workflow, X, Zap
} from "lucide-react";
import { services } from "@/lib/content";
import type { PublicProject } from "@/lib/projects";

type Section = "home" | "services" | "portfolio" | "about" | "contact";
const navItems: { id: Section; label: string; icon: typeof Globe2 }[] = [
  { id: "home", label: "Home", icon: Globe2 },
  { id: "services", label: "Services", icon: Layers3 },
  { id: "portfolio", label: "Work", icon: BriefcaseBusiness },
  { id: "about", label: "About", icon: Sparkles },
  { id: "contact", label: "Contact", icon: MessageCircle }
];
const serviceIcons = [Globe2, MonitorSmartphone, Bot, Cpu, Workflow, Database, ShieldCheck, Code2, Zap, Layers3, Palette, Sparkles];
const categories = ["Websites & Landing Pages", "E-commerce & Marketplaces", "Mobile Apps & PWA", "SaaS Platforms", "Telegram Bots & Mini Apps", "AI Applications", "Blockchain & Web3", "Admin Panels & Dashboards", "CRM, ERP & Business Systems", "Booking & Appointment Platforms", "APIs & Backend Systems", "Business Automation", "Education Platforms", "Fintech Applications", "Custom Software"];

export function MiniAppExperience({ contactUsername = "", projects, projectsAreSamples = false }: { contactUsername?: string; projects: PublicProject[]; projectsAreSamples?: boolean }) {
  const [section, setSection] = useState<Section>("home");
  const [history, setHistory] = useState<Section[]>([]);
  const [telegramUser, setTelegramUser] = useState<{ id: number; first_name?: string; username?: string } | null>(null);
  const [initData, setInitData] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;
    tg.ready();
    tg.expand();
    tg.setHeaderColor?.("#10091f");
    tg.setBackgroundColor?.("#10091f");
    tg.enableClosingConfirmation?.();
    setInitData(tg.initData || "");
    setTelegramUser(tg.initDataUnsafe?.user || null);
  }, []);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg?.BackButton) return;
    const goBack = () => {
      const previous = history[history.length - 1];
      if (previous) {
        setSection(previous);
        setHistory((items) => items.slice(0, -1));
      } else {
        setSection("home");
      }
    };
    if (section === "home") tg.BackButton.hide();
    else tg.BackButton.show();
    tg.BackButton.onClick(goBack);
    return () => { tg.BackButton?.offClick(goBack); };
  }, [section, history]);

  function navigate(next: Section) {
    if (next === section) return;
    setHistory((items) => [...items, section]);
    setSection(next);
    setMobileMenu(false);
    setNotice(null);
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred("light");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const displayName = telegramUser?.first_name || "there";
  const telegramLink = contactUsername ? `https://t.me/${contactUsername.replace(/^@/, "")}` : "";

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setNotice(null);
    const form = event.currentTarget;
    const formData = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...formData, source: "telegram_miniapp", initData })
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Could not submit your inquiry.");
      form.reset();
      setNotice({ ok: true, text: "Your project inquiry has been received. We’ll contact you soon." });
      window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred("success");
    } catch (error) {
      setNotice({ ok: false, text: error instanceof Error ? error.message : "Something went wrong. Please try again." });
      window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred("error");
    } finally {
      setBusy(false);
    }
  }

  return <main className="miniapp-root">
    <div className="miniapp-glow miniapp-glow-one"/><div className="miniapp-glow miniapp-glow-two"/>
    <div className="miniapp-frame">
      <header className="miniapp-header">
        <button className="miniapp-brand" onClick={() => navigate("home")} aria-label="CodeCraft Studio home">
          <span className="miniapp-logo"><span>{"{ }"}</span><i>✦</i></span>
          <span className="miniapp-brand-copy"><strong>CodeCraft</strong><small>STUDIO</small></span>
        </button>
        <div className="miniapp-header-right">
          {telegramUser && <span className="miniapp-user">Hi, {displayName}</span>}
          <button className="miniapp-menu-toggle" onClick={() => setMobileMenu((value) => !value)} aria-label="Toggle navigation">{mobileMenu ? <X size={20}/> : <Menu size={20}/>}</button>
        </div>
      </header>

      {mobileMenu && <div className="miniapp-mobile-menu">{navItems.map(({id,label,icon:Icon}) => <button key={id} onClick={() => navigate(id)}><Icon size={17}/>{label}<ChevronRight size={16}/></button>)}</div>}

      <div className="miniapp-content">
        {section === "home" && <>
          <section className="miniapp-hero">
            <div className="miniapp-eyebrow"><span/> DIGITAL DEVELOPMENT STUDIO</div>
            <div className="miniapp-hero-emblem"><span>{"{ }"}</span><i>✦</i></div>
            <h1>Ideas Into <span>Digital Reality.</span></h1>
            <p>We design and build digital products that help ideas grow — from websites and mobile apps to AI, automation and custom platforms.</p>
            <div className="miniapp-hero-actions">
              <button className="miniapp-btn primary" onClick={() => navigate("contact")}>Start a Project <ArrowUpRight size={17}/></button>
              <button className="miniapp-btn outline" onClick={() => navigate("portfolio")}>Explore Our Work</button>
            </div>
            <div className="miniapp-trust-line"><ShieldCheck size={15}/> Thoughtful design · Practical development · Clear communication</div>
          </section>

          <section className="miniapp-section">
            <div className="miniapp-section-heading"><div><span className="miniapp-kicker">WHAT WE CREATE</span><h2>One studio. Many possibilities.</h2></div><button className="miniapp-text-link" onClick={() => navigate("services")}>All services <ArrowRight size={15}/></button></div>
            <div className="miniapp-service-grid">
              {[{title:"Websites & Stores",desc:"Digital experiences for your brand",icon:Globe2},{title:"Apps & SaaS",desc:"Platforms built around your users",icon:MonitorSmartphone},{title:"AI & Automation",desc:"Smarter tools and workflows",icon:Cpu},{title:"Bots & Integrations",desc:"Connected systems that work",icon:Bot}].map(({title,desc,icon:Icon},i)=><button className="miniapp-feature-card" key={title} onClick={()=>navigate("services")}><span className="miniapp-feature-icon"><Icon size={21}/></span><small>0{i+1} / BUILD</small><strong>{title}</strong><p>{desc}</p><ArrowUpRight className="miniapp-card-arrow" size={17}/></button>)}
            </div>
          </section>

          <section className="miniapp-highlight">
            <div><span className="miniapp-kicker">YOUR IDEA, OUR CRAFT</span><h2>Have something different in mind?</h2><p>If your project isn’t listed, that’s okay. Tell us what you want to solve and we’ll explore a custom approach.</p></div>
            <button className="miniapp-btn gold" onClick={() => navigate("contact")}>Tell Us Your Idea <ArrowUpRight size={17}/></button>
          </section>
        </>}

        {section === "services" && <section className="miniapp-page-section">
          <div className="miniapp-page-intro"><span className="miniapp-kicker">OUR CAPABILITIES</span><h1>What do you want to <span>build?</span></h1><p>From a simple website to a complex digital platform, we can discuss a solution around your requirements.</p></div>
          <div className="miniapp-service-list">{services.map((service,index)=>{const Icon=serviceIcons[index%serviceIcons.length];return <article className="miniapp-service-item" key={service.title}><span className="miniapp-service-number">{String(index+1).padStart(2,"0")}</span><span className="miniapp-service-item-icon"><Icon size={21}/></span><div><h3>{service.title}</h3><p>{service.summary}</p><small>{service.details}</small></div><button aria-label={`Discuss ${service.title}`} onClick={()=>navigate("contact")}><ArrowUpRight size={18}/></button></article>})}</div>
          <div className="miniapp-category-cloud"><span className="miniapp-kicker">PROJECT CATEGORIES</span><div>{categories.map((category)=><span key={category}>{category}</span>)}</div></div>
        </section>}

        {section === "portfolio" && <section className="miniapp-page-section">
          <div className="miniapp-page-intro"><span className="miniapp-kicker">SELECTED WORK</span><h1>Ideas made <span>real.</span></h1><p>Explore examples of the digital products we work on. Ask us about a different project type or industry.</p></div>
          <div className="miniapp-project-list">{projects.map((project,index)=><article className="miniapp-project-card" key={project.slug}><div className={`miniapp-project-art art-${index%3}`} style={project.image_url?{backgroundImage:`url(${JSON.stringify(project.image_url)})`,backgroundSize:"cover",backgroundPosition:"center"}:undefined}>{!project.image_url&&<span>{index%3===0?<Database size={44}/>:index%3===1?<MonitorSmartphone size={44}/>:<Bot size={44}/>}</span>}<small>{project.category}</small></div><div className="miniapp-project-copy"><span className="miniapp-kicker">{project.category}</span><h3>{project.title}</h3><p>{project.description}</p><div className="miniapp-tech-tags">{project.technologies.slice(0,3).map((tech)=><span key={tech}>{tech}</span>)}</div>{project.demo_url&&<a className="miniapp-text-link" href={project.demo_url} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={15}/></a>}<button className="miniapp-text-link" onClick={()=>navigate("contact")}>Discuss a similar project <ArrowRight size={15}/></button></div></article>)}</div>
          {projectsAreSamples&&<div className="miniapp-note"><Sparkles size={18}/><p>These are selected starter examples. We’ll publish additional verified case studies and demos as the portfolio grows.</p></div>}
        </section>}

        {section === "about" && <section className="miniapp-page-section">
          <div className="miniapp-page-intro"><span className="miniapp-kicker">ABOUT CODECRAFT STUDIO</span><h1>Built around <span>your idea.</span></h1><p>We help businesses, creators and teams turn ideas into useful digital products.</p></div>
          <div className="miniapp-about-panel"><div className="miniapp-about-mark">{"{ ✦ }"}</div><h2>Not limited to one kind of project.</h2><p>Your idea might be a website, an app, an AI tool, a Telegram Mini App, a business platform or something completely new. We start by understanding the problem, then plan a practical way to build it.</p></div>
          <div className="miniapp-process"><span className="miniapp-kicker">HOW WE WORK</span>{[["01","Discover","Understand your idea, users and goals."],["02","Plan","Define scope, features and milestones."],["03","Build","Design, develop and test the solution."],["04","Launch","Deploy and support the release."]].map(([n,title,desc])=><div key={n}><b>{n}</b><section><strong>{title}</strong><p>{desc}</p></section></div>)}</div>
        </section>}

        {section === "contact" && <section className="miniapp-page-section">
          <div className="miniapp-page-intro"><span className="miniapp-kicker">START A PROJECT</span><h1>Let’s build <span>something great.</span></h1><p>Tell us what you have in mind. If you’re unsure which service fits, just describe your idea.</p></div>
          <div className="miniapp-contact-grid">
            <form className="miniapp-form" onSubmit={submitInquiry}>
              <div className="miniapp-form-title"><h2>Project inquiry</h2><span>* Required</span></div>
              <label>Your name *<input name="name" required minLength={2} maxLength={120} placeholder="Enter your name"/></label>
              <label>Telegram username<input name="telegram_username" maxLength={100} placeholder="@username" defaultValue={telegramUser?.username ? `@${telegramUser.username}` : ""}/></label>
              <label>What do you need? *<select name="project_type" required defaultValue=""><option value="" disabled>Select a project type</option>{categories.map((category)=><option key={category}>{category}</option>)}<option>Something else / Custom idea</option></select></label>
              <label>Approximate budget<select name="budget" defaultValue=""><option value="">Prefer to discuss</option><option>Under $100</option><option>$100–$250</option><option>$250–$500</option><option>$500–$1,000</option><option>$1,000+</option></select></label>
              <label>Project details *<textarea name="message" required minLength={10} maxLength={4000} placeholder="Describe your idea, key features and goals..." rows={5}/></label>
              <input name="website" tabIndex={-1} autoComplete="off" className="miniapp-honeypot" aria-hidden="true"/>
              <button className="miniapp-btn primary full" type="submit" disabled={busy}>{busy?"Sending inquiry…":"Submit Project Inquiry"}<ArrowUpRight size={17}/></button>
              {notice && <div className={`miniapp-form-notice ${notice.ok?"success":"failure"}`} role="status">{notice.ok?<Check size={17}/>:<X size={17}/>} {notice.text}</div>}
              <small className="miniapp-form-footnote">Please don’t include passwords, private keys or other sensitive credentials.</small>
            </form>
            <aside className="miniapp-contact-aside"><div className="miniapp-contact-icon"><Send size={23}/></div><span className="miniapp-kicker">PREFER A QUICK CHAT?</span><h2>Talk to us on Telegram.</h2><p>Share your idea directly with CodeCraft Studio. We’ll discuss your requirements and next steps.</p>{telegramLink?<a className="miniapp-btn outline full" href={telegramLink} target="_blank" rel="noreferrer">Open Telegram Chat <ArrowUpRight size={17}/></a>:<div className="miniapp-aside-hint">Set NEXT_PUBLIC_TELEGRAM_USERNAME in Vercel to enable direct chat.</div>}<div className="miniapp-aside-divider"/><div className="miniapp-privacy"><ShieldCheck size={17}/><span>Your inquiry details are used to review and respond to your project request.</span></div></aside>
          </div>
        </section>}
      </div>

      <footer className="miniapp-footer"><div className="miniapp-footer-brand"><span className="miniapp-logo small"><span>{"{ }"}</span><i>✦</i></span><div><strong>CodeCraft Studio</strong><small>IDEAS INTO DIGITAL REALITY</small></div></div><span>Crafted for your next big idea.</span></footer>
      <nav className="miniapp-bottom-nav" aria-label="Mini App navigation">{navItems.map(({id,label,icon:Icon})=><button key={id} className={section===id?"active":""} onClick={()=>navigate(id)}><Icon size={19}/><span>{label}</span></button>)}</nav>
      <div className="miniapp-safe-bottom"/>
    </div>
  </main>;
}
