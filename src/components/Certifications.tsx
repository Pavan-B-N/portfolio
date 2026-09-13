import { motion } from 'framer-motion';
import { Award, BadgeCheck, Calendar, ExternalLink, IdCard } from 'lucide-react';
import certificationsData from '../data/certifications.json';
import achievementsData from '../data/achievements.json';
import { getCertificateImage } from '../lib/assets';
import SectionHeading from './SectionHeading';
import type { Achievement, Certification } from '../types';

const certifications = certificationsData as Certification[];
const achievements = achievementsData as Achievement[];

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-28">
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-pink/10 blur-[120px]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          title="Certifications & Achievements"
          description="Cloud fundamentals validated by Microsoft, backed by a consistent problem-solving habit and a run of hackathon builds."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {certifications.map((cert, idx) => (
            <motion.a
              key={cert.id}
              href={cert.verifyUrl}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: idx * 0.1 }}
              className="group relative overflow-hidden rounded-3xl p-[1px] text-left"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet/50 via-cyan/30 to-pink/40 opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="glass relative overflow-hidden rounded-3xl bg-surface">
                <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                  <img
                    src={getCertificateImage(cert.image)}
                    alt={cert.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />

                  <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-400 backdrop-blur">
                    <BadgeCheck size={13} />
                    Verified
                  </span>

                  <span className="absolute bottom-4 left-4 rounded-full bg-white/10 px-3 py-1 text-xs font-bold tracking-wide text-fog backdrop-blur">
                    {cert.code}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-cyan">
                        {cert.issuer}
                      </span>
                      <h3 className="mt-1 font-display text-lg font-semibold text-fog">
                        {cert.name}
                      </h3>
                    </div>
                    <ExternalLink
                      size={16}
                      className="mt-1 shrink-0 text-mist transition-colors group-hover:text-cyan"
                    />
                  </div>

                  <div className="mt-4 space-y-1.5 border-t border-white/10 pt-4">
                    <div className="flex items-center gap-2 text-xs text-mist">
                      <IdCard size={13} className="text-violet" />
                      <span className="font-mono tracking-tight">
                        {cert.credentialId}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-mist">
                      <Calendar size={13} className="text-cyan" />
                      Earned {cert.earnedOn}
                    </div>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {achievements.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: idx * 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink/20 to-violet/20 text-pink">
                <Award size={18} />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-fog">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">
                {item.description}
              </p>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block text-xs font-semibold text-cyan hover:underline"
                >
                  View Profile &rarr;
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
