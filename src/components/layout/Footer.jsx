import React from 'react';
import { MessageCircle, Instagram, Facebook, MapPin } from 'lucide-react';
import logoCirculo from '../../assets/images/logo-choccolovers-circulo.png';

const Footer = () => {
  return (
    <footer id="contacto" className="bg-[#120A07] text-[#FAF7F2] pt-24 pb-12 border-t-2 border-[#D4AF37]/40 relative overflow-hidden">
      
      {/* Subtle gold ambient glow in footer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-16">
          
          {/* Brand Column */}
          <div className="md:col-span-6 lg:col-span-5">
            <a href="#inicio" className="inline-block mb-6 group cursor-pointer">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-[#D4AF37] via-[#F8E8B4] to-[#B38728] shadow-[0_0_25px_rgba(212,175,55,0.28)] group-hover:scale-105 group-hover:shadow-[0_0_35px_rgba(212,175,55,0.48)] transition-all duration-300">
                <div className="w-full h-full rounded-full overflow-hidden bg-white p-1 flex items-center justify-center">
                  <img src={logoCirculo} alt="ChoccoLovers" className="w-full h-full object-contain select-none" />
                </div>
              </div>
            </a>

            <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-light mb-6 max-w-md">
              Chocolatería artesanal en Salta. Piezas hechas a mano con dedicación y los mejores ingredientes.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#F8E8B4] font-medium tracking-wide">
              <MapPin size={15} className="text-[#D4AF37]" />
              <span>Salta Capital, Argentina • Envíos y Entregas Coordinadas</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-2 lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] mb-6 text-[#D4AF37]">
              Explorar
            </h4>
            <ul className="space-y-3.5 text-sm">
              {[
                { name: 'Inicio', href: '#inicio' },
                { name: 'Catálogo', href: '#catalogo' },
                { name: 'Clientes', href: '#clientes' },
                { name: 'Contacto', href: '#contacto' },
              ].map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-[#F8E8B4] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/40 group-hover:bg-[#D4AF37] group-hover:scale-125 transition-all"></span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-4 lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] mb-6 text-[#D4AF37]">
              Contacto Directo
            </h4>
            
            <div className="space-y-4">
              {/* WhatsApp Card */}
              <a 
                href="https://api.whatsapp.com/send?phone=543875012118&text=Hola%20ChoccoLovers!%20Vi%20su%20web%20y%20quisiera%20hacer%20una%20consulta" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#D4AF37]/50 hover:bg-white/[0.05] transition-all group cursor-pointer"
              >
                <div className="p-2.5 bg-[#2A1610] text-[#D4AF37] rounded-lg group-hover:bg-[#D4AF37] group-hover:text-[#1A0F0B] transition-colors shadow-md">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <span className="block text-[10px] text-gray-400 uppercase tracking-widest">WhatsApp & Pedidos</span>
                  <span className="text-sm text-white font-medium group-hover:text-[#F8E8B4] transition-colors">+54 387 501 2118</span>
                </div>
              </a>
              
              {/* Instagram Card */}
              <a 
                href="https://www.instagram.com/chocco_lovers2" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#D4AF37]/50 hover:bg-white/[0.05] transition-all group cursor-pointer"
              >
                <div className="p-2.5 bg-[#2A1610] text-[#D4AF37] rounded-lg group-hover:bg-[#D4AF37] group-hover:text-[#1A0F0B] transition-colors shadow-md">
                  <Instagram size={18} />
                </div>
                <div>
                  <span className="block text-[10px] text-gray-400 uppercase tracking-widest">Instagram Oficial</span>
                  <span className="text-sm text-white font-medium group-hover:text-[#F8E8B4] transition-colors">@chocco_lovers2</span>
                </div>
              </a>

              {/* Facebook Card */}
              <a 
                href="#" 
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#D4AF37]/50 hover:bg-white/[0.05] transition-all group cursor-pointer"
              >
                <div className="p-2.5 bg-[#2A1610] text-[#D4AF37] rounded-lg group-hover:bg-[#D4AF37] group-hover:text-[#1A0F0B] transition-colors shadow-md">
                  <Facebook size={18} />
                </div>
                <div>
                  <span className="block text-[10px] text-gray-400 uppercase tracking-widest">Facebook</span>
                  <span className="text-sm text-white font-medium group-hover:text-[#F8E8B4] transition-colors">Chocco Lovers</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4 text-xs text-gray-400 tracking-wider">
          <p>&copy; {new Date().getFullYear()} ChoccoLovers. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;