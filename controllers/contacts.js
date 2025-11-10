// controllers/contacts.js
const { ObjectId } = require('mongodb');
const { getDb } = require('../database/connect');

// GET /professional
const getProfessional = (req, res) => {
  /*
    #swagger.tags = ['Contacts']
    #swagger.description = 'Return static professional contact info'
    #swagger.responses[200] = { description: 'OK' }
  */
  res.json({
    professionalName: 'Eric Arndt',
    firstName: 'Eric',
    lastName: 'Arndt',
    email: 'eric@example.com',
  });
};

// GET /contacts (all)
const getAllContacts = async (req, res, next) => {
  /*
    #swagger.tags = ['Contacts']
    #swagger.description = 'Return all contacts'
  */
  try {
    const contacts = await getDb().collection('contacts').find({}).toArray();
    res.status(200).json(contacts);
  } catch (err) {
    next(err);
  }
};

// GET /contacts/:id
const getSingleContact = async (req, res, next) => {
  /*
    #swagger.tags = ['Contacts']
    #swagger.description = 'Return a single contact by MongoDB _id'
  */
  try {
    const id = req.params.id;
    if (!id || !ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid or missing contact ID' });
    }

    const doc = await getDb()
      .collection('contacts')
      .findOne({ _id: new ObjectId(id) });

    if (!doc) return res.status(404).json({ message: 'Contact not found' });
    res.status(200).json(doc);
  } catch (err) {
    next(err);
  }
};

// POST /contacts
const createContact = async (req, res, next) => {
  /*
    #swagger.tags = ['Contacts']
    #swagger.description = 'Create a new contact'
  */
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body || {};

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const result = await getDb().collection('contacts').insertOne({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
    });

    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    next(err);
  }
};

// PUT /contacts/:id
const updateContact = async (req, res, next) => {
  /*
    #swagger.tags = ['Contacts']
    #swagger.description = 'Update an existing contact by _id'
  */
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid contact ID' });
    }

    const { firstName, lastName, email, favoriteColor, birthday } = req.body || {};
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const result = await getDb().collection('contacts').updateOne(
      { _id: new ObjectId(id) },
      {
        $set: { firstName, lastName, email, favoriteColor, birthday },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

// DELETE /contacts/:id
const deleteContact = async (req, res, next) => {
  /*
    #swagger.tags = ['Contacts']
    #swagger.description = 'Delete a contact by _id'
  */
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid contact ID' });
    }

    const result = await getDb().collection('contacts').deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProfessional,
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact,
};
