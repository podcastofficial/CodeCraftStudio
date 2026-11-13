import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/content";
import { SectionTitle } from "@/components/SectionTitle";
export const metadata: Metadata = { title: "Services" };
export default function ServicesPage() {
  return <><section className="page-hero"><div className="container"><div className="eyebrow">Our capabilities</div><h1>Services designed for your next idea.</h1><p>Custom digital development for businesses, creators and growing products.</p></div></section>
    <section className="section"><div className="container"><SectionTitle kicker="What we offer" title="Choose what you want to build" description="Every engagement begins with understanding your requirements and agreeing on a practical scope."/>
      <div className="cards">{services.map(s=><article className="card" key={s.title}><div className="icon-box">{s.icon}</div><h3>{s.title}</h3><p>{s.summary}</p><p>{s.details}</p><Link className="kicker" href="/contact">Discuss this service →</Link></article>)}</div>
    </div></section></>;
}