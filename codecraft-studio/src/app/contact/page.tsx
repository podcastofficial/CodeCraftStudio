import type { Metadata } from "next";
import { TELEGRAM_CONFIGURED, TELEGRAM_URL } from "@/lib/contact";

export const metadata: Metadata = { title: "Contact", description: "Contact CodeCraft Studio on Telegram to discuss your project." };

export default function ContactPage() {
  return <>
    <section className="page-hero"><div className="container"><div className="eyebrow">Start a project</div><h1>Let’s talk on Telegram.</h1><p>Telegram is the only way to reach us. Send a message with your idea and we will reply with next steps and a quote in USD.</p></div></section>
    <section className="section"><div className="container contact-layout">
      <div className="prose"><h2>What to include in your first message</h2>
        <ul>
          <li>What you want to build (website, Telegram bot, Mini App, AI tool, something else)</li>
          <li>The main features you need</li>
          <li>Your budget range in USD, if you have one</li>
          <li>Your preferred deadline</li>
        </ul>
        <p>Please do not send passwords, private keys or other sensitive credentials in chat.</p>
      </div>
      <aside className="card"><div className="icon-box">✈</div><h3>Message us on Telegram</h3><p>Fastest way to start your project conversation.</p>
        {TELEGRAM_CONFIGURED ? <a className="btn" href={TELEGRAM_URL} target="_blank" rel="noreferrer">Open Telegram ↗</a> : <p className="notice">Set NEXT_PUBLIC_TELEGRAM_USERNAME in your environment to enable the Telegram link.</p>}
      </aside>
    </div></section>
  </>;
}
