import React from 'react';
import { X } from 'lucide-react';

const ImageModal = ({ isOpen, onClose, imageUrl, altText }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in" onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2">
        <X size={32} />
      </button>
      <img 
        src={imageUrl} 
        alt={altText} 
        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl cursor-default" 
        onClick={(e) => e.stopPropagation()} 
      />
    </div>
  );
};

export default ImageModal;