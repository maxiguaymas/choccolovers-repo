import React from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';

const FloatingWhatsApp = () => (
  <aside 
    aria-label="Atención por WhatsApp"
    className="fixed bottom-6 right-6 z-50 flex items-center group pointer-events-none"
  >
    {/* Tooltip on Hover */}
    <div className="mr-3.5 bg-[#1A0F0B]/95 backdrop-blur-md text-[#FAF7F2] border border-[#D4AF37]/40 text-xs font-medium py-2 px-4 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap hidden sm:flex items-center gap-2">
      <Sparkles size={13} className="text-[#D4AF37]" />
      <span>¿Te antojaste? <strong>¡Escríbenos aquí!</strong></span>
    </div>

    {/* Floating Button with pulsing halo */}
    <a 
      href="https://api.whatsapp.com/send?phone=543875012118&text=Hola%20ChoccoLovers!%20Vi%20su%20web%20y%20quisiera%20hacer%20una%20consulta"
      target="_blank" 
      rel="noopener noreferrer"
      className="pointer-events-auto relative bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white p-4 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center border-2 border-white/30"
      aria-label="Abrir chat de WhatsApp"
    >
      {/* Subtle pulse ring behind */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none"></span>
      <MessageCircle className="w-7 h-7 relative z-10" />
    </a>
  </aside>
);

export default FloatingWhatsApp;