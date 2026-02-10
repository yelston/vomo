import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Database types (will be generated from Supabase later)
export type Database = {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string;
          name: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      organizers: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          organization_id: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name?: string | null;
          organization_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          organization_id?: string | null;
          created_at?: string;
        };
      };
      events: {
        Row: {
          id: string;
          organization_id: string | null;
          title: string;
          description: string | null;
          location: string | null;
          date: string;
          timezone: string;
          public_link_id: string | null;
          password: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id?: string | null;
          title: string;
          description?: string | null;
          location?: string | null;
          date: string;
          timezone?: string;
          public_link_id?: string | null;
          password?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string | null;
          title?: string;
          description?: string | null;
          location?: string | null;
          date?: string;
          timezone?: string;
          public_link_id?: string | null;
          password?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      shifts: {
        Row: {
          id: string;
          event_id: string;
          role_name: string;
          start_time: string;
          end_time: string;
          total_slots: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          event_id: string;
          role_name: string;
          start_time: string;
          end_time: string;
          total_slots: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          event_id?: string;
          role_name?: string;
          start_time?: string;
          end_time?: string;
          total_slots?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      volunteers: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          created_at?: string;
        };
      };
      shift_signups: {
        Row: {
          id: string;
          shift_id: string;
          volunteer_id: string;
          notes: string | null;
          signed_up_at: string;
          reminder_sent_at: string | null;
        };
        Insert: {
          id?: string;
          shift_id: string;
          volunteer_id: string;
          notes?: string | null;
          signed_up_at?: string;
          reminder_sent_at?: string | null;
        };
        Update: {
          id?: string;
          shift_id?: string;
          volunteer_id?: string;
          notes?: string | null;
          signed_up_at?: string;
          reminder_sent_at?: string | null;
        };
      };
    };
  };
};
