import Link from "next/link";

export function Footer() {
  const username = process.env.NEXT_PUBLIC_TELEGRAM_USERNAME;
  const telegram = username ? `https://t.me/${username.replace(/^@/, "")}` : "/contact";
  return <footer className="footer"><div className="container footer-inner">
    <div><strong>CodeCraft Studio</strong><p>Ideas Into Digital Reality.</p></div>
    <div><Link href="/services">Services</Link> · <Link href="/portfolio">Portfolio</Link> · <Link href="/contact">Contact</Link></div>
    <div><a href={telegram} target="_blank" rel="noreferrer">Telegram Contact ↗</a><p>© {new Date().getFullYear()} CodeCraft Studio</p></div>
  </div></footer>;
}