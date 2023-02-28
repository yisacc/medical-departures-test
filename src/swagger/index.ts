export default {
  definition: {
    openapi: '3.0.2',
    info: {
      version: 'v0',
      title: 'Medical Departures Test API',
      description: 'Website documentation to create a CRUD blog API with authentication in NodeJs using TypeScript',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'LOCAL 3000',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
            },
            password: {
              type: 'string',
            },
            first_name: {
              type: 'string',
            },
            last_name: {
              type: 'string',
            },
            id_role: {
              type: 'number',
            },
            is_active: {
              type: 'boolean',
            },
          },
        },
      },
      securitySchemes: {
        BasicAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/**/*.ts',[]],
}
