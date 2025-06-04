import React from 'react';
import { MessageCircleIcon, VideoIcon, UsersIcon, BotIcon, XIcon, ShuffleIcon } from 'lucide-react';

interface QuickAccessMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickAccessMenu: React.FC<QuickAccessMenuProps> = ({
  isOpen,
  onClose
}) => {
  const menuItems = [
    {
      icon: <ShuffleIcon size={24} />,
      label: 'Random Chat',
      link: '/features/random-chat' 
    },
    {
      icon: <MessageCircleIcon size={24} />,
      label: 'Text Chat',
      link: '/features/text-chat'  
    },
    {
      icon: <VideoIcon size={24} />,
      label: 'Video Calls',
      link: '/features/video-chat'   
    },
    
    {
      icon: <BotIcon size={24} />,
      label: 'AI Chat',
      link: 'HelloAI/helloAI.html'   
    }
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}
      {/* Menu */}
      <div
        className={`fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-gray-800">Quick Access</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <XIcon size={24} />
            </button>
          </div>
          <div className="space-y-4">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"                // 🔥 Opens in new tab
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-center p-4 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 transition-all duration-300 group"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md group-hover:scale-110 transition-transform duration-300 text-indigo-600">
                  {item.icon}
                </div>
                <span className="ml-4 font-medium text-gray-700 group-hover:text-gray-900">
                  {item.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
