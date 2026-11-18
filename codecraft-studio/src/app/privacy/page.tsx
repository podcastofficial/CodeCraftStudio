import { TELEGRAM_URL } from "@/lib/contact";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy", description: "How CodeCraft Studio collects and uses information submitted through the website and Telegram Mini App." };

export default function PrivacyPage() {
  return <>
    <section className="page-hero"><div className="container"><div className="eyebrow">Legal</div><h1>Privacy Policy</h1><p>Last updated: November 2026</p></div></section>
    <section className="section"><div className="container prose">
      <h2>What we collect</h2>
      <p>We contact clients through Telegram. When you message us on Telegram we see the details Telegram shares with us, such as your username and display name, and whatever you choose to send. If you submit a project inquiry in our Telegram Mini App, we store the details you enter (name, Telegram username, project type, optional budget and your message) together with your Telegram user ID so we can reply.</p>
      <h2>How we use it</h2>
      <p>We use this information only to respond to your inquiry, discuss and plan your project, and improve our services. Inquiries are forwarded to our team through a private Telegram notification.</p>
      <h2>Security and abuse protection</h2>
      <p>To prevent spam and abuse we apply rate limits that rely on your IP address. Data is stored in a managed PostgreSQL database and admin access is protected by authentication.</p>
      <h2>Sharing</h2>
      <p>We do not sell your information. It is shared only with the service providers needed to run the site (hosting, database and Telegram) or when required by law.</p>
      <h2>Retention and your choices</h2>
      <p>We keep inquiries for as long as needed to handle your request and our business records. You can ask us to access, correct or delete your data at any time.</p>
      <h2>Contact</h2>
      <p>For privacy questions or deletion requests, message us on <a className="kicker" href={TELEGRAM_URL} target="_blank" rel="noreferrer">Telegram</a>.</p>
      <p style={{marginTop:30,fontSize:13}}>This policy is a general template based on how the site works today. Please have it reviewed against the laws that apply to your business.</p>
    </div></section>
  </>;
}
