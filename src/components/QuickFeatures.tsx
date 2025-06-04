import React from 'react';
import { ShuffleIcon, VideoIcon, MessageCircleIcon, BotIcon } from 'lucide-react';

export const QuickFeatures = () => {
  const features = [
    {
      icon: <ShuffleIcon size={32} />,
      label: 'Random Chat',
      color: 'from-pink-500 to-rose-500',
      description: 'Connect with new people',
      link: '/features/random-chat'
    },
    {
      icon: <VideoIcon size={32} />,
      label: 'Video Calls',
      color: 'from-purple-500 to-indigo-500',
      description: 'Face-to-face meetings',
      link: '/features/video-chat'
    },
    {
      icon: <MessageCircleIcon size={32} />,
      label: 'Text Chat',
      color: 'from-blue-500 to-cyan-500',
      description: 'Instant messaging',
      link: '/features/text-chat'
    },
    {
      icon: <BotIcon size={32} />,
      label: 'AI Chat',
      color: 'from-emerald-500 to-teal-500',
      description: 'Smart conversations',
      link: 'HelloAI/helloAI.html'
    }
  ];

  return (
     <section id="quick-features" className="py-20 bg-gradient-to-b from-white to-gray-50">
       <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your Way to Connect
          </h2>
          <p className="text-xl text-gray-600">
            Multiple ways to communicate, one platform for all
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-x10 transform transition duration-500 hover:scale-[1.03] hover:shadow-2xl"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-90 transition-transform duration-500 group-hover:scale-105`}
              />
              <div className="relative p-8 flex flex-col items-center text-white z-10">
                <div className="w-16 h-16 rounded-full bg-white bg-opacity-30 flex items-center justify-center mb-4 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-180">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.label}</h3>
                <p className="text-sm opacity-90 text-center">{feature.description}</p>
                <a
                  href={feature.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 px-6 py-2 bg-white text-gray-900 rounded-full font-semibold transform transition-transform duration-500 hover:scale-105 hover:shadow-lg"
                >
                  Start Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
