import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';

export interface Service {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  long_description: string | null;
  content: Json;
  icon: string | null;
  features: string[];
  benefits: string[];
  meta_title: string | null;
  meta_description: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ServiceInput {
  title: string;
  slug: string;
  short_description: string;
  long_description?: string | null;
  content?: Json;
  icon?: string | null;
  features?: string[];
  benefits?: string[];
  meta_title?: string | null;
  meta_description?: string | null;
  display_order?: number;
  is_published?: boolean;
}

// Fetch all published services
export function usePublishedServices() {
  return useQuery({
    queryKey: ['services', 'published'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as Service[];
    },
  });
}

// Fetch all services for admin
export function useAllServices() {
  return useQuery({
    queryKey: ['services', 'all'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as Service[];
    },
  });
}

// Fetch single service by slug
export function useServiceBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: ['service', slug],
    queryFn: async () => {
      if (!slug) return null;
      
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .maybeSingle();

      if (error) throw error;
      return data as Service | null;
    },
    enabled: !!slug,
  });
}

// Fetch single service by ID
export function useServiceById(id: string | undefined) {
  return useQuery({
    queryKey: ['service', 'id', id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      return data as Service | null;
    },
    enabled: !!id,
  });
}

// Update service mutation
export function useUpdateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...input }: ServiceInput & { id: string }) => {
      const { data, error } = await supabase
        .from('services')
        .update(input)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Service;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['service', data.slug] });
      queryClient.invalidateQueries({ queryKey: ['service', 'id', data.id] });
    },
  });
}

// Get case studies related to a service
export function useCaseStudiesByService(serviceSlug: string | undefined) {
  return useQuery({
    queryKey: ['case-studies', 'by-service', serviceSlug],
    queryFn: async () => {
      if (!serviceSlug) return [];
      
      // Map service slugs to service names used in case_studies.services array
      const serviceNameMap: Record<string, string> = {
        'document-digitization': 'Document Digitization',
        'ai-automation': 'AI Automation',
        'custom-software-development': 'Custom Software',
        'digital-transformation': 'Digital Transformation',
      };

      const serviceName = serviceNameMap[serviceSlug];
      if (!serviceName) return [];

      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .eq('is_published', true)
        .contains('services', [serviceName])
        .order('display_order', { ascending: true })
        .limit(3);

      if (error) throw error;
      return data;
    },
    enabled: !!serviceSlug,
  });
}
