import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRightIcon, PenToolIcon } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { ease } from '../../utils/styles';

export function HeroPhoto() {
  const reduce = useReducedMotion();
  const { data } = usePortfolio();
  const { profile } = data;
  const featured = data.projects[0];
  const float = (duration: number) =>
  reduce ? {} : { animate: { y: [0, -10, 0] }, transition: { duration, repeat: Infinity, ease: 'easeInOut' as const } };

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease, delay: 0.2 }}
      className="relative mx-auto w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px]">
      
      {/* Blob latar */}
      <svg aria-hidden viewBox="0 0 400 440" className="absolute -inset-x-8 -top-6 h-[110%] w-[calc(100%+4rem)] text-primary">
        <path
          fill="currentColor"
          d="M210 12c62-6 128 24 160 82 34 60 26 128 6 190-20 64-70 120-140 140-72 22-150 2-196-56C-6 312-8 238 14 176 36 112 80 60 130 32c24-12 52-18 80-20Z" />
        
      </svg>

      <div className="relative overflow-hidden rounded-b-[32px] rounded-t-[999px] border-4 border-band bg-lavender">
        <img
          src={profile.photo}
          alt={`Foto ${profile.name}`}
          className="aspect-[4/5] w-full object-cover"
          width={420}
          height={525} />
        
      </div>

      {/* Kartu mengambang */}
      <motion.div {...float(6)} className="absolute -right-2 top-10 sm:-right-10">
        <div className="rounded-2xl bg-white p-4 text-night shadow-lift">
          <p className="text-xs font-semibold text-[#545474]">Peran utama</p>
          <p className="mt-1 flex items-center gap-2 text-base font-extrabold">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-pink">
              <PenToolIcon className="h-3.5 w-3.5" aria-hidden />
            </span>
            {profile.roles[0]}
          </p>
        </div>
      </motion.div>

      {featured &&
      <motion.div {...float(7.5)} className="absolute -bottom-6 -left-2 sm:-left-12">
          <Link
          to={`/project/${featured.slug}`}
          className="group block rounded-2xl bg-white p-4 text-night shadow-lift transition-transform duration-150 ease-out hover:-translate-y-0.5">
          
            <p className="text-xs font-semibold text-[#545474]">Project unggulan</p>
            <p className="mt-1 flex items-center gap-2 text-lg font-extrabold">
              {featured.title}
              <span className="grid h-7 w-7 place-items-center rounded-full bg-lemon transition-transform duration-150 ease-out group-hover:rotate-45">
                <ArrowUpRightIcon className="h-4 w-4" aria-hidden />
              </span>
            </p>
            <p className="mt-0.5 text-xs font-semibold text-primary">{featured.proof}</p>
          </Link>
        </motion.div>
      }
    </motion.div>);

}