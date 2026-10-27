import type { Project } from '../types/portfolio';

// Nilai awal project. Tambah, ubah, atau hapus lewat Dashboard Admin (/admin).
export const defaultProjects: Project[] = [
{
  id: 'p-desago',
  slug: 'desago-id',
  title: 'DesaGo.id',
  category: 'Team Project · Aplikasi layanan & wisata desa',
  summary:
  'Aplikasi mobile yang menghubungkan wisatawan dengan desa wisata dan UMKM lokal — mulai dari mencari destinasi, membeli produk desa, sampai memesan tiket.',
  roles: ['UI/UX', 'PM'],
  myRole: 'UI/UX Designer & Project Lead',
  team: 'Team Project',
  duration: 'Isi durasi proyek',
  tools: ['Figma', 'Trello', 'Google Docs', 'Google Play Console'],
  result: 'Isi hasil terukur — mis. jumlah unduhan atau desa yang bergabung',
  resultIsPlaceholder: true,
  proof: 'Live di Google Play',
  liveUrl: '',
  cover: "/558a85a3-5976-4e2c-9aeb-7b160a416267.jpg",
  color: 'primary',
  isSample: false,
  process: [
  { id: 'd-1', title: 'Penyusunan UX Research', description: 'Menggali kebutuhan wisatawan, warga, dan perangkat desa lewat wawancara dan survei, lalu merangkum masalah utama yang harus diselesaikan aplikasi.', deliverables: ['Persona', 'Pain points', 'Insight utama'], tool: 'Google Forms' },
  { id: 'd-2', title: 'Dokumen PRD', description: 'Menuliskan tujuan produk, target pengguna, ruang lingkup fitur MVP, serta ukuran keberhasilan agar seluruh tim punya acuan yang sama.', deliverables: ['Product Requirement Document', 'Daftar fitur MVP'], tool: 'Google Docs' },
  { id: 'd-3', title: 'Timeline menggunakan Trello', description: 'Memecah pekerjaan menjadi sprint dan milestone, lalu memetakan pembagian tugas tim di papan Trello supaya progres mudah dipantau.', deliverables: ['Timeline sprint', 'Papan Trello'], tool: 'Trello' },
  { id: 'd-4', title: 'Pembahasan Backlog', description: 'Bersama tim memprioritaskan product backlog — menentukan fitur yang wajib, penting, dan bisa ditunda untuk rilis pertama.', deliverables: ['Product backlog', 'Prioritas fitur'], tool: 'Trello' },
  { id: 'd-5', title: 'Use Case', description: 'Memetakan interaksi tiap aktor — wisatawan, pelaku UMKM, dan admin desa — dengan sistem agar alur aplikasi lengkap dan tidak ada yang terlewat.', deliverables: ['Diagram use case', 'Skenario pengguna'], tool: 'Diagram use case' },
  { id: 'd-6', title: 'Pembuatan Desain User Interface', description: 'Menyusun design system lalu merancang layar high-fidelity untuk beranda, detail destinasi, marketplace UMKM, dan pemesanan tiket.', deliverables: ['Design system', 'UI high-fidelity'], tool: 'Figma' },
  { id: 'd-7', title: 'Pembuatan Prototype', description: 'Menghubungkan seluruh layar menjadi prototype interaktif yang bisa dicoba seperti aplikasi sungguhan sebelum masuk tahap development.', deliverables: ['Prototype interaktif'], tool: 'Figma' },
  { id: 'd-8', title: 'Usability Testing', description: 'Menguji prototype ke calon pengguna dengan skenario tugas, mencatat kendala, lalu memperbaiki desain berdasarkan temuan.', deliverables: ['Laporan usability testing', 'Daftar perbaikan'], tool: 'Prototype Figma' },
  { id: 'd-9', title: 'Upload ke Play Store', description: 'Menyiapkan aset store listing — ikon, screenshot, dan deskripsi — lalu merilis aplikasi ke Google Play Store.', deliverables: ['Store listing', 'Aplikasi rilis'], tool: 'Google Play Console' }],

  gallery: [
  { id: 'dg-1', src: "/baf3fb63-a4ec-4d92-b272-40c2dfd02b90.jpg", title: 'Beranda', caption: 'Pencarian dan kategori di bagian atas supaya wisatawan langsung menemukan destinasi, UMKM, atau layanan desa.' },
  { id: 'dg-2', src: "/c6788844-8814-40ca-9fe3-3a96a98608e8.jpg", title: 'Detail destinasi', caption: 'Foto besar, rating, fasilitas, dan peta dalam satu layar agar keputusan berkunjung bisa diambil tanpa pindah halaman.' },
  { id: 'dg-3', src: "/369a652e-021b-4e5b-99ae-9371513890ef.jpg", title: 'Marketplace UMKM', caption: 'Produk lokal ditampilkan dalam grid dengan filter cepat sehingga pelaku UMKM desa ikut terangkat.' },
  { id: 'dg-4', src: "/4e6148e8-9d81-4649-88e4-a0692ac65d66.jpg", title: 'Pemesanan tiket', caption: 'Alur tiga langkah — pilih tanggal, jumlah pengunjung, konfirmasi — diakhiri e-ticket QR yang siap dipindai.' }]

},
{
  id: 'p-sprintly',
  slug: 'sprintly-dashboard',
  title: 'Sprintly Dashboard',
  category: 'Dashboard manajemen sprint',
  summary: 'Dashboard web untuk membantu tim kecil merencanakan sprint, memantau backlog, dan melihat progres dalam satu layar.',
  roles: ['PM', 'Frontend'],
  myRole: 'Project Lead & Frontend Developer',
  team: 'Isi ukuran tim',
  duration: 'Isi durasi proyek',
  tools: ['Trello', 'Figma', 'React'],
  result: 'Isi hasil terukur — mis. waktu rapat sprint yang dihemat',
  resultIsPlaceholder: true,
  proof: 'Live demo',
  liveUrl: '',
  cover: "/d66920a3-2f7d-4b25-9f69-7f6f42af64a5.jpg",
  color: 'violet',
  isSample: true,
  process: [
  { id: 's-1', title: 'Discovery', description: 'Wawancara singkat dengan tim untuk memahami cara mereka merencanakan sprint saat ini.', deliverables: ['Catatan wawancara'], tool: 'Google Meet' },
  { id: 's-2', title: 'PRD & backlog', description: 'Menyusun kebutuhan fitur dan memprioritaskan backlog untuk rilis pertama.', deliverables: ['PRD', 'Backlog'], tool: 'Trello' },
  { id: 's-3', title: 'Wireframe & UI', description: 'Merancang tampilan papan kanban dan daftar backlog.', deliverables: ['Wireframe', 'UI'], tool: 'Figma' },
  { id: 's-4', title: 'Frontend', description: 'Membangun dashboard responsif dengan komponen yang bisa dipakai ulang.', deliverables: ['Live demo'], tool: 'React' }],

  gallery: [
  { id: 'sg-1', src: "/d66920a3-2f7d-4b25-9f69-7f6f42af64a5.jpg", title: 'Papan sprint', caption: 'Kanban dan burndown chart berdampingan agar progres sprint terbaca sekilas.' },
  { id: 'sg-2', src: "/86f1abb5-1a7a-4442-b044-5a92784b2e04.jpg", title: 'Backlog', caption: 'Daftar user story dengan story point dan panel detail di samping.' }]

},
{
  id: 'p-kopisenja',
  slug: 'kopi-senja-launch',
  title: 'Kopi Senja Launch',
  category: 'Landing page + konten peluncuran',
  summary: 'Landing page pre-order dan paket konten untuk peluncuran brand kopi lokal.',
  roles: ['Frontend', 'Marketing'],
  myRole: 'Frontend Developer & Digital Marketing',
  team: 'Isi ukuran tim',
  duration: 'Isi durasi proyek',
  tools: ['Figma', 'React', 'Canva'],
  result: 'Isi hasil terukur — mis. konversi pre-order',
  resultIsPlaceholder: true,
  proof: 'Live demo',
  liveUrl: '',
  cover: "/ca661248-7cf3-42c2-b7fd-102fe2696750.jpg",
  color: 'pink',
  isSample: true,
  process: [
  { id: 'k-1', title: 'Brief & copywriting', description: 'Menentukan pesan utama peluncuran dan menulis teks landing page.', deliverables: ['Copy deck'], tool: 'Google Docs' },
  { id: 'k-2', title: 'Desain landing page', description: 'Merancang halaman pre-order yang fokus pada satu ajakan.', deliverables: ['UI desktop & mobile'], tool: 'Figma' },
  { id: 'k-3', title: 'Build', description: 'Membangun landing page responsif.', deliverables: ['Live demo'], tool: 'React' },
  { id: 'k-4', title: 'Konten peluncuran', description: 'Menyiapkan rangkaian konten media sosial untuk minggu peluncuran.', deliverables: ['Content plan', 'Desain konten'], tool: 'Canva' }],

  gallery: [
  { id: 'kg-1', src: "/ca661248-7cf3-42c2-b7fd-102fe2696750.jpg", title: 'Desktop & mobile', caption: 'Hero dengan satu ajakan pre-order yang konsisten di semua ukuran layar.' },
  { id: 'kg-2', src: "/5ea85353-736a-4087-8add-7811c5c627b8.jpg", title: 'Versi mobile', caption: 'Menu dan testimoni disusun pendek agar mudah dipindai di HP.' }]

},
{
  id: 'p-pasarlokal',
  slug: 'kampanye-pasar-lokal',
  title: 'Kampanye Pasar Lokal',
  category: 'Content plan & desain media sosial',
  summary: 'Kampanye media sosial satu bulan untuk memperkenalkan pasar produk lokal.',
  roles: ['Marketing'],
  myRole: 'Digital Marketing',
  team: 'Isi ukuran tim',
  duration: 'Isi durasi proyek',
  tools: ['Canva', 'Meta Business Suite'],
  result: 'Isi hasil terukur — mis. jangkauan atau engagement kampanye',
  resultIsPlaceholder: true,
  proof: 'Laporan kampanye',
  liveUrl: '',
  cover: "/55c44be5-0bb9-46cd-bb7e-79406e130970.jpg",
  color: 'lemon',
  isSample: true,
  process: [
  { id: 'm-1', title: 'Riset audiens', description: 'Memetakan siapa target audiens dan konten apa yang mereka sukai.', deliverables: ['Profil audiens'], tool: 'Google Forms' },
  { id: 'm-2', title: 'Content plan', description: 'Menyusun kalender konten satu bulan beserta pilar kontennya.', deliverables: ['Kalender konten'], tool: 'Google Sheets' },
  { id: 'm-3', title: 'Desain konten', description: 'Membuat feed dan story dengan identitas visual yang konsisten.', deliverables: ['Feed', 'Story'], tool: 'Canva' },
  { id: 'm-4', title: 'Analytics & laporan', description: 'Memantau performa dan merangkum rekomendasi untuk bulan berikutnya.', deliverables: ['Laporan kampanye'], tool: 'Meta Business Suite' }],

  gallery: [
  { id: 'mg-1', src: "/55c44be5-0bb9-46cd-bb7e-79406e130970.jpg", title: 'Feed & story', caption: 'Ilustrasi produk dengan palet cerah agar mudah dikenali di linimasa.' },
  { id: 'mg-2', src: "/bd9e08a5-2940-451d-a7d2-f98b2ce2a950.jpg", title: 'Laporan performa', caption: 'Ringkasan jangkauan dan engagement per minggu sebagai dasar evaluasi.' }]

}];