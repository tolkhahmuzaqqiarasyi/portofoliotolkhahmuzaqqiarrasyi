import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowUpRightIcon, BadgeCheckIcon, DownloadIcon, SparkleIcon } from 'lucide-react';
import { HeroPhoto } from './HeroPhoto';
import { SocialRail } from './SocialRail';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { btnPink, ease } from '../../utils/styles';
import { downloadCv } from '../../utils/download';

const pill =
'inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-white/15 px-4 text-sm font-semibold text-white transition-colors duration-150 ease-out hover:bg-white/10';

export function Hero() {
  const reduce = useReducedMotion();
  const { data } = usePortfolio();
  const { profile } = data;
  const [mainRole, ...otherRoles] = profile.roles;

  const container: Variants = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.06 } } };
  const item: Variants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3, ease } }
  };

  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden bg-band text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-10 md:px-8 md:pt-14 lg:grid-cols-12 lg:gap-8 lg:pb-24 xl:pr-24">
        <motion.div variants={container} initial="hidden" animate="show" className="lg:col-span-7">
          {profile.availability &&
          <motion.p
            variants={item}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold">
            
              <span className="relative flex h-2.5 w-2.5">
                <span className="pulse-ring absolute inset-0 rounded-full bg-[#4ADE80]" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-[#4ADE80]" />
              </span>
              {profile.availabilityText}
            </motion.p>
          }

          <motion.p variants={item} className="mt-7 flex items-center gap-2 text-lg font-bold md:text-xl">
            <SparkleIcon className="h-5 w-5 text-lemon" aria-hidden /> {profile.name}
          </motion.p>

          <motion.h1 id="hero-title" variants={item} className="mt-4">
            <span className="block whitespace-pre-line text-[42px] font-extrabold uppercase leading-[0.98] tracking-[-0.02em] sm:text-6xl lg:text-[60px] xl:text-[68px]">
              {profile.headline}
            </span>
            <span className="relative mt-1 inline-block font-script text-[58px] font-bold leading-[1] text-pink sm:text-7xl lg:text-[88px]">
              {profile.headlineAccent}
              <svg aria-hidden viewBox="0 0 300 20" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-4 w-full text-violet">
                <path d="M2 14 C 60 4, 120 18, 180 9 S 270 6, 298 12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>

          <motion.p variants={item} className="mt-8 flex flex-wrap items-center gap-x-2.5 gap-y-2 text-base md:text-lg">
            {mainRole && <span className="rounded-lg bg-pink px-2.5 py-1 font-extrabold text-night">{mainRole}</span>}
            {otherRoles.map((r) =>
            <React.Fragment key={r}>
                <span aria-hidden className="text-white/50">·</span>
                <span className="font-semibold text-white/85">{r}</span>
              </React.Fragment>
            )}
          </motion.p>

          <motion.p variants={item} className="mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            {profile.valueProp}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a href="#work" className={btnPink}>
              Lihat Karya <ArrowUpRightIcon className="h-4 w-4" aria-hidden />
            </a>
            <a href="#contact" className="group relative inline-flex min-h-[48px] items-center font-bold">
              Hubungi Saya
              <span className="absolute bottom-2 left-0 h-0.5 w-full origin-left bg-lemon transition-transform duration-200 ease-out group-hover:scale-x-110" />
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-10 grid gap-5 border-t border-white/10 pt-7 sm:grid-cols-2">
            <div>
              <p className="text-sm font-bold text-white/70">Untuk Rekrutmen</p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                <button type="button" onClick={() => downloadCv(profile.cvUrl, profile.name)} className={pill}>
                  <DownloadIcon className="h-4 w-4" aria-hidden /> CV
                </button>
                {data.projects[0] &&
                <Link to={`/project/${data.projects[0].slug}`} className={pill}>
                    <BadgeCheckIcon className="h-4 w-4" aria-hidden /> Case study
                  </Link>
                }
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-white/70">Untuk Proyek</p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                <a href="#about" className={pill}>
                  Services
                </a>
                <a href="#contact" className={pill}>
                  Kontak
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="lg:col-span-5">
          <HeroPhoto />
        </div>
      </div>
      <SocialRail />
    </section>);

}