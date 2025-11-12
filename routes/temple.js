// routes/temple.js
const router = require('express').Router();
const checkKey = require('../utilities/checkKey');
const temples = require('../controllers/temples');

// /temples base path is in routes/routes.js

router.get('/', (req, res, next) => { /* #swagger.ignore = true */ next(); }, checkKey, temples.getAllTemples);
router.get('/:temple_id', (req, res, next) => { /* #swagger.ignore = true */ next(); }, checkKey, temples.getTempleById);
router.post('/', (req, res, next) => { /* #swagger.ignore = true */ next(); }, checkKey, temples.createTemple);


module.exports = router;
