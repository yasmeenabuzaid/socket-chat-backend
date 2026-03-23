const express = require('express'); 
// Import Express to build REST API
const app = express(); 
// Create an Express app instance (OOP style)
const cors = require('cors'); 
// Import CORS middleware to allow cross-origin requests
const http = require('http'); 
// Import Node's HTTP module to create a server
const { Server } = require("socket.io"); 
// Import Socket.IO for real-time WebSocket communication
const chatRoutes = require('./routes/index.js'); 
// Import route handlers for chat API

const port = 5000; 
// Define the port the server will listen on

// -------------------- Middlewares --------------------
app.use(cors());   // Enable CORS for all routes
app.use(express.json()); // Enable JSON parsing for incoming requests

// -------------------- APIs --------------------
app.use('/api', chatRoutes); 
// Use the chatRoutes for any requests starting with /api

// -------------------- WebSocket Setup --------------------
const server = http.createServer(app); 
// Create HTTP server from Express app

// Initialize Socket.IO server instance (OOP style) with CORS configuration
const io = new Server(server, { 
  cors: {
    origin: "http://localhost:3000", // Allow requests from frontend
    methods: ["GET", "POST"] // Only allow GET and POST methods
  }
});

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log(`User connected with ID: ${socket.id}`);

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// -------------------- Start Server --------------------
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});