import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpIcon, LockIcon } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';

export function Footer() {
  const { data } = usePortfolio();
  return (
    <footer className="border-t border-white/10 bg-band text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-8">
        <p className="text-2xl font-extrabold tracking-tight">
          {data.profile.shortName.toLowerCase()}
          <span className="text-pink">.</span>
        </p>
        <p className="text-sm text-white/75">
          © {new Date().getFullYear()} {data.profile.name}. Hak cipta dilindungi.
        </p>
        <div className="flex items-center gap-2">
          <Link
            to="/admin"
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-white/75 transition-colors duration-150 ease-out hover:text-white">
            
            <LockIcon className="h-3.5 w-3.5" aria-hidden /> Admin
          </Link>
          <a
            href="#top"
            onClick={() => window.scrollTo({ top: 0 })}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/20 px-4 text-sm font-semibold transition-colors duration-150 ease-out hover:bg-white/10">
            
            Ke atas <ArrowUpIcon className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </div>
    </footer>);

}