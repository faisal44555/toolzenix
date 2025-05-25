
    import React from 'react';
    import { Outlet } from 'react-router-dom';
    import { Header } from '@/components/Header';
    import { Footer } from '@/components/Footer';
    import { Toaster } from '@/components/ui/toaster';

    export function Layout() {
      return (
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
          <Toaster />
        </div>
      );
    }
  