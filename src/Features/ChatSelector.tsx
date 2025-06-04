import React from "react";
import { Link } from "react-router-dom";

const ChatSelector: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-pink-100 flex flex-col items-center justify-center relative px-4">


      <Link
        to="/"
        className="absolute top-4 left-4 text-3xl font-extrabold text-pink-600 hover:text-pink-700 transition-colors"
      >
        HelloWho!
      </Link>

   
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-sm border border-pink-300">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Choose a Chat Type</h1>

   
        <div className="flex flex-col space-y-6">
          <Link to="/features/text-chat">
            <button className="w-full py-3 bg-pink-500 text-white rounded-lg text-lg font-semibold hover:bg-pink-600 transition duration-300">
              💬 Text Chat
            </button>
          </Link>

          <Link to="/features/video-chat">
            <button className="w-full py-3 bg-purple-500 text-white rounded-lg text-lg font-semibold hover:bg-purple-600 transition duration-300">
              🎥 Video Chat
            </button>
          </Link>
        </div>

        <div className="mt-6 text-center text-gray-600">
          <p className="text-sm">Or</p>
          <Link to="/features/random-chat" className="text-pink-500 hover:underline">
           Random Chat
          </Link>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Built with ❤️ by HelloWho!
        </p>
      </div>
    </div>
  );
};

export default ChatSelector;
