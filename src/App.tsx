import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { Toaster } from 'sonner';
import { Home } from './pages/Home';
import { ProjectDetail } from './pages/ProjectDetail';
import { Admin } from './pages/Admin';
import { NotFound } from './pages/NotFound';
import { ThemeProvider } from './contexts/ThemeContext';
import { PortfolioProvider } from './contexts/PortfolioContext';
import { AuthProvider } from './contexts/AuthContext';

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <PortfolioProvider>
          <AuthProvider>
            <MotionConfig reducedMotion="user">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/project/:slug" element={<ProjectDetail />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster position="top-center" richColors />
            </MotionConfig>
          </AuthProvider>
        </PortfolioProvider>
      </ThemeProvider>
    </BrowserRouter>);

}