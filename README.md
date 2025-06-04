###👋 HelloWho! — Real-Time Chat App (Author- Sudhanshu Kumar)
<br>
HelloWho! is a modern, full-stack real-time chat application built using the MERN stack with Socket.IO and WebRTC to support both random ,one-on-one chats  and Video Chat . With responsive UI components and interactive features, HelloWho! is designed to be both functional and fun.


🚀 Features
🔒 Login Modal (optional, future enhancement for user auth)

💬 Text Chat — Real-time messaging with typing indicators

📹 Video & Audio Chat — Peer-to-peer calls using WebRTC

🔄 Random Chat — Find a stranger and start chatting instantly

🌗 Dark Mode Ready — Smooth and modern UI

🎯 Emoji Support & File Sharing (extendable)


### 📷 Screenshots
![Main Page](https://github.com/sudhanshu-indian/HelloWho--A-real-time-chat-application/blob/ea56971a3b39289071ade0d0bf32c03472688b09/Chat%20Options.png)
![Random Chat](https://github.com/sudhanshu-indian/HelloWho--A-real-time-chat-application/blob/ea56971a3b39289071ade0d0bf32c03472688b09/Random.jpg)
![Text Chat](https://github.com/sudhanshu-indian/HelloWho--A-real-time-chat-application/blob/ea56971a3b39289071ade0d0bf32c03472688b09/TExt.png)
![Video Chat](https://github.com/sudhanshu-indian/HelloWho--A-real-time-chat-application/blob/ea56971a3b39289071ade0d0bf32c03472688b09/Video%20Vhat.png)
![AI Chat](https://github.com/sudhanshu-indian/HelloWho--A-real-time-chat-application/blob/ea56971a3b39289071ade0d0bf32c03472688b09/AI%20CHAT.png)
![Feedback Bar](https://github.com/sudhanshu-indian/HelloWho--A-real-time-chat-application/blob/ea56971a3b39289071ade0d0bf32c03472688b09/feeback%20bar.png)


HelloWho/
├── dist/                     
├── node_modules/             
├── src/
│   ├── components/          
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── FeatureDetail.tsx
│   │   ├── FeedbackSection.tsx
│   │   ├── Testimonials.tsx
│   │   ├── LoginModal.tsx
│   │   └── ...more
│   ├── Features/           
│   │   ├── TextChat.tsx
│   │   ├── VideoChat.tsx
│   │   ├── RandomChat.tsx
│   │   ├── ChatSelector.tsx
│   │   └── FeaturesApp.tsx
│   ├── App.tsx               
│   ├── index.tsx             
│   └── index.css             
├── public/
│   └── index.html
├── package.json              
├── vite.config.ts            
├── tailwind.config.js        
└── tsconfig.json             


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



