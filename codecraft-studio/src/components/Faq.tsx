import { faqs } from "@/lib/content";

export function Faq({ limit }: { limit?: number }) {
  return <div className="faq-list">{faqs.slice(0, limit).map(f => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}</div>;
}
