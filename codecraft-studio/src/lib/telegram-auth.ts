import { createHmac, timingSafeEqual } from "node:crypto";

type TelegramMiniAppUser = {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
};

export function verifyTelegramInitData(initData: string): TelegramMiniAppUser | null {
  if (!initData) return null;
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) throw new Error("TELEGRAM_BOT_TOKEN is not configured.");

  const params = new URLSearchParams(initData);
  const receivedHash = params.get("hash");
  const authDate = Number(params.get("auth_date") || 0);
  if (!receivedHash || !Number.isFinite(authDate)) return null;

  const now = Math.floor(Date.now() / 1000);
  if (authDate > now + 60 || now - authDate > 86400) return null;

  params.delete("hash");
  params.delete("signature");
  const dataCheckString = [...params.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");

  const secretKey = createHmac("sha256", "WebAppData").update(token).digest();
  const calculatedHash = createHmac("sha256", secretKey).update(dataCheckString).digest();
  let received: Buffer;
  try { received = Buffer.from(receivedHash, "hex"); } catch { return null; }
  if (received.length !== calculatedHash.length || !timingSafeEqual(received, calculatedHash)) return null;

  const userValue = params.get("user");
  if (!userValue) return null;
  try {
    const user = JSON.parse(userValue) as TelegramMiniAppUser;
    return Number.isSafeInteger(user.id) && user.id > 0 ? user : null;
  } catch {
    return null;
  }
}
