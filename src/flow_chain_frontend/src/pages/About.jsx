import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoginModal from '../components/LoginModal';
import { ArrowRight, BarChart2, Network, FileCheck, Check, Calendar } from 'lucide-react';

export default function About() {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const faqs = [
    {
      question: 'How can stakeholders access information?',
      answer: 'Stakeholders can easily access our user-friendly dashboard, which provides insights into inventory levels, delivery statuses, and logistical performance. This transparency is vital for maintaining trust and operational efficiency.',
      date: 'Nov 24, 2026',
    },
    {
      question: 'What technology do we use for tracking?',
      answer: 'We incorporate IoT devices to monitor shipments and environmental conditions in real-time. This technology enables us to gather valuable data, ensuring that our logistics operations run smoothly and effectively.',
      date: 'Nov 24, 2026',
    },
    {
      question: 'How do you prioritize resource distribution?',
      answer: 'Our resource prioritization algorithms utilize AI to ensure that urgent needs are addressed first. This smart allocation process is automated through smart contracts, allowing for timely assistance during critical situations.',
      date: 'Nov 24, 2026',
    },
    {
      question: 'What makes Flowchain unique?',
      answer: 'Utilizing blockchain technology ensures transparency and accountability throughout our supply chain. This secure framework allows for real-time tracking and fraud detection, fostering trust among stakeholders and beneficiaries.',
      date: 'Nov 24, 2026',
    },
    {
      question: 'How does AI enhance our operations?',
      answer: 'AI powers our predictive analytics, route optimization, and demand forecasting systems. This enables us to make data-driven decisions and improve operational efficiency across our logistics network.',
      date: 'Nov 24, 2026',
    },
  ];

  const features = [
    'Predictive Demand Modeling',
    'Optimized Routing Solutions',
    'Transparent Resource Allocation',
  ];

  const handleFaqClick = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-[calc(100vh-80px)] flex items-center">
        <div className="container mx-auto py-24">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-1/2">
              <h1 className="text-3xl md:text-5xl mb-6">
                Revolutionizing Supply Chains{' '}
                with{' '}
                <span className="text-blue-900">ICP Blockchain Technology</span>
              </h1>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-8 py-3 bg-blue-900 text-white rounded-full"
              >
                GET STARTED
              </button>

              <div className="mt-12 space-y-6">
                <div>
                  <div className="text-blue-900 text-3xl">10+</div>
                  <div className="text-sm">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl">8+</div>
                  <div className="text-sm">Different countries</div>
                </div>
                <div>
                  <div className="text-3xl">4+</div>
                  <div className="text-sm">Types of services</div>
                </div>
              </div>

              <div className="mt-12 flex flex-col md:flex-row gap-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-full"
                  >
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                      <Check className="w-4 h-4 text-gray-400" />
                    </div>
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <div className="bg-gray-50 p-8 rounded-2xl h-full">
                <p className="text-lg text-gray-600 mb-8">
                  We're pioneering supply chain logistics through advanced tech, ensuring timely and effective assistance in crisis situations.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl">
                    <BarChart2 className="w-8 h-8 text-blue-900 mb-4" />
                    <h3 className="font-medium mb-2">Data-Driven Decisions</h3>
                    <p className="text-sm text-gray-600">Advanced analytics for optimal resource allocation</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl">
                    <Network className="w-8 h-8 text-blue-900 mb-4" />
                    <h3 className="font-medium mb-2">Global Network</h3>
                    <p className="text-sm text-gray-600">Seamless coordination across borders</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl">
                    <FileCheck className="w-8 h-8 text-blue-900 mb-4" />
                    <h3 className="font-medium mb-2">Quality Assurance</h3>
                    <p className="text-sm text-gray-600">Rigorous standards for reliable service</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto py-24">
        <h2 className="text-4xl mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4 max-w-4xl">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => handleFaqClick(index)}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-medium">{faq.question}</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{faq.date}</span>
                    </div>
                    <span className="text-sm text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                      see more
                    </span>
                  </div>
                </div>
                {expandedFaq === index && (
                  <p className="text-gray-600 mt-4 leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      <Footer />
    </div>
  );
}
