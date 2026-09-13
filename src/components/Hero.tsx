import { lazy, Suspense, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Mail } from 'lucide-react';
import profile from '../data/profile.json';
import experienceData from '../data/experience.json';
import { GithubIcon, LeetcodeIcon, LinkedinIcon } from './icons/BrandIcons';
import type { Experience } from '../types';

const HeroScene = lazy(() => import('../three/HeroScene'));

const experience = experienceData as Experience[];
const currentRole = experience.find((job) => job.current) ?? experience[0];
const previousRole = experience.find((job) => job.id !== currentRole.id);

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % profile.taglineWords.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-svh items-center overflow-hidden bg-ink"
    >
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-ink via-ink/85 to-transparent lg:via-ink/60" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 pt-28 lg:pt-24">
        <div className="mx-auto max-w-xl text-center lg:mx-0 lg:max-w-lg lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass mx-auto inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-mist lg:mx-0"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Open to Full-Stack &amp; Backend roles &middot; {profile.location}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-fog sm:text-6xl lg:text-6xl xl:text-7xl"
          >
            Hi, I&apos;m{' '}
            <span className="text-gradient">{profile.name}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-5 flex h-9 max-w-full items-center justify-center gap-2 overflow-hidden px-2 text-lg text-mist sm:text-xl lg:mx-0 lg:justify-start lg:px-0"
          >
            <span className="shrink-0 whitespace-nowrap text-fog">
              I build
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={profile.taglineWords[wordIndex]}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="truncate font-medium text-gradient"
              >
                {profile.taglineWords[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-6 max-w-xl text-balance text-base leading-relaxed text-mist sm:text-lg lg:mx-0"
          >
            {currentRole.role} at {currentRole.company}
            {previousRole ? ` (ex-${previousRole.company})` : ''}, crafting
            event-driven microservices, Redis-backed APIs, and agentic AI
            platforms — from database to deploy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-violet to-indigo px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet/25 transition-transform hover:scale-[1.03]"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-fog transition-colors hover:border-white/20"
            >
              Get In Touch
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-8 flex items-center justify-center gap-4 lg:justify-start"
          >
            {[
              { href: profile.socials.github, icon: GithubIcon, label: 'GitHub' },
              { href: profile.socials.linkedin, icon: LinkedinIcon, label: 'LinkedIn' },
              { href: profile.socials.leetcode, icon: LeetcodeIcon, label: 'LeetCode' },
              { href: profile.socials.email, icon: Mail, label: 'Email' },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noreferrer"
                aria-label={label}
                className="glass flex h-10 w-10 items-center justify-center rounded-full text-mist transition-colors hover:border-violet/50 hover:text-fog"
              >
                <Icon className="h-[17px] w-[17px]" />
              </a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mx-auto mt-14 grid max-w-md grid-cols-2 gap-3 sm:grid-cols-4 lg:mx-0"
          >
            {profile.stats.map((stat) => (
              <div key={stat.label} className="glass rounded-2xl px-3 py-4">
                <div className="font-display text-2xl font-semibold text-fog sm:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-[11px] leading-tight text-mist sm:text-xs">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-mist"
      >
        <ArrowDown size={20} />
      </motion.a>
    </section>
  );
}
