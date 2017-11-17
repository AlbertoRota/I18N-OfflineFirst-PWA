const authentication = require('./authentication/authentication.service.js');
const users = require('./users/users.service.js');
const translations = require('./translations/translations.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(authentication);
  app.configure(users);
  app.configure(translations);
};
