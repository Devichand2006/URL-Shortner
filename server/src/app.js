const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const urlRoutes = require('./routes/urlRoutes');
const urlController = require('./controllers/urlController');
const errorHandler = require('./middleware/errorHandler');
const env = require('./config/env');

const app = express();

const allowedOrigins = new Set([
  env.CLIENT_URL,
  env.CLIENT_URL.replace('localhost', '127.0.0.1'),
]);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/urls', urlRoutes);

// Redirect route must be registered after API routes
app.get('/:shortCode', urlController.redirect);

app.use(errorHandler);

module.exports = app;
