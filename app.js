const express = require('express');
const swaggerUi = require('swagger-ui-express');
const eventRoutes = require('./eventRoutes');

let swaggerFile = {};
try {
  swaggerFile = require('./swagger_output.json');
} catch (err) {
  // ainda não gerou o swagger, tudo bem
}

const app = express();
app.use(express.json());
app.use(eventRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = app;