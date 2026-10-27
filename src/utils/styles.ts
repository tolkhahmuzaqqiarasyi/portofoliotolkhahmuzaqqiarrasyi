import type { Accent, RoleTag } from '../types/portfolio';

export const ease = [0.23, 1, 0.32, 1] as const;

const btnBase =
'inline-flex min-h-[48px] items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-[15px] font-bold transition-[transform,background-color,color,border-color,box-shadow] duration-150 ease-out active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60';

export const btnPrimary = `${btnBase} bg-primary text-white shadow-lift hover:-translate-y-0.5`;
export const btnSecondary = `${btnBase} border border-line bg-surface text-ink hover:border-primary/60 hover:text-primary-ink`;
export const btnPink = `${btnBase} bg-pink text-night hover:-translate-y-0.5`;
export const btnGhostDark = `${btnBase} border border-white/25 text-white hover:bg-white/10`;

export const stageFill: Record<Accent, string> = {
  lemon: 'bg-lemon text-night',
  pink: 'bg-pink text-night',
  primary: 'bg-primary text-white',
  violet: 'bg-violet-deep text-white'
};

/** Warna kartu studi kasus — semua lolos kontras AA dengan teksnya. */
export const cardFill: Record<Accent, {card: string;onDark: boolean;}> = {
  lemon: { card: 'bg-lemon text-night', onDark: false },
  pink: { card: 'bg-pink text-night', onDark: false },
  primary: { card: 'bg-primary text-white', onDark: true },
  violet: { card: 'bg-lavender text-night', onDark: false }
};

export const roleBadge: Record<RoleTag, string> = {
  'UI/UX': 'bg-pink/15 ring-pink/50',
  PM: 'bg-lemon/30 ring-lemon/80',
  Frontend: 'bg-primary/10 ring-primary/40',
  Marketing: 'bg-violet/15 ring-violet/50'
};

export const roleLabel: Record<RoleTag, string> = {
  'UI/UX': 'UI/UX',
  PM: 'Project Lead',
  Frontend: 'Frontend',
  Marketing: 'Digital Marketing'
};