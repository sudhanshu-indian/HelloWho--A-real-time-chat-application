import React, { useEffect, useState, useRef } from 'react';
interface FeatureDetailProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  reverse?: boolean;
}
export const FeatureDetail: React.FC<FeatureDetailProps> = ({
  id,
  title,
  description,
  imageUrl,
  imageAlt,
  reverse = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.1
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  return <section id={id} className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div ref={sectionRef} className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 lg:gap-16`}>
          <div className={`w-full lg:w-1/2 transition-all duration-700 ${isVisible ? 'opacity-100 transform translate-x-0' : `opacity-0 transform ${reverse ? 'translate-x-16' : '-translate-x-16'}`}`}>
            <div className="overflow-hidden rounded-xl shadow-xl">
              <img src={imageUrl} alt={imageAlt} className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500" style={{
              maxHeight: '500px'
            }} />
            </div>
          </div>
          <div className={`w-full lg:w-1/2 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-16'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
            <p className="text-lg text-gray-700 mb-8">{description}</p>
            <div className="flex flex-wrap gap-4">
              <a href="#quick-features" className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg transition-colors">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>;
};