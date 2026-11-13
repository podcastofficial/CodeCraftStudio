import Link from "next/link";

export function Header() {
  return <header className="site-header"><div className="container header-inner">
    <Link href="/" className="brand"><span className="brand-mark">⌘</span><span>CodeCraft Studio</span></Link>
    <nav className="nav" aria-label="Main navigation">
      <Link href="/">Home</Link><Link href="/services">Services</Link><Link href="/portfolio">Portfolio</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link>
    </nav>
    <Link className="btn" href="/contact">Start a Project ↗</Link>
  </div></header>;
}