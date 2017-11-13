// Initializes the `users` service on path `/users`
const createService = require('feathers-nedb');
const createModel = require('../../models/users.model');
const hooks = require('./users.hooks');
const filters = require('./users.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'users',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  const users = createService(options);
  users.docs = {
    definitions: {
      users: {
        type: "object",
        required: [
          "text"
        ],
        properties: {
          text: {
            type: "string",
            description: "The message text"
          },
          useId: {
            type: "string",
            description: "The id of the user"
          }
        }
      },
      "users list": {
        type: "object",
        required: [
          "text"
        ],
        properties: {
          text: {
            type: "integer",
            description: "The message text list"
          },
          useId: {
            type: "integer",
            description: "The id of the user list"
          }
        }
      }
    },
    security: [
      {
        JWT: []
      }
    ],
  }
  app.use('/users', users);

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('users');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
