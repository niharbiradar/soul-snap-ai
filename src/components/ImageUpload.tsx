import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, Camera, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  selectedImage?: File | null;
  isLoading?: boolean;
}

export function ImageUpload({ onImageSelect, selectedImage, isLoading }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const clearImage = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
        className="hidden"
      />
      
      {previewUrl ? (
        <Card className="relative overflow-hidden bg-card/50 backdrop-blur-sm border-accent/20">
          <div className="aspect-square relative">
            <img
              src={previewUrl}
              alt="Selected selfie"
              className="w-full h-full object-cover"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={clearImage}
              disabled={isLoading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ) : (
        <Card
          className={cn(
            "border-2 border-dashed border-accent/30 bg-card/20 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:border-accent/50 hover:bg-card/30",
            dragActive && "border-accent bg-card/40 scale-105"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="aspect-square flex flex-col items-center justify-center p-8 text-center">
            <div className="mb-4 p-4 rounded-full bg-accent/10 animate-float">
              <Camera className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Upload Your Selfie
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Drag & drop or click to select your photo
            </p>
            <Button variant="cosmic" size="sm" className="pointer-events-none">
              <Upload className="h-4 w-4 mr-2" />
              Choose Photo
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}