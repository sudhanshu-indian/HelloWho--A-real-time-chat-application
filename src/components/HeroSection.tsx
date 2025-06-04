import React from 'react';
import { MessageCircleIcon, VideoIcon, ZapIcon } from 'lucide-react';
export const HeroSection = () => {
  return <section className="relative w-full min-h-screen pt-24 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-100 rounded-full opacity-70 animate-float"></div>
        <div className="absolute top-40 right-10 w-40 h-40 bg-purple-100 rounded-full opacity-60 animate-float-delay"></div>
        <div className="absolute bottom-20 left-1/3 w-52 h-52 bg-emerald-100 rounded-full opacity-60 animate-float-slow"></div>
        {/* Chat Icons */}
        <div className="absolute top-1/4 right-1/4 animate-bounce-slow opacity-20">
          <MessageCircleIcon size={40} className="text-indigo-400" />
        </div>
        <div className="absolute bottom-1/3 left-1/4 animate-bounce-slow opacity-20 delay-700">
          <VideoIcon size={48} className="text-emerald-400" />
        </div>
        <div className="absolute top-2/3 right-1/3 animate-bounce-slow opacity-20 delay-1500">
          <ZapIcon size={36} className="text-amber-400" />
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 animate-fade-in">
            Connect, Chat & Collaborate in Real-Time 💞💝
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-3xl mx-auto animate-fade-in-delay">
            Experience seamless one-to-one Private and Random communication with
            high-quality video calls, messaging, and AI-powered chat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-long">
            <a href="#quick-features" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl">
              Get Started
            </a>
            <a href="#one-to-one" className="bg-white hover:bg-gray-50 text-indigo-600 px-8 py-3 rounded-lg font-medium border border-indigo-200 transition-all shadow-md hover:shadow-lg">
              Explore Features
            </a>
          </div>
          <div className="mt-16 animate-bounce">
            <a href="#quick-features" className="text-gray-400 hover:text-indigo-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>;
};