const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/task-tracker';
mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => console.log('✅ MongoDB connected to:', MONGO_URI.split('@')[1] || 'local'))
  .catch(err => {
    console.error('❌ MongoDB connection error!');
    console.error('Error name:', err.name);
    console.error('Error message:', err.message);
  });

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/tasks', require('./routes/task.routes'));

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  // SPA fallback
  app.use((req, res, next) => {
    // If it's an API request that didn't match, let it move to error handler
    if (req.url.startsWith('/api')) return next();
    res.sendFile(path.resolve(__dirname, '../', 'frontend', 'dist', 'index.html'));
  });
} else {
  app.get('/', (req, res) => res.send('API is running...'));
}

// Error handling
app.use(require('./middleware/error.middleware'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
