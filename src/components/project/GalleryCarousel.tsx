import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, ImageOffIcon, MoveHorizontalIcon } from 'lucide-react';
import { ease } from '../../utils/styles';
import type { GalleryImage } from '../../types/portfolio';

export function GalleryCarousel({ images, title }: {images: GalleryImage[];title: string;}) {
  const reduce = useReducedMotion();
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);

  if (images.length === 0) {
    return (
      <div className="grid aspect-[16/10] place-items-center rounded-3xl border border-dashed border-line text-muted">
        <span className="flex items-center gap-2">
          <ImageOffIcon className="h-5 w-5" aria-hidden /> Belum ada gambar UI. Tambahkan lewat Dashboard Admin.
        </span>
      </div>);

  }

  const current = images[index % images.length];
  const go = (step: number) => setState(([i]) => [(i + step + images.length) % images.length, step]);
  const goTo = (i: number) => setState(([prev]) => [i, i > prev ? 1 : -1]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60 || info.velocity.x < -400) go(1);else
    if (info.offset.x > 60 || info.velocity.x > 400) go(-1);
  };

  const offset = reduce ? 0 : 60;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={`Galeri UI ${title}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1);
        if (e.key === 'ArrowLeft') go(-1);
      }}
      className="rounded-3xl">
      
      <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-surface-2">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={current.id}
            src={current.src}
            alt={`${current.title} — ${title}`}
            draggable={false}
            custom={direction}
            initial={{ opacity: 0, x: direction >= 0 ? offset : -offset }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction >= 0 ? -offset : offset }}
            transition={{ duration: 0.25, ease }}
            drag={images.length > 1 ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.5}
            onDragEnd={onDragEnd}
            className="absolute inset-0 h-full w-full cursor-grab select-none object-cover active:cursor-grabbing" />
          
        </AnimatePresence>

        {images.length > 1 &&
        <>
            <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Gambar sebelumnya"
            className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-night shadow-soft transition-transform duration-150 ease-out hover:scale-105">
            
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
            type="button"
            onClick={() => go(1)}
            aria-label="Gambar berikutnya"
            className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-night shadow-soft transition-transform duration-150 ease-out hover:scale-105">
            
              <ChevronRightIcon className="h-5 w-5" />
            </button>
            <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-night/80 px-3 py-1.5 text-xs font-semibold text-white">
              <MoveHorizontalIcon className="h-3.5 w-3.5" aria-hidden /> Geser · {index % images.length + 1} / {images.length}
            </span>
          </>
        }
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-start">
        <div aria-live="polite" className="lg:col-span-7">
          <h3 className="text-2xl font-extrabold tracking-tight text-ink">{current.title}</h3>
          <p className="mt-2 max-w-2xl leading-relaxed text-muted">{current.caption}</p>
        </div>
        {images.length > 1 &&
        <ul className="flex gap-2 overflow-x-auto pb-1 lg:col-span-5 lg:justify-end">
            {images.map((img, i) => {
            const active = i === index % images.length;
            return (
              <li key={img.id} className="shrink-0">
                  <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Tampilkan ${img.title}`}
                  aria-current={active}
                  className={`block overflow-hidden rounded-xl ring-2 ring-offset-2 ring-offset-bg transition-[box-shadow,opacity] duration-150 ease-out ${
                  active ? 'ring-primary' : 'opacity-70 ring-transparent hover:opacity-100'}`
                  }>
                  
                    <img src={img.src} alt="" className="aspect-[16/10] w-24 object-cover" />
                  </button>
                </li>);

          })}
          </ul>
        }
      </div>
    </div>);

}