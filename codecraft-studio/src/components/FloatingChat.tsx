"use client";
import { TELEGRAM_CONFIGURED, TELEGRAM_URL } from "@/lib/contact";

export function FloatingChat() {
  if (!TELEGRAM_CONFIGURED) return null;
  return <div className="floating-chat">
    <a className="tg" href={TELEGRAM_URL} target="_blank" rel="noreferrer" aria-label="Chat with us on Telegram">✈ <span>Chat on Telegram</span></a>
  </div>;
}
