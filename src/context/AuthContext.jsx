'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isUsingMockDb } from '@/lib/supabaseClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    const checkSession = async () => {
      if (isUsingMockDb) {
        const storedUser = localStorage.getItem('mockUser');
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          setUser(parsed);
          setRole(parsed.role);
        }
        setLoading(false);
        return;
      }

      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          // Fetch role from profiles table
          const { data } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
          setRole(data?.role || 'staff');
        }
      } catch (error) {
        console.error('Session check error', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    if (!isUsingMockDb) {
      const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          const { data } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
          setRole(data?.role || 'staff');
        } else {
          setUser(null);
          setRole(null);
        }
      });

      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, []);

  const mockLogin = (selectedRole) => {
    const fakeUser = { id: selectedRole === 'admin' ? 'admin-id' : 'staff-id', email: `${selectedRole}@demo.com`, role: selectedRole };
    localStorage.setItem('mockUser', JSON.stringify(fakeUser));
    setUser(fakeUser);
    setRole(selectedRole);
  };

  const login = async (email, password) => {
    if (isUsingMockDb) {
      // In mock mode, password is role name for simplicity
      const roleToSet = password === 'admin' ? 'admin' : 'staff';
      mockLogin(roleToSet);
      return { error: null };
    }
    
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { data, error };
  };

  const logout = async () => {
    if (isUsingMockDb) {
      localStorage.removeItem('mockUser');
      setUser(null);
      setRole(null);
      return { error: null };
    }

    const { error } = await supabase.auth.signOut();
    return { error };
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, login, logout, isUsingMockDb, mockLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
