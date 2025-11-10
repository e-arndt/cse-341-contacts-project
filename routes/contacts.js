// routes/contacts.js
const router = require('express').Router();
const contacts = require('../controllers/contacts');

// Static professional info
router.get('/professional', contacts.getProfessional);

// Contacts CRUD
router.get('/contacts', contacts.getAllContacts);
router.get('/contacts/:id', contacts.getSingleContact);
router.post('/contacts', contacts.createContact);
router.put('/contacts/:id', contacts.updateContact);
router.delete('/contacts/:id', contacts.deleteContact);

module.exports = router;
