import React from 'react';
import { Star } from 'lucide-react';
import fondoChocco from '../../assets/images/fondo-chocco.jpg';

const Hero = () => {
  return (
    <div id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Parallax */}
      <div className="absolute inset-0 z-0">
        <img 
          src={fondoChocco} 
          alt="Chocolate Artesanal" 
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
        <div className="mb-6 mt-8 md:mt-20 animate-fade-in-up">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-black/30 backdrop-blur-sm">
             <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
             <span className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase">Celeste Villagran</span>
           </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-serif font-black text-white mb-2 leading-none tracking-tight drop-shadow-2xl">
          CHOCCO
        </h1>
        <h1 className="font-script text-7xl md:text-9xl text-gold-gradient mb-8 -mt-4 md:-mt-8 transform -rotate-2">
          Lovers
        </h1>

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

export default Hero;