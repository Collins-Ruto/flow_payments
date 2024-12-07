import React, { useState } from 'react';
import { Play } from 'lucide-react';
import LoginModal from './LoginModal';
import GetInTouchModal from './GetInTouchModal';
import { Img } from "../components/Img";
import * as Images from "../assets/images";

export default function Partners() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isGetInTouchOpen, setIsGetInTouchOpen] = useState(false);

  // const partners = [
  //   { name: 'Naviok', logo: '/logos/naviok.png' },
  //   { name: 'Oculus', logo: '/logos/oculus.png' },
  //   { name: 'Samsung', logo: '/logos/samsung.png' },
  //   { name: 'SQLite', logo: '/logos/sqlite.png' },
  //   { name: 'LinkedIn', logo: '/logos/linkedin.png' },
  //   { name: 'Chamilo', logo: '/logos/chamilo.png' },
  // ];

  return (
    <>
      <section className="min-h-[calc(100vh-80px)] flex items-center">
        <div className="container mx-auto px-4 md:px-8 py-24">
          <div className="bg-blue-900 rounded-3xl p-8 md:p-12">
            {/* Partners Logo Row */}
            {/* <div className="flex flex-wrap justify-between items-center mb-12">
              {partners.map((partner, index) => (
                <img
                  key={index}
                  src={partner.logo}
                  alt={partner.name}
                  className="h-8 md:h-10 object-contain filter brightness-0 invert"
                />
              ))}
            </div> */}

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="grid grid-cols-2 gap-4">
                <Img src={Images.truck} alt="Delivery Truck" className="rounded-2xl w-full h-full object-cover" />
                <Img src={Images.crane} alt="Port Crane" className="rounded-2xl w-full h-full object-cover" />
                <Img src={Images.forklift} alt="Forklift" className="rounded-2xl w-full h-full object-cover" />
                <Img src={Images.container} alt="Container" className="rounded-2xl w-full h-full object-cover" />
              </div>

              <div className="text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight tracking-wide">
                  Leading the Way<br />
                  in Global<br />
                  Logistics Excellence
                </h2>
                <p className="text-gray-200 mb-8">
                  We are an international scale company that has been trusted by all corners of the world. Use our company to expedite your package delivery!
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setIsGetInTouchOpen(true)}
                    className="px-8 py-3 bg-white text-blue-900 rounded-full transform transition-all duration-300 hover:scale-105 hover:brightness-110"
                  >
                    Get in touch
                  </button>
                  <button
                    onClick={() => setIsLoginModalOpen(true)}
                    className="px-8 py-3 bg-white text-blue-900 rounded-full flex items-center gap-2 transform transition-all duration-300 hover:scale-105 hover:brightness-110"
                  >
                    <Play className="w-4 h-4" /> Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      <GetInTouchModal
        isOpen={isGetInTouchOpen}
        onClose={() => setIsGetInTouchOpen(false)}
      />
    </>
  );
}
