import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // The session will be automatically set by the auth listener in AuthContext
        // We just need to wait a moment and then redirect
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          toast.error('Authentication failed. Please try again.');
          navigate('/login');
          return;
        }

        if (session) {
          toast.success('Successfully signed in!');
          navigate('/dashboard');
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        toast.error('An error occurred during sign in');
        navigate('/login');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
        <p className="text-lg text-muted-foreground">Signing you in...</p>
      </div>
    </div>
  );
}
