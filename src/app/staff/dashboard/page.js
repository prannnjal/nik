'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import NavigationHeader from '@/components/NavigationHeader';
import RegisterForm from '@/components/RegisterForm';
import Link from 'next/link';
import { FileText, UserPlus } from 'lucide-react';

export default function StaffDashboard() {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) router.push('/login');
      else if (role !== 'staff') router.push('/admin/dashboard');
    }
  }, [user, role, loading, router]);

  if (loading || !user || role !== 'staff') return <div className="min-h-screen bg-black" />;

  return (
    <div className="min-h-screen bg-black">
      <NavigationHeader />
      
      <div className="max-w-7xl mx-auto p-4 md:p-8 pt-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-light text-white mb-2">Staff Portal</h1>
          <p className="text-white/50 text-sm">Welcome back. Manage today's client entries below.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Quick Actions */}
          <Link href="/register-client" className="group bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <UserPlus size={24} />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-1">New Client Entry</h3>
              <p className="text-xs text-white/50">Record a new service</p>
            </div>
          </Link>
          
          <Link href="/daily-ledger" className="group bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText size={24} />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-1">Today's Ledger</h3>
              <p className="text-xs text-white/50">View all recorded entries</p>
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-light text-white mb-4">Quick Entry Form</h2>
            <RegisterForm />
          </div>
        </div>

      </div>
    </div>
  );
}
