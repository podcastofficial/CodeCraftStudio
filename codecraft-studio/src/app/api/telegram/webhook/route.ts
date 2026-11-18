import { NextRequest, NextResponse } from "next/server";
import { sendInquiryNotification, telegramCall } from "@/lib/telegram";
import { TELEGRAM_URL } from "@/lib/contact";

export const runtime = "nodejs";

type TgUpdate = {
  message?: {
    text?: string;
    chat: { id: number; type: string };
    from?: { id: number; first_name?: string; username?: string };
  };
};

export async function POST(request: NextRequest) {
  // Fail closed: only Telegram (which knows the secret) may call this endpoint.
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!secret || request.headers.get("x-telegram-bot-api-secret-token") !== secret) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let update: TgUpdate;
  try { update = await request.json(); } catch { return NextResponse.json({ ok: true }); }

  const msg = update.message;
  // Only handle private chats, and never react to the admin's own chat (avoids loops).
  if (!msg || msg.chat.type !== "private" || String(msg.chat.id) === process.env.TELEGRAM_CHAT_ID) {
    return NextResponse.json({ ok: true });
  }

  const text = (msg.text || "").trim();
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
  const buttons: Record<string, unknown>[][] = [];
  if (siteUrl.startsWith("https://")) buttons.push([{ text: "Open CodeCraft Studio ✦", web_app: { url: `${siteUrl}/miniapp` } }]);
  if (TELEGRAM_URL !== "https://t.me/") buttons.push([{ text: "Chat with the team", url: TELEGRAM_URL }]);

  if (text.startsWith("/start") || text.startsWith("/help")) {
    await telegramCall("sendMessage", {
      chat_id: msg.chat.id,
      text: "Welcome to CodeCraft Studio — Ideas Into Digital Reality.\n\nWe build websites, Telegram bots & Mini Apps, AI tools and custom software. Open our app to see services and send your project idea.",
      reply_markup: buttons.length ? { inline_keyboard: buttons } : undefined
    });
  } else {
    await telegramCall("sendMessage", {
      chat_id: msg.chat.id,
      text: "Thanks for your message! We have received it and will reply here soon.",
      reply_markup: buttons.length ? { inline_keyboard: buttons } : undefined
    });
    const who = [msg.from?.first_name, msg.from?.username ? `@${msg.from.username}` : null].filter(Boolean).join(" ") || "Unknown";
    await sendInquiryNotification(`New bot message from ${who} (id ${msg.from?.id ?? msg.chat.id}):\n\n${text.slice(0, 1500) || "[non-text message]"}`);
  }
  return NextResponse.json({ ok: true });
}
