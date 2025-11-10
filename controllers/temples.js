// controllers/temples.js
const { getDb } = require('../database/connect');

// GET /temples -> all
const getAllTemples = async (req, res, next) => {
  /*
    #swagger.tags = ['Temples']
    #swagger.description = 'Return all temples'
    #swagger.responses[200] = { description: 'OK' }
  */
  try {
    const docs = await getDb()
      .collection('temples')
      .find({}, { projection: { _id: 0 } })
      .toArray();
    res.json(docs);
  } catch (e) {
    next(e);
  }
};

// GET /temples/:temple_id -> one by temple_id
const getTempleById = async (req, res, next) => {
  /*
    #swagger.tags = ['Temples']
    #swagger.description = 'Return a single temple by temple_id'
  */
  try {
    const id = req.params.temple_id;
    const query = { $or: [{ temple_id: Number(id) }, { temple_id: id }] };

    const doc = await getDb()
      .collection('temples')
      .findOne(query, { projection: { _id: 0 } });

    if (!doc) return res.status(404).json({ error: 'Temple not found' });
    res.json(doc);
  } catch (e) {
    next(e);
  }
};

// POST /temples -> create one
const createTemple = async (req, res, next) => {
  /*
    #swagger.tags = ['Temples']
    #swagger.description = 'Create a new temple'
  */
  try {
    const { temple_id, name, location, dedicated, additionalInfo } = req.body || {};
    if (temple_id == null || !name) {
      return res.status(400).json({ error: 'temple_id and name are required' });
    }

    const result = await getDb().collection('temples').insertOne({
      temple_id,
      name,
      location,
      dedicated,
      additionalInfo,
    });

    res.status(201).json({
      _id: result.insertedId,
      temple_id,
      name,
      location,
      dedicated,
      additionalInfo,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllTemples,
  getTempleById,
  createTemple,
};
