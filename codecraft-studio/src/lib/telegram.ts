export async function sendInquiryNotification(message: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return { sent: false, reason: "Telegram is not configured." };

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      disable_web_page_preview: true
    }),
    cache: "no-store"
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "Telegram request failed");
    return { sent: false, reason: detail.slice(0, 500) };
  }
  return { sent: true as const };
}