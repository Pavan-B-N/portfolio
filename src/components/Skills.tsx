import { motion } from 'framer-motion';
import {
  Boxes,
  Cloud,
  Code2,
  Cpu,
  Database,
  LayoutTemplate,
  Sparkles,
} from 'lucide-react';
import skillsData from '../data/skills.json';
import SectionHeading from './SectionHeading';
import type { SkillGroup } from '../types';

const skills = skillsData as SkillGroup[];

const ICONS: Record<string, typeof Code2> = {
  Languages: Code2,
  Backend: Boxes,
  Frontend: LayoutTemplate,
  Databases: Database,
  'Cloud & DevOps': Cloud,
  'AI & Agentic Systems': Sparkles,
  'Core CS': Cpu,
};

export default function Skills() {
  return (
    <section id="skills" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          title="Skills"
          description="A stack built for shipping production systems — backend depth, frontend polish, and the cloud/AI tooling that ties it together."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, idx) => {
            const Icon = ICONS[group.category] ?? Code2;
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: (idx % 3) * 0.08 }}
                className="glass group rounded-2xl p-6 transition-colors hover:border-violet/30"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet/20 to-cyan/20 text-violet">
                  <Icon size={18} />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-fog">
                  {group.category}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-mist transition-colors group-hover:border-white/15"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
