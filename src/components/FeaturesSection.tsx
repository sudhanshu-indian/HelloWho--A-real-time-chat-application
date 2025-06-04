import React, { useState } from 'react';
import { MessageCircleIcon, UsersIcon, VideoIcon, BotIcon, ShieldIcon, ShieldCheckIcon, SearchIcon, ShuffleIcon } from 'lucide-react';
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}
const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  link
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return <a href={link} className={`relative overflow-hidden bg-white rounded-xl shadow-md transition-all duration-300 ${isHovered ? 'shadow-xl transform -translate-y-1' : ''}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="p-6">
        <div className={`w-12 h-12 flex items-center justify-center rounded-full mb-4 transition-colors duration-300 ${isHovered ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-600'}`}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
        <div className={`mt-4 text-indigo-600 flex items-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <span>Learn more</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
      <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transition-transform duration-300 ${isHovered ? 'transform scale-x-100' : 'transform scale-x-0'}`}></div>
    </a>;
};
export const FeaturesSection = () => {
  const features = [{
    icon: <ShuffleIcon size={24} />,
    title: 'Random Chat',
    description: 'Meet new people and make connections.',
    link: '#random-chat'
  }, {
    icon: <VideoIcon size={24} />,
    title: 'Video Calls',
    description: 'High-quality video communication.',
    link: '#video-calls'
  },{
    icon: <MessageCircleIcon size={24} />,
    title: 'One-to-One Chat',
    description: 'Instant messaging with real-time updates.',
    link: '#one-to-one'
  }
   , {
    icon: <BotIcon size={24} />,
    title: 'AI Chat',
    description: 'Smart assistant with instant and intelligent responses.',
    link: '#ai-chat'
  }, {
    icon: <ShieldIcon size={24} />,
    title: 'Anonymous Chat',
    description: 'No login/Signup makes you anonymous and keeps you private.',
    link: '#anonymous-chat'
  }, {
    icon: <UsersIcon size={24} />,
    title: 'User Feedback',
    description: 'Feedback and support from our community.',
    link: '#feedback'
  }];
  return <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover all the tools you need for seamless communication and
            collaboration.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} link={feature.link} />)}
        </div>
      </div>
    </section>;
};