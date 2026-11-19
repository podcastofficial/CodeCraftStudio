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
  const reply_markup = buttons.length ? { inline_keyboard: buttons } : undefined;

  const send = (t: string) =>
    telegramCall("sendMessage", { chat_id: msg.chat.id, text: t, reply_markup });

  // "/start@Code_Craft_Studio_Bot arg" -> "/start"
  const command = text.startsWith("/") ? text.split(/\s+/)[0].split("@")[0].toLowerCase() : null;

  switch (command) {
    case "/start":
      await send("Welcome to CodeCraft Studio — Ideas Into Digital Reality.\n\nWe build websites, Telegram bots & Mini Apps, AI tools and custom software. Open our app to see services and send your project idea.\n\nType /help to see all commands.");
      break;
    case "/help":
      await send("CodeCraft Studio — available commands:\n\n/start - Main menu\n/services - What we build\n/pricing - How pricing works\n/portfolio - Our work\n/contact - Talk to the team\n/help - This message");
      break;
    case "/services":
      await send("What we build:\n\n🌐 Websites\n🤖 Telegram Bots\n📱 Telegram Mini Apps\n📲 Mobile Apps\n🧠 AI Tools\n💻 Custom Software\n\nOpen the app below for details, or send us your idea with /contact.");
      break;
    case "/pricing":
      await send("Pricing depends on scope and features. Open the app to see our packages, or message the team with your idea and we will send a quote.");
      break;
    case "/portfolio":
      await send("See our recent projects and demos inside the app — tap \"Open CodeCraft Studio\" below.");
      break;
    case "/contact":
      await send("Tell us about your project. Just type your idea here, or tap \"Chat with the team\" below. We reply as soon as possible.");
      break;
    default:
      if (command) {
        // Unknown command: still respond clearly.
        await send("Sorry, I don't know that command.\n\nUse /help to see what I can do.");
      } else {
        await send("Thanks for your message! We have received it and will reply here soon.\n\nUse /help to see all commands.");
        const who = [msg.from?.first_name, msg.from?.username ? `@${msg.from.username}` : null].filter(Boolean).join(" ") || "Unknown";
        await sendInquiryNotification(`New bot message from ${who} (id ${msg.from?.id ?? msg.chat.id}):\n\n${text.slice(0, 1500) || "[non-text message]"}`);
      }
  }
  return NextResponse.json({ ok: true });
}
