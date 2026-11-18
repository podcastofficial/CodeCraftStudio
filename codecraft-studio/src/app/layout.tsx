import type { Metadata } from "next";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: { default: "CodeCraft Studio | Ideas Into Digital Reality", template: "%s | CodeCraft Studio" },
  description: "CodeCraft Studio creates websites, apps, AI tools, Telegram Mini Apps, business platforms and custom software.",
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }, { url: "/icon-192.png", sizes: "192x192", type: "image/png" }], apple: "/apple-touch-icon.png" },
  openGraph: { title: "CodeCraft Studio | Ideas Into Digital Reality", description: "Websites, apps, AI tools, Telegram Mini Apps and custom software.", images: ["/og-image.png"] },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteChrome>{children}</SiteChrome></body></html>;
}
