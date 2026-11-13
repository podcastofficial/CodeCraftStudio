# CodeCraft Studio Telegram Mini App update

This update adds a Telegram-first Mini App at `/miniapp` and redirects `/` to it. The existing Vercel deployment remains the HTTPS host and backend. The old public marketing routes are not linked from the Mini App; this is not equivalent to making the deployment private because Telegram must be able to load the Mini App URL.

## Files added/changed

- `src/app/miniapp/layout.tsx`, `src/app/miniapp/page.tsx`
- `src/components/miniapp/MiniAppExperience.tsx`
- `src/components/SiteChrome.tsx`
- `src/types/telegram.d.ts`
- `src/lib/telegram-auth.ts`
- `database/migrations/001_telegram_miniapp.sql`
- Updated root layout, root page, inquiry API, validation, robots and `.env.example`
- The prior expanded services and project categories update is included too.

## Before production

1. Run `database/migrations/001_telegram_miniapp.sql` in the existing Neon database. The inquiry API now writes `source`, `telegram_user_id`, and `telegram_first_name`.
2. Configure these Vercel environment variables: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `NEXT_PUBLIC_TELEGRAM_USERNAME`, `NEXT_PUBLIC_SITE_URL`.
3. Deploy the project and open `https://YOUR-VERCEL-DOMAIN/miniapp` in a browser to preview.
4. In `@BotFather`, configure the bot's Main Mini App URL as `https://YOUR-VERCEL-DOMAIN/miniapp`, then configure its menu button if desired.
5. Share `https://t.me/Code_Craft_Studio_Bot?startapp=home` after Main Mini App is configured.

## Telegram identity behavior

The Mini App sends raw `Telegram.WebApp.initData` to the server. The server verifies its HMAC signature and rejects expired/invalid Telegram sessions. Browser preview and guest inquiry submission without `initData` remain possible. Do not trust `initDataUnsafe` as proof of identity.

## Important

- Do not expose `TELEGRAM_BOT_TOKEN` in any `NEXT_PUBLIC_*` variable.
- The app's Telegram identity verification requires the bot token to be configured.
- This update does not yet add Telegram webhook command handling; the Mini App can be launched through BotFather's Main Mini App and menu button.
- Admin pages remain separate and protected by the existing admin authentication. The deployment itself must remain publicly reachable over HTTPS for Telegram to load the Mini App.
