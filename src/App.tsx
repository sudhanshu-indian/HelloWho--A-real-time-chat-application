import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { QuickFeatures } from './components/QuickFeatures';
import { FeaturesSection } from './components/FeaturesSection';
import { FeatureDetail } from './components/FeatureDetail';
// import { Testimonials } from './components/Testimonials';
import { FeedbackSection } from './components/FeedbackSection';
import { Footer } from './components/Footer';

import FeaturesApp from './Features/FeaturesApp';

function HomePage() {
  useEffect(() => {
    const anchors = document.querySelectorAll('a[href^="#"]');
    const handleClick = function (e: Event) {
      e.preventDefault();
      const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
      if (href && href !== '#') {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    anchors.forEach(anchor => anchor.addEventListener('click', handleClick));
    return () => {
      anchors.forEach(anchor => anchor.removeEventListener('click', handleClick));
    };
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <QuickFeatures />
        <FeaturesSection />
        <FeatureDetail id="random-chat" title="Connect with New People" description="Start a conversation with a random person from anywhere in the world. Every click brings a new connection — who will it be this time? Instant, random chats. Skip the small talk or dive deep — you’re always one click away from someone new." imageUrl="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" imageAlt="People connecting through random chat" reverse={false} />
        <FeatureDetail id="one-to-one" title="Seamless Private Messaging" description="Chat instantly with people around the world — no video, no voice, just pure conversation in real time.Enjoy real-time, secure, and reliable one-on-one conversations with rich media sharing capabilities.Say what’s on your mind without revealing who you are. Safe, anonymous, and judgment-free text conversations." imageUrl="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" imageAlt="Two people chatting with message bubbles" reverse={false} />
        <FeatureDetail id="anonymous-chat" title="Private. Safe. Anonymous." description="Your identity stays hidden. Share thoughts, ask questions, or just vent — all without giving anything away. Total privacy, zero judgment.No names. No pressure. Just real, anonymous conversations with people from anywhere. Be yourself — or someone else!" imageUrl="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" imageAlt="Group of people in a virtual chat room" reverse={true} />
        <FeatureDetail id="video-calls" title="Face-to-Face Communication" description="Connect face-to-face with people around the world in real-time. High-quality video, smooth experience — just one click away from a real conversation. Say hello to the world, one face at a time. Instantly video chat with random users from across the globe — no borders, just people." imageUrl="https://images.unsplash.com/photo-1609921212029-bb5a28e60960?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" imageAlt="Two people in a video call" reverse={false} />
        <FeatureDetail id="ai-chat" title="AI-Powered Smart Chat" description="Talk to our intelligent AI assistant in real time. Ask questions, get answers, or just have a casual conversation — anytime, anywhere. Step into the future of conversation. Our advanced AI is ready to chat, help, or entertain — like sci-fi, but real." imageUrl="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" imageAlt="AI assistant responding with automated suggestions" reverse={true} />
        {/* <Testimonials /> */}
        <FeedbackSection />
      </main>
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/features/*" element={<FeaturesApp />} />
      </Routes>
    </Router>
  );
}
