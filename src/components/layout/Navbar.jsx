import React, { useState } from 'react';
import { MessageCircle, Menu, X } from 'lucide-react';

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

export default Navbar;