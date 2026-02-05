import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebaseConfig';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const ClientsCarousel = () => {
  const [moments, setMoments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Intentar cargar desde cache primero para velocidad instantánea
    const cachedMoments = localStorage.getItem('chocco_clients_cache');
    if (cachedMoments) {
      setMoments(JSON.parse(cachedMoments));
      setLoading(false);
    }

    const q = query(collection(db, "client_moments"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Solo actualizar si la data es distinta a la del cache
      if (JSON.stringify(data) !== cachedMoments) {
        setMoments(data);
        localStorage.setItem('chocco_clients_cache', JSON.stringify(data));
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Duplicamos el array para crear un efecto de scroll infinito fluido
  const displayMoments = moments.length > 0 ? [...moments, ...moments] : [];

  if (loading || moments.length === 0) return null;

  return (
    <section id="clientes" className="py-20 bg-white overflow-hidden border-t border-gray-50">
      <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-black text-[#3E2723]">Nuestros ChoccoLovers</h2>
      </div>

      {/* Marquee Container */}
      <div className="relative flex">
        <div className="flex animate-marquee whitespace-nowrap gap-6 hover:pause">
          {displayMoments.map((moment, idx) => (
            <div 
              key={`${moment.id}-${idx}`} 
              className="relative w-80 h-[450px] flex-shrink-0 group cursor-pointer overflow-hidden rounded-xl shadow-lg"
            >
              <img 
                src={moment.url} 
                alt={`Cliente ChoccoLovers ${idx}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
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
          animation: marquee 40s linear infinite;
        }
        .pause:hover {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
};

export default ClientsCarousel;