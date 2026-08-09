'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import NavigationHeader from '@/components/NavigationHeader';
import LedgerTable from '@/components/LedgerTable';

export default function DailyLedgerPage() {
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
      <div className="max-w-7xl mx-auto p-4 md:p-8 pt-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-light text-white mb-2">Daily Ledger</h1>
          <p className="text-white/50 text-sm">View and manage daily client service records.</p>
        </div>

        <LedgerTable />
        
      </div>
    </div>
  );
}
