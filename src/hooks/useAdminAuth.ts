import { useState, useEffect, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

type AppRole = 'admin' | 'editor' | 'user';

interface AdminAuthState {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isEditor: boolean;
  isInitializing: boolean;
}

interface SignInResult {
  success: boolean;
  error?: string;
}

export function useAdminAuth() {
  const [state, setState] = useState<AdminAuthState>({
    user: null,
    session: null,
    isAdmin: false,
    isEditor: false,
    isInitializing: true,
  });

  const checkUserRole = useCallback(async (userId: string): Promise<{ isAdmin: boolean; isEditor: boolean }> => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);

      if (error) throw error;

      const roles = data?.map((r) => r.role as AppRole) || [];
      return {
        isAdmin: roles.includes('admin'),
        isEditor: roles.includes('editor') || roles.includes('admin'),
      };
    } catch {
      return { isAdmin: false, isEditor: false };
    }
  }, []);

  // Initialize auth state on mount
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!mounted) return;

        if (session?.user) {
          const roles = await checkUserRole(session.user.id);
          if (mounted) {
            setState({
              user: session.user,
              session,
              isAdmin: roles.isAdmin,
              isEditor: roles.isEditor,
              isInitializing: false,
            });
          }
        } else {
          setState(prev => ({ ...prev, isInitializing: false }));
        }
      } catch {
        if (mounted) {
          setState(prev => ({ ...prev, isInitializing: false }));
        }
      }
    };

    initializeAuth();

    // Listen for auth changes (sign out, token refresh, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        if (event === 'SIGNED_OUT') {
          setState({
            user: null,
            session: null,
            isAdmin: false,
            isEditor: false,
            isInitializing: false,
          });
        } else if (event === 'TOKEN_REFRESHED' && session?.user) {
          // Just update session, don't re-check roles
          setState(prev => ({
            ...prev,
            session,
            user: session.user,
          }));
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [checkUserRole]);

  const signIn = async (email: string, password: string): Promise<SignInResult> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Auth error:', error);
        return { success: false, error: error.message };
      }

      if (!data.user) {
        return { success: false, error: 'Sign in failed - no user returned' };
      }

      // Check roles with better error handling
      let roles: { isAdmin: boolean; isEditor: boolean };
      try {
        roles = await checkUserRole(data.user.id);
        console.log('Role check result:', roles);
      } catch (roleError) {
        console.error('Role check error:', roleError);
        await supabase.auth.signOut();
        return { success: false, error: 'Unable to verify permissions. Please try again.' };
      }

      if (!roles.isAdmin && !roles.isEditor) {
        await supabase.auth.signOut();
        return { success: false, error: 'You do not have permission to access the admin area.' };
      }

      // Update state with user and roles
      setState({
        user: data.user,
        session: data.session,
        isAdmin: roles.isAdmin,
        isEditor: roles.isEditor,
        isInitializing: false,
      });

      return { success: true };
    } catch (err) {
      console.error('Sign in error:', err);
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setState({
      user: null,
      session: null,
      isAdmin: false,
      isEditor: false,
      isInitializing: false,
    });
  };

  return {
    ...state,
    signIn,
    signOut,
  };
}
