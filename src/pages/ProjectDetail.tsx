import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon, BadgeCheckIcon } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { GalleryCarousel } from '../components/project/GalleryCarousel';
import { ProcessTimeline } from '../components/project/ProcessTimeline';
import { NotFound } from './NotFound';
import { usePortfolio } from '../contexts/PortfolioContext';
import { cardFill, roleBadge, roleLabel } from '../utils/styles';

export function ProjectDetail() {
  const { slug } = useParams();
  const { data } = usePortfolio();
  const index = data.projects.findIndex((p) => p.slug === slug);
  const project = data.projects[index];

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (!project) return <NotFound />;

  const next = data.projects.length > 1 ? data.projects[(index + 1) % data.projects.length] : null;
  const meta = [
  { label: 'Peran saya', value: project.myRole },
  { label: 'Tim', value: project.team },
  { label: 'Durasi', value: project.duration },
  { label: 'Tools', value: project.tools.join(', ') }];


  return (
    <div className="min-h-screen w-full bg-bg font-sans text-ink">
      <Navbar />
      <main>
        <section aria-labelledby="project-title" className="bg-band text-white">
          <div className="mx-auto max-w-7xl px-5 pb-16 pt-8 md:px-8 md:pb-20">
            <Link to="/#work" className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-white/80 hover:text-white">
              <ArrowLeftIcon className="h-4 w-4" aria-hidden /> Semua project
            </Link>
            <div className="mt-6 grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="flex flex-wrap gap-2">
                  {project.roles.map((r) =>
                  <span key={r} className={`rounded-full px-3 py-1 text-xs font-bold text-white ring-1 ${roleBadge[r]}`}>
                      {roleLabel[r]}
                    </span>
                  )}
                  {project.isSample &&
                  <span className="rounded-full border border-dashed border-white/40 px-3 py-1 text-xs font-semibold">Contoh</span>
                  }
                </div>
                <h1 id="project-title" className="mt-5 text-5xl font-extrabold uppercase leading-[0.95] tracking-tight md:text-7xl">
                  {project.title}
                </h1>
                <p className="mt-3 font-script text-3xl font-bold text-pink md:text-4xl">{project.category}</p>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">{project.summary}</p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <span className="inline-flex items-center gap-2 font-bold text-lemon">
                    <BadgeCheckIcon className="h-5 w-5" aria-hidden /> {project.proof}
                  </span>
                  {project.liveUrl &&
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-pink px-6 font-bold text-night">
                    
                      Buka project <ArrowUpRightIcon className="h-4 w-4" aria-hidden />
                    </a>
                  }
                </div>
              </div>
              <dl className="grid grid-cols-2 gap-px self-end overflow-hidden rounded-3xl bg-white/10 lg:col-span-5">
                {meta.map((m) =>
                <div key={m.label} className="bg-band p-5">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-white/70">{m.label}</dt>
                    <dd className="mt-1.5 font-bold">{m.value || '—'}</dd>
                  </div>
                )}
                <div className="col-span-2 bg-band p-5">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-white/70">Hasil</dt>
                  <dd className={`mt-1.5 ${project.resultIsPlaceholder ? 'italic text-white/75' : 'font-bold text-lemon'}`}>
                    {project.result}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section aria-labelledby="gallery-title" className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <h2 id="gallery-title" className="mb-8 text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
            Hasil UI <span className="font-script text-5xl font-bold normal-case text-primary-ink">({project.gallery.length} layar)</span>
          </h2>
          <GalleryCarousel images={project.gallery} title={project.title} />
        </section>

        <section aria-labelledby="process-title" className="bg-surface-2/60">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <h2 id="process-title" className="text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
                  Proses pengerjaan
                </h2>
                <p className="mt-3 text-muted">{project.process.length} tahap dari awal sampai akhir.</p>
                <ol className="mt-6 hidden space-y-1 lg:block">
                  {project.process.map((s, i) =>
                  <li key={s.id}>
                      <a
                      href={`#tahap-${i + 1}`}
                      className="flex min-h-[40px] items-center gap-3 rounded-xl px-3 text-sm font-semibold text-muted transition-colors duration-150 ease-out hover:bg-surface hover:text-ink">
                      
                        <span className="w-5 text-right tabular-nums">{i + 1}</span> {s.title}
                      </a>
                    </li>
                  )}
                </ol>
              </div>
            </div>
            <div className="lg:col-span-8">
              <ProcessTimeline steps={project.process} />
            </div>
          </div>
        </section>

        {next &&
        <section aria-label="Project berikutnya" className="mx-auto max-w-7xl px-5 py-16 md:px-8">
            <Link
            to={`/project/${next.slug}`}
            className={`group flex flex-col gap-6 rounded-3xl p-6 transition-transform duration-200 ease-out hover:-translate-y-1 md:flex-row md:items-center md:p-8 ${cardFill[next.color].card}`}>
            
              <img src={next.cover} alt="" className="aspect-[16/10] w-full rounded-2xl object-cover md:w-64" />
              <div className="flex-1">
                <p className="text-sm font-bold uppercase tracking-wide">Project berikutnya</p>
                <p className="mt-1 text-3xl font-extrabold uppercase tracking-tight">{next.title}</p>
                <p className="mt-1 text-sm">{next.category}</p>
              </div>
              <span className={`grid h-14 w-14 place-items-center rounded-full ${cardFill[next.color].onDark ? 'bg-white text-night' : 'bg-night text-white'}`}>
                <ArrowRightIcon className="h-5 w-5 transition-transform duration-150 ease-out group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          </section>
        }
      </main>
      <Footer />
    </div>);

}