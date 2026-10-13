import React, { useState } from 'react';
import { MessageCircle, Menu, X, Sparkles } from 'lucide-react';
import logoCirculo from '../../assets/images/logo-choccolovers-circulo.png';

const Navbar = ({ isScrolled }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#FAF7F2]/95 backdrop-blur-xl shadow-[0_10px_30px_rgba(26,15,11,0.08)] border-b border-[#D4AF37]/20 py-2.5'
          : 'bg-gradient-to-b from-black/85 via-black/45 to-transparent border-b border-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo Brand con Emblema de Autor */}
          <a href="#inicio" className="flex items-center gap-3 sm:gap-3.5 group cursor-pointer">
            <div className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-full p-0.5 transition-all duration-300 shadow-md ${
              isScrolled 
                ? 'bg-gradient-to-tr from-[#D4AF37] via-[#F8E8B4] to-[#B38728] shadow-[0_2px_12px_rgba(212,175,55,0.25)]' 
                : 'bg-gradient-to-tr from-[#D4AF37]/80 via-[#F8E8B4]/90 to-[#B38728]/70 shadow-[0_0_15px_rgba(212,175,55,0.35)]'
            } group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.5)]`}>
              <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center p-0.5">
                <img 
                  src={logoCirculo} 
                  alt="ChoccoLovers" 
                  className="w-full h-full object-contain" 
                />
              </div>
            </div>

            <div className="flex items-baseline">
              <span
                className={`text-xl sm:text-2xl font-serif font-black tracking-[0.22em] transition-colors duration-300 ${
                  isScrolled ? 'text-[#1A0F0B]' : 'text-white'
                } drop-shadow-sm`}
              >
                CHOCCO
              </span>
              <span
                className={`font-script text-2xl sm:text-3xl ml-1 -mt-1 ${
                  isScrolled ? 'text-gold-gradient-scrolled' : 'text-gold-gradient'
                } transform group-hover:scale-105 transition-transform duration-300`}
              >
                Lovers
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-10 items-center">
            {[
              { label: 'Inicio', href: '#inicio' },
              { label: 'Catálogo', href: '#catalogo' },
              { label: 'Clientes', href: '#clientes' },
              { label: 'Contacto', href: '#contacto' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-[11px] font-bold uppercase tracking-[0.25em] transition-all relative py-1 group ${
                  isScrolled
                    ? 'text-[#2A1610] hover:text-[#D4AF37]'
                    : 'text-white/90 hover:text-[#F8E8B4]'
                }`}
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}

            {/* Direct WhatsApp CTA Button */}
            <a
              href="https://api.whatsapp.com/send?phone=543875012118&text=Hola%20ChoccoLovers!%20Vi%20su%20web%20y%20quisiera%20hacer%20una%20consulta"
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-shine-gold flex items-center gap-2.5 px-6 py-2.5 rounded-full border transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg ${
                isScrolled
                  ? 'border-[#D4AF37] bg-[#1A0F0B] text-[#FAF7F2] hover:bg-[#3E2723] shadow-sm'
                  : 'border-[#D4AF37]/80 bg-black/40 backdrop-blur-md text-[#FAF7F2] hover:bg-[#D4AF37] hover:text-[#1A0F0B] hover:border-[#D4AF37]'
              }`}
            >
              <MessageCircle size={16} className="text-[#D4AF37] group-hover:text-current" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em]">
                WhatsApp
              </span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-[#1A0F0B] hover:bg-[#1A0F0B]/5' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Abrir menú"
            >
              {isMobileMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown with Luxury Glassmorphism */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute w-full top-full left-0 bg-[#1A0F0B]/95 backdrop-blur-2xl border-b border-[#D4AF37]/30 shadow-2xl animate-fade-in">
          <div className="px-6 py-5 space-y-3">
            {[
              { label: 'Inicio', href: '#inicio' },
              { label: 'Catálogo', href: '#catalogo' },
              { label: 'Clientes', href: '#clientes' },
              { label: 'Contacto', href: '#contacto' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center justify-between px-3 py-3 text-sm font-serif font-bold uppercase tracking-[0.2em] text-[#FAF7F2] hover:text-[#D4AF37] border-b border-white/10 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>{item.label}</span>
                <Sparkles size={14} className="text-[#D4AF37] opacity-60" />
              </a>
            ))}
            
            <div className="pt-2">
              <a
                href="https://api.whatsapp.com/send?phone=543875012118&text=Hola%20ChoccoLovers!%20Vi%20su%20web%20y%20quisiera%20hacer%20una%20consulta"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-3 w-full py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-[#1A0F0B] font-black uppercase text-xs tracking-[0.2em] rounded-lg shadow-lg"
              >
                <MessageCircle size={18} />
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;