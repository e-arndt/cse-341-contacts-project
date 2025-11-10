// utilities/checkKey.js
module.exports = (req, res, next) => {
  const required = process.env.API_KEY;
  if (!required) return next();

  const provided = req.header('apiKey');
  if (provided !== required) {
    return res.status(401).json({ error: 'Invalid or missing apiKey' });
  }

  next();
};
