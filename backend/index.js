require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { 
  cors: { 
    origin: ["https://stpaul-kitchen-app.vercel.app", "http://localhost:5173"] 
  } 
});

app.use(cors({
  origin: ["https://stpaul-kitchen-app.vercel.app", "http://localhost:5173"]
}));
app.use(express.json());

const PASSWORD = process.env.PASSWORD || 'kitchen123';
let foodItems = [
  { id: 1, name: 'Lamb', count: 0 },
  { id: 2, name: 'Chicken', count: 0 },
  { id: 3, name: 'Pastitsio', count: 0 },
  { id: 4, name: 'Moussaka', count: 0 },
  { id: 5, name: 'Rice', count: 0 },
  { id: 6, name: 'Beans', count: 0 },
  { id: 7, name: 'Potatoes', count: 0 },
  { id: 8, name: 'Dolmades', count: 0 },
  { id: 9, name: 'Special', count: 0 }
];
let nextId = 3;

// Simple session (not secure)
let sessions = new Set();

app.post('/login', (req, res) => {
  console.log('Login attempt:', req.body);
  const { password } = req.body;
  console.log('Expected password:', PASSWORD);
  console.log('Received password:', password);
  if (password === PASSWORD) {
    const token = Math.random().toString(36).substr(2);
    sessions.add(token);
    console.log('Login successful, token:', token);
    res.json({ success: true, token });
  } else {
    console.log('Login failed - password mismatch');
    res.status(401).json({ success: false });
  }
});

function auth(req, res, next) {
  const token = req.headers['x-session-token'];
  if (sessions.has(token)) next();
  else res.status(401).json({ error: 'Unauthorized' });
}

app.get('/food', auth, (req, res) => {
  res.json(foodItems);
});

app.post('/food', auth, (req, res) => {
  const { name } = req.body;
  const newItem = { id: nextId++, name, count: 0 };
  foodItems.push(newItem);
  io.emit('update', foodItems);
  res.json(newItem);
});

app.put('/food/:id', auth, (req, res) => {
  const { id } = req.params;
  const { count } = req.body;
  const item = foodItems.find(f => f.id == id);
  if (item) {
    item.count = count;
    io.emit('update', foodItems);
    res.json(item);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

app.delete('/food/:id', auth, (req, res) => {
  const { id } = req.params;
  foodItems = foodItems.filter(f => f.id != id);
  io.emit('update', foodItems);
  res.json({ success: true });
});

io.on('connection', (socket) => {
  socket.emit('update', foodItems);
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
