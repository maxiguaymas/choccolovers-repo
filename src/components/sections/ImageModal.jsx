import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const ImageModal = ({ isOpen, onClose, images = [], altText }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reiniciar al primer elemento cuando se abre el modal con nuevas imágenes
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
    }
  }, [isOpen, images]);

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
  }, [isOpen, images, currentIndex, onClose]);

  if (!isOpen || images.length === 0) return null;

  const handlePrev = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-fade-in" onClick={onClose}>
      {/* Botón Cerrar */}
      <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white transition-all p-2 z-[110] hover:rotate-90 duration-300">
        <X size={40} />
      </button>

      <div className="relative w-full max-w-6xl flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        {/* Contenedor Principal */}
        <div className="relative w-full flex items-center justify-center group">
          {images.length > 1 && (
            <>
              <button onClick={handlePrev} className="absolute left-0 md:-left-20 p-3 text-white/30 hover:text-white transition-all bg-white/5 hover:bg-white/10 rounded-full z-20">
                <ChevronLeft size={48} />
              </button>
              <button onClick={handleNext} className="absolute right-0 md:-right-20 p-3 text-white/30 hover:text-white transition-all bg-white/5 hover:bg-white/10 rounded-full z-20">
                <ChevronRight size={48} />
              </button>
            </>
          )}
          
          <div className="relative overflow-hidden rounded-xl shadow-2xl bg-black/20">
            <img 
              src={images[currentIndex]} 
              alt={`${altText} - ${currentIndex + 1}`} 
              className="max-w-full max-h-[70vh] object-contain transition-all duration-500" 
            />
            {images.length > 1 && (
              <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full">
                {currentIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </div>

        {/* Tira de Miniaturas (Responsive) */}
        {images.length > 1 && (
          <div className="flex gap-3 mt-8 overflow-x-auto pb-2 max-w-full scrollbar-hide">
            {images.map((img, idx) => (
              <button key={idx} onClick={() => setCurrentIndex(idx)} className={`w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-300 ${currentIndex === idx ? 'border-[#D4AF37] scale-110 shadow-lg' : 'border-transparent opacity-40 hover:opacity-80'}`}>
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