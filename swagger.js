require('dotenv').config();

const path = require('path');
const swaggerAutogen = require('swagger-autogen')();

const outputFile = path.join(__dirname, 'swagger.json');
const endpointsFiles = [
  path.join(__dirname, 'server.js'),
  path.join(__dirname, 'routes', 'routes.js')
];

const doc = {
  swagger: '2.0',
  info: {
    title: 'Contacts / Temple API',
    description: 'Docs for /contacts and /temples',
    version: '1.0.0'
  },
  basePath: '/',
  schemes: (process.env.SWAGGER_SCHEMES || 'https').split(','), // https default
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    { name: 'Contacts', description: 'Endpoints for contact-related data' },
    { name: 'Temples', description: 'Endpoints for temple data' }
  ]
};

// Only set host if provided:
if (process.env.SWAGGER_HOST) {
  doc.host = process.env.SWAGGER_HOST;
}

swaggerAutogen(outputFile, endpointsFiles, doc);
