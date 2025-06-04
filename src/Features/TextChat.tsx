import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import Picker from "emoji-picker-react";
import { Paperclip, Trash2, Moon, Sun } from "lucide-react";
import { Theme } from "emoji-picker-react";

const socket: Socket = io("http://localhost:5000");

type Message = {
  id: string;
  text?: string;
  file?: string;
  sender: string;
  timestamp: string;
  isRead: boolean;
};

const TextChat: React.FC = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [linkCopied, setLinkCopied] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const [currentRoom, setCurrentRoom] = useState(roomId || uuidv4());
  

  // ✅ Change 1: useRef → useState
  const [username] = useState("User_" + Math.floor(Math.random() * 1000));

  useEffect(() => {
    if (!roomId) {
      navigate(`/text-chat/${currentRoom}`);
    } else {
      setCurrentRoom(roomId);
    }
  }, [roomId]);

  useEffect(() => {
    socket.emit("join-room", currentRoom);

    socket.on("receive-private-message", (msg: Message) => {
      // Check if this message is NOT already in the state to avoid duplicates
      setMessages((prev) => {
        const exists = prev.some((m) => m.id === msg.id);
        return exists ? prev : [...prev, { ...msg, isRead: true }];
      });
    });

    socket.on("typing", () => setTyping(true));
    socket.on("stopTyping", () => setTyping(false));

    return () => {
      socket.off("receive-private-message");
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, [currentRoom]);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      const msg: Message = {
        id: uuidv4(),
        text: message,
        sender: username,
        timestamp: new Date().toLocaleTimeString(),
        isRead: false,
      };
      socket.emit("send-private-message", { roomId: currentRoom, message: msg });
      setMessages((prev) => [...prev, msg]);
      setMessage("");
      socket.emit("stopTyping");
    }
  };
  const handleLinkCopy = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  } catch (err) {
    console.error("Failed to copy:", err);
  }
};


  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    socket.emit("typing", currentRoom);
    if (!e.target.value) socket.emit("stopTyping");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const msg: Message = {
        id: uuidv4(),
        file: reader.result as string,
        sender: username,
        timestamp: new Date().toLocaleTimeString(),
        isRead: false,
      };
      socket.emit("send-private-message", { roomId: currentRoom, message: msg });
      setMessages((prev) => [...prev, msg]);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const msg: Message = {
        id: uuidv4(),
        file: reader.result as string,
        sender: username,
        timestamp: new Date().toLocaleTimeString(),
        isRead: false,
      };
      socket.emit("send-private-message", { roomId: currentRoom, message: msg });
      setMessages((prev) => [...prev, msg]);
    };
    reader.readAsDataURL(file);
  };

  const isImage = (dataUrl: string) => dataUrl.startsWith("data:image");

  return (
    <div
      className={`min-h-screen p-4 flex flex-col items-center ${
        isDark ? "bg-gray-600 text-white" : "bg-gray-100"
      }`}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      
      <Link
        to="/"
        className="fixed top-3 left-4 text-pink-500 font-bold text-3xl hover: z-50"
      >
        HelloWho!
      </Link>
     
       {/* Heading */}
      <h1 className="text-4xl font-bold mb-3 text-indigo-700 drop-shadow-lg">Text Chat</h1>



      <div className="w-full my-4 max-w-5xl p-5 shadow-2xl rounded-2xl border bg-white dark:bg-gray-400 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-xl">Room ID: {currentRoom}</h2>
          <div className="flex gap-3 items-center">
            <button
               onClick={handleLinkCopy}
                className={`px-3 py-1 rounded ${linkCopied ? "bg-green-500" : "bg-blue-600"} text-white`}>
                 {linkCopied ? "Link Copied!" : "Share Link"}
            </button>
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded bg-gray-300 dark:bg-gray-700"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setMessages([])}
              className="p-2 rounded bg-red-200 text-red-700"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div
          ref={chatRef}
          className="h-[430px] overflow-y-auto border p-2 rounded-md bg-gray-50 dark:bg-gray-600"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-3 flex ${
                msg.sender === username ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-xl px-4 py-2 max-w-xs text-sm ${
                  msg.sender === username
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-500 dark:bg-gray-400"
                }`}
              >
                {msg.text && <p>{msg.text}</p>}
                {msg.file &&
                  (isImage(msg.file) ? (
                    <img src={msg.file} alt="uploaded" className="rounded mt-2 max-h-40" />
                  ) : (
                    <a
                      href={msg.file}
                      download={`file-${msg.id}`}
                      className="text-blue-400 underline"
                    >
                      Download File
                    </a>
                  ))}
                <div className="text-xs mt-1 text-right opacity-70">
                  {msg.timestamp} {msg.isRead && "✓"}
                </div>
              </div>
            </div>
          ))}
          {typing && <div className="italic text-sm text-gray-500">Someone is typing...</div>}
        </div>

        {/* Input Section */}
        <div className="mt-4 flex items-center gap-2">
          <button onClick={() => setShowEmoji(!showEmoji)} className="text-2xl">😊</button>
          <input
            type="text"
            className="flex-1 border px-4 py-2 rounded"
            placeholder="Type a message..."
            value={message}
            onChange={handleTyping}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <input
            type="file"
            ref={fileRef}
            onChange={handleFileUpload}
            hidden
            accept="image/*,.pdf,.doc,.docx"
          />
          <button onClick={() => fileRef.current?.click()}>
            <Paperclip />
          </button>
          <button
            onClick={sendMessage}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>

        {showEmoji && (
          <div className="absolute bottom-20 left-5 z-10">
            <Picker
              onEmojiClick={(emoji) => setMessage((prev) => prev + emoji.emoji)}
              theme={isDark ? Theme.DARK : Theme.LIGHT}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TextChat;
