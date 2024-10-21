const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API',
      version: '1.0.0',
      description: 'Swagger documentation for Blog API'
    },
    servers: [
      {
        url: 'http://localhost:5000/',
        description: 'Development server',
      },
      {
        url: 'https://example.site/',
        description: 'Testing server url'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    }
  },
  apis: ['./routers/*.js'] // Path to API routes
};

const specs = swaggerJsdoc(options);

module.exports = {
  specs,
  swaggerUi
}