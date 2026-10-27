import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import {
  defaultProfile,
  defaultServices,
  defaultSocials,
  defaultStages,
  defaultStats,
  defaultTestimonials,
  defaultWorkSteps } from
'../data/content';
import { defaultProjects } from '../data/projects';
import type { PortfolioData } from '../types/portfolio';

const STORAGE_KEY = 'tolkhah-portfolio-v2';

export const defaultPortfolio: PortfolioData = {
  profile: defaultProfile,
  stats: defaultStats,
  stages: defaultStages,
  services: defaultServices,
  workSteps: defaultWorkSteps,
  testimonials: defaultTestimonials,
  socials: defaultSocials,
  projects: defaultProjects
};

interface PortfolioContextValue {
  data: PortfolioData;
  /** Menyimpan satu bagian data. Mengembalikan false bila penyimpanan browser penuh. */
  update: <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => boolean;
  replaceAll: (data: PortfolioData) => boolean;
  reset: () => void;
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function PortfolioProvider({ children }: {children: React.ReactNode;}) {
  const [data, setData] = useState<PortfolioData>(load);
  const ref = useRef(data);

  const persist = useCallback((next: PortfolioData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      ref.current = next;
      setData(next);
      return true;
    } catch {
      return false;
    }
  }, []);

  const update = useCallback(
    <K extends keyof PortfolioData,>(key: K, value: PortfolioData[K]) => persist({ ...ref.current, [key]: value }),
    [persist]
  );

  const replaceAll = useCallback((next: PortfolioData) => persist({ ...defaultPortfolio, ...next }), [persist]);

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    ref.current = defaultPortfolio;
    setData(defaultPortfolio);
  }, []);

  return (
    <PortfolioContext.Provider value={{ data, update, replaceAll, reset }}>{children}</PortfolioContext.Provider>);

}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio harus dipakai di dalam PortfolioProvider');
  return ctx;
}

function load(): PortfolioData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPortfolio;
    return { ...defaultPortfolio, ...(JSON.parse(raw) as Partial<PortfolioData>) };
  } catch {
    return defaultPortfolio;
  }
}