require('dotenv').config();
const path = require('path');
const swaggerAutogen = require('swagger-autogen')();

const outputFile = path.join(__dirname, 'swagger.json');
const endpointsFiles = [
  path.join(__dirname, 'server.js'),
  path.join(__dirname, 'routes', 'routes.js'),
  path.join(__dirname, 'routes', 'contacts.js'),
];

const doc = {
  swagger: '2.0',
  info: {
    title: 'Contacts / Temple API',
    description: 'Docs for /contacts and /temples',
    version: '1.0.0'
  },
  basePath: '/',
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    { name: 'Contacts', description: 'Endpoints for contact-related data' }
  ],

  definitions: {
    Contact: {
      _id: '671f2a9f3c0f9b3aa9d9b111',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      favoriteColor: 'Blue',
      birthday: '1990-01-01'
    },
    ContactsArray: [{ $ref: '#/definitions/Contact' }],
    CreateContactRequest: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      favoriteColor: 'Blue',
      birthday: '1990-01-01'
    },
    CreateContactResponse: { id: '671f2a9f3c0f9b3aa9d9b111' },
    ValidationError: {
      message: 'Validation failed',
      errors: { email: 'Invalid email address' }
    },
    DuplicateError: {
      message: "Duplicate value for unique field 'email': 'john.doe@example.com'",
      field: 'email',
      value: 'john.doe@example.com'
    },
    InvalidIdError: { message: 'Invalid ID format' },
    NotFoundError: { message: 'Contact not found' },

    // For /professional
    Professional: {
      professionalName: 'Eric Arndt',
      firstName: 'Eric',
      lastName: 'Arndt',
      email: 'eric@example.com'
    },
  }
};

if (process.env.SWAGGER_HOST) {
  doc.host = process.env.SWAGGER_HOST;
}
if (process.env.SWAGGER_SCHEMES) {
  doc.schemes = process.env.SWAGGER_SCHEMES.split(',');
}

swaggerAutogen(outputFile, endpointsFiles, doc);
