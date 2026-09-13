import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import experience from '../data/experience.json';
import SectionHeading from './SectionHeading';
import type { Experience as ExperienceType } from '../types';

const items = experience as ExperienceType[];

export default function Experience() {
  return (
    <section id="experience" className="relative py-28">
      <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-indigo/10 blur-[120px]" />
      <div className="relative mx-auto max-w-4xl px-6">
        <SectionHeading
          title="Experience"
          description="A path through backend platforms, security remediation, and automation — each role adding another layer of end-to-end ownership."
        />

        <div className="relative mt-16">
          <div className="absolute left-4 top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-violet via-cyan/50 to-transparent sm:left-1/2" />

          <ol className="space-y-12">
            {items.map((job, idx) => (
              <motion.li
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="relative pl-12 sm:grid sm:grid-cols-2 sm:gap-10 sm:pl-0"
              >
                <div
                  className={`absolute left-4 top-1.5 z-10 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full border-2 border-ink bg-violet sm:left-1/2 ${
                    job.current ? 'animate-pulse' : ''
                  }`}
                >
                  <Briefcase size={10} className="text-white" />
                </div>

                <div
                  className={`${idx % 2 === 0 ? 'sm:col-start-1 sm:text-right' : 'sm:col-start-2'}`}
                >
                  <div className="glass rounded-2xl p-6 text-left">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-lg font-semibold text-fog">
                        {job.role}
                      </h3>
                      {job.current && (
                        <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-400">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm font-medium text-gradient">
                      {job.company}
                    </p>
                    <p className="mt-0.5 text-xs text-mist">
                      {job.start} &ndash; {job.end} &middot; {job.location}
                    </p>

                    <ul className="mt-4 space-y-2.5">
                      {job.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-2 text-sm leading-relaxed text-mist"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
