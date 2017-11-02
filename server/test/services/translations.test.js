const assert = require('assert');
const app = require('../../src/app');

describe('\'translations\' service', () => {
  it('registered the service', () => {
    const service = app.service('translations');

    assert.ok(service, 'Registered the service');
  });
});
