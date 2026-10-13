import React, { useState } from 'react';
import { Loader, Star, Sparkles } from 'lucide-react';
import ProductCard from './ProductCard';
import ImageModal from './ImageModal';

const Catalog = ({ products, categories, loading }) => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Senior Logic: Sort categories (Featured first, after "Todos")
  const sortedCategories = [...categories].sort((a, b) => {
    if (a.name === "Todos") return -1;
    if (b.name === "Todos") return 1;
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return 0;
  });

  const filteredProducts = activeCategory === "Todos" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  // Senior Logic: Sort products (Featured Categories first when "Todos", then In Stock, then Featured products)
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (activeCategory === "Todos") {
      const aCat = categories.find(c => c.name === a.category);
      const bCat = categories.find(c => c.name === b.category);
      const aCatFeatured = aCat?.isFeatured || false;
      const bCatFeatured = bCat?.isFeatured || false;

      if (aCatFeatured && !bCatFeatured) return -1;
      if (!aCatFeatured && bCatFeatured) return 1;
    }

    const aInStock = a.inStock !== false;
    const bInStock = b.inStock !== false;

    if (aInStock && !bInStock) return -1;
    if (!aInStock && bInStock) return 1;

    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return 0;
  });

  // Limitamos a 6 productos inicialmente si no está expandido
  const INITIAL_LIMIT = 6;
  const visibleProducts = isExpanded ? sortedProducts : sortedProducts.slice(0, INITIAL_LIMIT);

  return (
    <section id="catalogo" className="py-24 sm:py-32 bg-[#FAF7F2] relative overflow-hidden">
      {/* Elementos decorativos de fondo con iluminación dorada cálida */}
      <div className="absolute top-10 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-[#3E2723]/5 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/3"></div>

      <ImageModal 
        isOpen={!!selectedImage} 
        onClose={() => setSelectedImage(null)} 
        images={selectedImage ? (selectedImage.images?.length > 0 ? selectedImage.images : [selectedImage.image]) : []} 
        altText={selectedImage?.name} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-black text-[#1A0F0B] mb-4">
            Nuestro Catálogo
          </h2>
          <div className="w-16 h-1 bg-[#D4AF37] mx-auto rounded-full"></div>
        </div>

        {/* Filters - Luxury Minimalist Pills */}
        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-14 sm:mb-16">
          {sortedCategories.map(category => {
            const isActive = activeCategory === category.name;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.name)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 flex items-center gap-2 border ${
                  isActive 
                    ? 'bg-[#1A0F0B] text-[#FAF7F2] border-[#1A0F0B] shadow-[0_4px_15px_rgba(26,15,11,0.15)] scale-105' 
                    : 'bg-white/80 text-[#5D4037] border-[#2A1610]/10 hover:border-[#D4AF37] hover:text-[#1A0F0B] hover:bg-white'
                }`}
              >
                {category.isFeatured && (
                  <Star size={11} className={isActive ? "fill-[#D4AF37] text-[#D4AF37]" : "fill-[#D4AF37] text-[#D4AF37] opacity-70"} />
                )}
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="relative">
              <div className="w-14 h-14 rounded-full border-2 border-[#D4AF37]/20 border-t-[#D4AF37] animate-spin"></div>
              <Sparkles className="w-5 h-5 text-[#D4AF37] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <p className="text-[#1A0F0B] font-serif text-lg font-bold mt-5 tracking-wide">
              Preparando la chocolatería...
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {visibleProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onExpand={() => setSelectedImage(product)} 
                />
              ))}
            </div>

            {/* Botón Ver Más */}
            {!isExpanded && sortedProducts.length > INITIAL_LIMIT && (
              <div className="mt-16 sm:mt-20 text-center">
                <button 
                  onClick={() => setIsExpanded(true)}
                  className="btn-shine-gold inline-flex items-center gap-3 px-10 py-4 bg-transparent border-2 border-[#1A0F0B] hover:border-[#D4AF37] text-[#1A0F0B] hover:bg-[#1A0F0B] hover:text-[#FAF7F2] font-black uppercase tracking-[0.25em] text-xs rounded-full transition-all duration-300 shadow-sm hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <span>Ver Colección Completa ({sortedProducts.length})</span>
                  <Sparkles size={14} className="text-[#D4AF37]" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Catalog;