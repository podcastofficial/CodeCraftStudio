export function SectionTitle({ kicker, title, description }: { kicker: string; title: string; description: string }) {
  return <div className="section-head"><div className="kicker">{kicker}</div><h2>{title}</h2><p>{description}</p></div>;
}