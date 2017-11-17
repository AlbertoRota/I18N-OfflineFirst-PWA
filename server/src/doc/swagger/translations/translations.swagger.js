module.exports = {
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
