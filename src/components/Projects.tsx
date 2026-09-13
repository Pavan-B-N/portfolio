import projectsData from '../data/projects.json';
import profile from '../data/profile.json';
import SectionHeading from './SectionHeading';
import ProjectCard from './ProjectCard';
import { GithubIcon } from './icons/BrandIcons';
import type { Project } from '../types';

const projects = projectsData as Project[];

export default function Projects() {
  return (
    <section id="projects" className="relative py-28">
      <div className="pointer-events-none absolute left-0 top-0 h-96 w-96 rounded-full bg-cyan/10 blur-[120px]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          title="Projects"
          description="From event-driven microservice platforms to agentic AI assistants — a look at what I build when I own the whole stack."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-fog transition-colors hover:border-white/20"
          >
            <GithubIcon className="h-4 w-4" />
            See more on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
