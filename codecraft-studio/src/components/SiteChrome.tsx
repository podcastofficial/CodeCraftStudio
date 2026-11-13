"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMiniApp = pathname?.startsWith("/miniapp");
  if (isMiniApp) return <>{children}</>;
  return <><Header />{children}<Footer /></>;
}
