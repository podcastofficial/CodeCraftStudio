import type { Metadata } from "next";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: { default: "CodeCraft Studio | Ideas Into Digital Reality", template: "%s | CodeCraft Studio" },
  description: "CodeCraft Studio creates websites, apps, AI tools, Telegram Mini Apps, business platforms and custom software.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteChrome>{children}</SiteChrome></body></html>;
}
