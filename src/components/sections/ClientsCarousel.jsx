import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebaseConfig';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { Heart, Sparkles } from 'lucide-react';

const ClientsCarousel = () => {
  const [moments, setMoments] = useState(() => {
    try {
      const cached = localStorage.getItem('chocco_clients_cache');
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(() => {
    try {
      return !localStorage.getItem('chocco_clients_cache');
    } catch {
      return true;
    }
  });

  useEffect(() => {
    const cachedMoments = localStorage.getItem('chocco_clients_cache');

    const q = query(collection(db, "client_moments"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Solo actualizar si la data es distinta a la del cache
      if (JSON.stringify(data) !== cachedMoments) {
        setMoments(data);
        localStorage.setItem('chocco_clients_cache', JSON.stringify(data));
      }
      setLoading(false);
    }, (error) => {
      console.log("Error cargando client_moments:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Duplicamos el array para crear un efecto de scroll infinito fluido
  const displayMoments = moments.length > 0 ? [...moments, ...moments] : [];

  if (loading || moments.length === 0) return null;

  return (
    <section id="clientes" className="py-24 sm:py-28 bg-[#FAF7F2] overflow-hidden border-t border-[#D4AF37]/20 relative">
      
      {/* Decorative ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16 text-center relative z-10">
        <div className="inline-flex items-center gap-2 mb-3">
          <Heart size={13} className="text-[#D4AF37] fill-[#D4AF37]" />
          <span className="text-[#B38A22] text-xs font-bold uppercase tracking-[0.3em]">
            Comunidad & Momentos
          </span>
          <Heart size={13} className="text-[#D4AF37] fill-[#D4AF37]" />
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black text-[#1A0F0B] mb-4 tracking-tight">
          Nuestros ChoccoLovers
        </h2>

        <p className="font-editorial text-xl text-[#5D4037] italic max-w-xl mx-auto">
          Momentos dulces que compartimos con quienes eligen disfrutar lo bueno.
        </p>
      </div>

      {/* Marquee Container with edge fades */}
      <div className="relative flex">
        {/* Left Edge Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#FAF7F2] to-transparent z-10 pointer-events-none"></div>
        {/* Right Edge Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#FAF7F2] to-transparent z-10 pointer-events-none"></div>

        <div className="flex animate-marquee whitespace-nowrap gap-6 sm:gap-8 hover:pause py-4">
          {displayMoments.map((moment, idx) => (
            <div 
              key={`${moment.id}-${idx}`} 
              className="relative w-64 sm:w-80 h-[360px] sm:h-[460px] flex-shrink-0 group cursor-pointer overflow-hidden rounded-2xl shadow-[0_15px_35px_rgba(26,15,11,0.08)] border border-[#2A1610]/10 hover:border-[#D4AF37] transition-all duration-500 bg-[#1A0F0B]"
            >
              <img 
                src={moment.url} 
                alt={`Momento ChoccoLovers ${idx + 1}`} 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Subtle bottom vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F0B]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="flex items-center gap-2 text-white">
                  <Sparkles size={14} className="text-[#D4AF37]" />
                  <span className="font-serif text-sm tracking-wider font-bold">#ChoccoLovers</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Estilos específicos para la animación de scroll infinito */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 45s linear infinite;
        }
        .pause:hover {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
};

export default ClientsCarousel;