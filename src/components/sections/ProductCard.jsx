import React from 'react';
import { MessageCircle, Star, Maximize2, Sparkles, Layers, Ban, ArrowRight } from 'lucide-react';

const ProductCard = ({ product, onExpand }) => {
  const handleConsult = () => {
    const message = `Hola ChoccoLovers! Estoy interesado en el producto: ${product.name}. ¿Me podrían dar más información o tomar mi pedido?`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=543875012118&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Handle single image or multiple images
  const mainImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : product.image;

  const isInStock = product.inStock !== false;

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-[#2A1610]/10 hover:border-[#D4AF37]/60 shadow-[0_10px_30px_rgba(26,15,11,0.06)] hover:shadow-[0_20px_45px_rgba(212,175,55,0.15)] transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gradient-to-r before:from-transparent before:via-[#D4AF37] before:to-transparent before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-500 before:z-30">
      
      {/* Top Image Container */}
      <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-[#F4EFE6] cursor-pointer" onClick={onExpand}>
        
        {/* Category Tag */}
        {product.tag && (
          <div className="absolute top-3.5 left-3.5 z-20 bg-[#1A0F0B]/90 backdrop-blur-md text-[#F8E8B4] border border-[#D4AF37]/30 text-[10px] font-bold uppercase px-3 py-1 rounded-full tracking-[0.2em] shadow-md">
            {product.tag}
          </div>
        )}
        
        {/* Featured Badge */}
        {product.isFeatured && (
          <div className="absolute top-3.5 right-3.5 z-20 bg-gradient-to-r from-[#D4AF37] via-[#F8E8B4] to-[#B38728] text-[#1A0F0B] text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-[0.2em] flex items-center gap-1.5 shadow-lg">
            <Sparkles size={11} className="fill-current" />
            <span>Destacado</span>
          </div>
        )}

        {/* Out of Stock Overlay */}
        {!isInStock && (
          <div className="absolute inset-0 z-30 bg-black/45 backdrop-blur-[2px] flex items-center justify-center">
            <div className="bg-[#83182A] text-white text-[10px] font-black uppercase px-4 py-2 rounded-full tracking-[0.25em] shadow-xl flex items-center gap-2 border border-white/20">
              <Ban size={13} />
              <span>Sin Stock</span>
            </div>
          </div>
        )}

        {/* Multi-image indicator */}
        {product.images && product.images.length > 1 && (
          <div className="absolute bottom-3.5 left-3.5 z-20 bg-black/65 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-white/10 shadow-sm">
            <Layers size={12} className="text-[#D4AF37]" />
            <span>{product.images.length} fotos</span>
          </div>
        )}

        {/* Zoom Icon Indicator on Hover */}
        <div className="absolute bottom-3.5 right-3.5 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="bg-black/60 backdrop-blur-md p-2 rounded-full text-white hover:text-[#D4AF37] border border-white/20 shadow-lg flex items-center gap-1 text-[10px] font-medium px-2.5">
            <Maximize2 size={13} />
            <span>Ver foto</span>
          </div>
        </div>

        {/* Product Image with smooth cinematic zoom */}
        <img 
          src={mainImage} 
          alt={product.name} 
          className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Subtle Dark Vignette on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F0B]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </div>
      
      {/* Product Information */}
      <div className="p-5 sm:p-7 bg-white relative z-10 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex justify-between items-center mb-2.5">
            <span className="text-[11px] font-bold text-[#B38A22] uppercase tracking-[0.22em]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 bg-[#FAF7F2] px-2 py-0.5 rounded-md border border-[#D4AF37]/25 shadow-sm">
              <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
              <span className="text-xs font-bold text-[#2A1610]">{product.rating}</span>
            </div>
          </div>
          
          <h3 className="text-lg sm:text-2xl font-serif font-bold text-[#1A0F0B] mb-2 leading-snug group-hover:text-[#B38A22] transition-colors">
            {product.name}
          </h3>
          
          <p className="text-[#6D4C41] text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 font-light border-l-2 border-[#D4AF37]/40 pl-3 line-clamp-2">
            {product.description}
          </p>
        </div>
        
        {/* Footer info: Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-[#2A1610]/10 mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Precio</span>
            <span className="text-xl sm:text-2xl font-serif font-black text-[#1A0F0B] tracking-tight">
              ${product.price.toLocaleString()}
            </span>
          </div>
          
          {/* WhatsApp Order Button */}
          {isInStock ? (
            <button 
              onClick={(e) => { e.stopPropagation(); handleConsult(); }}
              className="btn-shine-gold flex items-center gap-2 bg-[#1A0F0B] text-[#FAF7F2] border border-[#D4AF37]/60 hover:bg-[#D4AF37] hover:text-[#1A0F0B] hover:border-[#D4AF37] px-4 sm:px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 group/btn"
              aria-label={`Pedir ${product.name} por WhatsApp`}
            >
              <MessageCircle size={15} className="text-[#D4AF37] group-hover/btn:text-[#1A0F0B] transition-colors" />
              <span>Pedir</span>
              <ArrowRight size={13} className="hidden sm:inline-block opacity-60 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          ) : (
            <span className="text-xs font-bold text-[#83182A] uppercase tracking-wider">
              Agotado
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;