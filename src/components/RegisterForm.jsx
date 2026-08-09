'use client';

import React, { useState, useEffect } from 'react';
import { supabase, fallbackDb, isUsingMockDb } from '@/lib/supabaseClient';
import { useAuth } from '@/context/AuthContext';
import { CreditCard, Banknote, Smartphone, Check, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const { user } = useAuth();
  const router = useRouter();
  
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    client_name: '',
    client_phone: '',
    service_id: '',
    service_name: '',
    amount: '',
    payment_mode: 'Cash',
    notes: ''
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        let data;
        if (isUsingMockDb) {
          const res = await fallbackDb.getServices();
          data = res.data;
        } else {
          const res = await supabase.from('services_master').select('*').eq('active', true);
          data = res.data;
        }
        setServices(data || []);
      } catch (err) {
        console.error('Failed to fetch services', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleServiceChange = (e) => {
    const sId = e.target.value;
    const selected = services.find(s => s.id === sId || s.id.toString() === sId);
    if (selected) {
      setFormData(prev => ({
        ...prev,
        service_id: selected.id,
        service_name: selected.name,
        amount: selected.price
      }));
    } else {
      setFormData(prev => ({ ...prev, service_id: '', service_name: '', amount: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);

    try {
      const entry = {
        client_name: formData.client_name,
        client_phone: formData.client_phone,
        service_name: formData.service_name,
        amount: parseFloat(formData.amount),
        payment_mode: formData.payment_mode,
        notes: formData.notes,
        registered_by: user?.id,
        // visit_date will default to today in DB
      };

      if (isUsingMockDb) {
        await fallbackDb.addRegisterEntry(entry);
      } else {
        const { error } = await supabase.from('daily_register').insert([entry]);
        if (error) throw error;
      }

      setSuccess(true);
      setFormData({
        client_name: '',
        client_phone: '',
        service_id: '',
        service_name: '',
        amount: '',
        payment_mode: 'Cash',
        notes: ''
      });
      
      // Auto dismiss success message
      setTimeout(() => setSuccess(false), 3000);

    } catch (err) {
      console.error('Error submitting entry', err);
      alert('Failed to register entry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const paymentModes = [
    { id: 'Cash', icon: Banknote, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-500/30' },
    { id: 'UPI', icon: Smartphone, color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-500/30' },
    { id: 'Card', icon: CreditCard, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-500/30' }
  ];

  if (loading) {
    return <div className="p-8 text-center text-white/50 animate-pulse">Loading services...</div>;
  }

  return (
    <div className="bg-[#1a1a1a] border border-white/5 p-6 md:p-8 rounded-2xl shadow-2xl max-w-2xl mx-auto w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-light text-white mb-2">New Client Entry</h2>
        <p className="text-white/50 text-sm">Record a new client visit and service details.</p>
      </div>

      {success && (
        <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center gap-3 text-emerald-400">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <Check size={18} />
          </div>
          <div>
            <p className="font-medium">Success!</p>
            <p className="text-sm opacity-80">Entry has been recorded to the daily ledger.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Client Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-white/60 uppercase tracking-wider">Client Name *</label>
            <input 
              type="text" 
              required
              value={formData.client_name}
              onChange={e => setFormData({...formData, client_name: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
              placeholder="e.g. Jane Doe"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-white/60 uppercase tracking-wider">Phone Number</label>
            <input 
              type="tel" 
              value={formData.client_phone}
              onChange={e => setFormData({...formData, client_phone: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
              placeholder="Optional"
            />
          </div>
        </div>

        {/* Service & Amount */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-white/60 uppercase tracking-wider">Service Taken *</label>
            <select 
              required
              value={formData.service_id}
              onChange={handleServiceChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors appearance-none"
            >
              <option value="" disabled className="bg-[#111]">Select a service...</option>
              {services.map(s => (
                <option key={s.id} value={s.id} className="bg-[#111]">{s.name}</option>
              ))}
              <option value="custom" className="bg-[#111]">Other / Custom</option>
            </select>
            {formData.service_id === 'custom' && (
              <input 
                type="text"
                required
                value={formData.service_name}
                onChange={e => setFormData({...formData, service_name: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 mt-2 text-white focus:outline-none focus:border-white/30 transition-colors"
                placeholder="Enter custom service name"
              />
            )}
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-white/60 uppercase tracking-wider">Amount (₹) *</label>
            <input 
              type="number" 
              required
              min="0"
              step="0.01"
              value={formData.amount}
              onChange={e => setFormData({...formData, amount: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Payment Mode Selector */}
        <div className="space-y-3">
          <label className="text-xs font-medium text-white/60 uppercase tracking-wider">Payment Mode *</label>
          <div className="grid grid-cols-3 gap-3">
            {paymentModes.map(mode => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setFormData({...formData, payment_mode: mode.id})}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all ${
                  formData.payment_mode === mode.id 
                    ? `${mode.bg} ${mode.border} ring-1 ring-${mode.color.split('-')[1]}-500/50` 
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/50'
                }`}
              >
                <mode.icon size={24} className={formData.payment_mode === mode.id ? mode.color : ''} />
                <span className={`text-sm font-medium ${formData.payment_mode === mode.id ? 'text-white' : ''}`}>
                  {mode.id}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-white/60 uppercase tracking-wider">Notes</label>
          <textarea 
            rows={2}
            value={formData.notes}
            onChange={e => setFormData({...formData, notes: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors resize-none"
            placeholder="Any staff notes or remarks..."
          />
        </div>

        <button 
          type="submit" 
          disabled={submitting}
          className="w-full bg-white text-black font-medium rounded-lg px-4 py-4 mt-4 hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {submitting ? (
            <><Loader2 className="animate-spin" size={20} /> Processing...</>
          ) : (
            'Record Entry'
          )}
        </button>

      </form>
    </div>
  );
}
