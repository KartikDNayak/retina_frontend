import React, { useCallback, useState } from 'react';
import { Upload, X, FileImage } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  uploadedImage: string | null;
  onRemoveImage: () => void;
  isLoading: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  uploadedImage,
  onRemoveImage,
  isLoading
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (isValidImageFile(file)) {
        onImageUpload(file);
      }
    }
  }, [onImageUpload]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (isValidImageFile(file)) {
        onImageUpload(file);
      }
    }
  }, [onImageUpload]);

  const isValidImageFile = (file: File) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    return validTypes.includes(file.type);
  };

  if (uploadedImage) {
    return (
      <div className="relative w-full max-w-md mx-auto">
        <div className="relative border-2 border-slate-200 rounded-2xl overflow-hidden bg-white">
          <img
            src={uploadedImage}
            alt="Uploaded retinal image"
            className="w-full h-64 object-cover"
          />
          {!isLoading && (
            <button
              onClick={onRemoveImage}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-md"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <p className="text-sm text-slate-600 mt-2 text-center">
          Retinal image ready for analysis
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className={cn(
          "border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 cursor-pointer hover:bg-slate-50",
          isDragOver ? "border-teal-400 bg-teal-50" : "border-slate-300",
          isLoading && "opacity-50 cursor-not-allowed"
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !isLoading && document.getElementById('file-input')?.click()}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center",
            isDragOver ? "bg-teal-100" : "bg-slate-100"
          )}>
            <Upload className={cn(
              "w-8 h-8",
              isDragOver ? "text-teal-600" : "text-slate-500"
            )} />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-800">
              Drop your retinal image here
            </h3>
            <p className="text-slate-600">
              or <span className="text-teal-600 font-medium">browse files</span>
            </p>
            <p className="text-sm text-slate-500">
              Supports JPEG, JPG, PNG formats
            </p>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-slate-500">
            <FileImage size={16} />
            <span>Max file size: 10MB</span>
          </div>
        </div>
      </div>
      
      <input
        id="file-input"
        type="file"
        accept=".jpeg,.jpg,.png"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isLoading}
      />
    </div>
  );
};