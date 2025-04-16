
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { User } from '@/types';
import { useToast } from '@/components/ui/use-toast';

export const useSupabaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        if (session) {
          try {
            // Query by email instead of id
            const { data: userData, error } = await supabase
              .from('directory_admins')
              .select('*')
              .eq('email', session.user.email)
              .single();

            if (error) {
              console.error('Error fetching user data:', error);
              setUser(null);
            } else {
              console.log('Admin user data:', userData);
              setUser(userData as User);
              
              // If auth state changed to SIGNED_IN and we have user data
              // redirect to dashboard if we're on the login page
              if (event === 'SIGNED_IN' && window.location.pathname === '/admin') {
                navigate('/admin/dashboard');
              }
            }
          } catch (err) {
            console.error('Error in auth state change:', err);
            setUser(null);
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    // Check current session on load
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log('Initial session check:', session);
      if (session) {
        try {
          const { data: userData, error } = await supabase
            .from('directory_admins')
            .select('*')
            .eq('email', session.user.email)
            .single();

          if (error) {
            console.error('Error fetching user data:', error);
            setUser(null);
          } else {
            console.log('Admin user data:', userData);
            setUser(userData as User);
            
            // Redirect to dashboard if we're on the login page
            if (window.location.pathname === '/admin') {
              navigate('/admin/dashboard');
            }
          }
        } catch (err) {
          console.error('Error checking initial session:', err);
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      console.log('Attempting login with:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Check if the user exists in directory_admins
      const { data: adminUser, error: adminError } = await supabase
        .from('directory_admins')
        .select('*')
        .eq('email', email)
        .single();

      if (adminError || !adminUser) {
        throw new Error('Acceso no autorizado');
      }

      console.log('Login successful:', data);
      toast({
        title: 'Inicio de sesión exitoso',
        description: 'Bienvenido al panel de administración',
      });

      navigate('/admin/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        variant: 'destructive',
        title: 'Error al iniciar sesión',
        description: error.message,
      });
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      console.log('Logging out');
      await supabase.auth.signOut();
      toast({
        title: 'Sesión cerrada',
        description: 'Has cerrado sesión correctamente',
      });
      navigate('/admin');
    } catch (error: any) {
      console.error('Logout error:', error);
      toast({
        variant: 'destructive',
        title: 'Error al cerrar sesión',
        description: error.message,
      });
    }
  };

  return {
    user,
    loading,
    login,
    logout,
  };
};
