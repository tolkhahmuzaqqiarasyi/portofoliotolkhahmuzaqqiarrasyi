import React from 'react';
import { ArrowUpRightIcon, ClockIcon, DownloadIcon, MapPinIcon, SparklesIcon } from 'lucide-react';
import { TestimonialCarousel } from './TestimonialCarousel';
import { Reveal } from '../Reveal';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { iconMap } from '../../utils/icons';
import { btnPink } from '../../utils/styles';
import { downloadCv } from '../../utils/download';

export function ClosingBand() {
  const { data } = usePortfolio();
  const { profile, socials } = data;
  const whatsapp = socials.find((s) => s.icon === 'whatsapp');
  const others = socials.filter((s) => s !== whatsapp);

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-band text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-8 md:py-24 lg:grid-cols-12 lg:items-center lg:gap-10">
        <Reveal className="lg:col-span-3">
          <h2 id="contact-title" className="font-script text-6xl font-bold leading-[0.95] md:text-7xl">
            Ayo wujudkan sesuatu yang
            <span className="relative mt-1 block text-pink">
              luar biasa!
              <SparklesIcon className="absolute -right-1 -top-2 h-7 w-7 text-lemon" aria-hidden />
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.06} className="lg:col-span-5">
          <TestimonialCarousel />
        </Reveal>

        <Reveal delay={0.12} className="lg:col-span-4">
          <p className="text-sm font-bold uppercase tracking-wide text-white/85">Siap membangun produk Anda?</p>
          {whatsapp &&
          <a href={whatsapp.href} target="_blank" rel="noopener noreferrer" className={`${btnPink} mt-4 w-full sm:w-auto`}>
              Chat via WhatsApp <ArrowUpRightIcon className="h-4 w-4" aria-hidden />
            </a>
          }
          <p className="mt-5 flex items-start gap-2.5 text-sm text-white/85">
            <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-lemon" aria-hidden /> {profile.responsePromise}
          </p>

          <ul className="mt-6 space-y-1">
            {others.map((s) => {
              const Icon = iconMap[s.icon];
              const external = s.href.startsWith('http');
              return (
                <li key={s.id}>
                  <a
                    href={s.href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="group flex min-h-[44px] items-center gap-3 rounded-xl text-sm transition-colors duration-150 ease-out hover:text-lemon">
                    
                    <Icon className="h-4 w-4 shrink-0" aria-hidden />
                    <span className="font-semibold">{s.label}</span>
                    <span className="truncate text-white/75">{s.handle}</span>
                  </a>
                </li>);

            })}
            <li className="flex min-h-[44px] items-center gap-3 text-sm">
              <MapPinIcon className="h-4 w-4 shrink-0" aria-hidden />
              <span className="font-semibold">Berbasis di</span>
              <span className="text-white/75">{profile.location}</span>
            </li>
          </ul>

          <button
            type="button"
            onClick={() => downloadCv(profile.cvUrl, profile.name)}
            className="mt-6 inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/25 px-6 text-sm font-bold transition-colors duration-150 ease-out hover:bg-white/10">
            
            <DownloadIcon className="h-4 w-4" aria-hidden /> Download CV
          </button>
        </Reveal>
      </div>
    </section>);

}