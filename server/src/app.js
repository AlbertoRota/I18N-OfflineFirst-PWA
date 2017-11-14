const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const feathers = require('feathers');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');

const handler = require('feathers-errors/handler');
const notFound = require('feathers-errors/not-found');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');

const authentication = require('./authentication');

const swagger = require('feathers-swagger');

const app = feathers();

// Load app configuration
app.configure(configuration());
// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', feathers.static(app.get('public')));

// Set up Plugins and providers
app.configure(hooks());
app.configure(rest());
app.configure(socketio());

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(swagger({
  docsPath: '/docs',
  uiIndex: true,
  info: {
    title: 'A title',
    description: 'A descriptions'
  },
  securityDefinitions: {
    bearer: {
      type: "apiKey",
      name: "authorization",
      in: "header"
    }
  },
  security: [
    { bearer: [] }
  ],
  definitions: {
    authentication: {
      "type": "object",
      "properties": {
        "strategy": {
          "type": "string",
          "description": "The strategy to use. Ex.: 'local'"
        },
        "email": {
          "type": "string",
          "description": "The email of the user"
        },
        "password": {
          "type": "string",
          "description": "The password of the user"
        }
      }
    }
  }
}));
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Configure a middleware for 404s and the error handler
app.use(notFound());
app.use(handler());

app.hooks(appHooks);

module.exports = app;
