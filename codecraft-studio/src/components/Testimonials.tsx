import { testimonials } from "@/lib/content";
import { SectionTitle } from "@/components/SectionTitle";

export function Testimonials() {
  if (testimonials.length === 0) return null;
  return <section className="section soft"><div className="container">
    <SectionTitle kicker="Client feedback" title="What clients say" description="Words from people we have built projects for." />
    <div className="cards">{testimonials.map(t => <blockquote className="card quote-card" key={t.name} style={{margin:0}}><p>“{t.quote}”</p><footer><strong>{t.name}</strong> · {t.role}</footer></blockquote>)}</div>
  </div></section>;
}
