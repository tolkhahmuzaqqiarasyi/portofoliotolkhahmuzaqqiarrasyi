import React, { createContext, useCallback, useContext, useRef, useState } from 'react';

/** Hanya satu akun admin. Catatan: autentikasi ini berjalan di browser (tanpa server). */
export const ADMIN_EMAIL = 'tolkhahmuzaqqi@gmail.com';
export const DEFAULT_PASSWORD = 'Tolkhah#2026';

const SESSION_KEY = 'tolkhah-admin-session';
const PASS_KEY = 'tolkhah-admin-pass';
const MAX_ATTEMPTS = 5;
const LOCK_MS = 30_000;

interface AuthResult {
  ok: boolean;
  error?: string;
}

interface AuthContextValue {
  isAuthed: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  logout: () => void;
  changePassword: (current: string, next: string) => Promise<AuthResult>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: {children: React.ReactNode;}) {
  const [isAuthed, setIsAuthed] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      return false;
    }
  });
  const attempts = useRef(0);
  const lockedUntil = useRef(0);

  const verify = useCallback(async (password: string) => {
    const stored = localStorage.getItem(PASS_KEY) ?? (await sha256(DEFAULT_PASSWORD));
    return (await sha256(password)) === stored;
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<AuthResult> => {
      const now = Date.now();
      if (lockedUntil.current > now) {
        const s = Math.ceil((lockedUntil.current - now) / 1000);
        return { ok: false, error: `Terlalu banyak percobaan. Coba lagi dalam ${s} detik.` };
      }
      const ok = email.trim().toLowerCase() === ADMIN_EMAIL && (await verify(password));
      if (!ok) {
        attempts.current += 1;
        if (attempts.current >= MAX_ATTEMPTS) {
          attempts.current = 0;
          lockedUntil.current = Date.now() + LOCK_MS;
          return { ok: false, error: 'Terlalu banyak percobaan. Akses dikunci 30 detik.' };
        }
        return { ok: false, error: 'Email atau kata sandi salah.' };
      }
      attempts.current = 0;
      sessionStorage.setItem(SESSION_KEY, '1');
      setIsAuthed(true);
      return { ok: true };
    },
    [verify]
  );

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthed(false);
  }, []);

  const changePassword = useCallback(
    async (current: string, next: string): Promise<AuthResult> => {
      if (!(await verify(current))) return { ok: false, error: 'Kata sandi saat ini salah.' };
      if (next.length < 8) return { ok: false, error: 'Kata sandi baru minimal 8 karakter.' };
      localStorage.setItem(PASS_KEY, await sha256(next));
      return { ok: true };
    },
    [verify]
  );

  return <AuthContext.Provider value={{ isAuthed, login, logout, changePassword }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth harus dipakai di dalam AuthProvider');
  return ctx;
}

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).
  map((b) => b.toString(16).padStart(2, '0')).
  join('');
}