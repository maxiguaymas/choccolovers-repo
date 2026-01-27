import React from 'react';
import { MessageCircle, Star, Maximize2 } from 'lucide-react';

const ProductCard = ({ product, onExpand }) => {
  const handleConsult = () => {
    const message = `Hola ChoccoLovers! Estoy interesado en el producto: ${product.name}. ¿Me podrían dar más información o tomar mi pedido?`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=543875012118&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="group relative bg-white transition-all duration-500 hover:-translate-y-2">
      {/* Card Body */}
      <div className="relative overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-500">
        
        {/* Image Container */}
        <div className="relative h-80 overflow-hidden bg-[#f3f3f3] cursor-pointer" onClick={onExpand}>
          {product.tag && (
            <div className="absolute top-4 left-4 z-20 bg-[#3E2723] text-[#D4AF37] text-[10px] font-bold uppercase px-3 py-1 tracking-widest">
              {product.tag}
            </div>
          )}
          
          {/* Zoom Icon Indicator */}
          <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-black/20 backdrop-blur-sm p-2 rounded-full text-white">
               <Maximize2 size={18} />
            </div>
          </div>

          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
          />
          {/* Dark Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#3E2723]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Quick Action Button - Centered */}
          <div className="absolute inset-0 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
             <button 
               onClick={(e) => { e.stopPropagation(); handleConsult(); }}
               className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 bg-white/10 backdrop-blur-md border border-white/50 text-white font-bold py-3 px-8 rounded-none hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#3E2723] uppercase text-xs tracking-widest flex items-center gap-3"
             >
               <MessageCircle className="w-4 h-4" />
               Consultar
             </button>
          </div>
        </div>
        
        {/* Info */}
        <div className="p-8 bg-white relative z-10 border-t border-gray-100">
          <div className="flex justify-between items-start mb-3">
             <div className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.2em]">{product.category}</div>
             <div className="flex items-center gap-1">
               <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
               <span className="text-xs font-bold text-gray-400">{product.rating}</span>
             </div>
          </div>
          
          <h3 className="text-2xl font-serif font-bold text-[#3E2723] mb-3 leading-tight group-hover:text-[#D4AF37] transition-colors">
            {product.name}
          </h3>
          
          <p className="text-gray-500 text-sm leading-relaxed mb-6 font-light border-l-2 border-[#D4AF37]/30 pl-3">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-100/50">
            <span className="text-xl font-serif font-black text-[#3E2723]">${product.price.toLocaleString()}</span>
            
            {/* Botón visible solo en móvil para mejorar UX responsive */}
            <button 
              onClick={(e) => { e.stopPropagation(); handleConsult(); }}
              className="md:hidden flex items-center gap-2 bg-[#3E2723] text-white px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-[#3E2723] transition-colors shadow-lg active:scale-95"
            >
              <MessageCircle size={16} />
              Consultar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;