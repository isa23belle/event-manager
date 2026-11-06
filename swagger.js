const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Event Manager API',
    description: 'API para gestão de eventos e inscrições',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./eventRoutes.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);