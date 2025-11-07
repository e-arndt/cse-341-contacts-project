// routes/routes.js
const express = require('express');
const { ObjectId } = require('mongodb');
const { getDb } = require('../database/connect');

const router = express.Router();

// --- Professional route (static for now) ---
router.get(
  '/professional',
  /* #swagger.tags = ['Contacts'] */
  (req, res) => {
    /*
      #swagger.description = 'Return static professional contact info'
      #swagger.responses[200] = { description: 'OK' }
    */
    res.json({
      professionalName: 'Eric Arndt',
      firstName: 'Eric',
      lastName: 'Arndt',
      email: 'eric@example.com'
    });
  }
);

// --- GET ALL contacts ---
router.get(
  '/contacts',
  /* #swagger.tags = ['Contacts'] */
  async (req, res, next) => {
    /*
      #swagger.description = 'Return all contacts'
      #swagger.responses[200] = { description: 'OK' }
    */
    try {
      if (req.query.id) return next(); // forward to GET ONE handler
      const contacts = await getDb().collection('contacts').find({}).toArray();
      res.status(200).json(contacts);
    } catch (err) {
      next(err);
    }
  }
);

// --- GET ONE contact by id ---
router.get(
  '/contacts/:id',
  /* #swagger.tags = ['Contacts'] */
  async (req, res, next) => {
    /*
      #swagger.description = 'Return a single contact by MongoDB _id'
      #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
      #swagger.responses[200] = { description: 'OK' }
      #swagger.responses[400] = { description: 'Invalid ID' }
      #swagger.responses[404] = { description: 'Not Found' }
    */
    try {
      const id = req.params.id || req.query.id;
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
  }
);

// --- POST /contacts: Create a new contact ---
router.post(
  '/contacts',
  /* #swagger.tags = ['Contacts'] */
  async (req, res, next) => {
    /*
      #swagger.description = 'Create a new contact'
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          $firstName: 'John',
          $lastName: 'Doe',
          $email: 'john.doe@example.com',
          $favoriteColor: 'Blue',
          $birthday: '1990-01-01'
        }
      }
      #swagger.responses[201] = { description: 'Created' }
      #swagger.responses[400] = { description: 'Validation error' }
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
        birthday
      });

      // Return new id in body
      res.status(201).json({ id: result.insertedId });
    } catch (err) {
      next(err);
    }
  }
);

// --- PUT /contacts/:id: Update a contact ---
router.put(
  '/contacts/:id',
  /* #swagger.tags = ['Contacts'] */
  async (req, res, next) => {
    /*
      #swagger.description = 'Update an existing contact by _id'
      #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          $firstName: 'John',
          $lastName: 'Doe',
          $email: 'john.doe@example.com',
          $favoriteColor: 'Blue',
          $birthday: '1990-01-01'
        }
      }
      #swagger.responses[204] = { description: 'Updated successfully' }
      #swagger.responses[400] = { description: 'Invalid ID or data' }
      #swagger.responses[404] = { description: 'Not Found' }
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
          $set: {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
          }
        }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: 'Contact not found' });
      }

      // 204 No Content is OK for "successfully updated"
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

// --- DELETE /contacts/:id: Delete a contact ---
router.delete(
  '/contacts/:id',
  /* #swagger.tags = ['Contacts'] */
  async (req, res, next) => {
    /*
      #swagger.description = 'Delete a contact by _id'
      #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
      #swagger.responses[204] = { description: 'Deleted successfully' }
      #swagger.responses[400] = { description: 'Invalid ID' }
      #swagger.responses[404] = { description: 'Not Found' }
    */
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid contact ID' });
      }

      const result = await getDb().collection('contacts').deleteOne({
        _id: new ObjectId(id)
      });

      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Contact not found' });
      }

      // 204 No Content: successfully deleted
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

// --- TEMPLES API ---
const templeRouter = require('./temple');
router.use('/temples', templeRouter);

module.exports = router;
