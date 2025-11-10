// routes/temple.js
const router = require('express').Router();
const checkKey = require('../utilities/checkKey');
const temples = require('../controllers/temples'); // or '../controllers/temple' if you kept that name

// /temples base path is mounted in routes/routes.js

router.get('/', checkKey, temples.getAllTemples);
router.get('/:temple_id', checkKey, temples.getTempleById);
router.post('/', checkKey, temples.createTemple);

module.exports = router;
