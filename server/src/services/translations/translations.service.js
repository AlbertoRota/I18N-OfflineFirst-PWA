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
  app.use('/translations', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('translations');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
