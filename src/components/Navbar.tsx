// Navbar.jsx
import React, { useEffect, useState } from 'react';
import { MenuIcon, XIcon, LayoutGridIcon } from 'lucide-react';
import { QuickAccessMenu } from './QuickAccessMenu';
// import { LoginModal } from './LoginModal';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-6 md:px-6">
          <div className="flex justify-between items-center">
            
            { /* Logo */}
            <div className="flex items-flex-start ">
              <a href="#quick-features" className="text-3xl font-bold text-pink-600 hover:text-indigo-800 transition-colors">
                HelloWho!
              </a>
            </div>

            <div className="hidden md:flex space-x-10 ml-auto text-xl">
              <a href="#features" className="text-gray-700 hover:text-indigo-600 transition-colors">Features</a>
              <a href="#quick-features" className="text-gray-700 hover:text-indigo-600 transition-colors">Services</a>
              <a href="https://medium.com/@mr-robot-abhi/build-a-real-time-chat-application-with-the-mern-stack-ed1b2b1b9432" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-indigo-600 transition-colors">
                  Blogs</a>
              <a href="#feedback" className="text-gray-700 hover:text-indigo-600 transition-colors">Feedback</a>
            </div>

            {/* Login/Signup Buttons
            <div className="hidden md:flex items-center space-x-6 ml-10 text-xl">
              <button onClick={() => setIsLoginOpen(true)} className="text-indigo-600 hover:text-pink-800 transition-colors">
                Login
              </button>
              <button onClick={() => setIsLoginOpen(true)} className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                Sign Up
              </button>
            </div> */}

            {/* Quick Access Button (rightmost) */}
            <button onClick={() => setIsQuickMenuOpen(true)} className=" hover:bg-gray-100 rounded-lg transition-colors ml-7 " aria-label="Quick Access Menu">
              <LayoutGridIcon size={30} className="text-indigo-600" />
            </button>

            <div className="md:hidden">
              <button className="text-gray-700 hover:text-indigo-600" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <XIcon size={30} /> : <MenuIcon size={30} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden mt-4 pb-4">
              <div className="flex flex-col space-y-3">
                <a href="#features" className="text-gray-700 hover:text-indigo-600 transition-colors" onClick={() => setIsOpen(false)}>Features</a>
                <a href="#one-to-one" className="text-gray-700 hover:text-indigo-600 transition-colors" onClick={() => setIsOpen(false)}>Messaging</a>
                <a href="#group-chat" className="text-gray-700 hover:text-indigo-600 transition-colors" onClick={() => setIsOpen(false)}>Group Chat</a>
                <a href="#feedback" className="text-gray-700 hover:text-indigo-600 transition-colors" onClick={() => setIsOpen(false)}>Contact</a>
                <div className="pt-3 flex flex-col space-y-3">
                  <button onClick={() => { setIsOpen(false); setIsLoginOpen(true); }} className="text-indigo-600 hover:text-indigo-800 transition-colors">Login</button>
                  <button onClick={() => { setIsOpen(false); setIsLoginOpen(true); }} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors text-center">Sign Up</button>
                </div>
              </div>
            </div>
          )}
        </div>
        <QuickAccessMenu isOpen={isQuickMenuOpen} onClose={() => setIsQuickMenuOpen(false)} />
      </nav>

      {/* Login Modal */}
      {/* <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} /> */}
    </>
  );
};
