// routes/contacts.js
const router = require('express').Router();
const contacts = require('../controllers/contacts.mongoose');   // switched to Mongoose controller
const validateId = require('../middleware/validateId');          // new middleware

// GET /contacts
router.get(
  '/contacts',
  (req, res, next) => {
    /* 
      #swagger.tags = ['Contacts']
      #swagger.description = 'Return all contacts'
      #swagger.responses[200] = {
        description: 'OK',
        schema: { $ref: '#/definitions/ContactsArray' }
}
    */
    next();
  },
  contacts.getAll
);

// GET /contacts/:id
router.get(
  '/contacts/:id',
  validateId,
  (req, res, next) => {
    /* 
      #swagger.tags = ['Contacts']
      #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
      #swagger.responses[200] = { description: 'OK', schema: { $ref: '#/definitions/Contact' } }
      #swagger.responses[400] = { description: 'Invalid ID', schema: { $ref: '#/definitions/InvalidIdError' } }
      #swagger.responses[404] = { description: 'Not Found', schema: { $ref: '#/definitions/NotFoundError' } }
    */
    next();
  },
  contacts.getOne
);

// POST /contacts
router.post(
  '/contacts',
  (req, res, next) => {
    /* 
      #swagger.tags = ['Contacts']
      #swagger.description = 'Create a new contact'
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: { $ref: '#/definitions/CreateContactRequest' }
        }
      #swagger.responses[201] = {
        description: 'Created',
        schema: { $ref: '#/definitions/CreateContactResponse' }
      }
      #swagger.responses[400] = { description: 'Validation failed', schema: { $ref: '#/definitions/ValidationError' } }
      #swagger.responses[409] = { description: 'Duplicate email', schema: { $ref: '#/definitions/DuplicateError' } }
    */
    next();
  },
  contacts.createContact
);

// PUT /contacts/:id
router.put(
  '/contacts/:id',
  validateId,
  (req, res, next) => {
    /* 
      #swagger.tags = ['Contacts']
      #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: { $ref: '#/definitions/Contact' }
      }
      #swagger.responses[200] = { description: 'Updated successfully', schema: { $ref: '#/definitions/Contact' } }
      #swagger.responses[400] = { description: 'Invalid ID or data', schema: { $ref: '#/definitions/ValidationError' } }
      #swagger.responses[404] = { description: 'Not Found', schema: { $ref: '#/definitions/NotFoundError' } }
      #swagger.responses[409] = { description: 'Duplicate email', schema: { $ref: '#/definitions/DuplicateError' } }
    */
    next();
  },
  contacts.updateContact
);

// DELETE /contacts/:id
router.delete(
  '/contacts/:id',
  validateId,
  (req, res, next) => {
    /* 
      #swagger.tags = ['Contacts']
      #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
      #swagger.responses[204] = { description: 'Deleted successfully' }
      #swagger.responses[400] = { description: 'Invalid ID', schema: { $ref: '#/definitions/InvalidIdError' } }
      #swagger.responses[404] = { description: 'Not Found', schema: { $ref: '#/definitions/NotFoundError' } }
    */
    next();
  },
  contacts.remove
);

// /professional
router.get(
  '/professional',
  (req, res, next) => {
    /*
      #swagger.tags = ['Contacts']
      #swagger.description = 'Return static professional contact info'
      #swagger.responses[200] = {
        description: 'OK',
        schema: { $ref: '#/definitions/Professional' }
      }
    */
    next();
  },
  contacts.getProfessional
);

module.exports = router;
