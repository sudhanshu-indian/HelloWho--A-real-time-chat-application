👋 HelloWho! — Real-Time Chat App (Author- Sudhanshu Kumar)
HelloWho! is a modern, full-stack real-time chat application built using the MERN stack with Socket.IO and WebRTC to support both random one-on-one chats (à la Omegle) and structured user communication (like WhatsApp or Slack). With responsive UI components and interactive features, HelloWho! is designed to be both functional and fun.

🚀 Features
🔒 Login Modal (optional, future enhancement for user auth)

💬 Text Chat — Real-time messaging with typing indicators

📹 Video & Audio Chat — Peer-to-peer calls using WebRTC

🔄 Random Chat — Find a stranger and start chatting instantly

🌗 Dark Mode Ready — Smooth and modern UI

🎯 Emoji Support & File Sharing (extendable)


### 📷 Screenshots
![Text Chat](./screenshots/text-chat.png)
![Video Chat](./screenshots/video-chat.png)



⚡ Powered by Socket.IO for low-latency interactions

HelloWho/
├── dist/                      # Build output
├── node_modules/             # Dependencies
├── src/
│   ├── components/           # UI components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── FeatureDetail.tsx
│   │   ├── FeedbackSection.tsx
│   │   ├── Testimonials.tsx
│   │   ├── LoginModal.tsx
│   │   └── ...more
│   ├── Features/             # Chat features
│   │   ├── TextChat.tsx
│   │   ├── VideoChat.tsx
│   │   ├── RandomChat.tsx
│   │   ├── ChatSelector.tsx
│   │   └── FeaturesApp.tsx
│   ├── App.tsx               # Main entry point for React
│   ├── index.tsx             # React DOM renderer
│   └── index.css             # Global styles
├── public/
│   └── index.html
├── package.json              # Project metadata and dependencies
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind CSS setup
└── tsconfig.json             # TypeScript configuration


🛠️ Technologies Used
Frontend: React.js + TypeScript + Tailwind CSS + Vite

Backend: Node.js + Express.js + Socket.IO

Peer Communication: WebRTC

Styling: Tailwind CSS

State Management: React Hooks + Context API (optional)


🌐 How to Run
1. Clone the Repository
bash
git clone https://github.com/your-username/HelloWho.git
cd HelloWho
2. Install Dependencies
bash
npm install
3. Start Development Server
bash
node server.cjs
npm run dev
5. Open in Browser
Go to: http://localhost:5173

## 🔌 Backend Overview

The backend is built with Express.js and uses Socket.IO to manage:
- Real-time chat events
- WebRTC signaling
- Random pairing logic
- User disconnection cleanup

> Located in: `server.cjs`



