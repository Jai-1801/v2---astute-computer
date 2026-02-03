import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useImageUpload } from '@/hooks/useImageUpload';
import {
  useCaseStudyImages,
  useAddCaseStudyImage,
  useUpdateCaseStudyImage,
  useDeleteCaseStudyImage,
} from '@/hooks/useCaseStudyImages';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Upload, 
  Loader2, 
  Trash2, 
  GripVertical, 
  X,
  ImageIcon 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface GalleryManagerProps {
  caseStudyId: string | undefined;
}

export function GalleryManager({ caseStudyId }: GalleryManagerProps) {
  const { data: images = [], isLoading } = useCaseStudyImages(caseStudyId);
  const addImage = useAddCaseStudyImage();
  const updateImage = useUpdateCaseStudyImage();
  const deleteImage = useDeleteCaseStudyImage();
  const { uploadImage, isUploading } = useImageUpload();
  const [editingImage, setEditingImage] = useState<string | null>(null);
  const [editAlt, setEditAlt] = useState('');
  const [editCaption, setEditCaption] = useState('');

  const onDrop = async (acceptedFiles: File[]) => {
    if (!caseStudyId) return;

    for (const file of acceptedFiles) {
      const result = await uploadImage(file, 'gallery');
      if (result) {
        await addImage.mutateAsync({
          case_study_id: caseStudyId,
          image_url: result.url,
          display_order: images.length,
        });
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif'],
    },
    disabled: isUploading || !caseStudyId,
  });

  const handleDelete = async (imageId: string) => {
    if (!caseStudyId || !confirm('Delete this image?')) return;
    await deleteImage.mutateAsync({ id: imageId, caseStudyId });
  };

  const handleEdit = (imageId: string) => {
    const img = images.find((i) => i.id === imageId);
    if (img) {
      setEditAlt(img.alt_text || '');
      setEditCaption(img.caption || '');
      setEditingImage(imageId);
    }
  };

  const handleSaveEdit = async () => {
    if (!editingImage) return;
    await updateImage.mutateAsync({
      id: editingImage,
      alt_text: editAlt,
      caption: editCaption,
    });
    setEditingImage(null);
  };

  if (!caseStudyId) {
    return (
      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center text-muted-foreground">
        <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
        <p>Save the case study first to add gallery images</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Upload area */}
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer',
          isDragActive
            ? 'border-primary bg-primary/5'
            : 'border-border hover:border-muted-foreground/50',
          isUploading && 'pointer-events-none opacity-50'
        )}
      >
        <input {...getInputProps()} />
        {isUploading ? (
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Uploading...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center text-muted-foreground">
            <Upload className="h-8 w-8 mb-2" />
            <span className="font-medium">
              {isDragActive ? 'Drop images here' : 'Upload gallery images'}
            </span>
            <span className="text-xs mt-1">Drag & drop or click to select</span>
          </div>
        )}
      </div>

      {/* Gallery grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : images.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="group relative aspect-square rounded-lg overflow-hidden border border-border bg-muted"
            >
              <img
                src={image.image_url}
                alt={image.alt_text || 'Gallery image'}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay with actions */}
              <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => handleEdit(image.id)}
                >
                  Edit
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(image.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Drag handle */}
              <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <GripVertical className="h-4 w-4 text-foreground" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-4">
          No gallery images yet
        </p>
      )}

      {/* Edit dialog */}
      <Dialog open={!!editingImage} onOpenChange={() => setEditingImage(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Image Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Alt Text</label>
              <Input
                value={editAlt}
                onChange={(e) => setEditAlt(e.target.value)}
                placeholder="Describe the image for accessibility"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Caption</label>
              <Input
                value={editCaption}
                onChange={(e) => setEditCaption(e.target.value)}
                placeholder="Optional caption"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditingImage(null)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit}>Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
