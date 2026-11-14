import "server-only";
import { getSql } from "@/lib/db";
import { starterProjects } from "@/lib/content";

export type PublicProject = {
  title: string;
  slug: string;
  category: string;
  description: string;
  technologies: string[];
  demo_url: string;
  github_url: string;
  image_url: string;
  featured: boolean;
};

/**
 * Published projects from the database. If the database is not configured,
 * errors, or has no published projects yet, the illustrative starter entries
 * are returned and `fromDatabase` is false so the UI can label them as samples.
 */
export async function getPublishedProjects(): Promise<{ projects: PublicProject[]; fromDatabase: boolean }> {
  try {
    const sql = getSql();
    const rows = await sql`
      SELECT title, slug, category, description, technologies, demo_url, github_url, image_url, featured
      FROM projects
      WHERE published = TRUE
      ORDER BY featured DESC, created_at DESC
    `;
    if (rows.length > 0) {
      return {
        fromDatabase: true,
        projects: rows.map((r) => ({
          title: String(r.title),
          slug: String(r.slug),
          category: r.category ? String(r.category) : "Project",
          description: r.description ? String(r.description) : "",
          technologies: Array.isArray(r.technologies) ? (r.technologies as string[]) : [],
          demo_url: r.demo_url ? String(r.demo_url) : "",
          github_url: r.github_url ? String(r.github_url) : "",
          image_url: r.image_url ? String(r.image_url) : "",
          featured: Boolean(r.featured)
        }))
      };
    }
  } catch (error) {
    console.error("Could not load projects from database:", error);
  }
  return {
    fromDatabase: false,
    projects: starterProjects.map((p) => ({ ...p, image_url: "" }))
  };
}
