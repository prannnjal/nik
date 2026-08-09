import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'Secret Salon | Ultra-Premium Luxury Salon',
  description: 'Beauty, Crafted with Elegance. Experience the epitome of quiet luxury — where beauty becomes ritual.',
  openGraph: {
    title: 'Secret Salon | Ultra-Premium Luxury Salon',
    description: 'Experience the epitome of quiet luxury.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CustomCursor />
          <SmoothScroll>
            <Navbar />
            {children}
          </SmoothScroll>
        </AuthProvider>
      </body>
    </html>
  );
}
