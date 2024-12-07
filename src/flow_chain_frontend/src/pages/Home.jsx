import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Partners from '../components/Partners';
import Features from '../components/Features';
import DeliveryServices from '../components/DeliveryServices';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <Hero />
      <Partners />
      <Features />
      <DeliveryServices />
      <ContactForm />
      <Footer />
    </div>
  );
}