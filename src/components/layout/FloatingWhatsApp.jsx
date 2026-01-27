import React from 'react';
import { MessageCircle } from 'lucide-react';

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

export default FloatingWhatsApp;