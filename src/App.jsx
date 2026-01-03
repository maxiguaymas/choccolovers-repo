import React, { useState, useEffect, Suspense, lazy } from 'react';
import { MessageCircle, Star, Menu, X, Instagram, Facebook, Award, Gift, Truck, Maximize2, Loader } from 'lucide-react';
import { db, auth } from './config/firebaseConfig';
import { collection, onSnapshot, getDocs } from 'firebase/firestore';

const AdminPanel = lazy(() => import('./AdminPanel.jsx'));
// --- Estilos Globales e Importación de Fuentes ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Great+Vibes&display=swap');
    
    body { font-family: 'Montserrat', sans-serif; overflow-x: hidden; }
    h1, h2, h3, h4 { font-family: 'Playfair Display', serif; }
    .font-script { font-family: 'Great Vibes', cursive; }
    
    /* Dorado Luminoso (Para fondo oscuro) */
    .text-gold-gradient {
      background: linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      background-size: 200% auto;
      animation: shine 4s linear infinite;
    }

    /* NUEVO: Dorado Intenso (Para fondo blanco - Scroll) 
       Usamos tonos más cobrizos y oscuros para garantizar contraste */
    .text-gold-gradient-scrolled {
      background: linear-gradient(to right, #8B4513, #D2691E, #B8860B, #D2691E, #8B4513);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      background-size: 200% auto;
      animation: shine 4s linear infinite;
    }

    @keyframes shine {
      to {
        background-position: 200% center;
      }
    }

    /* Animación suave para el hero */
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }

    /* Animación rápida para el menú móvil */
    .animate-fade-in {
      animation: fadeIn 0.2s ease-out forwards;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .glass-panel {
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.3);
    }
  `}</style>
);

// --- Componentes ---

const Navbar = ({ isScrolled }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 border-b ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg border-gray-100 py-2' : 'bg-transparent border-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Brand Reformado */}
          <div className="flex items-center group cursor-pointer">
            <div className="flex flex-col md:flex-row md:items-baseline">
              <span className={`text-2xl md:text-3xl font-black tracking-widest ${isScrolled ? 'text-[#3E2723]' : 'text-white'} drop-shadow-sm`}>
                CHOCCO
              </span>
              {/* Aquí aplicamos la lógica condicional para la clase del gradiente */}
              <span className={`font-script text-3xl md:text-4xl ml-1 md:-mt-2 ${isScrolled ? 'text-gold-gradient-scrolled' : 'text-gold-gradient'} transform group-hover:scale-110 transition-transform duration-300`}>
                Lovers
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-10 items-center">
            {['Inicio', 'Catálogo', 'Contacto'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-').replace('á', 'a')}`} 
                className={`text-xs font-bold uppercase tracking-widest hover:text-[#D4AF37] transition-all relative group ${isScrolled ? 'text-gray-800' : 'text-white/90'}`}
              >
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all group-hover:w-full"></span>
              </a>
            ))}
            <a 
                href="https://api.whatsapp.com/send?phone=543875012118&text=Hola%20ChoccoLovers!%20Vi%20su%20web%20y%20quisiera%20hacer%20una%20consulta"
                target="_blank"
                rel="noopener noreferrer" 
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full border-2 transition-all transform hover:-translate-y-1 hover:shadow-lg ${isScrolled ? 'border-[#3E2723] text-[#3E2723] hover:bg-[#3E2723] hover:text-white' : 'border-white text-white hover:bg-white hover:text-[#3E2723]'}`}
            >
              <MessageCircle size={18} />
              <span className="text-xs font-black uppercase tracking-widest">Whatsapp</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
              {isMobileMenuOpen ? (
                <X className={`w-8 h-8 ${isScrolled ? 'text-[#3E2723]' : 'text-white'}`} />
              ) : (
                <Menu className={`w-8 h-8 ${isScrolled ? 'text-[#3E2723]' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown with Glassmorphism */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute w-full top-full left-0 glass-panel border-t border-gray-100 shadow-2xl animate-fade-in">
          <div className="px-6 pt-4 pb-8 space-y-2">
             {['Inicio', 'Catálogo', 'Contacto'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-').replace('á', 'a')}`}
                className="block px-4 py-4 text-lg font-serif font-bold text-[#3E2723] hover:text-[#D4AF37] border-b border-gray-100/50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <div id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Parallax */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=1920" 
          alt="Chocolate Artesanal de fondo" 
          className="w-full h-full object-cover scale-110 motion-safe:animate-slow-zoom" 
          style={{ animationDuration: '30s' }}
        />
        {/* Degradado sofisticado para mejor lectura */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#3E2723]"></div>
        {/* Textura de ruido sutil para calidad visual */}
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        {/* AJUSTE DE MARGEN: Reducido de mt-32 a mt-20 para mejor equilibrio visual */}
        <div className="mb-6 mt-8 md:mt-20 animate-fade-in-up">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-black/30 backdrop-blur-sm">
             <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
             {/* CAMBIO DE TEXTO: Celeste Villagran */}
             <span className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase">Celeste Villagran</span>
           </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-serif font-black text-white mb-2 leading-none tracking-tight drop-shadow-2xl">
          CHOCCO
        </h1>
        <h1 className="font-script text-7xl md:text-9xl text-gold-gradient mb-8 -mt-4 md:-mt-8 transform -rotate-2">
          Lovers
        </h1>

        {/* CAMBIO DE FRASE: Más profesional y directa */}
        <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
          Chocolatería artesanal de alta calidad. 
          <span className="block mt-2 font-medium text-white">Elaboramos cada pieza a mano con los mejores ingredientes.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center w-full">
          <a href="#catalogo" className="group relative px-10 py-5 bg-[#D4AF37] overflow-hidden rounded-none skew-x-[-10deg] hover:bg-[#C5A028] transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            <div className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full skew-x-12 group-hover:animate-shine"></div>
            <span className="block text-[#3E2723] font-black uppercase tracking-widest skew-x-[10deg] text-sm">Explorar Colección</span>
          </a>
          <a href="#contacto" className="px-10 py-5 bg-transparent border border-white/30 text-white font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-all backdrop-blur-sm skew-x-[-10deg]">
            <span className="block skew-x-[10deg]">Contactar</span>
          </a>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-70">
        <span className="text-[10px] text-white uppercase tracking-widest">Descubre</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </div>
  );
};

const BenefitsStrip = () => {
  return (
    <div className="bg-[#2D1B18] text-white py-8 border-b border-white/5 relative z-20 -mt-2">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 text-center md:text-left">
          {[
            { icon: <Award className="w-6 h-6 text-[#D4AF37]" />, text: "Elaboración Artesanal" },
            { icon: <Gift className="w-6 h-6 text-[#D4AF37]" />, text: "Presentación Exclusiva" },
            { icon: <Truck className="w-6 h-6 text-[#D4AF37]" />, text: "Envíos en Salta Capital" }
          ].map((item, i) => (
             <div key={i} className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
               {item.icon}
               <span className="text-sm font-medium tracking-wide">{item.text}</span>
             </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const ProductCard = ({ product, onExpand }) => {
  const handleConsult = () => {
    const message = `Hola ChoccoLovers, estoy encantado con el producto: ${product.name}. ¿Me podrían dar más información?`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
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
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
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
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Image Modal Component ---
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

const Catalog = ({ products, categories, loading }) => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredProducts = activeCategory === "Todos" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="catalogo" className="py-28 bg-[#FFFAF0] relative overflow-hidden">
      {/* Elemento decorativo de fondo */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

      <ImageModal 
        isOpen={!!selectedImage} 
        onClose={() => setSelectedImage(null)} 
        imageUrl={selectedImage?.image} 
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
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onExpand={() => setSelectedImage(product)} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contacto" className="bg-[#1a110e] text-white pt-24 pb-12 border-t-4 border-[#D4AF37]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          
          {/* Brand Column - Large */}
          <div className="md:col-span-6">
             <div className="mb-8">
               <span className="text-4xl font-serif font-black tracking-widest text-white">
                  CHOCCO
                </span>
                <span className="font-script text-5xl ml-2 text-gold-gradient">
                  Lovers
                </span>
             </div>
            <p className="text-gray-400 text-base leading-loose font-light pr-10 mb-8">
              Redefiniendo el arte del chocolate desde 2024. Nuestra misión es simple: crear el mejor chocolate del mundo, sin atajos, solo pasión y los mejores ingredientes de la tierra.
            </p>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-6">
            <h4 className="text-lg font-serif font-bold mb-8 text-white">Contacto</h4>
            <div className="space-y-6">
              <a href="https://api.whatsapp.com/send?phone=543875012118&text=Hola%20ChoccoLovers!%20Vi%20su%20web%20y%20quisiera%20hacer%20una%20consulta" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group cursor-pointer">
                <div className="p-3 bg-white/5 rounded-full group-hover:bg-[#D4AF37] group-hover:text-[#3E2723] transition-colors">
                   <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs text-gray-500 uppercase tracking-widest mb-1">Whatsapp</span>
                  <span className="text-lg text-white font-serif">+54 387 501 2118</span>
                </div>
              </a>
              
              <a href="https://www.instagram.com/chocco_lovers2" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group cursor-pointer">
                <div className="p-3 bg-white/5 rounded-full group-hover:bg-[#D4AF37] group-hover:text-[#3E2723] transition-colors">
                   <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs text-gray-500 uppercase tracking-widest mb-1">Instagram</span>
                  <span className="text-lg text-white font-serif">@chocco_lovers2</span>
                </div>
              </a>

              <a href="#" className="flex items-center gap-4 group cursor-pointer">
                <div className="p-3 bg-white/5 rounded-full group-hover:bg-[#D4AF37] group-hover:text-[#3E2723] transition-colors">
                   <Facebook className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs text-gray-500 uppercase tracking-widest mb-1">Facebook</span>
                  <span className="text-lg text-white font-serif">Chocco Lovers</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 tracking-widest uppercase">
          <p>&copy; {new Date().getFullYear()} ChoccoLovers. Hecho con amor y cacao.</p>
        </div>
      </div>
    </footer>
  );
};

// --- Floating WhatsApp Button Component ---
const FloatingWhatsApp = () => (
  <a 
    href="https://api.whatsapp.com/send?phone=543875012118&text=Hola%20ChoccoLovers!%20Vi%20su%20web%20y%20quisiera%20hacer%20una%20consulta"
    target="_blank" 
    rel="noopener noreferrer"
    className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:bg-[#128C7E] hover:scale-110 transition-all duration-300 group flex items-center justify-center"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle className="w-8 h-8" />
    <span className="absolute right-full mr-4 bg-white text-gray-800 text-xs font-bold py-2 px-4 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
      ¿Te antojaste? ¡Escríbenos!
    </span>
  </a>
);

// --- Main App Component ---

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  // Levantamos el estado para que sea accesible por el Admin y el Catálogo
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([{ id: 'all', name: 'Todos' }]);
  const [loading, setLoading] = useState(true);
  
  // Simple Router Check
  const isAdminRoute = window.location.pathname === '/admin';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch Data from Firebase with Real-time Updates (onSnapshot)
  useEffect(() => {
    // ESTRATEGIA HÍBRIDA:
    // 1. Si es ADMIN: Usamos onSnapshot (Tiempo Real) para gestión inmediata.
    // 2. Si es PÚBLICO: Usamos getDocs + LocalStorage (Caché) para ahorrar lecturas.

    if (isAdminRoute) {
      let categoriesLoaded = false;
      let productsLoaded = false;

      const checkLoading = () => {
        if (categoriesLoaded && productsLoaded) setLoading(false);
      };

      const unsubscribeCategories = onSnapshot(collection(db, "categories"), (snapshot) => {
        const catList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCategories([{ id: 'all', name: 'Todos' }, ...catList]);
        categoriesLoaded = true;
        checkLoading();
      }, (error) => {
        console.log("Error cargando categorías:", error);
        categoriesLoaded = true;
        checkLoading();
      });

      const unsubscribeProducts = onSnapshot(collection(db, "products"), (snapshot) => {
        const prodList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(prodList);
        productsLoaded = true;
        checkLoading();
      }, (error) => {
        console.log("Error cargando productos:", error);
        productsLoaded = true;
        checkLoading();
      });

      return () => {
        unsubscribeCategories();
        unsubscribeProducts();
      };
    } else {
      const fetchPublicData = async () => {
        const CACHE_KEY = 'chocco_data';
        const CACHE_DURATION = 15 * 60 * 1000; // 15 Minutos
        const cached = localStorage.getItem(CACHE_KEY);
        const now = Date.now();

        if (cached) {
          const { products, categories, timestamp } = JSON.parse(cached);
          if (now - timestamp < CACHE_DURATION) {
            setProducts(products);
            setCategories(categories);
            setLoading(false);
            return;
          }
        }

        try {
          const [catSnap, prodSnap] = await Promise.all([
            getDocs(collection(db, "categories")),
            getDocs(collection(db, "products"))
          ]);

          const catList = catSnap.docs.map(d => ({ id: d.id, ...d.data() }));
          const prodList = prodSnap.docs.map(d => ({ id: d.id, ...d.data() }));
          const finalCats = [{ id: 'all', name: 'Todos' }, ...catList];

          setCategories(finalCats);
          setProducts(prodList);
          setLoading(false);

          localStorage.setItem(CACHE_KEY, JSON.stringify({
            products: prodList,
            categories: finalCats,
            timestamp: now
          }));
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      };

      fetchPublicData();
    }
  }, [isAdminRoute]);

  // Si estamos en la ruta /admin, renderizamos SOLO el panel de admin
  if (isAdminRoute) {
    return (
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando panel...</div>}>
        <AdminPanel products={products} categories={categories} />
      </Suspense>
    );
  }

  return (
    <div className="font-sans text-gray-800 bg-white selection:bg-[#3E2723] selection:text-[#D4AF37]">
      <GlobalStyles />
      <Navbar isScrolled={isScrolled} />
      <Hero />
      <BenefitsStrip />
      <Catalog products={products} categories={categories} loading={loading} />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default App;