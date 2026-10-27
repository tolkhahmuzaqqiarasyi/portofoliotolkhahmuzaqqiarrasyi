/** Membuka CV asli bila sudah diisi di admin, atau mengunduh placeholder. */
export function downloadCv(cvUrl: string, name: string) {
  if (cvUrl) {
    window.open(cvUrl, '_blank', 'noopener,noreferrer');
    return;
  }
  const content = [
  `CV — ${name}`,
  'Product Builder · UI/UX Designer · Frontend Developer · Project Lead · Digital Marketing',
  '',
  'Dokumen ini adalah placeholder. Isi tautan CV asli di Dashboard Admin > Profil.'].
  join('\n');
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `CV-${name.replace(/\s+/g, '-')}.txt`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}