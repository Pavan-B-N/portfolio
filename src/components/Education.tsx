import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import educationData from '../data/education.json';
import SectionHeading from './SectionHeading';
import type { Education as EducationType } from '../types';

const education = educationData as EducationType[];

export default function Education() {
  return (
    <section id="education" className="relative py-24">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading title="Education" />

        <div className="mt-12 space-y-4">
          {education.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="glass flex flex-col gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet/20 to-cyan/20 text-violet">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <p className="font-display text-base font-semibold text-fog">
                    {edu.institution}
                  </p>
                  <p className="mt-0.5 text-sm text-mist">{edu.degree}</p>
                  <p className="mt-0.5 text-xs text-mist">
                    {edu.location} &middot; {edu.start} &ndash; {edu.end}
                  </p>
                </div>
              </div>

              <div className="shrink-0 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-center sm:text-right">
                <div className="font-display text-lg font-semibold text-gradient">
                  {edu.gpa}
                </div>
                <div className="text-[10px] uppercase tracking-wide text-mist">
                  GPA
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
