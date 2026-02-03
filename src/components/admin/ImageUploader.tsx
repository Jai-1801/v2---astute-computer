import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useImageUpload } from '@/hooks/useImageUpload';
import { Button } from '@/components/ui/button';
import { Upload, X, Loader2, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  value: string | null;
  onChange: (url: string | null) => void;
  folder?: string;
  className?: string;
}

export function ImageUploader({
  value,
  onChange,
  folder = 'thumbnails',
  className,
}: ImageUploaderProps) {
  const { uploadImage, isUploading, error } = useImageUpload();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const result = await uploadImage(file, folder);
      if (result) {
        onChange(result.url);
      }
    },
    [uploadImage, folder, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif'],
    },
    maxFiles: 1,
    disabled: isUploading,
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
  };

  return (
    <div className={className}>
      <div
        {...getRootProps()}
        className={cn(
          'relative border-2 border-dashed rounded-lg transition-colors cursor-pointer',
          isDragActive
            ? 'border-primary bg-primary/5'
            : 'border-border hover:border-muted-foreground/50',
          isUploading && 'pointer-events-none opacity-50',
          value ? 'aspect-video' : 'aspect-video'
        )}
      >
        <input {...getInputProps()} />

        {value ? (
          <>
            <img
              src={value}
              alt="Thumbnail preview"
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-background/60 opacity-0 hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleRemove}
              >
                <X className="h-4 w-4 mr-1" />
                Remove
              </Button>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
            {isUploading ? (
              <>
                <Loader2 className="h-10 w-10 animate-spin mb-2" />
                <span className="text-sm">Uploading...</span>
              </>
            ) : (
              <>
                {isDragActive ? (
                  <Upload className="h-10 w-10 mb-2" />
                ) : (
                  <ImageIcon className="h-10 w-10 mb-2" />
                )}
                <span className="text-sm font-medium">
                  {isDragActive ? 'Drop image here' : 'Click or drag image'}
                </span>
                <span className="text-xs mt-1">
                  PNG, JPG, WebP up to 5MB
                </span>
              </>
            )}
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-destructive mt-2">{error}</p>
      )}
    </div>
  );
}
