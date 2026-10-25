import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Play, CheckCircle2 } from 'lucide-react';
import type { Project } from '../types';
import { GithubIcon } from './icons/BrandIcons';

const GRADIENTS = [
  'from-violet/20 via-indigo/10 to-transparent',
  'from-cyan/20 via-violet/10 to-transparent',
  'from-pink/20 via-indigo/10 to-transparent',
  'from-amber/20 via-violet/10 to-transparent',
];

interface ProjectCardProps {
  project: Project;
  index: number;
}

function getYouTubeId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/,
  );
  return match ? match[1] : null;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = getYouTubeId(project.videoUrl);
  const gradient = GRADIENTS[index % GRADIENTS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-surface/70 p-6 backdrop-blur-xl transition-all duration-300 hover:border-violet/40 hover:shadow-2xl hover:shadow-violet/10 sm:p-8 lg:p-9"
    >
      <div
        className={`pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br ${gradient} blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
      />

      <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
        {/* Left Column: Architecture & Details */}
        <div className={videoId ? 'lg:col-span-7' : 'lg:col-span-12'}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {project.featured && (
                <span className="inline-block rounded-full border border-violet/30 bg-violet/15 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-violet">
                  Featured Platform
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.name} on GitHub`}
                  className="glass flex h-8 w-8 items-center justify-center rounded-full text-mist transition-colors hover:border-white/30 hover:text-fog"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.name} live demo`}
                  className="glass flex h-8 w-8 items-center justify-center rounded-full text-mist transition-colors hover:border-white/30 hover:text-fog"
                >
                  <ExternalLink size={13} />
                </a>
              )}
            </div>
          </div>

          <div className="mt-3">
            <h3 className="font-display text-2xl font-bold tracking-tight text-fog sm:text-3xl">
              {project.name}
            </h3>
            <p className="mt-1 text-sm font-semibold text-gradient">
              {project.tagline}
            </p>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-mist">
            {project.description}
          </p>

          {project.bullets && project.bullets.length > 0 && (
            <ul className="mt-5 space-y-2.5">
              {project.bullets.map((bullet, bIdx) => (
                <li
                  key={bIdx}
                  className="flex items-start gap-2.5 text-xs text-mist sm:text-sm"
                >
                  <CheckCircle2
                    size={16}
                    className="mt-0.5 shrink-0 text-cyan"
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 flex flex-wrap gap-1.5 pt-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-lg border border-white/5 bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-mist"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Embedded YouTube Video Player */}
        {videoId && (
          <div className="lg:col-span-5">
            <div className="group/video relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-2xl">
              {isPlaying ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
                  title={`${project.name} demo video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  className="relative flex h-full w-full items-center justify-center"
                  aria-label={`Play ${project.name} demo video`}
                >
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                    alt={`${project.name} video preview`}
                    className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover/video:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent transition-opacity group-hover/video:opacity-60" />

                  {/* Play Button */}
                  <div className="absolute flex h-14 w-14 items-center justify-center rounded-full bg-rose-600/90 text-white shadow-xl shadow-rose-600/40 transition-transform duration-300 group-hover/video:scale-110">
                    <Play size={24} className="ml-1 fill-white" />
                  </div>

                  <div className="absolute bottom-3 inset-x-3 rounded-xl border border-white/10 bg-black/70 px-3 py-1.5 backdrop-blur-md">
                    <p className="text-center text-[11px] font-medium text-white/90">
                      ▶ Watch Architecture Demo
                    </p>
                  </div>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
