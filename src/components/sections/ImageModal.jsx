import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const ImageModal = ({ isOpen, onClose, images = [], altText }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [prevFirstImg, setPrevFirstImg] = useState(images[0]);
  if (images[0] !== prevFirstImg) {
    setPrevFirstImg(images[0]);
    setCurrentIndex(0);
  }

  const handlePrev = useCallback((e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback((e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Navegación por teclado (Senior UX touch)
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev(e);
      if (e.key === 'ArrowRight') handleNext(e);
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handlePrev, handleNext, onClose]);

  if (!isOpen || images.length === 0) return null;
  
  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#120A07]/95 backdrop-blur-2xl p-4 sm:p-6 animate-fade-in" 
      onClick={onClose}
    >
      {/* Botón Cerrar */}
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-[#D4AF37] transition-all p-2 sm:p-3 z-[110] bg-black/40 sm:bg-white/5 hover:bg-white/10 rounded-full border border-white/20 hover:border-[#D4AF37]/50 hover:rotate-90 duration-300 shadow-xl"
        aria-label="Cerrar modal"
      >
        <X className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>

      <div className="relative w-full max-w-5xl flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header / Product Name */}
        {altText && (
          <div className="mb-3 sm:mb-4 text-center px-4">
            <h4 className="text-lg sm:text-2xl font-serif font-bold text-white tracking-wide flex items-center justify-center gap-2">
              <span>{altText}</span>
              <Sparkles size={16} className="text-[#D4AF37]" />
            </h4>
          </div>
        )}

        {/* Contenedor Principal de la Imagen */}
        <div className="relative w-full flex items-center justify-center group">
          {images.length > 1 && (
            <>
              <button 
                onClick={handlePrev} 
                className="absolute left-1 sm:-left-16 p-2 sm:p-3 text-white/70 hover:text-[#D4AF37] transition-all bg-black/50 hover:bg-black/80 rounded-full z-20 border border-white/10 hover:border-[#D4AF37]/50 backdrop-blur-md shadow-2xl"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-6 h-6 sm:w-9 sm:h-9" />
              </button>
              <button 
                onClick={handleNext} 
                className="absolute right-1 sm:-right-16 p-2 sm:p-3 text-white/70 hover:text-[#D4AF37] transition-all bg-black/50 hover:bg-black/80 rounded-full z-20 border border-white/10 hover:border-[#D4AF37]/50 backdrop-blur-md shadow-2xl"
                aria-label="Foto siguiente"
              >
                <ChevronRight className="w-6 h-6 sm:w-9 sm:h-9" />
              </button>
            </>
          )}
          
          <div className="relative overflow-hidden rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-white/10 bg-black/40 max-h-[70vh] flex items-center justify-center">
            <img 
              src={images[currentIndex]} 
              alt={`${altText || 'Producto'} - ${currentIndex + 1}`} 
              className="max-w-full max-h-[68vh] object-contain rounded-2xl transition-all duration-500" 
            />
            {images.length > 1 && (
              <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md border border-[#D4AF37]/40 text-[#F8E8B4] text-xs font-bold px-3.5 py-1.5 rounded-full shadow-lg">
                {currentIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </div>

        {/* Tira de Miniaturas */}
        {images.length > 1 && (
          <div className="flex gap-3 mt-6 overflow-x-auto p-2 max-w-full scrollbar-hide">
            {images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentIndex(idx)} 
                className={`w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  currentIndex === idx 
                    ? 'border-[#D4AF37] scale-105 shadow-[0_0_15px_rgba(212,175,55,0.4)] opacity-100' 
                    : 'border-transparent opacity-40 hover:opacity-80 hover:border-white/30'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageModal;