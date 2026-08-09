'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import NavigationHeader from '@/components/NavigationHeader';
import { supabase, fallbackDb, isUsingMockDb } from '@/lib/supabaseClient';
import { IndianRupee, Banknote, Smartphone, TrendingUp, Users } from 'lucide-react';

export default function AdminDashboard() {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  const [stats, setStats] = useState({
    totalRevenue: 0,
    cashRevenue: 0,
    upiRevenue: 0,
    cardRevenue: 0,
    totalClients: 0
  });

  useEffect(() => {
    if (!loading) {
      if (!user) router.push('/login');
      else if (role !== 'admin') router.push('/staff/dashboard');
    }
  }, [user, role, loading, router]);

  useEffect(() => {
    if (!user || role !== 'admin') return;

    const fetchStats = async () => {
      try {
        let entries = [];
        if (isUsingMockDb) {
          const res = await fallbackDb.getDailyRegister();
          entries = res.data;
        } else {
          // Fetch all for demo, in prod fetch by date range
          const res = await supabase.from('daily_register').select('*');
          entries = res.data || [];
        }

        const totals = { totalRevenue: 0, cashRevenue: 0, upiRevenue: 0, cardRevenue: 0, totalClients: entries.length };
        
        entries.forEach(e => {
          const amount = parseFloat(e.amount);
          totals.totalRevenue += amount;
          if (e.payment_mode === 'Cash') totals.cashRevenue += amount;
          else if (e.payment_mode === 'UPI') totals.upiRevenue += amount;
          else if (e.payment_mode === 'Card') totals.cardRevenue += amount;
        });

        setStats(totals);
      } catch (err) {
        console.error('Failed to fetch stats', err);
      }
    };

    fetchStats();
  }, [user, role]);

  if (loading || !user || role !== 'admin') return <div className="min-h-screen bg-black" />;

  const StatCard = ({ title, value, icon: Icon, colorClass, gradient }) => (
    <div className={`relative overflow-hidden rounded-2xl border border-white/10 p-6 ${gradient}`}>
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Icon size={80} />
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-2 text-white/70">
          <Icon size={18} className={colorClass} />
          <h3 className="font-medium text-sm uppercase tracking-wider">{title}</h3>
        </div>
        <div className="text-3xl font-light text-white">
          {title.includes('Client') ? value : `₹${value.toLocaleString()}`}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      <NavigationHeader />
      
      <div className="max-w-7xl mx-auto p-4 md:p-8 pt-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-light text-white mb-2">Admin Dashboard</h1>
          <p className="text-white/50 text-sm">Overview of salon revenue and performance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <StatCard 
            title="Total Revenue" 
            value={stats.totalRevenue} 
            icon={TrendingUp} 
            colorClass="text-amber-400"
            gradient="bg-gradient-to-br from-amber-500/10 to-transparent"
          />
          <StatCard 
            title="Cash Revenue" 
            value={stats.cashRevenue} 
            icon={Banknote} 
            colorClass="text-emerald-400"
            gradient="bg-gradient-to-br from-emerald-500/10 to-transparent"
          />
          <StatCard 
            title="UPI Revenue" 
            value={stats.upiRevenue} 
            icon={Smartphone} 
            colorClass="text-purple-400"
            gradient="bg-gradient-to-br from-purple-500/10 to-transparent"
          />
          <StatCard 
            title="Total Clients" 
            value={stats.totalClients} 
            icon={Users} 
            colorClass="text-blue-400"
            gradient="bg-gradient-to-br from-blue-500/10 to-transparent"
          />
        </div>

        {/* Charts or extra admin widgets could go here */}
        <div className="bg-[#111] border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[300px] text-center">
          <TrendingUp size={48} className="text-white/20 mb-4" />
          <h3 className="text-xl text-white mb-2">Detailed Analytics Hub</h3>
          <p className="text-white/50 text-sm max-w-md">
            Connect to Supabase to unlock advanced historical data filtering, service popularity charts, and staff performance metrics.
          </p>
        </div>

      </div>
    </div>
  );
}
