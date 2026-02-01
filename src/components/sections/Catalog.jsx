import React, { useState } from 'react';
import { Loader } from 'lucide-react';
import ProductCard from './ProductCard';
import ImageModal from './ImageModal';

const Catalog = ({ products, categories, loading }) => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredProducts = activeCategory === "Todos" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  // Senior Logic: Sort featured products to the top
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return 0;
  });

  return (
    <section id="catalogo" className="py-28 bg-[#FFFAF0] relative overflow-hidden">
      {/* Elemento decorativo de fondo */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

      <ImageModal 
        isOpen={!!selectedImage} 
        onClose={() => setSelectedImage(null)} 
        images={selectedImage ? (selectedImage.images?.length > 0 ? selectedImage.images : [selectedImage.image]) : []} 
        altText={selectedImage?.name} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Nuestra Selección</span>
          <h2 className="text-5xl md:text-6xl font-serif font-black text-[#3E2723] mb-6">El Catálogo</h2>
          <div className="w-1 h-16 bg-[#D4AF37] mx-auto mb-8"></div>
          <p className="text-gray-500 text-lg font-light leading-relaxed">
            Cada pieza es una obra de arte comestible, diseñada para despertar los sentidos y crear momentos inolvidables.
          </p>
        </div>

        {/* Filters - Modern Minimalist */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.name)}
              className={`pb-2 text-sm font-bold uppercase tracking-widest transition-all duration-300 relative group
                ${activeCategory === category.name 
                  ? 'text-[#3E2723]' 
                  : 'text-gray-400 hover:text-[#D4AF37]'}`}
            >
              {category.name}
              <span className={`absolute bottom-0 left-0 h-0.5 bg-[#3E2723] transition-all duration-300 ${activeCategory === category.name ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader className="w-12 h-12 text-[#D4AF37] animate-spin mb-4" />
            <p className="text-[#3E2723] font-serif text-lg animate-pulse">Preparando la chocolatería...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {sortedProducts.map(product => (
              <ProductCard key={product.id} product={product} onExpand={() => setSelectedImage(product)} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Catalog;