// Initializes the `translations` service on path `/translations`
const createService = require('feathers-nedb');
const createModel = require('../../models/translations.model');
const hooks = require('./translations.hooks');
const filters = require('./translations.filters');
const swaggerDoc = require('./translations.swagger');

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
  translations.docs = swaggerDoc;

  app.use('/translations', translations);

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('translations');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
