import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CarouselSlide {
  src: string;
  alt: string;
  caption?: string;
}

interface PhotoCarouselProps {
  slides: CarouselSlide[];
  autoplayMs?: number;
}

export default function PhotoCarousel({
  slides,
  autoplayMs = 4200,
}: PhotoCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const multi = slides.length > 1;

  useEffect(() => {
    if (!multi || paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, autoplayMs);
    return () => clearInterval(id);
  }, [multi, paused, slides.length, autoplayMs]);

  if (slides.length === 0) return null;

  const slide = slides[index];
  const goTo = (i: number) => setIndex((i + slides.length) % slides.length);

  return (
    <div
      className="group relative h-full w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 h-full w-full object-contain p-2"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent pointer-events-none" />

      {slide.caption && (
        <div className="absolute bottom-3.5 inset-x-3.5 z-10 rounded-2xl border border-white/10 bg-ink/75 px-3 py-2 backdrop-blur-md shadow-lg">
          <p className="text-xs font-medium text-fog">
            {slide.caption}
          </p>
        </div>
      )}

      {multi && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={() => goTo(index - 1)}
            className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-fog opacity-0 backdrop-blur transition-opacity group-hover:opacity-100"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={() => goTo(index + 1)}
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-fog opacity-0 backdrop-blur transition-opacity group-hover:opacity-100"
          >
            <ChevronRight size={16} />
          </button>

          <div className="absolute top-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                aria-label={`Go to photo ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-5 bg-fog' : 'w-1.5 bg-white/40'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
