import React from 'react';
import { AdminLogin } from '../components/admin/AdminLogin';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { useAuth } from '../contexts/AuthContext';

export function Admin() {
  const { isAuthed } = useAuth();
  return isAuthed ? <AdminDashboard /> : <AdminLogin />;
}