import React from "react";
import { CalendarClockIcon, FolderKanbanIcon, UsersIcon, BoxIcon } from "lucide-react";
import { CountUp } from "../CountUp";
import { Reveal } from "../Reveal";
import { usePortfolio } from "../../contexts/PortfolioContext";
const icons: BoxIcon[] = [FolderKanbanIcon, CalendarClockIcon, UsersIcon];
export function ResultsStrip() {
  const {
    data
  } = usePortfolio();
  return <section aria-labelledby="results-title" className="bg-band text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 md:px-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <h2 id="results-title" className="text-3xl font-extrabold uppercase leading-tight tracking-tight">
            Bukti kerja,
            <span className="block font-script text-5xl font-bold normal-case text-lemon">bukan klaim.</span>
          </h2>
        </Reveal>
        <ul className="grid gap-8 sm:grid-cols-3 lg:col-span-8">
          {data.stats.map((s, i) => {
          const Icon = icons[i % icons.length];
          return <li key={s.id} className="sm:border-l sm:border-white/15 sm:pl-6">
                <Reveal delay={i * 0.06}>
                  <Icon className="h-6 w-6 text-pink" aria-hidden />
                  <p className="mt-4 text-5xl font-extrabold text-lemon">
                    <CountUp value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-sm font-bold uppercase tracking-wide">{s.label}</p>
                  {s.value === null && <p className="mt-2 inline-flex rounded-full border border-dashed border-white/40 px-2.5 py-0.5 text-xs text-white/80">
                      Isi dari dashboard admin
                    </p>}
                </Reveal>
              </li>;
        })}
        </ul>
      </div>
    </section>;
}