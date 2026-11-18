import { TELEGRAM_URL } from "@/lib/contact";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export function Header() {
  return <header className="site-header"><div className="container header-inner">
    <Link href="/" className="brand"><Logo size={42} idPrefix="hd" /><span className="brand-copy"><strong>CodeCraft</strong><small>STUDIO</small></span></Link>
    <nav className="nav" aria-label="Main navigation">
      <Link href="/">Home</Link><Link href="/services">Services</Link><Link href="/portfolio">Portfolio</Link><Link href="/pricing">Pricing</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link>
    </nav>
    <a className="btn" href={TELEGRAM_URL} target="_blank" rel="noreferrer">Start a Project ↗</a>
  </div></header>;
}