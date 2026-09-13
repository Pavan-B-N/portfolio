import { motion } from 'framer-motion';
import { Briefcase, MapPin, Sparkles } from 'lucide-react';
import profile from '../data/profile.json';
import experienceData from '../data/experience.json';
import galleryData from '../data/gallery.json';
import { getGalleryImage } from '../lib/assets';
import SectionHeading from './SectionHeading';
import PhotoCarousel, { type CarouselSlide } from './PhotoCarousel';
import type { Experience, GalleryPhoto } from '../types';

const experience = experienceData as Experience[];
const gallery = galleryData as GalleryPhoto[];
const currentRole = experience.find((job) => job.current) ?? experience[0];

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

        <div className="mt-16 grid gap-8 md:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <div className="glass relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-3xl md:max-w-none">
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass rounded-3xl p-8 md:col-span-3"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Currently {currentRole.role} @ {currentRole.company}
            </div>

            <p className="mt-5 text-balance text-base leading-relaxed text-fog sm:text-lg">
              {profile.summary}
            </p>
            <p className="mt-5 text-balance text-sm leading-relaxed text-mist sm:text-base">
              {profile.summarySecondary}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {experience.map((job) => (
                <span
                  key={job.id}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-mist"
                >
                  <Briefcase size={12} className="text-violet" />
                  {job.company}
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
                Open to full-stack, backend &amp; AI-systems roles
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
