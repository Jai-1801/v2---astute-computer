import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface NewsletterSubscriber {
  id: string;
  email: string;
  is_active: boolean;
  subscribed_at: string;
}

export function useNewsletterSubscribers() {
  const queryClient = useQueryClient();

  const { data: subscribers = [], isLoading, error } = useQuery({
    queryKey: ['newsletter-subscribers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('subscribed_at', { ascending: false });
      if (error) throw error;
      return data as NewsletterSubscriber[];
    },
  });

  const deleteSubscriberMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['newsletter-subscribers'] });
    },
  });

  const exportToCSV = () => {
    const headers = ['Email', 'Status', 'Subscribed At'];
    const rows = subscribers.map((s) => [
      s.email,
      s.is_active ? 'Active' : 'Inactive',
      new Date(s.subscribed_at).toLocaleDateString(),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return {
    subscribers,
    totalCount: subscribers.length,
    activeCount: subscribers.filter((s) => s.is_active).length,
    isLoading,
    error,
    deleteSubscriber: deleteSubscriberMutation.mutate,
    isDeleting: deleteSubscriberMutation.isPending,
    exportToCSV,
  };
}
