import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/home/Hero';
import { AboutServices } from '../components/home/AboutServices';
import { ResultsStrip } from '../components/home/ResultsStrip';
import { StageFlow } from '../components/StageFlow';
import { CaseStudies } from '../components/home/CaseStudies';
import { ProcessStepper } from '../components/ProcessStepper';
import { ClosingBand } from '../components/home/ClosingBand';
import { Footer } from '../components/Footer';
import type { NavLink, RoleFilter } from '../types/portfolio';

export function Home() {
  const { hash } = useLocation();
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('Semua');

  // Saat datang dari halaman lain dengan tautan seperti "/#work", gulir ke section-nya.
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) window.setTimeout(() => el.scrollIntoView({ block: 'start' }), 50);
  }, [hash]);

  const handleNavigate = useCallback((link: NavLink) => {
    if (link.filter) setRoleFilter(link.filter);
  }, []);

  return (
    <div className="min-h-screen w-full bg-bg font-sans text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:font-semibold focus:text-white">
        
        Lewati ke konten
      </a>
      <Navbar onNavigate={handleNavigate} />
      <main id="main">
        <Hero />
        <AboutServices />
        <ResultsStrip />
        <StageFlow onSelect={setRoleFilter} />
        <CaseStudies filter={roleFilter} onFilterChange={setRoleFilter} />
        <ProcessStepper />
        <ClosingBand />
      </main>
      <Footer />
    </div>);

}