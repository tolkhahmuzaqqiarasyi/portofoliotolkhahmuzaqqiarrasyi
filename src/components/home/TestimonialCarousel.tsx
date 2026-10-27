import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, QuoteIcon } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { ease } from '../../utils/styles';

export function TestimonialCarousel() {
  const reduce = useReducedMotion();
  const { data } = usePortfolio();
  const items = data.testimonials;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  if (items.length === 0) return null;
  const safeIndex = index % items.length;
  const current = items[safeIndex];

  const go = (step: number) => {
    setDirection(step);
    setIndex((i) => (i + step + items.length) % items.length);
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Testimoni"
      className="rounded-3xl border border-white/15 bg-white/5 p-7 md:p-9">
      
      <div className="flex items-start justify-between gap-4">
        <QuoteIcon className="h-9 w-9 text-lemon" aria-hidden />
        {current.isSample &&
        <span className="rounded-full border border-dashed border-white/40 px-3 py-1 text-xs font-semibold text-white/85">
            Data contoh
          </span>
        }
      </div>

      <div className="min-h-[200px]" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.figure
            key={current.id}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: 20 * direction }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: -20 * direction }}
            transition={{ duration: 0.22, ease }}>
            
            <blockquote className="mt-5 text-lg font-semibold leading-relaxed">“{current.quote}”</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              {current.photo ?
              <img src={current.photo} alt="" className="h-12 w-12 rounded-full object-cover" /> :

              <span className="grid h-12 w-12 place-items-center rounded-full bg-pink text-sm font-extrabold text-night">
                  {initials(current.name)}
                </span>
              }
              <span>
                <span className="block font-bold uppercase tracking-wide">{current.name}</span>
                <span className="block text-sm text-white/75">{current.role}</span>
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      {items.length > 1 &&
      <div className="mt-6 flex items-center justify-between">
          <p className="text-sm font-semibold text-white/75">
            {safeIndex + 1} / {items.length}
          </p>
          <div className="flex gap-2">
            <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Testimoni sebelumnya"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/25 transition-colors duration-150 ease-out hover:bg-white/10">
            
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
            type="button"
            onClick={() => go(1)}
            aria-label="Testimoni berikutnya"
            className="grid h-11 w-11 place-items-center rounded-full bg-lemon text-night">
            
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      }
    </div>);

}

function initials(name: string) {
  return name.
  split(/\s+/).
  slice(0, 2).
  map((w) => w[0]?.toUpperCase() ?? '').
  join('');
}