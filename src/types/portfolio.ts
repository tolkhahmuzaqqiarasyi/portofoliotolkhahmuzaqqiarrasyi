export type RoleTag = 'UI/UX' | 'PM' | 'Frontend' | 'Marketing';
export type RoleFilter = 'Semua' | RoleTag;
export type Accent = 'lemon' | 'pink' | 'primary' | 'violet';

export type IconKey =
'pen-tool' |
'code' |
'calendar' |
'sparkles' |
'layout' |
'pen-line' |
'chart' |
'megaphone' |
'mail' |
'whatsapp' |
'linkedin' |
'instagram' |
'globe';

export interface NavLink {
  label: string;
  href: string;
  filter?: RoleFilter;
}

export interface Profile {
  name: string;
  shortName: string;
  photo: string;
  availability: boolean;
  availabilityText: string;
  /** Baris tebal huruf besar. Gunakan enter untuk pindah baris. */
  headline: string;
  /** Baris aksen tulisan tangan di bawah headline. */
  headlineAccent: string;
  /** Peran pertama ditampilkan paling menonjol. */
  roles: string[];
  valueProp: string;
  aboutBody: string;
  cvUrl: string;
  responsePromise: string;
  location: string;
}

export interface Stat {
  id: string;
  label: string;
  /** null = belum diisi, tampil sebagai placeholder "—" */
  value: number | null;
  suffix: string;
}

export interface Stage {
  id: string;
  name: string;
  role: string;
  proofs: string[];
  accent: Accent;
  filter: RoleTag;
}

export interface Service {
  id: string;
  title: string;
  group: string;
  description: string;
  icon: IconKey;
  price: string;
}

export interface WorkStep {
  id: string;
  name: string;
  description: string;
  output: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  photo: string;
  isSample: boolean;
}

export interface SocialLink {
  id: string;
  label: string;
  handle: string;
  href: string;
  icon: IconKey;
}

export interface ProjectStep {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  tool: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  title: string;
  caption: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  roles: RoleTag[];
  myRole: string;
  team: string;
  duration: string;
  tools: string[];
  result: string;
  resultIsPlaceholder: boolean;
  proof: string;
  liveUrl: string;
  cover: string;
  color: Accent;
  isSample: boolean;
  process: ProjectStep[];
  gallery: GalleryImage[];
}

export interface PortfolioData {
  profile: Profile;
  stats: Stat[];
  stages: Stage[];
  services: Service[];
  workSteps: WorkStep[];
  testimonials: Testimonial[];
  socials: SocialLink[];
  projects: Project[];
}