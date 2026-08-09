'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { LogOut, User, LayoutDashboard, FileText, Settings, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NavigationHeader() {
  const { user, role, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  if (!user) return null;

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const navLinks = [
    {
      href: role === 'admin' ? '/admin/dashboard' : '/staff/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      roles: ['admin', 'staff']
    },
    {
      href: '/register-client',
      label: 'New Entry',
      icon: User,
      roles: ['admin', 'staff']
    },
    {
      href: '/daily-ledger',
      label: 'Ledger',
      icon: FileText,
      roles: ['admin', 'staff']
    },
    {
      href: '/admin/records',
      label: 'All Records',
      icon: FileText,
      roles: ['admin']
    },
    {
      href: '/admin/services',
      label: 'Services Master',
      icon: Settings,
      roles: ['admin']
    },
    {
      href: '/admin/staff',
      label: 'Staff Management',
      icon: Users,
      roles: ['admin']
    }
  ];

  return (
    <div className="bg-[#111111] border-b border-white/10 p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* User Info & Role Badge */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <User size={20} className="text-white/70" />
          </div>
          <div>
            <div className="text-white font-medium">{user.email?.split('@')[0] || 'User'}</div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ${
                role === 'admin' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              }`}>
                {role}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {navLinks.filter(link => link.roles.includes(role)).map((link) => (
            <Link 
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all whitespace-nowrap ${
                pathname === link.href 
                  ? 'bg-white/10 text-white' 
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <link.icon size={16} />
              {link.label}
            </Link>
          ))}
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-all ml-auto md:ml-2"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}
