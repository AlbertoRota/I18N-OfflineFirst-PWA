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
          _id: {
            type: "string",
            description: "The id of the user"
          },
          email: {
            type: "string",
            description: "The email of the user"
          }
        }
      },
      "users list": {
        type: "object",
        properties: {
          total: {
            type: "integer",
            description: "Number of results"
          },
          limit: {
            type: "integer",
            description: "Number of results to return"
          },
          skip: {
            type: "integer",
            description: "Number of results to skip"
          },
          data: {
            type: "array",
            items: {
              $ref: "#/definitions/users"
            }
          }
        }
      }
    },
    find: {
      security: [
        { bearer: [] }
      ]
    },
    get: {
      security: [
        { bearer: [] }
      ]
    },
    update: {
      security: [
        { bearer: [] }
      ]
    },
    patch: {
      security: [
        { bearer: [] }
      ]
    },
    remove: {
      security: [
        { bearer: [] }
      ]
    }
  }
  app.use('/users', users);

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('users');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
