import { motion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';
import profile from '../data/profile.json';
import { GithubIcon, LeetcodeIcon, LinkedinIcon } from './icons/BrandIcons';

export default function Contact() {
  return (
    <section id="contact" className="relative py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[36rem] -translate-x-1/2 rounded-full bg-violet/15 blur-[130px]" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl font-semibold tracking-tight text-fog sm:text-5xl">
            Let&apos;s build something{' '}
            <span className="text-gradient">great</span> together
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-balance text-sm leading-relaxed text-mist sm:text-base">
            {profile.contactBlurb}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href={profile.socials.email}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet to-indigo px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet/25 transition-transform hover:scale-[1.03]"
            >
              <Mail size={16} />
              {profile.email}
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            {[
              { href: profile.socials.github, icon: GithubIcon, label: 'GitHub' },
              { href: profile.socials.linkedin, icon: LinkedinIcon, label: 'LinkedIn' },
              { href: profile.socials.leetcode, icon: LeetcodeIcon, label: 'LeetCode' },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="glass flex h-11 w-11 items-center justify-center rounded-full text-mist transition-colors hover:border-violet/50 hover:text-fog"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>

          <p className="mt-8 inline-flex items-center gap-2 text-xs text-mist">
            <MapPin size={13} />
            Based in {profile.location} &middot; Open to remote &amp;
            relocation
          </p>
        </motion.div>
      </div>
    </section>
  );
}
