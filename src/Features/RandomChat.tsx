import React, { useState, useEffect, useRef } from 'react';
import { FaRandom, FaPhoneSlash, FaCopy, FaPaperclip, FaSmile } from 'react-icons/fa';
import { FiMic, FiMicOff, FiVideo, FiVideoOff } from 'react-icons/fi';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { io, Socket } from 'socket.io-client';

interface Message {
  text: string;
  sender: 'me' | 'stranger';
  timestamp: string;
}

const RandomChat: React.FC = () => {
  const [status, setStatus] = useState('Click "Find Stranger" to start');
  const [isConnected, setIsConnected] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [micEnabled, setMicEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket>();
  const peerRef = useRef<RTCPeerConnection>();
  const isInitiatorRef = useRef(false); // ✅ NEW: to track initiator
  const localStreamRef = useRef<MediaStream>();
  



  // Initialize socket connection and event listeners
  useEffect(() => {
    const socket = io('http://localhost:5000', { 
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      setStatus('Connected to server');
    });

    socket.on('disconnect', () => {
      setStatus('Disconnected from server');
      setIsConnected(false);
      cleanupMedia();
    });

   socket.on('stranger-found', async ({ roomId, partner }) => {
  setRoomId(roomId);
  setStatus('Connected to stranger');
  setIsConnected(true);

  // ✅ NEW: decide who creates offer (higher ID creates)
 isInitiatorRef.current = (socketRef.current?.id || '') > partner;

  await setupMedia(roomId);
});


    
socket.on('stranger-signal', async ({ signal }) => {
  if (!peerRef.current || !signal) return;

  try {
    if (signal.type === 'offer') {
      await peerRef.current.setRemoteDescription(new RTCSessionDescription(signal));
      const answer = await peerRef.current.createAnswer();
      await peerRef.current.setLocalDescription(answer);
      if (socketRef.current) {
        socketRef.current.emit('stranger-signal', { roomId, signal: answer });
      }
    } else if (signal.type === 'answer') {
      await peerRef.current.setRemoteDescription(new RTCSessionDescription(signal));
    } else if (signal.candidate) {
      await peerRef.current.addIceCandidate(new RTCIceCandidate(signal));
    }
  } catch (err) {
    console.error('Signal error:', err);
  }
});
    
    socket.on('stranger-text', (message: string) => {
      addMessage(message, 'stranger');
    });

    socket.on('stranger-left', () => {
      setStatus('Stranger disconnected');
      setIsConnected(false);
      cleanupMedia();
      setRoomId('');
    });

    socket.on('connect_error', (err) => {
      console.error('Connection error:', err);
      setStatus('Connection error: ' + err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Set up media and WebRTC connection
  const setupMedia = async (roomId: string) => {
    try {
      // Get local media stream
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      localStreamRef.current = stream;

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Create peer connection with proper configuration
      const peer = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' },
          { urls: 'stun:stun2.l.google.com:19302' }
        ]
      });
      peerRef.current = peer;

      // Add local tracks to peer connection
      stream.getTracks().forEach(track => {
        peer.addTrack(track, stream);
      });

      // Handle remote stream
      peer.ontrack = (event) => {
        if (remoteVideoRef.current && event.streams[0]) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      // Handle ICE candidates
      peer.onicecandidate = (event) => {
        if (event.candidate && socketRef.current) {
          socketRef.current.emit('stranger-signal', {
            roomId,
            signal: { candidate: event.candidate }
          });
        }
      };

      // Handle connection state changes
      peer.onconnectionstatechange = () => {
        if (peer.connectionState === 'disconnected' || 
            peer.connectionState === 'failed') {
          setStatus('Connection lost');
          setIsConnected(false);
          cleanupMedia();
        }
      };

      // Create and send offer if we're the initiator
if (isInitiatorRef.current) {
        const offer = await peer.createOffer({
          offerToReceiveAudio: true,
          offerToReceiveVideo: true
        });
  await peer.setLocalDescription(offer);
        if (socketRef.current) {
          socketRef.current.emit('stranger-signal', {
    roomId,
    signal: offer
  });
        }
}

    } catch (err) {
      console.error('Media setup error:', err);
      setStatus('Failed to access media devices');
      cleanupMedia();
    }
  };

  // Update the signal handler
  useEffect(() => {
    if (!socketRef.current) return;

    socketRef.current.on('stranger-signal', async ({ signal }) => {
      if (!peerRef.current || !signal || !socketRef.current) return;

      try {
        if (signal.type === 'offer') {
          await peerRef.current.setRemoteDescription(new RTCSessionDescription(signal));
          const answer = await peerRef.current.createAnswer();
          await peerRef.current.setLocalDescription(answer);
          socketRef.current.emit('stranger-signal', { roomId, signal: answer });
        } else if (signal.type === 'answer') {
          await peerRef.current.setRemoteDescription(new RTCSessionDescription(signal));
        } else if (signal.candidate) {
          await peerRef.current.addIceCandidate(new RTCIceCandidate(signal.candidate));
        }
      } catch (err) {
        console.error('Signal handling error:', err);
      }
    });

    return () => {
      socketRef.current?.off('stranger-signal');
    };
  }, [roomId]);

  // Clean up media and connections
  const cleanupMedia = () => {
    if (peerRef.current) {
      peerRef.current.ontrack = null;
      peerRef.current.onicecandidate = null;
      peerRef.current.onconnectionstatechange = null;
      peerRef.current.close();
      peerRef.current = undefined;
    }

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = undefined;
    }

    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
  };

  // Find a stranger to chat with
  const findStranger = () => {
    setMessages([]);
    setStatus('Finding stranger...');
    cleanupMedia();
    socketRef.current?.emit('find-stranger');
  };

  // End the current chat
  const endChat = () => {
    socketRef.current?.emit('leave-stranger-chat', { roomId });
    setRoomId('');
    setIsConnected(false);
    setStatus('Chat ended');
    cleanupMedia();
  };

  // Add a message to the chat
  const addMessage = (text: string, sender: 'me' | 'stranger') => {
    setMessages(prev => [...prev, {
      text,
      sender,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  // Send a text message
  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    addMessage(newMessage, 'me');
    socketRef.current?.emit('stranger-text', { roomId, message: newMessage });
    setNewMessage('');
  };

  // Handle emoji selection
  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setNewMessage(prev => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  // Toggle microphone
  const toggleMic = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setMicEnabled(!micEnabled);
    }
  };

  // Toggle video
  const toggleVideo = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setVideoEnabled(!videoEnabled);
    }
  };

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const goToLandingPage = () => {
    window.location.href = '/';
  };


  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-purple-100 to-indigo-100 overflow-hidden">
      <header className="bg-gray-400 p-4 text-3xl font-bold text-center">
        Random/Stranger Chat
      </header>
      <div className="bg-gray-600 p-1 text-center">{status}</div>

<div className="flex flex-1 overflow-hidden">
  {/* Video Area */}
  <div className="flex-1 flex p-4 space-x-4 bg-black overflow-hidden">
    {/* Local Video */}
    <div className="w-1/2 relative bg-gray-800 rounded-lg overflow-hidden">
      <video
        ref={localVideoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover rounded-lg"
      />
    </div>

 {/* Mic/Video Buttons */}
 <div className="absolute bottom-3 left-3 flex space-x-3">
  <button
    onClick={toggleMic}
    className={`p-2 rounded-full ${micEnabled ? 'bg-green-600' : 'bg-red-600'}`}
    title={micEnabled ? "Mute Mic" : "Unmute Mic"}
  >
    {micEnabled ? <FiMic className="text-white" /> : <FiMicOff className="text-white" />}
  </button>

  <button
    onClick={toggleVideo}
    className={`p-2 rounded-full ${videoEnabled ? 'bg-green-600' : 'bg-red-600'}`}
    title={videoEnabled ? "Turn Off Camera" : "Turn On Camera"}
  >
    {videoEnabled ? <FiVideo className="text-white" /> : <FiVideoOff className="text-white" />}
  </button>
</div>


    {/* Remote Video */}
    <div className="w-1/2 relative bg-gray-800 rounded-lg overflow-hidden">
      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover rounded-lg"
      />
      {!isConnected && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-lg">
          Waiting for stranger...
        </div>
      )}
    </div>
  </div>

  {/* Chat Area */}
  <div className="w-full md:w-1/3 border-l-2 border-gray-400 flex flex-col max-h-full">
    <div className="flex-1 overflow-y-auto p-4 space-y-2 max-h-[calc(100vh-200px)]">
      {messages.map((msg, i) => (
        <div key={i} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
          <div className={`px-4 py-2 rounded-lg ${msg.sender === 'me' ? 'bg-blue-600' : 'bg-gray-400'}`}>
            <p>{msg.text}</p>
            <p className="text-xs text-gray-400 mt-1">{msg.sender} • {msg.timestamp}</p>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>

          <div className="p-4 border-t border-gray-400 relative bg-gray-200">
            {showEmojiPicker && (
              <div className="absolute bottom-16 right-4 z-10">
                <EmojiPicker onEmojiClick={handleEmojiClick} width={300} height={400} />
              </div>
            )}
            <div className="flex items-center">
              <button 
                onClick={() => setShowEmojiPicker(!showEmojiPicker)} 
                className="p-2 text-gray-800 hover:text-white"
              >
                <FaSmile />
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 bg-gray-500 rounded-lg px-4 py-2 mx-2 focus:outline-none"
              />
              <button className="p-2 text-gray-800 hover:text-white"><FaPaperclip /></button>
              <button 
                onClick={sendMessage} 
                className="ml-2 bg-blue-500 hover:bg-blue-800 px-4 py-2 rounded-lg"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-4 flex justify-center space-x-4">
        {!isConnected ? (
          <button 
            onClick={findStranger} 
            className="bg-green-600 hover:bg-pink-600 px-4 py-2 rounded-lg flex items-center"
          >
            <FaRandom className="mr-2" /> Find Stranger
          </button>
        ) : (
          <button 
            onClick={endChat} 
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center"
          >
            <FaPhoneSlash className="mr-2" /> End Chat
          </button>
        )}
      </div>

      <div className="absolute top-4 right-4">
        <button 
          onClick={goToLandingPage} 
          className="fixed top-3 left-4 text-pink-600 font-bold text-3xl hover: z-50"
        >
          HelloWho!
        </button>
      </div>
    </div>
  );
};

export default RandomChat;