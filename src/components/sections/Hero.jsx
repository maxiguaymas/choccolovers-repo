import React from 'react';
import { Star, ChevronDown } from 'lucide-react';
import fondoChocco from '../../assets/images/fondo-chocco.jpg';
import logoCirculo from '../../assets/images/logo-choccolovers-circulo.png';

const Hero = () => {
  return (
    <div id="inicio" className="relative min-h-[100svh] flex flex-col items-center justify-center bg-[#1A0F0B] py-20 sm:py-24">
      {/* Background Image with Cinematic Grading & Parallax Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src={fondoChocco} 
          alt="Chocolatería Artesanal de Autor por Celeste Villagran" 
          className="w-full h-full object-cover scale-105 motion-safe:animate-slow-zoom brightness-[0.72]" 
          style={{ animationDuration: '28s' }}
        />
        
        {/* Multi-layer luxury gradient for superior text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/55 to-[#1A0F0B]"></div>
        
        {/* Subtle Warm Gold Ambient Flare */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none"></div>

        {/* Subtle Noise Texture */}
        <div 
          className="absolute inset-0 opacity-[0.035] pointer-events-none" 
          style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}
        ></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto flex flex-col items-center w-full my-auto">
        
        {/* H1 accesible para SEO */}
        <h1 className="sr-only">ChoccoLovers - Chocolates Artesanales</h1>

        {/* Logo Grande Protagonista */}
        <div className="mb-6 sm:mb-8 animate-fade-in-up">
          <div className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto rounded-full p-2 sm:p-2.5 bg-gradient-to-tr from-[#D4AF37] via-[#F8E8B4] to-[#B38728] shadow-[0_0_45px_rgba(212,175,55,0.38)] hover:shadow-[0_0_65px_rgba(212,175,55,0.55)] hover:scale-105 transition-all duration-500">
            <div className="w-full h-full rounded-full overflow-hidden bg-white p-1 sm:p-2 flex items-center justify-center">
              <img 
                src={logoCirculo} 
                alt="ChoccoLovers - Chocolates Artesanales" 
                className="w-full h-full object-contain select-none" 
              />
            </div>
          </div>
        </div>

        {/* Subtitle / Value Proposition */}
        <div className="animate-fade-in-up max-w-2xl mx-auto mb-6 sm:mb-8 px-2" style={{ animationDelay: '200ms' }}>
          <p className="text-base sm:text-lg md:text-xl text-cream-100/95 font-light leading-relaxed tracking-wide">
            Hacemos chocolates ricos y 100% artesanales, elaborados a mano con ingredientes de primera calidad.
            <span className="block mt-2 font-medium text-white text-sm sm:text-base md:text-lg tracking-wider">
              Ideales para regalar, compartir o darte un gusto especial.
            </span>
          </p>
        </div>

        {/* Dual Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-5 justify-center w-full max-w-sm sm:max-w-md mx-auto animate-fade-in-up" style={{ animationDelay: '450ms' }}>
          <a 
            href="#catalogo" 
            className="btn-shine-gold group relative px-7 sm:px-9 py-3.5 sm:py-4 bg-gradient-to-r from-[#D4AF37] via-[#F8E8B4] to-[#B38728] text-[#1A0F0B] font-black uppercase tracking-[0.2em] text-xs rounded-full shadow-[0_10px_30px_rgba(212,175,55,0.35)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.5)] transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <span>Explorar Catálogo</span>
            <Star className="w-3.5 h-3.5 fill-current" />
          </a>
          
          <a 
            href="#contacto" 
            className="px-7 sm:px-9 py-3.5 sm:py-4 bg-white/5 border border-white/30 hover:border-[#D4AF37] text-white hover:text-[#F8E8B4] font-bold uppercase tracking-[0.2em] text-xs rounded-full hover:bg-white/10 backdrop-blur-md transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center whitespace-nowrap"
          >
            <span>Contacto</span>
          </a>
        </div>

        {/* Scroll Down Indicator (in document flow so it never overlaps buttons) */}
        <div className="mt-8 sm:mt-10 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
          <a 
            href="#catalogo" 
            className="inline-flex flex-col items-center gap-1.5 text-white/60 hover:text-[#D4AF37] transition-colors duration-300 group cursor-pointer"
          >
            <span className="text-[9px] uppercase tracking-[0.3em] font-semibold">Descubrir</span>
            <ChevronDown size={18} className="animate-bounce text-[#D4AF37]" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;