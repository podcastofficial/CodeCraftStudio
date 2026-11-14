import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedProjects } from "@/lib/projects";

export const revalidate = 60;

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { projects, fromDatabase } = await getPublishedProjects();
  const project = projects.find(p => p.slug === slug);
  if (!project) notFound();
  return <><section className="page-hero"><div className="container"><div className="eyebrow">{project.category}</div><h1>{project.title}</h1><p>{project.description}</p></div></section>
    <section className="section"><div className="container" style={{maxWidth:850}}><div className="project-visual" style={{borderRadius:20,minHeight:260}}>⌘</div><h2>Project overview</h2><p style={{color:"#64748b",lineHeight:1.8}}>{project.description}</p>{project.technologies.length>0&&<><h3>Technology</h3><p>{project.technologies.join(" · ")}</p></>}{(project.demo_url||project.github_url)&&<p style={{display:"flex",gap:16,flexWrap:"wrap"}}>{project.demo_url&&<a className="kicker" href={project.demo_url} target="_blank" rel="noreferrer">Live demo ↗</a>}{project.github_url&&<a className="kicker" href={project.github_url} target="_blank" rel="noreferrer">GitHub ↗</a>}</p>}{!fromDatabase&&<div className="notice">Portfolio starter content: confirm the actual project status, screenshots and demo URL before publishing this case study as completed work.</div>}<p style={{marginTop:24}}><Link className="btn" href="/contact">Build a similar project ↗</Link></p></div></section></>;
}
