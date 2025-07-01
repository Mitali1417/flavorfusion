import Footer from '@/components/shared/Footer';
import PageLoader from '@/components/shared/PageLoader';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <div className='flex'>
      <div className="hidden md:flex flex-1 flex-col items-center justify-center p-8 text-center bg-primary-foreground">
        <h1 className="text-4xl font-extrabold text-brand mb-4">Flavor Fusion</h1>
        <p className="text-lg text-brand-dark mb-6">Discover, save, and create amazing recipes. <br />Your culinary journey starts here!</p>
        <img src="https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg" alt="Cooking Illustration" className="max-w-full w-96 h-96 neo-shadow object-cover rounded-xl" />
      </div>
      <Suspense fallback={<PageLoader />}>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </Suspense>
      </div>
      <Footer/>
    </div>
  );
} 