import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ExternalLink, PlayCircle } from 'lucide-react';
import type { Project } from '../types';
import { GithubIcon } from './icons/BrandIcons';

const GRADIENTS = [
  'from-violet/30 via-indigo/20 to-transparent',
  'from-cyan/25 via-violet/20 to-transparent',
  'from-pink/25 via-indigo/20 to-transparent',
];

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const resetTilt = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  const isLarge = project.size === 'large';
  const gradient = GRADIENTS[index % GRADIENTS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08 }}
      style={{ perspective: 1200 }}
      className={isLarge ? 'md:col-span-2' : ''}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-surface"
      >
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${gradient} opacity-70 transition-opacity duration-500 group-hover:opacity-100`}
        />
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

        <div className="relative flex flex-1 flex-col p-7">
          <div className="flex items-start justify-between gap-3">
            <div>
              {project.featured && (
                <span className="mb-2 inline-block rounded-full bg-violet/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-violet">
                  Featured
                </span>
              )}
              <h3 className="font-display text-xl font-semibold text-fog sm:text-2xl">
                {project.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-cyan">
                {project.tagline}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.name} on GitHub`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/20 text-mist transition-colors hover:border-violet/50 hover:text-fog"
                >
                  <GithubIcon className="h-[15px] w-[15px]" />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.name} live demo`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/20 text-mist transition-colors hover:border-violet/50 hover:text-fog"
                >
                  <ExternalLink size={15} />
                </a>
              )}
              {project.videoUrl && (
                <a
                  href={project.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.name} demo video`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/20 text-mist transition-colors hover:border-violet/50 hover:text-fog"
                >
                  <PlayCircle size={15} />
                </a>
              )}
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-mist">
            {project.description}
          </p>

          {isLarge && (
            <ul className="mt-5 space-y-2">
              {project.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex gap-2 text-sm leading-relaxed text-mist"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
            {project.tech.slice(0, isLarge ? 12 : 6).map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-mist"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
