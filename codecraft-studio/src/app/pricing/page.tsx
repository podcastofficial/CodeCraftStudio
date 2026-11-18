import { TELEGRAM_URL } from "@/lib/contact";
import type { Metadata } from "next";
import { Pricing } from "@/components/Pricing";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata: Metadata = { title: "Pricing", description: "Project packages from landing pages to custom platforms." };

export default function PricingPage() {
  return <>
    <section className="page-hero"><div className="container"><div className="eyebrow">Packages</div><h1>Simple starting points, scoped to your project.</h1><p>All prices are in USD and start from the amounts shown. Final cost depends on features, integrations and timeline, and you always get a clear quote before work begins.</p></div></section>
    <section className="section"><div className="container"><SectionTitle kicker="Choose a package" title="What’s usually included" description="Not sure which fits? Describe your idea and we will recommend one." /><Pricing /></div></section>
    <section className="section soft"><div className="container"><div className="cta"><div><h2>Need something different?</h2><p>We can mix features from any package or build something fully custom.</p></div><a className="btn secondary" href={TELEGRAM_URL} target="_blank" rel="noreferrer">Chat on Telegram ↗</a></div></div></section>
  </>;
}
