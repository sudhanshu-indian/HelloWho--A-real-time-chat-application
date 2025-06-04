import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ChatSelector from "./ChatSelector";
import TextChat from "./TextChat";
import VideoChat from "./VideoChat";
import RandomChat from "./RandomChat";

const FeaturesApp: React.FC = () => (
  <Routes>
    <Route path="/" element={<ChatSelector />} />
    
    {/* Default TextChat route that redirects to a new room ID */}
    <Route
      path="text-chat"
      element={<Navigate to={`${crypto.randomUUID()}`} replace/>}
    />
    
    {/* Dynamic route with roomId */}
    <Route path="text-chat/:roomId" element={<TextChat />} />
      
      {/* RandomChat route */}  
      <Route
      path="random-chat"
      element={<Navigate to={`${crypto.randomUUID()}`} replace/>}
    />
    
    <Route path="random-chat/:roomId" element={<RandomChat />} />
    
    {/* Default VideoChat route that redirects to a new room ID */}
    
    <Route path="video-chat" element={<VideoChat />} />
    <Route path="*" element={<div className="text-center p-10 text-red-600 font-bold">Page Not Found</div>} />
  </Routes>
);

export default FeaturesApp;
