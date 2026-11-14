# CodeCraft Studio

**Ideas Into Digital Reality.**

A Futuristic Blue portfolio and lead-generation website for website development, Telegram Mini Apps, Telegram bots and custom software services.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS 4
- Neon PostgreSQL (`@neondatabase/serverless`)
- JOSE + bcryptjs admin session authentication
- Telegram Bot API notifications
- GitHub + Vercel deployment

## Included

- Responsive homepage, services, portfolio, project details, about and contact pages
- Project inquiry form with server-side Zod validation and honeypot
- PostgreSQL inquiry storage
- Telegram admin notification attempt and notification logs
- Admin login, dashboard, project creation/listing and inquiry status management
- SQL schema and environment example

## Important before public launch

This repository is a deployable starter implementation, not a fully configured live service. You must create your own Neon database, Telegram bot, admin credentials and Vercel environment variables. Review the code, test all flows and replace starter portfolio entries with verified project details before advertising.

Admin project create, edit, delete and listing are implemented, and the public portfolio reads published projects from the database (starter examples show only while there are none). Rate limiting (5 inquiries / 5 admin logins per 15 min per IP) is stored in PostgreSQL. Service CRUD, image upload, richer analytics and a full privacy policy are still planned. Do not describe those features as completed.

## 1. Requirements

Use a recent Node.js LTS and npm. On Android, install Termux from a trusted source and run:

```bash
pkg update && pkg upgrade -y
pkg install nodejs-lts git nano openssl -y
node -v
npm -v
```

## 2. Install locally

```bash
cd ~/codecraft-studio
npm install
cp .env.example .env.local
```

Fill `.env.local` with your own credentials. Never commit `.env.local`.

Generate a session secret:

```bash
openssl rand -hex 32
```

Generate a bcrypt password hash:

```bash
node scripts/hash-password.mjs 'Use-a-unique-long-password'
```

Copy the printed hash to `ADMIN_PASSWORD_HASH`. Use a strong unique password; do not use the example password.

## 3. Create Neon database

1. Create a PostgreSQL project in Neon.
2. Copy its connection string into `DATABASE_URL`.
3. Open the Neon SQL Editor.
4. Run the contents of `database/schema.sql`. If the database already exists, run `database/migrations/002_rate_limits.sql` instead (adds the `rate_limits` table).

## 4. Configure Telegram

1. Create a Telegram bot using `@BotFather`.
2. Start a private chat with your bot.
3. Obtain your private chat ID using a trusted method.
4. Set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` in `.env.local`.
5. Set `NEXT_PUBLIC_TELEGRAM_USERNAME` to the public studio username (without `@`).

Keep the bot token private. Never use a `NEXT_PUBLIC_` prefix for secrets.

## 5. Run locally

```bash
npm run dev
```

Open `http://localhost:3000`.

Check:

- `/` public homepage
- `/services`
- `/portfolio`
- `/contact`
- `/admin/login`

## 6. Admin access

The admin account is configured with:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD_HASH`
- `SESSION_SECRET`

There is no public admin registration. After login, use `/admin`, `/admin/projects` and `/admin/inquiries`.

## 7. GitHub

Create an empty GitHub repository named `codecraft-studio`, then:

```bash
git init
git add .
git commit -m "Initial CodeCraft Studio website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/codecraft-studio.git
git push -u origin main
```

Replace `YOUR_USERNAME`. Use GitHub's secure authentication flow. Do not place a personal access token in the remote URL.

## 8. Deploy to Vercel

1. Import the GitHub repository in Vercel.
2. Select the detected Next.js framework.
3. Add all variables from `.env.example` in Vercel Project Settings → Environment Variables.
4. Set `NEXT_PUBLIC_SITE_URL` to the assigned HTTPS Vercel URL.
5. Deploy.
6. Run the production tests below.

The initial address will be a Vercel subdomain if available, such as `codecraft-studio.vercel.app`.

## 9. Production test checklist

- [ ] Homepage and all public routes load on mobile and desktop.
- [ ] Correct Telegram username is configured.
- [ ] Database schema has been applied to the production Neon database.
- [ ] A test inquiry is saved in PostgreSQL.
- [ ] Telegram notification reaches the configured private chat.
- [ ] If Telegram delivery fails, the inquiry remains saved.
- [ ] Admin login works with the configured credentials.
- [ ] Unauthenticated access to admin APIs returns 401.
- [ ] Admin can create a portfolio project.
- [ ] Admin can see inquiries and update their statuses.
- [ ] No secrets appear in GitHub or browser responses.

## Current implementation boundaries

- Starter projects on the public portfolio are illustrative entries from the local content file. Replace them with accurate case studies and verified live demo links.
- Admin project creation/listing and inquiry status management are implemented. Full edit/delete and service management are not yet implemented.
- The inquiry endpoint has validation and a honeypot, but production-grade distributed rate limiting should be added before a high-volume ad campaign.
- Notification logs are stored when possible. There is no automatic retry queue in this first version.
- Add a complete privacy policy and terms page before collecting leads at scale.
- Review Vercel and Neon current plan limits and commercial-use terms.

## Suggested next enhancements

1. Dynamic public portfolio reads from the projects table.
2. Full project edit/delete and image upload.
3. Service management in admin.
4. Distributed rate limiting and spam controls.
5. Notification retry workflow.
6. Privacy policy, terms and consent management.
7. SEO sitemap, robots.txt and analytics.
