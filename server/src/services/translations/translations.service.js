// Initializes the `translations` service on path `/translations`
const createService = require('feathers-nedb');
const createModel = require('../../models/translations.model');
const hooks = require('./translations.hooks');
const filters = require('./translations.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'translations',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  const translations = createService(options);
  translations.docs = {
    definitions: {
      translations: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            description: "The db id"
          },
          key: {
            type: "string",
            description: "The Key of the translation"
          },
          fr_FR: {
            type: "string",
            description: "The french translation"
          },
          es_ES: {
            type: "string",
            description: "The Spanish translation"
          },
          en_EN: {
            type: "string",
            description: "The English translation"
          }
        }
      },
      "translations list": {
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
              $ref: "#/definitions/translations"
            }
          }
        }
      }
    },
    create: {
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

  app.use('/translations', translations);

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('translations');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
