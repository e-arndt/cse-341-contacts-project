// database/mongoose.js
require('dotenv').config();
const mongoose = require('mongoose');

async function connect() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is missing from .env');

  // Stricter query filters via use of strictQuery
  mongoose.set('strictQuery', true);

  try {
    await mongoose.connect(uri);
    console.log('✅ Mongoose connected to MongoDB');
  } catch (err) {
    console.error('❌ Mongoose connection error:', err);
    throw err;
  }

  // Handle graceful shutdown
  process.once('SIGINT', async () => {
    try {
      await mongoose.connection.close();
      console.log('Mongoose connection closed, Application stopped.');
    } finally {
      process.exit(0);
    }
  });
}

module.exports = { connect };
