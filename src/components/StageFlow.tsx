import React from "react";
import { ArrowDownIcon, ArrowRightIcon, ClipboardListIcon, Code2Icon, PenToolIcon, TrendingUpIcon, BoxIcon } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { usePortfolio } from "../contexts/PortfolioContext";
import { stageFill } from "../utils/styles";
import { Accent, RoleFilter } from "../types/portfolio";
const accentIcon: Record<Accent, BoxIcon> = {
  lemon: ClipboardListIcon,
  pink: PenToolIcon,
  primary: Code2Icon,
  violet: TrendingUpIcon
};
interface StageFlowProps {
  onSelect: (filter: RoleFilter) => void;
}
export function StageFlow({
  onSelect
}: StageFlowProps) {
  const {
    data
  } = usePortfolio();
  const stages = data.stages;
  return <section id="flow" aria-labelledby="flow-title" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <SectionHeading id="flow-title" title={<>
            PLAN, DESIGN, BUILD, <span className="font-script text-6xl font-bold normal-case text-pink md:text-7xl">grow.</span>
          </>} description="Empat tahap yang saya pegang dalam satu produk. Tiap tahap punya peran dan bukti kerjanya sendiri." />

      <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stages.map((stage, i) => {
        const Icon = accentIcon[stage.accent];
        const isLast = i === stages.length - 1;
        const onDark = stage.accent === 'primary' || stage.accent === 'violet';
        return <li key={stage.id} className="relative">
              <Reveal delay={i * 0.08} className="h-full">
                <article className={`flex h-full flex-col rounded-3xl p-7 ${stageFill[stage.accent]}`}>
                  <div className="flex items-center justify-between">
                    <span className={`grid h-14 w-14 place-items-center rounded-2xl ${onDark ? 'bg-white/15' : 'bg-night/10'}`}>
                      <Icon className="h-7 w-7" aria-hidden />
                    </span>
                    <span className={`text-sm font-bold ${onDark ? 'text-white/85' : 'text-night/75'}`}>Tahap {i + 1}</span>
                  </div>
                  <h3 className="mt-8 text-4xl font-extrabold tracking-tight">{stage.name}</h3>
                  <p className="mt-2 font-semibold">{stage.role}</p>
                  <p className={`mt-6 text-sm font-semibold ${onDark ? 'text-white/85' : 'text-night/75'}`}>Bukti yang ditampilkan</p>
                  <ul className="mt-2.5 flex flex-wrap gap-1.5">
                    {stage.proofs.map((p) => <li key={p} className={`rounded-full px-3 py-1 text-sm font-medium ${onDark ? 'bg-white/15' : 'bg-white/55'}`}>
                        {p}
                      </li>)}
                  </ul>
                  <a href="#work" onClick={() => onSelect(stage.filter)} className="group mt-auto inline-flex min-h-[44px] items-center gap-2 pt-8 text-[15px] font-bold underline-offset-4 hover:underline">
                    Lihat project terkait
                    <ArrowRightIcon className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-1" aria-hidden />
                  </a>
                </article>
              </Reveal>
              {!isLast && <>
                  <span aria-hidden className="absolute -right-7 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-line bg-bg text-ink lg:grid">
                    <ArrowRightIcon className="h-4 w-4" />
                  </span>
                  <span aria-hidden className="mx-auto -mb-3 mt-3 grid h-8 w-8 place-items-center text-muted md:hidden">
                    <ArrowDownIcon className="h-5 w-5" />
                  </span>
                </>}
            </li>;
      })}
      </ol>
    </section>;
}