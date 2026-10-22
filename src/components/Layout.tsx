import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pt-16 sm:pt-20" id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}