import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  description?: string;
}

export default function SectionHeading({
  title,
  description,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-2xl text-center"
    >
      <h2 className="font-display text-3xl font-semibold tracking-tight text-fog sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-balance text-sm leading-relaxed text-mist sm:text-base">
          {description}
        </p>
      )}
    </motion.div>
  );
}
