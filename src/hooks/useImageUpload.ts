import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UploadResult {
  url: string;
  path: string;
}

export function useImageUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (
    file: File,
    folder: string = 'thumbnails'
  ): Promise<UploadResult | null> => {
    setIsUploading(true);
    setError(null);

    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('File must be an image');
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File must be less than 5MB');
      }

      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      // Upload to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('case-studies')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('case-studies')
        .getPublicUrl(fileName);

      return {
        url: publicUrl,
        path: fileName,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed';
      setError(message);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const deleteImage = async (path: string): Promise<boolean> => {
    try {
      const { error } = await supabase.storage
        .from('case-studies')
        .remove([path]);

      if (error) throw error;
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Delete failed';
      setError(message);
      return false;
    }
  };

  return {
    uploadImage,
    deleteImage,
    isUploading,
    error,
    clearError: () => setError(null),
  };
}
