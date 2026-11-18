const user = (process.env.NEXT_PUBLIC_TELEGRAM_USERNAME || process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || "").replace(/^@/, "");

/** The single contact channel for the studio: Telegram. */
export const TELEGRAM_URL = user ? `https://t.me/${user}` : "https://t.me/";
export const TELEGRAM_CONFIGURED = Boolean(user);
