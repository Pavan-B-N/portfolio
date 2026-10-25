import { motion } from 'framer-motion';
import { Briefcase, ExternalLink, MapPin, Sparkles } from 'lucide-react';
import profile from '../data/profile.json';
import experienceData from '../data/experience.json';
import galleryData from '../data/gallery.json';
import { getGalleryImage } from '../lib/assets';
import SectionHeading from './SectionHeading';
import PhotoCarousel, { type CarouselSlide } from './PhotoCarousel';
import { LeetcodeIcon } from './icons/BrandIcons';
import type { Experience, GalleryPhoto } from '../types';

const experience = experienceData as Experience[];
const gallery = galleryData as GalleryPhoto[];
const currentRole = experience.find((job) => job.current) ?? experience[0];
const previousRole = experience.find((job) => job.id !== currentRole.id);

function galleryToSlide(g: GalleryPhoto): CarouselSlide | null {
  const src = getGalleryImage(g.image);
  return src ? { src, alt: g.caption, caption: g.caption } : null;
}

const slides: CarouselSlide[] = gallery
  .map(galleryToSlide)
  .filter((s) => s !== null);

export default function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          title="About Me"
          description="A quick look at what I'm building now, and where I've worked before."
        />

        <div className="mt-16 grid items-center gap-8 md:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-surface/80 shadow-2xl md:max-w-none">
              <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-tr from-violet/30 via-cyan/20 to-transparent blur-xl opacity-75" />
              <div className="relative h-full w-full overflow-hidden rounded-3xl">
                {slides.length > 0 ? (
                  <PhotoCarousel slides={slides} />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet/20 via-surface to-cyan/10">
                    <span className="font-display text-5xl font-semibold text-gradient">
                      {profile.initials}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass rounded-3xl p-7 md:col-span-3 sm:p-9"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3.5 py-1.5 text-xs font-medium text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Currently {currentRole.role} @ {currentRole.company} (ex-{previousRole?.company ?? 'Microsoft'})
            </div>

            <p className="mt-5 text-balance text-base leading-relaxed text-fog sm:text-lg">
              {profile.summary}
            </p>
            <p className="mt-4 text-balance text-sm leading-relaxed text-mist sm:text-base">
              {profile.summarySecondary}
            </p>

            {/* Core Pillars */}
            <div className="mt-6 grid gap-2.5 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-3 text-xs">
                <div className="font-semibold text-fog">Cloud Microservices</div>
                <div className="mt-0.5 text-[11px] text-mist">Spring Boot &middot; Kafka &middot; Redis &middot; Docker</div>
              </div>
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-3 text-xs">
                <div className="font-semibold text-fog">Agentic AI &amp; RAG</div>
                <div className="mt-0.5 text-[11px] text-mist">MCP &middot; Azure OpenAI &middot; pgvector</div>
              </div>
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-3 text-xs">
                <div className="font-semibold text-fog">Algorithmic Rigor</div>
                <div className="mt-0.5 text-[11px] text-mist">500+ LeetCode &amp; TUF &middot; 9.16 GPA</div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {experience.map((job) => (
                <span
                  key={job.id}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-mist"
                >
                  <Briefcase size={12} className="text-violet" />
                  {job.company} &middot; {job.role}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-white/10 pt-6 text-sm text-mist">
              <span className="inline-flex items-center gap-2">
                <MapPin size={16} className="text-violet" />
                {profile.location}
              </span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span className="inline-flex items-center gap-2">
                <Sparkles size={16} className="text-cyan" />
                Open to Full-Stack, Backend &amp; AI-Systems roles
              </span>
            </div>
          </motion.div>
        </div>

        {/* 500+ DSA & Problem Solving Spotlight Card */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="glass group relative mt-10 overflow-hidden rounded-3xl border border-white/10 p-6 backdrop-blur-xl transition-all duration-300 hover:border-amber-400/40 hover:shadow-2xl hover:shadow-amber-500/10 sm:p-8"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-amber-500/20 via-violet/10 to-transparent blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-400 shadow-xl shadow-amber-500/15">
                <LeetcodeIcon className="h-7 w-7" />
              </div>
              <div>
                <div className="flex items-baseline gap-2.5">
                  <span className="font-display text-3xl font-bold tracking-tight text-fog sm:text-4xl">
                    500+
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                    DSA Solved
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-mist sm:text-sm">
                  Verified across <span className="font-semibold text-fog">LeetCode</span> &amp;{' '}
                  <span className="font-semibold text-fog">TakeUForward (TUF)</span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={profile.socials.leetcode}
                target="_blank"
                rel="noreferrer"
                aria-label="View LeetCode Profile"
                className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-semibold text-amber-300 transition-colors hover:bg-amber-500/20"
              >
                <LeetcodeIcon className="h-3.5 w-3.5" />
                LeetCode Profile
                <ExternalLink size={12} />
              </a>
              <a
                href={profile.socials.takeuforward ?? 'https://takeuforward.org/profile/pavanbn'}
                target="_blank"
                rel="noreferrer"
                aria-label="View TakeUForward Profile"
                className="glass inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-fog transition-colors hover:border-white/30 hover:bg-white/10"
              >
                <span>TakeUForward (TUF)</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
