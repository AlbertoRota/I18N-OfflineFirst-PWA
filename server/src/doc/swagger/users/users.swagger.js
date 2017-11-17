module.exports = {
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
