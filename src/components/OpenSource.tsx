import { motion } from 'framer-motion';
import { GitPullRequest, ExternalLink, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import openSourceData from '../data/openSource.json';
import SectionHeading from './SectionHeading';
import { GithubIcon } from './icons/BrandIcons';
import { getGalleryImage } from '../lib/assets';
import type { OpenSourceContribution } from '../types';

const contributions = openSourceData as OpenSourceContribution[];

export default function OpenSource() {
  return (
    <section id="open-source" className="relative py-28">
      {/* Background ambient glows */}
      <div className="pointer-events-none absolute -right-20 top-12 h-96 w-96 rounded-full bg-cyan/10 blur-[130px]" />
      <div className="pointer-events-none absolute -left-20 bottom-12 h-96 w-96 rounded-full bg-violet/10 blur-[130px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          title="Open Source Contributions"
          description="Building in public and giving back to community-driven developer tooling — starting with multi-agent security frameworks at Google DevFest."
        />

        <div className="mt-16 space-y-8">
          {contributions.map((item, idx) => {
            const eventPhoto = item.image ? getGalleryImage(item.image) : undefined;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-surface/60 p-6 backdrop-blur-xl transition-all duration-300 hover:border-violet/40 hover:shadow-2xl hover:shadow-violet/10 sm:p-8 lg:p-10"
              >
                {/* Subtle card glow */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-violet/20 via-cyan/10 to-transparent blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                  {/* Content Column */}
                  <div className={eventPhoto ? 'lg:col-span-7' : 'lg:col-span-12'}>
                    {/* Header Badges */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <a
                        href={item.prUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300 transition-colors hover:bg-emerald-500/20"
                      >
                        <GitPullRequest size={13} className="text-emerald-400" />
                        Pull Request #{item.prNumber}
                      </a>

                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-mist">
                        <Sparkles size={12} className="text-amber-400" />
                        {item.event}
                      </span>

                      <a
                        href={item.mainRepoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-auto hidden items-center gap-1.5 text-xs text-mist hover:text-fog sm:inline-flex"
                      >
                        <GithubIcon className="h-3.5 w-3.5" />
                        <span>{item.org}/{item.project}</span>
                        <ExternalLink size={11} className="opacity-70" />
                      </a>
                    </div>

                    {/* Title & Tagline */}
                    <div className="mt-5">
                      <h3 className="font-display text-2xl font-semibold tracking-tight text-fog sm:text-3xl">
                        {item.name}{' '}
                        <span className="text-base font-normal text-mist sm:text-lg">
                          &mdash; {item.tagline}
                        </span>
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-mist sm:text-base">
                        {item.description}
                      </p>
                    </div>

                    {/* Highlights / Bullets */}
                    <ul className="mt-5 space-y-2.5 text-xs text-mist sm:text-sm">
                      {item.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5">
                          <CheckCircle2
                            size={16}
                            className="mt-0.5 shrink-0 text-violet"
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Tags */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {item.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-lg border border-white/5 bg-white/5 px-2.5 py-1 text-xs font-medium text-mist"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      <a
                        href={item.prUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet to-indigo px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-violet/25 transition-transform hover:scale-[1.03]"
                      >
                        <GitPullRequest size={14} />
                        View Pull Request #{item.prNumber}
                        <ExternalLink size={12} className="opacity-75" />
                      </a>

                      <a
                        href={item.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold text-fog transition-colors hover:border-white/20"
                      >
                        <GithubIcon className="h-3.5 w-3.5" />
                        Explore Agent Code
                      </a>
                    </div>
                  </div>

                  {/* Photo / Visual Column */}
                  {eventPhoto && (
                    <div className="lg:col-span-5">
                      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-xl">
                        <img
                          src={eventPhoto}
                          alt="Google DevFest Bengaluru at Google Anantha"
                          className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-72 lg:h-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                        <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5">
                          <div className="inline-flex items-center gap-1.5 rounded-full bg-ink/80 px-2.5 py-1 text-[11px] font-medium text-fog backdrop-blur-md">
                            <MapPin size={11} className="text-violet" />
                            Google Anantha, Bengaluru
                          </div>
                          <p className="mt-2 text-xs font-medium text-fog">
                            Live building session at Google DevFest &middot; Open Source Agents
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
