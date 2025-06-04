import React from 'react';
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon } from 'lucide-react';
export const Footer = () => {
  return <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-bold text-white mb-4">HelloWho!</h3>
            <p className="mb-4">Stay Connected, Anytime, Anywhere</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FacebookIcon size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <TwitterIcon size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <InstagramIcon size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <LinkedinIcon size={20} />
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div className="mb-8 md:mb-0">
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#feedback" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Download App
                </a>
              </li>
            </ul>
          </div>
          {/* Legal */}
          <div className="mb-8 md:mb-0">
            <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  GDPR Compliance
                </a>
              </li>
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h4>
            <ul className="space-y-2">
              <li>Email: support@hellowho.in</li>
              <li>Phone: +918949284248, +9938492743</li>
              <li>Address: 123 Mansarovar ,Jaipur, Rajsthan  202003</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p>© 2025 HelloWho!. All Rights Reserved.</p>
        </div>
      </div>
    </footer>;
};