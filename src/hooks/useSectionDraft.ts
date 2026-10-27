import { useCallback, useEffect, useState } from 'react';
import { usePortfolio } from '../contexts/PortfolioContext';
import type { PortfolioData } from '../types/portfolio';

/** Salinan kerja satu bagian data portofolio untuk diedit sebelum disimpan. */
export function useSectionDraft<K extends keyof PortfolioData>(key: K) {
  const { data, update } = usePortfolio();
  const saved = data[key];
  const [draft, setDraft] = useState<PortfolioData[K]>(saved);

  useEffect(() => {
    setDraft(saved);
  }, [saved]);

  const dirty = JSON.stringify(draft) !== JSON.stringify(saved);
  const commit = useCallback(() => update(key, draft), [update, key, draft]);
  const discard = useCallback(() => setDraft(saved), [saved]);

  return { draft, setDraft, dirty, commit, discard };
}