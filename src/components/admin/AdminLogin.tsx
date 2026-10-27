import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircleIcon, ArrowLeftIcon, EyeIcon, EyeOffIcon, Loader2Icon, LockIcon } from 'lucide-react';
import { TextField } from './fields/TextField';
import { useAuth } from '../../contexts/AuthContext';
import { btnPrimary } from '../../utils/styles';

export function AdminLogin() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Isi email dan kata sandi.');
      return;
    }
    setLoading(true);
    setError(null);
    const res = await login(email, password);
    setLoading(false);
    if (!res.ok) setError(res.error ?? 'Gagal masuk.');
  };

  return (
    <main className="grid min-h-screen w-full place-items-center bg-band px-5 py-10 font-sans">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-6 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-white/80 hover:text-white">
          <ArrowLeftIcon className="h-4 w-4" aria-hidden /> Kembali ke website
        </Link>
        <div className="rounded-3xl bg-surface p-7 shadow-lift md:p-9">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-pink text-night">
            <LockIcon className="h-5 w-5" aria-hidden />
          </span>
          <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-ink">Masuk Dashboard Admin</h1>
          <p className="mt-1.5 text-sm text-muted">Hanya untuk pemilik website.</p>

          <form onSubmit={handleSubmit} className="mt-7 grid gap-4" noValidate>
            {error &&
            <p role="alert" className="flex items-center gap-2 rounded-xl bg-danger/10 px-3.5 py-3 text-sm font-semibold text-danger">
                <AlertCircleIcon className="h-4 w-4 shrink-0" aria-hidden /> {error}
              </p>
            }
            <TextField label="Email" type="email" autoComplete="username" value={email} onChange={setEmail} />
            <div className="relative">
              <TextField label="Kata sandi" type={show ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={setPassword} />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                aria-label={show ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                className="absolute bottom-0 right-0 grid h-11 w-11 place-items-center text-muted hover:text-ink">
                
                {show ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
              </button>
            </div>
            <button type="submit" disabled={loading} className={`${btnPrimary} mt-2 w-full`}>
              {loading ? <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden /> : null}
              {loading ? 'Memeriksa…' : 'Masuk'}
            </button>
          </form>
        </div>
      </div>
    </main>);

}