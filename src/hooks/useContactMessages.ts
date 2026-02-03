import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string;
  message: string;
  is_read: boolean;
  read_at: string | null;
  created_at: string;
}

export interface MessageFilters {
  search?: string;
  service?: string;
  status?: 'all' | 'read' | 'unread';
}

export function useContactMessages(filters?: MessageFilters) {
  const queryClient = useQueryClient();

  const { data: messages = [], isLoading, error } = useQuery({
    queryKey: ['contact-messages', filters],
    queryFn: async () => {
      let query = supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (filters?.service && filters.service !== 'all') {
        query = query.eq('service', filters.service);
      }

      if (filters?.status === 'read') {
        query = query.eq('is_read', true);
      } else if (filters?.status === 'unread') {
        query = query.eq('is_read', false);
      }

      const { data, error } = await query;
      if (error) throw error;

      let result = data as ContactMessage[];

      // Client-side search filter
      if (filters?.search) {
        const searchLower = filters.search.toLowerCase();
        result = result.filter(
          (msg) =>
            msg.name.toLowerCase().includes(searchLower) ||
            msg.email.toLowerCase().includes(searchLower) ||
            msg.message.toLowerCase().includes(searchLower)
        );
      }

      return result;
    },
  });

  const unreadCount = messages.filter((m) => !m.is_read).length;

  const markAsReadMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ is_read: true, read_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-messages'] });
    },
  });

  const markAsUnreadMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ is_read: false, read_at: null })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-messages'] });
    },
  });

  const deleteMessageMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-messages'] });
    },
  });

  return {
    messages,
    unreadCount,
    isLoading,
    error,
    markAsRead: markAsReadMutation.mutate,
    markAsUnread: markAsUnreadMutation.mutate,
    deleteMessage: deleteMessageMutation.mutate,
    isDeleting: deleteMessageMutation.isPending,
  };
}

export function useUnreadMessageCount() {
  const { data: count = 0 } = useQuery({
    queryKey: ['contact-messages-unread-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('contact_submissions')
        .select('*', { count: 'exact', head: true })
        .eq('is_read', false);
      if (error) throw error;
      return count || 0;
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  return count;
}
