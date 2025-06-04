// === MONGODB SETUP ===
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/helloWhoDB')
  .then(() => console.log('📦 MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// === SERVER SETUP ===
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("HelloWho Socket Server is running");
});

// === FEEDBACK API ===
app.post('/api/feedback', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newFeedback = new Feedback({ name, email, message });
    await newFeedback.save();
    res.status(200).json({ success: true, msg: 'Feedback saved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: 'Error saving feedback' });
  }
});

app.get('/api/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error fetching feedbacks' });
  }
});

// === CHAT SYSTEM VARIABLES ===
const waitingUsers = new Set(); // for random chat queue
const activeRooms = new Map();  // roomId => { users: [socketId1, socketId2], offer: any }

// === SOCKET.IO EVENTS ===
io.on("connection", (socket) => {
  console.log(`✅ User connected: ${socket.id}`);

  // === PUBLIC TEXT CHAT ===
  socket.on("text-message", (msg) => {
    io.emit("text-message", msg);
  });

  // === VIDEO CALL ===
  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });

  // === PRIVATE ROOM CHAT ===
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room: ${roomId}`);
  });

  socket.on("send-private-message", ({ roomId, message }) => {
    io.to(roomId).emit("receive-private-message", message);
  });

  // === RANDOM CHAT PAIRING ===
  socket.on("find-stranger", () => {
    console.log(`${socket.id} is searching for a stranger`);

    // Check if user is already waiting
    if (waitingUsers.has(socket.id)) {
       socket.emit("status-update", "Waiting for a stranger to connect...");
      return;
    }

    // Try to find a partner
    const partnerId = Array.from(waitingUsers).find(id => id !== socket.id);
    
    if (partnerId) {
      // Found a partner, create room
      waitingUsers.delete(partnerId);
      
      const roomId = `room_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`;
      activeRooms.set(roomId, {
        users: [socket.id, partnerId],
        offer: null
      });

      // Join both users to the room
      socket.join(roomId);
      io.to(partnerId).socketsJoin(roomId);

      // Notify both users
      io.to(partnerId).emit("stranger-found", { roomId });
      socket.emit('stranger-found', { roomId, partner: partnerId });

      console.log(`Matched ${socket.id} with ${partnerId} in ${roomId}`);
    } else {
      // No partner found, add to queue
      waitingUsers.add(socket.id);
      socket.emit("status-update", "Waiting for a stranger to connect...");
      console.log(`${socket.id} added to queue`);
    }
  });

  // === WEBRTC SIGNALING FOR RANDOM CHAT ===
  socket.on('stranger-signal', ({ roomId, signal }) => {
    if (!roomId || !signal) return;

    const room = activeRooms.get(roomId);
    if (!room || !room.users) return;

    const otherUserId = room.users.find(id => id !== socket.id);
    if (otherUserId) {
      console.log(`Forwarding signal from ${socket.id} to ${otherUserId}`);
      io.to(otherUserId).emit('stranger-signal', { signal });
    }
  });

  socket.on('stranger-text', ({ roomId, message }) => {
    const room = activeRooms.get(roomId);
    if (!room || !room.users) return;

    // Forward the message to the other user in the room
    const otherUserId = room.users.find(id => id !== socket.id);
    if (otherUserId) {
      io.to(otherUserId).emit('stranger-text', message);
    }
  });

  socket.on('leave-stranger-chat', ({ roomId }) => {
    const room = activeRooms.get(roomId);
    if (room && room.users) {
      // Notify the other user
      const otherUserId = room.users.find(id => id !== socket.id);
      if (otherUserId) {
        io.to(otherUserId).emit('stranger-left');
      }

      // Clean up the room
      activeRooms.delete(roomId);
    }

    // Leave the room
    socket.leave(roomId);
    console.log(`${socket.id} left room ${roomId}`);
  });

  // === DISCONNECT HANDLER ===
  socket.on("disconnect", () => {
    waitingUsers.delete(socket.id);

    // Clean up any rooms this user was in
    for (const [roomId, room] of activeRooms) {
      if (room.users.includes(socket.id)) {
        const otherUserId = room.users.find(id => id !== socket.id);
        if (otherUserId) {
          io.to(otherUserId).emit('stranger-left');
        }
        activeRooms.delete(roomId);
        console.log(`Room ${roomId} cleaned up due to disconnect`);
      }
    }

    console.log("User disconnected:", socket.id);
  });
});

// === SERVER START ===
server.listen(5000, () => {
  console.log(" Server running on http://localhost:5000");
});