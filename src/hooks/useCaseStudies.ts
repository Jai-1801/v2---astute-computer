import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';

export interface CaseStudyResult {
  label: string;
  value: string;
  context?: string;
}

export interface CaseStudyFAQ {
  question: string;
  answer: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  category: string;
  short_description: string;
  thumbnail_url: string | null;
  thumbnail_alt: string | null;
  stat_value: string | null;
  stat_metric: string | null;
  content: Json;
  is_published: boolean;
  published_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
  // New SEO fields - kept as Json since that's what DB returns
  industry: string | null;
  services: string[] | null;
  tech_stack: string[] | null;
  results: Json | null;
  client_type: string | null;
  faqs: Json | null;
  related_case_study_ids: string[] | null;
  related_service_ids: string[] | null;
  section_content: Json | null;
}

export interface CaseStudyInput {
  title: string;
  slug: string;
  category: string;
  short_description: string;
  thumbnail_url?: string | null;
  thumbnail_alt?: string | null;
  stat_value?: string | null;
  stat_metric?: string | null;
  content?: Json;
  is_published?: boolean;
  published_at?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  display_order?: number;
  // New SEO fields
  industry?: string | null;
  services?: string[] | null;
  tech_stack?: string[] | null;
  results?: Json | null;
  client_type?: string | null;
  faqs?: Json | null;
  related_case_study_ids?: string[] | null;
  related_service_ids?: string[] | null;
  section_content?: Json | null;
}

// Fetch all published case studies for frontend
export function usePublishedCaseStudies() {
  return useQuery({
    queryKey: ['case-studies', 'published'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as CaseStudy[];
    },
  });
}

// Fetch all case studies for admin
export function useAllCaseStudies() {
  return useQuery({
    queryKey: ['case-studies', 'all'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as CaseStudy[];
    },
  });
}

// Fetch single case study by slug
export function useCaseStudyBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: ['case-study', slug],
    queryFn: async () => {
      if (!slug) return null;
      
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      return data as CaseStudy;
    },
    enabled: !!slug,
  });
}

// Fetch single case study by ID
export function useCaseStudyById(id: string | undefined) {
  return useQuery({
    queryKey: ['case-study', 'id', id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as CaseStudy;
    },
    enabled: !!id,
  });
}

// Create case study mutation
export function useCreateCaseStudy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CaseStudyInput) => {
      const { data, error } = await supabase
        .from('case_studies')
        .insert(input)
        .select()
        .single();

      if (error) throw error;
      return data as CaseStudy;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['case-studies'] });
    },
  });
}

// Update case study mutation
export function useUpdateCaseStudy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...input }: CaseStudyInput & { id: string }) => {
      const { data, error } = await supabase
        .from('case_studies')
        .update(input)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as CaseStudy;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['case-studies'] });
      queryClient.invalidateQueries({ queryKey: ['case-study', data.slug] });
      queryClient.invalidateQueries({ queryKey: ['case-study', 'id', data.id] });
    },
  });
}

// Delete case study mutation
export function useDeleteCaseStudy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('case_studies')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['case-studies'] });
    },
  });
}

// Generate unique slug
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
