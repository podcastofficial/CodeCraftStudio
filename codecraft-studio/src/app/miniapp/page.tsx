import type { Metadata } from "next";
import { MiniAppExperience } from "@/components/miniapp/MiniAppExperience";
import { getPublishedProjects } from "@/lib/projects";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "CodeCraft Studio Mini App",
  description: "Explore digital development services, selected work and start a project with CodeCraft Studio.",
  robots: { index: false, follow: false }
};

export default async function MiniAppPage() {
  const { projects, fromDatabase } = await getPublishedProjects();
  return <MiniAppExperience
    contactUsername={process.env.NEXT_PUBLIC_TELEGRAM_USERNAME || ""}
    projects={projects}
    projectsAreSamples={!fromDatabase}
  />;
}
