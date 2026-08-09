'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Shield, User, Loader2, Sparkles } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { login, user, role, isUsingMockDb, mockLogin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (role === 'admin') router.push('/admin/dashboard');
      else router.push('/staff/dashboard');
    }
  }, [user, role, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const { error } = await login(email, password);
    if (error) {
      setError(error.message);
      setLoading(false);
    }
    // Success will be handled by useEffect redirecting
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background aesthetics */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900/40 via-black to-black z-0 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="bg-[#111111] border border-white/5 p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md z-10 relative backdrop-blur-xl">
        
        <div className="text-center mb-10">
          <Sparkles className="mx-auto text-amber-500 mb-4" size={32} />
          <h1 className="text-3xl font-light text-white mb-2 tracking-wide">Welcome Back</h1>
          <p className="text-white/50 text-sm">Sign in to the Daily Register Portal.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        {isUsingMockDb && (
          <div className="mb-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl space-y-3">
            <p className="text-xs text-blue-400 font-medium text-center uppercase tracking-wider">Demo Mode Active</p>
            <div className="flex gap-2">
              <button 
                onClick={() => mockLogin('admin')}
                className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 p-3 rounded-lg text-white text-sm transition-colors"
              >
                <Shield size={16} className="text-amber-400" /> Admin
              </button>
              <button 
                onClick={() => mockLogin('staff')}
                className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 p-3 rounded-lg text-white text-sm transition-colors"
              >
                <User size={16} className="text-blue-400" /> Staff
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-medium text-white/60 uppercase tracking-wider ml-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white/30 transition-colors"
              placeholder="name@example.com"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-medium text-white/60 uppercase tracking-wider">Password</label>
              <a href="#" className="text-xs text-white/40 hover:text-white/80 transition-colors">Forgot?</a>
            </div>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white/30 transition-colors"
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white text-black font-medium rounded-xl px-4 py-4 mt-2 hover:bg-neutral-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Sign In'}
          </button>
        </form>

      </div>
    </div>
  );
}
