import React, { useState, useRef, useEffect } from "react";
import Peer, { MediaConnection } from "peerjs";
import { useNavigate, useLocation } from "react-router-dom";

const VideoChat: React.FC = () => {
  const [peerId, setPeerId] = useState("");
  const [remoteId, setRemoteId] = useState("");
  const [callActive, setCallActive] = useState(false);
  const [connected, setConnected] = useState(false);
  const [status, setStatus] = useState("Waiting for connection...");
  const [copied, setCopied] = useState(false);
  const [incomingCall, setIncomingCall] = useState<MediaConnection | null>(null);
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const remoteRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<Peer | null>(null);
  const callRef = useRef<MediaConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const peer = new Peer();
    peerRef.current = peer;

    peer.on("open", (id) => {
      setPeerId(id);
      const room = new URLSearchParams(location.search).get("room");
      if (room) setRemoteId(room);
    });

    peer.on("call", (call) => {
      setIncomingCall(call); // store call and show accept/reject UI
    });

    peer.on("error", (err) => {
      setStatus("❌ Peer not found or offline.");
      console.error("Peer error:", err);
    });

    return () => {
      peer.destroy();
    };
  }, []);

  const acceptCall = () => {
    if (!incomingCall) return;
    setStatus("Receiving call...");

    navigator.mediaDevices.getUserMedia({ video: videoOn, audio: micOn }).then((stream) => {
      videoRef.current!.srcObject = stream;
      videoRef.current!.play();
      localStreamRef.current = stream;

      incomingCall.answer(stream);
      callRef.current = incomingCall;
      setCallActive(true);
      setConnected(true);
      setStatus("✅ Connected!");

      incomingCall.on("stream", (remoteStream) => {
        remoteRef.current!.srcObject = remoteStream;
        remoteRef.current!.play();
      });

      incomingCall.on("close", () => endCall());
      setIncomingCall(null);
    });
  };

  const rejectCall = () => {
    incomingCall?.close();
    setIncomingCall(null);
    setStatus("❌ Call rejected");
  };

  const callUser = () => {
    setStatus("Calling...");

    navigator.mediaDevices.getUserMedia({ video: videoOn, audio: micOn }).then((stream) => {
      videoRef.current!.srcObject = stream;
      videoRef.current!.play();
      localStreamRef.current = stream;

      const call = peerRef.current?.call(remoteId, stream);
      callRef.current = call!;
      setCallActive(true);

      call?.on("stream", (remoteStream) => {
        remoteRef.current!.srcObject = remoteStream;
        remoteRef.current!.play();
        setConnected(true);
        setStatus("✅ Connected!");
      });

      call?.on("error", () => {
        setStatus("❌ Call failed or Peer not found");
      });

      call?.on("close", () => endCall());
    });
  };

  const endCall = () => {
    callRef.current?.close();
    setCallActive(false);
    setConnected(false);
    setStatus("🔴 Call ended");

    if (videoRef.current) videoRef.current.srcObject = null;
    if (remoteRef.current) remoteRef.current.srcObject = null;
    localStreamRef.current?.getTracks().forEach((track) => track.stop());
  };

  const copyLink = () => {
    const url = `${window.location.origin}/features/video-chat?room=${peerId}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleMic = () => {
    const currentStream = localStreamRef.current;
    if (currentStream) {
      const audioTrack = currentStream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setMicOn(audioTrack.enabled);
    }
  };

  const toggleVideo = () => {
    const currentStream = localStreamRef.current;
    if (currentStream) {
      const videoTrack = currentStream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setVideoOn(videoTrack.enabled);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-100 to-indigo-100 px-4 py-10">
      {/* HelloWho Logo */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => navigate("/")}
          className="text-pink-600 font-bold text-3xl hover:underline"
        >
          HelloWho!
        </button>
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-bold mb-2 my-0 text-indigo-800 drop-shadow-lg">Video Chat</h1>
      
      {/* Status */}
      <div className="text-lg font-semibold mb-4 text-gray-600">{status}</div>

      {/* Video Panels */}
      <div className="flex flex-col sm:flex-row gap-5 mb-5">
        <div className="relative">
          <video  
            ref={videoRef}
            className="w-full sm:w-[500px] h-[400px] bg-black rounded-lg shadow-lg"
            autoPlay
            playsInline
            muted
          />
          {/* Mic & Video Toggle Buttons */}
          <div className="absolute flex flex-raw py-1 gap-3  text-white ">
            <button
              onClick={toggleMic}
              className={`p-2 rounded-lg ${micOn ? "bg-indigo-800" : "bg-red-500"} shadow-lg hover:scale-110 transition duration-300`}
            >
              {micOn ? "🎙️ Mic" : "🙉 Mic"}
            </button>
            <button
              onClick={toggleVideo}
              className={`p-2 rounded-lg ${videoOn ? "bg-indigo-800" : "bg-red-500"} shadow-lg hover:scale-110 transition duration-300`}
            >
              {videoOn ? "🎦 Video" : "🙈 Video"}
            </button>
          </div>
        </div>

        <video
          ref={remoteRef}
          className="w-full sm:w-[500px] h-[400px] bg-black rounded-lg shadow-lg"
          autoPlay
          playsInline
        />
      </div>

      {/* Input, Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <input
          type="text"
          value={remoteId}
          onChange={(e) => setRemoteId(e.target.value)}
          placeholder="Enter ID to call"
          className="px-4 py-2 border border-gray-300 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={callUser}
          disabled={!remoteId}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition disabled:bg-indigo-300"
        >
          Call
        </button>
        {callActive && (
          <button
            onClick={endCall}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
          >
            End Call
          </button>
        )}
      </div>

{/* Peer ID + Share Link */}

<div className="w-full max-w-xl  mt-6 shadow-2xl relative">
  <div className="flex justify-between items-center mb-2">
    <h2 className="font-bold text-lg text-gray-800">Peer ID: {peerId || "Connecting..."}</h2>
    <div className="flex gap-1 items-center">
      <button
        onClick={copyLink}
        className={`px-3 py-1 rounded text-white font-medium transition 
          ${copied ? "bg-green-500" : "bg-indigo-600 hover:bg-indigo-700"}`}
      >
        {copied ? "Link Copied!" : "Share Link"}
      </button>
    </div>
  </div>
</div>

      {/* Incoming Call UI */}
      {incomingCall && (
        <div className="fixed bottom-10 bg-white border border-gray-300 shadow-md p-4 rounded-lg flex gap-4 items-center">
          <p className="text-gray-800 font-medium">📞 Incoming Call...</p>
          <button
            onClick={acceptCall}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Accept
          </button>
          <button
            onClick={rejectCall}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoChat;
