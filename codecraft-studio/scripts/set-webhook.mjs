// Usage: node --env-file=.env.local scripts/set-webhook.mjs [set|info|delete]
const action = process.argv[2] || "set";
const token = process.env.TELEGRAM_BOT_TOKEN;
const site = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
const secret = process.env.TELEGRAM_WEBHOOK_SECRET;

if (!token) { console.error("TELEGRAM_BOT_TOKEN is missing."); process.exit(1); }
const api = (method, body) => fetch(`https://api.telegram.org/bot${token}/${method}`, {
  method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body || {})
}).then((r) => r.json());

if (action === "info") console.log(JSON.stringify(await api("getWebhookInfo"), null, 2));
else if (action === "delete") console.log(await api("deleteWebhook", { drop_pending_updates: true }));
else {
  if (!site.startsWith("https://")) { console.error("NEXT_PUBLIC_SITE_URL must be your public https URL."); process.exit(1); }
  if (!secret || secret.length < 16) { console.error("Set TELEGRAM_WEBHOOK_SECRET (16+ chars, letters/numbers/_/-)."); process.exit(1); }
  console.log(await api("setWebhook", {
    url: `${site}/api/telegram/webhook`, secret_token: secret, allowed_updates: ["message"], drop_pending_updates: true
  }));
}
