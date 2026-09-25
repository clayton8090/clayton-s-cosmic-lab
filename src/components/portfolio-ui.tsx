import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Github, ChevronDown, ExternalLink, Orbit, FlaskConical, Palette, Code2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Project, LabItem } from "@/lib/portfolio";
import projectPreview from "@/assets/project-preview.jpg";

export const iconFor = (icon: string) => icon === "palette" ? Palette : icon === "code" ? Code2 : icon === "spark" ? FlaskConical : Orbit;
export function SectionLabel({ children, count }: {children: React.ReactNode; count?: string}) { return <div className="section-label"><span className="tiny-star">✳</span>{children}{count && <span className="ml-auto text-muted-foreground">{count}</span>}</div> }
export function ProjectCard({ project, index = 0 }: {project: Project; index?: number}) {
  const [expanded, setExpanded] = useState(false);
  return <article className="project-card group">
    <Link to="/projects/$slug" params={{slug: project.slug}} className="project-image" aria-label={`Read about ${project.title}`}>
      <img src={project.image_url || projectPreview} alt={`${project.title} preview`} loading="lazy" width={1200} height={768} />
      <span className="project-image-action"><ArrowUpRight size={20}/></span>
    </Link>
    <div className="project-body">
      <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.15em] text-muted-foreground"><span>0{index + 1} / {project.category}</span><span className="text-primary">Featured work</span></div>
      <Link to="/projects/$slug" params={{slug:project.slug}} className="block mt-5"><h3 className="font-display text-3xl md:text-4xl text-foreground group-hover:text-primary transition-colors">{project.title}</h3></Link>
      <p className="mt-3 text-muted-foreground leading-relaxed">{project.summary}</p>
      <div className="mt-7 pt-5 border-t border-border"><div className="text-[11px] font-mono uppercase tracking-[0.15em] text-primary mb-3">The idea & why it’s cool</div><p className="text-sm leading-relaxed text-foreground/80">{project.idea}</p></div>
      <div className="flex flex-wrap gap-3 mt-7">
        <Button asChild size="sm" className="rounded-sm"><Link to="/projects/$slug" params={{slug:project.slug}}>Explore project <ArrowUpRight size={14}/></Link></Button>
        {project.demo_url && <Button asChild variant="outline" size="sm" className="rounded-sm"><a href={project.demo_url} target="_blank" rel="noopener noreferrer">Live demo <ExternalLink size={14}/></a></Button>}
        {project.github_url && <Button asChild variant="outline" size="sm" className="rounded-sm"><a href={project.github_url} target="_blank" rel="noopener noreferrer">GitHub <Github size={14}/></a></Button>}
      </div>
      <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)} aria-expanded={expanded} className="mt-5 -ml-3 text-muted-foreground hover:text-primary">Technical details <ChevronDown size={14} className={expanded ? "rotate-180 transition-transform" : "transition-transform"}/></Button>
      {expanded && <div className="pb-2 text-sm text-muted-foreground leading-relaxed"><div className="flex flex-wrap gap-2 mb-4">{project.stack.map(s => <span key={s} className="tech-badge">{s}</span>)}</div><p>{project.architecture}</p></div>}
    </div>
  </article>
}
export function LabCard({item, index=0}: {item: LabItem; index?: number}) { const Icon = iconFor(item.icon); return <article className={`lab-card lab-card-${index % 4}`}><div className="flex items-start justify-between"><div className="lab-icon"><Icon size={22} strokeWidth={1.5}/></div><span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{item.status}</span></div><div className="mt-auto"><span className="text-[10px] font-mono uppercase tracking-widest text-primary">{item.category}</span><h3 className="font-display text-2xl mt-3 mb-2">{item.title}</h3><p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>{item.url && <a className="inline-flex items-center gap-1 mt-5 text-sm text-primary" href={item.url} target="_blank" rel="noopener noreferrer">Explore <ArrowRight size={14}/></a>}</div></article> }
