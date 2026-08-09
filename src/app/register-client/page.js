'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import NavigationHeader from '@/components/NavigationHeader';
import RegisterForm from '@/components/RegisterForm';

export default function RegisterClientPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) return <div className="min-h-screen bg-black" />;

  return (
    <div className="min-h-screen bg-black">
      <NavigationHeader />
      <div className="max-w-7xl mx-auto p-4 md:p-8 pt-12">
        <RegisterForm />
      </div>
    </div>
  );
}
