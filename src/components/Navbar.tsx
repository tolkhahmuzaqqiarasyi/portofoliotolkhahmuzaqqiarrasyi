import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MenuIcon, MoonIcon, SunIcon, XIcon } from 'lucide-react';
import { navLinks } from '../data/content';
import { usePortfolio } from '../contexts/PortfolioContext';
import { useTheme } from '../contexts/ThemeContext';
import { ease } from '../utils/styles';
import type { NavLink } from '../types/portfolio';

interface NavbarProps {
  onNavigate?: (link: NavLink) => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { data } = usePortfolio();
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleLink = (link: NavLink) => {
    onNavigate?.(link);
    setOpen(false);
  };

  const isDark = theme === 'dark';

  const renderLink = (link: NavLink, className: string) =>
  isHome ?
  <a href={link.href} onClick={() => handleLink(link)} className={className}>
        {link.label}
      </a> :

  <Link to={`/${link.href}`} onClick={() => handleLink(link)} className={className}>
        {link.label}
      </Link>;


  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-band/90 text-white backdrop-blur-md">
        <nav aria-label="Navigasi utama" className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-5 md:px-8">
          <Link to="/" className="flex min-h-[44px] items-center gap-1 text-2xl font-extrabold tracking-tight">
            {data.profile.shortName.toLowerCase()}
            <span className="text-pink">.</span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) =>
            <li key={link.label}>
                {renderLink(
                link,
                'inline-flex min-h-[44px] items-center rounded-full px-4 text-sm font-semibold text-white/80 transition-colors duration-150 ease-out hover:bg-white/10 hover:text-white'
              )}
              </li>
            )}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-pressed={isDark}
              aria-label={isDark ? 'Aktifkan mode terang' : 'Aktifkan mode malam'}
              className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-full border border-white/20 transition-colors duration-150 ease-out hover:bg-white/10">
              
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ opacity: 0, rotate: -60, scale: 0.96 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 60, scale: 0.96 }}
                  transition={{ duration: 0.18, ease }}>
                  
                  {isDark ? <SunIcon className="h-5 w-5 text-lemon" /> : <MoonIcon className="h-5 w-5" />}
                </motion.span>
              </AnimatePresence>
            </button>

            {renderLink(
              { label: 'Hubungi Saya', href: '#contact' },
              'hidden min-h-[44px] items-center gap-1.5 rounded-full bg-pink px-5 text-sm font-bold text-night transition-transform duration-150 ease-out hover:-translate-y-0.5 sm:inline-flex'
            )}

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Tutup menu' : 'Buka menu'}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/20 lg:hidden">
              
              {open ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Drawer berada di luar header agar posisi fixed tidak terkurung efek blur header */}
      <AnimatePresence>
        {open &&
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease }}
          className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-band px-5 pb-10 pt-4 text-white lg:hidden">
          
            <ul className="flex flex-col">
              {navLinks.map((link) =>
            <li key={link.label} className="border-b border-white/10">
                  {renderLink(link, 'flex min-h-[60px] items-center text-2xl font-bold tracking-tight')}
                </li>
            )}
            </ul>
            <div className="mt-8">
              {renderLink(
              { label: 'Hubungi Saya', href: '#contact' },
              'flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-pink font-bold text-night'
            )}
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </>);

}