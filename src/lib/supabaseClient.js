import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const isSupabaseConfigured = supabaseUrl !== '' && supabaseAnonKey !== '';

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Mock Data Fallback for Demo/Local testing before Supabase is connected
const generateId = () => Math.random().toString(36).substr(2, 9);

let mockServices = [
  { id: '1', name: 'Haircut - Men', category: 'Hair', price: 300, active: true },
  { id: '2', name: 'Haircut - Women', category: 'Hair', price: 600, active: true },
  { id: '3', name: 'Hair Color', category: 'Hair', price: 1500, active: true },
  { id: '4', name: 'Facial - Basic', category: 'Face', price: 1200, active: true },
  { id: '5', name: 'Manicure', category: 'Nails', price: 500, active: true },
];

let mockRegister = [
  {
    id: 'r1',
    client_name: 'John Doe',
    client_phone: '9876543210',
    service_name: 'Haircut - Men',
    amount: 300,
    payment_mode: 'UPI',
    notes: 'Regular client',
    visit_date: new Date().toISOString().split('T')[0],
    created_at: new Date().toISOString()
  }
];

export const fallbackDb = {
  getServices: async () => {
    return { data: mockServices, error: null };
  },
  addService: async (service) => {
    const newService = { id: generateId(), active: true, ...service };
    mockServices.push(newService);
    return { data: newService, error: null };
  },
  getDailyRegister: async () => {
    return { data: mockRegister, error: null };
  },
  addRegisterEntry: async (entry) => {
    const newEntry = { 
      id: generateId(), 
      created_at: new Date().toISOString(),
      visit_date: new Date().toISOString().split('T')[0],
      ...entry 
    };
    mockRegister = [newEntry, ...mockRegister]; // prepend
    return { data: newEntry, error: null };
  },
  deleteRegisterEntry: async (id) => {
    mockRegister = mockRegister.filter(r => r.id !== id);
    return { data: null, error: null };
  }
};

export const isUsingMockDb = !isSupabaseConfigured;
