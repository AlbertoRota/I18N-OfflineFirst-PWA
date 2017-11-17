module.exports = {
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
}
