import { motion } from 'framer-motion';
import { ExternalLink, Sparkles, Star, Zap } from 'lucide-react';
import badgesData from '../data/badges.json';
import { getBadgeImage } from '../lib/assets';
import SectionHeading from './SectionHeading';
import type { Badge } from '../types';

const badges = badgesData as Badge[];

const colorMap: Record<string, { glow: string; pill: string; accent: string; border: string }> = {
  pink: {
    glow: 'rgba(244,114,182,0.15)',
    pill: 'bg-pink/15 text-pink',
    accent: 'text-pink',
    border: 'from-pink/60 via-violet/40 to-pink/30',
  },
  cyan: {
    glow: 'rgba(34,211,238,0.15)',
    pill: 'bg-cyan/15 text-cyan',
    accent: 'text-cyan',
    border: 'from-cyan/60 via-indigo/40 to-cyan/30',
  },
  violet: {
    glow: 'rgba(139,92,246,0.15)',
    pill: 'bg-violet/15 text-violet',
    accent: 'text-violet',
    border: 'from-violet/60 via-pink/40 to-violet/30',
  },
};

function BadgeIcon({ color }: { color: string }) {
  if (color === 'pink') return <Star size={15} />;
  if (color === 'cyan') return <Sparkles size={15} />;
  return <Zap size={15} />;
}

export default function Badges() {
  return (
    <section id="badges" className="relative py-24">
      {/* Background glows */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-80 w-80 rounded-full bg-violet/10 blur-[140px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-0 h-80 w-80 rounded-full bg-cyan/10 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          title="Digital Badges"
          description="Recognised by Microsoft, Google Cloud, and Google for Developers for hands-on work across Agentic AI, reasoning systems, and generative AI applications."
        />

        <div className="mt-16 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {badges.map((badge, idx) => {
            const theme = colorMap[badge.color] ?? colorMap.violet;
            const img = getBadgeImage(badge.image);

            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className="group relative flex flex-col"
              >
                {/* Card glow */}
                <div
                  className="absolute -inset-px rounded-3xl opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: theme.glow }}
                />

                {/* Gradient border wrapper */}
                <div className={`relative flex flex-1 flex-col rounded-3xl p-[1px] bg-gradient-to-br ${theme.border}`}>
                  <div className="glass relative flex h-full flex-col overflow-hidden rounded-3xl bg-surface">

                    {/* Badge image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-black/30">
                      {img ? (
                        <img
                          src={img}
                          alt={badge.name}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <span className={`text-5xl ${theme.accent} opacity-30`}>
                            <BadgeIcon color={badge.color} />
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />

                      {/* Category pill */}
                      <span
                        className={`absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide backdrop-blur ${theme.pill}`}
                      >
                        <BadgeIcon color={badge.color} />
                        {badge.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-5">
                      <p className={`text-[10px] font-semibold uppercase tracking-widest ${theme.accent}`}>
                        {badge.issuer}
                      </p>
                      <h3 className="mt-1 font-display text-lg font-bold text-fog leading-tight">
                        {badge.name}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-mist flex-1">
                        {badge.description}
                      </p>

                      {/* Skills */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {badge.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full bg-white/5 px-2.5 py-0.5 text-[10px] font-medium text-mist border border-white/8"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-4">
                        <span className="text-[10px] text-mist">Earned {badge.earnedOn}</span>
                        {badge.verifyUrl ? (
                          <a
                            href={badge.verifyUrl}
                            target="_blank"
                            rel="noreferrer"
                            className={`inline-flex items-center gap-1 text-[11px] font-semibold transition-colors hover:underline ${theme.accent}`}
                          >
                            Verify <ExternalLink size={11} />
                          </a>
                        ) : (
                          <span className="text-[10px] text-mist/60 italic">Certificate ID: 2026H2S09BWAIBLR-P00203</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
