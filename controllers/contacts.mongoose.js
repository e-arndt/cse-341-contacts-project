const Contact = require('../models/Contact');

// GET /professional
exports.getProfessional = (req, res) => {
  res.json({
    professionalName: 'Eric Arndt',
    firstName: 'Eric',
    lastName: 'Arndt',
    email: 'eric@example.com'
  });
};


/* 
  #swagger.tags = ['Contacts']
  #swagger.description = 'Create a new contact'
  #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: { $ref: '#/definitions/Contact' }
  }
  #swagger.responses[201] = {
    description: 'Created',
    schema: { $ref: '#/definitions/CreateContactResponse' }
  }
  #swagger.responses[400] = { description: 'Validation failed', schema: { $ref: '#/definitions/ValidationError' } }
  #swagger.responses[409] = { description: 'Duplicate email', schema: { $ref: '#/definitions/DuplicateError' } }
*/
// POST /contacts
exports.createContact = async (req, res, next) => {
  try {
    const doc = await Contact.create(req.body);
    res.status(201).json({ id: doc._id });
  } catch (err) {
    next(err);
  }
};

// GET /contacts
exports.getAll = async (req, res, next) => {
  try {
    const docs = await Contact.find().lean();
    res.json(docs);
  } catch (err) {
    next(err);
  }
};

// GET /contacts/:id
exports.getOne = async (req, res, next) => {
  try {
    const doc = await Contact.findById(req.params.id).lean();
    if (!doc) return res.status(404).json({ message: 'Contact not found' });
    res.json(doc);
  } catch (err) {
    next(err);
  }
};

// PUT /contacts/:id
exports.updateContact = async (req, res, next) => {
  try {
    const doc = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).lean();
    if (!doc) return res.status(404).json({ message: 'Contact not found' });
    res.json(doc);
  } catch (err) {
    next(err);
  }
};

// DELETE /contacts/:id
exports.remove = async (req, res, next) => {
  try {
    const doc = await Contact.findByIdAndDelete(req.params.id).lean();
    if (!doc) return res.status(404).json({ message: 'Contact not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
