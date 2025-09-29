import React from 'react';
import { Loader as Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Analyzing retinal image..." 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-teal-100 rounded-full"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-teal-500 rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute top-2 left-2 w-12 h-12 flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-teal-600 animate-pulse" />
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <p className="text-lg font-medium text-slate-800">{message}</p>
        <p className="text-sm text-slate-600">
          This may take a few seconds...
        </p>
      </div>
      
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
};