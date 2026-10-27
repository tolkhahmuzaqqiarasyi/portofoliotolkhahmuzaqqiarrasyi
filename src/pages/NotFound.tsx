import React from 'react';
import { Link } from 'react-router-dom';
import { btnPrimary } from '../utils/styles';

export function NotFound() {
  return (
    <main className="grid min-h-screen w-full place-items-center bg-bg px-5 text-center font-sans text-ink">
      <div>
        <p className="font-script text-7xl font-bold text-pink">Ups!</p>
        <h1 className="mt-2 text-3xl font-extrabold">Halaman tidak ditemukan</h1>
        <p className="mt-3 text-muted">Tautan mungkin sudah berubah atau project telah dihapus.</p>
        <Link to="/" className={`${btnPrimary} mt-8`}>
          Kembali ke beranda
        </Link>
      </div>
    </main>);

}