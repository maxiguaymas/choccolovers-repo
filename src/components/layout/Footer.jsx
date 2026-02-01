import React from 'react';
import { MessageCircle, Instagram, Facebook } from 'lucide-react';

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
              Redefiniendo el arte del chocolate desde 2025. Nuestra misión es simple: crear el mejor chocolate del mundo, sin atajos, solo pasión y los mejores ingredientes de la tierra.
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

export default Footer;