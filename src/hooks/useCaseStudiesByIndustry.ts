import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type CaseStudy = Tables<'case_studies'>;

export function useCaseStudiesByIndustry(industry: string | undefined) {
  return useQuery({
    queryKey: ['case-studies', 'industry', industry],
    queryFn: async (): Promise<CaseStudy[]> => {
      if (!industry) return [];
      
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .eq('is_published', true)
        .ilike('industry', `%${industry}%`)
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data || [];
    },
    enabled: !!industry,
  });
}
