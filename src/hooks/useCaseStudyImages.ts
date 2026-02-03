import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface CaseStudyImage {
  id: string;
  case_study_id: string;
  image_url: string;
  alt_text: string | null;
  caption: string | null;
  display_order: number;
  created_at: string;
}

export interface CaseStudyImageInput {
  case_study_id: string;
  image_url: string;
  alt_text?: string | null;
  caption?: string | null;
  display_order?: number;
}

export function useCaseStudyImages(caseStudyId: string | undefined) {
  return useQuery({
    queryKey: ['case-study-images', caseStudyId],
    queryFn: async () => {
      if (!caseStudyId) return [];

      const { data, error } = await supabase
        .from('case_study_images')
        .select('*')
        .eq('case_study_id', caseStudyId)
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as CaseStudyImage[];
    },
    enabled: !!caseStudyId,
  });
}

export function useAddCaseStudyImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CaseStudyImageInput) => {
      const { data, error } = await supabase
        .from('case_study_images')
        .insert(input)
        .select()
        .single();

      if (error) throw error;
      return data as CaseStudyImage;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['case-study-images', data.case_study_id],
      });
    },
  });
}

export function useUpdateCaseStudyImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...input
    }: Partial<CaseStudyImageInput> & { id: string }) => {
      const { data, error } = await supabase
        .from('case_study_images')
        .update(input)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as CaseStudyImage;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['case-study-images', data.case_study_id],
      });
    },
  });
}

export function useDeleteCaseStudyImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      caseStudyId,
    }: {
      id: string;
      caseStudyId: string;
    }) => {
      const { error } = await supabase
        .from('case_study_images')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { caseStudyId };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['case-study-images', data.caseStudyId],
      });
    },
  });
}

export function useReorderCaseStudyImages() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      caseStudyId,
      images,
    }: {
      caseStudyId: string;
      images: { id: string; display_order: number }[];
    }) => {
      const updates = images.map((img) =>
        supabase
          .from('case_study_images')
          .update({ display_order: img.display_order })
          .eq('id', img.id)
      );

      await Promise.all(updates);
      return { caseStudyId };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['case-study-images', data.caseStudyId],
      });
    },
  });
}
