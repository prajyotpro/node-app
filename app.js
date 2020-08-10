
const express = require('express');
const app = express();
// const responseHandler = require('./src/core/middlewares/muffin-app-response');

const bodyParser = require('body-parser');
const helmet = require('helmet');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./doc/swagger.json');

app.use(helmet());
app.use(bodyParser.urlencoded({// to support URL-encoded bodies
  extended: true,
}));
app.use(bodyParser.json()); // to support JSON-encoded bodies

// app.use(responseHandler);


const routesV1     = require('./api/v1/routes')

app.use('/v1', routesV1)

app.use('/apidoc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
