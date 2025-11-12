// server.js
require('dotenv').config();
const express = require('express');
const { connect } = require('./database/mongoose');
const routes = require('./routes/routes');

const app = express();
const port = process.env.PORT || 8080;

const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');

// Middleware
app
  .use(express.json())
  .use((req, res, next) => {
    // CORS (Cross-Origin Resource Sharing) Allows other ports/domains to access API
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
  });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


// Routes
app
  .use('/', routes)
  .get('/', /* #swagger.tags = ['Contacts'] */ (req, res) => res.send('Server is up'));
  

// Unified error handler (handles Mongoose & general errors)
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);

  // Duplicate key - Mongo error code for Dup key = 11000 - (require unique email)
  if (err && err.code === 11000) {
    return res.status(409).json({ message: 'Duplicate key', details: err.keyValue });
  }

  // Validation errors (e.g., bad email, missing fields)
  if (err && err.name === 'ValidationError') {
    const errors = Object.fromEntries(
      Object.entries(err.errors).map(([k, v]) => [k, v.message])
    );
    return res.status(400).json({ message: 'Validation failed', errors });
  }

  // Invalid ObjectId
  if (err && err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  console.error(err);
  res.status(500).json({ error: 'Server error', detail: err.message });
});



// Initialize Mongoose, then start server
connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on ${port}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });
