import React from 'react';
import { Award, Gift, Truck } from 'lucide-react';

const BenefitsStrip = () => {
  return (
    <div className="bg-[#1A0F0B] text-white py-7 sm:py-8 border-y border-[#D4AF37]/20 relative z-20 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 sm:gap-8 text-center md:text-left">
          {[
            { icon: <Award className="w-6 h-6 text-[#D4AF37]" />, text: "Elaboración Artesanal" },
            { icon: <Gift className="w-6 h-6 text-[#D4AF37]" />, text: "Presentación Exclusiva" },
            { icon: <Truck className="w-6 h-6 text-[#D4AF37]" />, text: "Envíos en Salta Capital" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 opacity-85 hover:opacity-100 transition-opacity">
              <div className="p-2 rounded-full bg-white/5 border border-[#D4AF37]/30">
                {item.icon}
              </div>
              <span className="text-sm font-medium tracking-wide text-[#FAF7F2]">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BenefitsStrip;