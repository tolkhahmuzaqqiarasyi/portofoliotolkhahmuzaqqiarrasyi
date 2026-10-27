import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AtSignIcon, BriefcaseIcon, ExternalLinkIcon, FolderKanbanIcon, HashIcon, LogOutIcon, QuoteIcon, SettingsIcon, UserIcon, WorkflowIcon, BoxIcon } from "lucide-react";
import { ProfileEditor } from "./editors/ProfileEditor";
import { StatsEditor } from "./editors/StatsEditor";
import { ProjectsEditor } from "./editors/ProjectsEditor";
import { ServicesEditor } from "./editors/ServicesEditor";
import { FlowEditor } from "./editors/FlowEditor";
import { TestimonialsEditor } from "./editors/TestimonialsEditor";
import { ContactEditor } from "./editors/ContactEditor";
import { SettingsEditor } from "./editors/SettingsEditor";
import { ADMIN_EMAIL, useAuth } from "../../contexts/AuthContext";
type TabId = 'profile' | 'projects' | 'stats' | 'services' | 'flow' | 'testimonials' | 'contact' | 'settings';
const tabs: {
  id: TabId;
  label: string;
  icon: BoxIcon;
}[] = [{
  id: 'profile',
  label: 'Profil & Hero',
  icon: UserIcon
}, {
  id: 'projects',
  label: 'Project',
  icon: FolderKanbanIcon
}, {
  id: 'stats',
  label: 'Angka ringkas',
  icon: HashIcon
}, {
  id: 'services',
  label: 'Layanan',
  icon: BriefcaseIcon
}, {
  id: 'flow',
  label: 'Alur & cara kerja',
  icon: WorkflowIcon
}, {
  id: 'testimonials',
  label: 'Testimoni',
  icon: QuoteIcon
}, {
  id: 'contact',
  label: 'Kontak & sosial',
  icon: AtSignIcon
}, {
  id: 'settings',
  label: 'Pengaturan',
  icon: SettingsIcon
}];
const editors: Record<TabId, React.ComponentType> = {
  profile: ProfileEditor,
  projects: ProjectsEditor,
  stats: StatsEditor,
  services: ServicesEditor,
  flow: FlowEditor,
  testimonials: TestimonialsEditor,
  contact: ContactEditor,
  settings: SettingsEditor
};
export function AdminDashboard() {
  const {
    logout
  } = useAuth();
  const [tab, setTab] = useState<TabId>('profile');
  const Editor = editors[tab];
  return <div className="min-h-screen w-full bg-bg font-sans text-ink lg:flex">
      <aside className="bg-band text-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-72 lg:shrink-0 lg:flex-col">
        <div className="flex items-center justify-between gap-3 px-5 py-4 lg:block lg:px-6 lg:py-7">
          <div>
            <p className="text-lg font-extrabold">Dashboard Admin</p>
            <p className="truncate text-xs text-white/75">{ADMIN_EMAIL}</p>
          </div>
          <button type="button" onClick={logout} className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/20 px-4 text-sm font-semibold lg:hidden">
            <LogOutIcon className="h-4 w-4" aria-hidden /> Keluar
          </button>
        </div>
        <nav aria-label="Menu admin" className="overflow-x-auto px-3 pb-3 lg:flex-1 lg:overflow-visible lg:pb-0">
          <ul className="flex gap-1 lg:flex-col">
            {tabs.map((t) => {
            const Icon = t.icon;
            const active = t.id === tab;
            return <li key={t.id} className="shrink-0">
                  <button type="button" onClick={() => {
                setTab(t.id);
                window.scrollTo({
                  top: 0
                });
              }} aria-current={active ? 'page' : undefined} className={`flex min-h-[44px] w-full items-center gap-3 whitespace-nowrap rounded-xl px-3.5 text-sm font-semibold transition-colors duration-150 ease-out ${active ? 'bg-white text-night' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}>
                    <Icon className="h-4 w-4" aria-hidden /> {t.label}
                  </button>
                </li>;
          })}
          </ul>
        </nav>
        <div className="hidden space-y-1 border-t border-white/10 p-3 lg:block">
          <Link to="/" target="_blank" className="flex min-h-[44px] items-center gap-3 rounded-xl px-3.5 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white">
            <ExternalLinkIcon className="h-4 w-4" aria-hidden /> Lihat website
          </Link>
          <button type="button" onClick={logout} className="flex min-h-[44px] w-full items-center gap-3 rounded-xl px-3.5 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white">
            <LogOutIcon className="h-4 w-4" aria-hidden /> Keluar
          </button>
        </div>
      </aside>

      <main className="min-w-0 flex-1 px-5 pt-8 md:px-8 lg:pt-12">
        <div className="mx-auto max-w-4xl pb-6">
          <Editor key={tab} />
        </div>
      </main>
    </div>;
}