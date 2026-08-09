'use client';

import React, { useState, useEffect } from 'react';
import { supabase, fallbackDb, isUsingMockDb } from '@/lib/supabaseClient';
import { Search, Calendar, Filter, Download, CreditCard, Banknote, Smartphone, Trash2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function LedgerTable() {
  const { role } = useAuth();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]);

  const fetchEntries = async () => {
    setLoading(true);
    try {
      let data;
      if (isUsingMockDb) {
        const res = await fallbackDb.getDailyRegister();
        data = res.data.filter(e => e.visit_date === filterDate);
      } else {
        const res = await supabase
          .from('daily_register')
          .select('*, profiles(full_name, email)')
          .eq('visit_date', filterDate)
          .order('created_at', { ascending: false });
        data = res.data;
      }
      setEntries(data || []);
    } catch (err) {
      console.error('Failed to fetch entries', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [filterDate]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;
    
    try {
      if (isUsingMockDb) {
        await fallbackDb.deleteRegisterEntry(id);
      } else {
        await supabase.from('daily_register').delete().eq('id', id);
      }
      fetchEntries();
    } catch (err) {
      console.error('Failed to delete', err);
      alert('Failed to delete entry');
    }
  };

  const getPaymentIcon = (mode) => {
    switch (mode) {
      case 'Cash': return <Banknote size={16} className="text-emerald-400" />;
      case 'UPI': return <Smartphone size={16} className="text-purple-400" />;
      case 'Card': return <CreditCard size={16} className="text-blue-400" />;
      default: return null;
    }
  };

  const filteredEntries = entries.filter(e => 
    e.client_name.toLowerCase().includes(search.toLowerCase()) ||
    e.service_name.toLowerCase().includes(search.toLowerCase())
  );

  const totalAmount = filteredEntries.reduce((sum, e) => sum + parseFloat(e.amount), 0);

  return (
    <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
      
      {/* Header Actions */}
      <div className="p-4 md:p-6 border-b border-white/5 flex flex-col md:flex-row gap-4 justify-between items-center bg-white/[0.02]">
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input 
              type="text" 
              placeholder="Search clients..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-white/30"
            />
          </div>
          <div className="relative">
            <input 
              type="date" 
              value={filterDate}
              onChange={e => setFilterDate(e.target.value)}
              className="bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-white/30 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm w-full md:w-auto justify-between md:justify-end">
          <div className="text-white/60">
            Total: <span className="text-white font-medium text-lg ml-1">₹{totalAmount.toLocaleString()}</span>
          </div>
          <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors">
            <Download size={16} /> Export
          </button>
        </div>

      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-black/40 text-white/50 border-b border-white/5">
            <tr>
              <th className="px-6 py-4 font-medium">Time</th>
              <th className="px-6 py-4 font-medium">Client</th>
              <th className="px-6 py-4 font-medium">Service</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              <th className="px-6 py-4 font-medium">Mode</th>
              {role === 'admin' && <th className="px-6 py-4 font-medium text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-white/40 animate-pulse">
                  Loading entries...
                </td>
              </tr>
            ) : filteredEntries.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-white/40">
                  <div className="flex flex-col items-center gap-2">
                    <Filter size={32} className="opacity-50" />
                    <p>No entries found for this date.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredEntries.map(entry => (
                <tr key={entry.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 text-white/60">
                    {new Date(entry.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white font-medium">{entry.client_name}</div>
                    {entry.client_phone && <div className="text-xs text-white/40">{entry.client_phone}</div>}
                  </td>
                  <td className="px-6 py-4 text-white/80">{entry.service_name}</td>
                  <td className="px-6 py-4 text-white font-medium">₹{entry.amount}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full w-fit border border-white/5">
                      {getPaymentIcon(entry.payment_mode)}
                      <span className="text-xs">{entry.payment_mode}</span>
                    </div>
                  </td>
                  {role === 'admin' && (
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleDelete(entry.id)}
                        className="p-2 text-white/40 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                        title="Delete Entry"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
