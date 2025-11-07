// swagger.js
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const swaggerAutogen = require('swagger-autogen')();

const outputFile = path.join(__dirname, 'swagger.json');
const endpointsFiles = [
  path.join(__dirname, 'server.js'),
  path.join(__dirname, 'routes', 'routes.js')
];

const routesFile = path.join(__dirname, 'routes', 'routes.js');
if (fs.existsSync(routesFile)) {
  endpointsFiles.push(routesFile);
} else {
  console.warn('[swagger] Note: routes/routes.js not found. Scanning server.js only.');
}

const doc = {
  swagger: '2.0',
  info: { title: 'Temple API', description: 'Docs for /contacts and /temples', version: '1.0.0' },
  host: process.env.SWAGGER_HOST || `localhost:${process.env.PORT || 8080}`,
  basePath: '/',
  schemes: (process.env.SWAGGER_SCHEMES || 'http').split(','),
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    { name: 'Contacts', description: 'Endpoints for contact-related data' },
    { name: 'Temples', description: 'Endpoints for temple data' }
  ]
};

swaggerAutogen(outputFile, endpointsFiles, doc);
