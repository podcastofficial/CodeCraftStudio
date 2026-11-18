import { TELEGRAM_URL } from "@/lib/contact";
import { packages } from "@/lib/content";

export function Pricing() {
  return <div className="price-grid">{packages.map(p => <article key={p.name} className={`price-card${p.featured ? " featured" : ""}`}>
    {p.featured && <span className="badge">Most popular</span>}
    <h3>{p.name}</h3><p className="for">{p.forWho}</p>
    <div className="price-tag">{p.price || "Custom quote"}</div>
    <ul>{p.features.map(f => <li key={f}>{f}</li>)}</ul>
    <a className={`btn${p.featured ? "" : " secondary"}`} href={TELEGRAM_URL} target="_blank" rel="noreferrer">Get a quote on Telegram ↗</a>
  </article>)}</div>;
}
