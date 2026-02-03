import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CaseStudyImage } from '@/hooks/useCaseStudyImages';

interface CaseStudyGalleryProps {
  images: CaseStudyImage[];
}

export function CaseStudyGallery({ images }: CaseStudyGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null && selectedIndex < images.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setSelectedIndex(index)}
            className="group relative aspect-square overflow-hidden rounded-lg bg-muted"
          >
            <img
              src={image.image_url}
              alt={image.alt_text || 'Gallery image'}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <Dialog open={selectedIndex !== null} onOpenChange={() => setSelectedIndex(null)}>
        <DialogContent className="max-w-5xl w-full h-[90vh] p-0 bg-background/95 backdrop-blur-md border-none">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10"
              onClick={() => setSelectedIndex(null)}
            >
              <X className="h-5 w-5" />
            </Button>

            {/* Navigation */}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'absolute left-4 z-10',
                selectedIndex === 0 && 'opacity-50 pointer-events-none'
              )}
              onClick={handlePrev}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'absolute right-4 z-10',
                selectedIndex === images.length - 1 && 'opacity-50 pointer-events-none'
              )}
              onClick={handleNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Image */}
            {selectedImage && (
              <div className="max-w-full max-h-full p-8">
                <img
                  src={selectedImage.image_url}
                  alt={selectedImage.alt_text || 'Gallery image'}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg"
                />
                {selectedImage.caption && (
                  <p className="text-center text-muted-foreground mt-4">
                    {selectedImage.caption}
                  </p>
                )}
              </div>
            )}

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-muted-foreground">
              {selectedIndex !== null && `${selectedIndex + 1} / ${images.length}`}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
