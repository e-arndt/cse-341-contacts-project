// database/connect.js
require('dotenv').config();
const { MongoClient } = require('mongodb'); // MongoDB Node.js Driver

let _client;
let _db;

const initDb = async (callback) => {
  if (_db) return callback(null, _db);

  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is missing from .env');
    }

    _client = new MongoClient(process.env.MONGODB_URI);
    await _client.connect();

    // If URI ends with /project1, this uses that DB; otherwise default
    _db = _client.db();

    console.log(`Mongo connected → db: ${_db.databaseName}`); // console debug help
    return callback(null, _db);
  } catch (err) {
    return callback(err);
  }
};

const getDb = () => {
  if (!_db) throw new Error('DB not initialized. Call initDb first.');
  return _db; // returns a Db instance
};

const getClient = () => _client; // for graceful shutdowns

module.exports = { initDb, getDb, getClient };
