import React from 'react';
import { Award, Gift, Truck } from 'lucide-react';

const BenefitsStrip = () => {
  return (
    <div className="bg-[#2D1B18] text-white py-8 border-b border-white/5 relative z-20 -mt-2">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 text-center md:text-left">
          {[
            { icon: <Award className="w-6 h-6 text-[#D4AF37]" />, text: "Elaboración Artesanal" },
            { icon: <Gift className="w-6 h-6 text-[#D4AF37]" />, text: "Presentación Exclusiva" },
            { icon: <Truck className="w-6 h-6 text-[#D4AF37]" />, text: "Envíos en Salta Capital" }
          ].map((item, i) => (
             <div key={i} className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
               {item.icon}
               <span className="text-sm font-medium tracking-wide">{item.text}</span>
             </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BenefitsStrip;