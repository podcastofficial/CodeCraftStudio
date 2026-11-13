import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return <>
    <section className="page-hero"><div className="container"><div className="eyebrow">About CodeCraft Studio</div><h1>One development partner for many kinds of digital ideas.</h1><p>We help businesses, creators, startups and teams turn ideas into useful digital products — from websites and apps to automation and custom software.</p></div></section>
    <section className="section"><div className="container" style={{maxWidth:900}}>
      <h2>We are not limited to one project type</h2>
      <p style={{color:"#64748b",lineHeight:1.9}}>Every project starts with a problem to solve. It might be a website, an online store, a mobile app, a SaaS product, an AI-powered tool, a Telegram bot, a dashboard, a booking system, a blockchain application or a completely new idea. We first understand what you need, then work out the features, technology and delivery plan.</p>
      <div className="cards">
        <div className="card"><h3>Clarity</h3><p>Understand your goals, users, requirements and expected outcomes before development.</p></div>
        <div className="card"><h3>Flexible thinking</h3><p>Choose a suitable approach for your project instead of forcing every idea into the same template.</p></div>
        <div className="card"><h3>Careful delivery</h3><p>Build in clear stages, test important workflows and communicate scope and limitations honestly.</p></div>
      </div>
      <h2 style={{marginTop:42}}>Industries and use cases</h2>
      <p style={{color:"#64748b",lineHeight:1.9}}>We can discuss digital solutions for retail, education, finance, real estate, travel, logistics, media, communities, professional services, startups and other industries. The exact scope depends on your requirements and applicable technical or regulatory constraints.</p>
      <p style={{marginTop:30}}><Link className="btn" href="/contact">Tell Us What You Want to Build ↗</Link></p>
    </div></section>
  </>;
}
