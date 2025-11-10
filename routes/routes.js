// routes/routes.js
const router = require('express').Router();

const contactsRouter = require('./contacts');
const templeRouter = require('./temple');

// contacts + professional
router.use('/', contactsRouter);

// temples
router.use('/temples', templeRouter);

module.exports = router;
