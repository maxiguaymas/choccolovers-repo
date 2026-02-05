import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import BenefitsStrip from '../components/sections/BenefitsStrip';
import Catalog from '../components/sections/Catalog';
import ClientsCarousel from '../components/sections/ClientsCarousel';
import Footer from '../components/layout/Footer';
import FloatingWhatsApp from '../components/layout/FloatingWhatsApp';

const Home = ({ products, categories, loading }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans text-gray-800 bg-white selection:bg-[#3E2723] selection:text-[#D4AF37]">
      <Navbar isScrolled={isScrolled} />
      <Hero />
      <BenefitsStrip />
      <Catalog products={products} categories={categories} loading={loading} />
      <ClientsCarousel />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Home;