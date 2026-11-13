import type { Metadata } from "next";
import { MiniAppExperience } from "@/components/miniapp/MiniAppExperience";

export const metadata: Metadata = {
  title: "CodeCraft Studio Mini App",
  description: "Explore digital development services, selected work and start a project with CodeCraft Studio.",
  robots: { index: false, follow: false }
};

export default function MiniAppPage() {
  return <MiniAppExperience contactUsername={process.env.NEXT_PUBLIC_TELEGRAM_USERNAME || ""} />;
}
