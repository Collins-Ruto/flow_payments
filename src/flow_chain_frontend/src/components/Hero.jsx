import React, { useState } from 'react';
import GetInTouchModal from './GetInTouchModal';
import { Img } from "../components/Img";
import * as Images from "../assets/images";

export default function Hero() {
  const [isGetInTouchOpen, setIsGetInTouchOpen] = useState(false);

  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center">
      <div className="container mx-auto px-4 md:px-8 py-24">
        <div className="flex flex-col md:flex-row gap-12 items-center relative">
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl md:text-6xl mb-6 leading-tight">
              Flowchain<br />
              Logistics <span className="text-blue-900">Solution</span>
            </h1>
            <button
              onClick={() => setIsGetInTouchOpen(true)}
              className="px-8 py-3 bg-blue-900 text-white rounded-full text-sm font-medium hover:bg-blue-800 transition-colors"
            >
              GET IN TOUCH
            </button>

            <div className="mt-12 flex flex-col space-y-6">
              <div>
                <div className="text-blue-900 text-3xl md:text-4xl font-bold mb-1">10+</div>
                <div className="text-xs md:text-sm text-blue-900">Years of Experience</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-1">8+</div>
                <div className="text-xs md:text-sm text-gray-600">Different countries</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-1">4+</div>
                <div className="text-xs md:text-sm text-gray-600">Types of services</div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 relative">
            <Img
              src={Images.containerImg}
              alt="Flowchain Container"
              className="w-full h-auto rounded-lg"
            />
            <div className="absolute top-8 right-8 max-w-[280px] text-right">
              <p className="text-sm">
                Our logistics company specializes in delivering goods to destinations across
                the globe with efficiency and reliability.
              </p>
            </div>
          </div>
        </div>

        <GetInTouchModal
          isOpen={isGetInTouchOpen}
          onClose={() => setIsGetInTouchOpen(false)}
        />
      </div>
    </section>
  );
}
