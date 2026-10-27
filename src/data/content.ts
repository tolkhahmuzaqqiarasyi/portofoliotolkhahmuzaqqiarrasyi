import type {
  NavLink,
  Profile,
  Service,
  SocialLink,
  Stage,
  Stat,
  Testimonial,
  WorkStep } from
'../types/portfolio';

export const navLinks: NavLink[] = [
{ label: 'About', href: '#about' },
{ label: 'Work', href: '#work' },
{ label: 'Services', href: '#about' },
{ label: 'Process', href: '#process' },
{ label: 'Content', href: '#work', filter: 'Marketing' },
{ label: 'Contact', href: '#contact' }];


// Semua data di bawah ini adalah nilai awal. Ubah lewat Dashboard Admin (/admin).
export const defaultProfile: Profile = {
  name: 'Tolkhah Muzaqqi Arrasyi',
  shortName: 'Tolkhah',
  photo: "/f11553c0-1ed9-4ef7-b93e-1fc048ccb4d4.jpg",
  availability: true,
  availabilityText: 'Terbuka untuk proyek',
  headline: 'Product Builder\ndari ide & desain',
  headlineAccent: 'sampai jadi produk.',
  roles: ['UI/UX Designer', 'Frontend Developer', 'Project Lead', 'Digital Marketing'],
  valueProp:
  'Saya membantu tim dan bisnis mengubah ide menjadi produk digital yang rapi, mudah dipakai, dan siap tumbuh — dari riset sampai rilis di Play Store.',
  aboutBody:
  'Saya product builder yang memegang produk dari awal sampai akhir: menyusun riset dan PRD, merancang antarmuka, membangun frontend, hingga menyiapkan peluncuran dan konten pemasarannya.\n\nHasilnya, lebih sedikit serah-terima, keputusan lebih cepat, dan produk yang konsisten dari desain sampai rilis.',
  cvUrl: '',
  responsePromise: 'Saya membalas setiap pesan dalam 1×24 jam pada hari kerja.',
  location: 'Indonesia'
};

// value: null = belum diisi. Isi angka asli lewat Dashboard Admin agar count-up aktif.
export const defaultStats: Stat[] = [
{ id: 'stat-projects', label: 'Project selesai', value: null, suffix: '+' },
{ id: 'stat-years', label: 'Tahun pengalaman', value: null, suffix: ' th' },
{ id: 'stat-team', label: 'Tim terbesar yang dipimpin', value: null, suffix: ' orang' }];


export const defaultStages: Stage[] = [
{ id: 'stage-plan', name: 'Plan', role: 'Project Lead / Scrum Master', proofs: ['PRD', 'Timeline Trello', 'Backlog'], accent: 'lemon', filter: 'PM' },
{ id: 'stage-design', name: 'Design', role: 'UI/UX Designer', proofs: ['UX research', 'Use case', 'UI design', 'Prototype'], accent: 'pink', filter: 'UI/UX' },
{ id: 'stage-build', name: 'Build', role: 'Frontend Developer', proofs: ['Live demo', 'Desain vs kode'], accent: 'primary', filter: 'Frontend' },
{ id: 'stage-grow', name: 'Grow', role: 'Digital Marketing', proofs: ['Content plan', 'Hasil kampanye'], accent: 'violet', filter: 'Marketing' }];


export const defaultServices: Service[] = [
{ id: 'svc-uiux', title: 'UI/UX Design', group: 'Desain', description: 'Riset, wireframe, hingga prototipe siap uji yang membuat produk mudah dipakai.', icon: 'pen-tool', price: 'Rp —' },
{ id: 'svc-fe', title: 'Frontend Development', group: 'Engineering', description: 'Mengubah desain menjadi antarmuka React yang responsif dan rapi.', icon: 'code', price: 'Rp —' },
{ id: 'svc-pm', title: 'Project Planning', group: 'Manajemen', description: 'PRD, timeline, dan backlog yang jelas dari awal sampai rilis.', icon: 'calendar', price: 'Rp —' },
{ id: 'svc-content', title: 'Content Planning + Desain', group: 'Digital Marketing', description: 'Kalender konten bulanan lengkap dengan desain visual yang konsisten.', icon: 'sparkles', price: 'Rp —' },
{ id: 'svc-landing', title: 'Landing Page + Konten Peluncuran', group: 'Digital Marketing', description: 'Halaman peluncuran dan paket konten agar produk baru langsung terlihat.', icon: 'layout', price: 'Rp —' },
{ id: 'svc-copy', title: 'Copywriting', group: 'Digital Marketing', description: 'Teks antarmuka dan kampanye yang singkat, jelas, dan mendorong aksi.', icon: 'pen-line', price: 'Rp —' },
{ id: 'svc-analytics', title: 'Analytics & Reporting', group: 'Digital Marketing', description: 'Laporan performa berkala dengan rekomendasi langkah berikutnya.', icon: 'chart', price: 'Rp —' }];


export const defaultWorkSteps: WorkStep[] = [
{ id: 'ws-discuss', name: 'Discuss', description: 'Kita samakan tujuan, pengguna, dan batasan proyek.', output: 'Brief proyek' },
{ id: 'ws-plan', name: 'Plan', description: 'Saya susun PRD, timeline, dan prioritas backlog.', output: 'PRD & timeline' },
{ id: 'ws-design', name: 'Design', description: 'Alur dan tampilan dirancang, lalu diuji ke pengguna.', output: 'Prototype Figma' },
{ id: 'ws-build', name: 'Build', description: 'Desain dibangun menjadi produk yang bisa dipakai.', output: 'Live demo' },
{ id: 'ws-launch', name: 'Launch', description: 'Rilis, konten peluncuran, dan pemantauan hasil.', output: 'Laporan awal' }];


// PLACEHOLDER — ganti dengan testimoni asli lewat Dashboard Admin.
export const defaultTestimonials: Testimonial[] = [
{ id: 't-1', name: 'Nama Klien', role: 'Jabatan · Perusahaan', quote: 'Contoh kutipan: jelaskan bagaimana Tolkhah membantu tim Anda dari tahap ide hingga produk rilis.', photo: '', isSample: true },
{ id: 't-2', name: 'Nama Rekan Tim', role: 'Jabatan · Tim Proyek', quote: 'Contoh kutipan: ceritakan pengalaman bekerja dalam satu sprint, cara berkomunikasi, dan hasilnya.', photo: '', isSample: true },
{ id: 't-3', name: 'Nama Mentor', role: 'Jabatan · Institusi', quote: 'Contoh kutipan: soroti kualitas desain, ketelitian, atau kepemimpinan dalam proyek bersama.', photo: '', isSample: true }];


export const defaultSocials: SocialLink[] = [
{ id: 's-email', label: 'Email', handle: 'tolkhahmuzaqqi@gmail.com', href: 'mailto:tolkhahmuzaqqi@gmail.com', icon: 'mail' },
{ id: 's-wa', label: 'WhatsApp', handle: '+62 813-1696-5887', href: 'https://wa.me/6281316965887', icon: 'whatsapp' },
{ id: 's-linkedin', label: 'LinkedIn', handle: 'Profil profesional', href: 'https://www.linkedin.com/', icon: 'linkedin' },
{ id: 's-instagram', label: 'Instagram', handle: 'Konten & proses', href: 'https://www.instagram.com/', icon: 'instagram' }];