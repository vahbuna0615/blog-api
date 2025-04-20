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
        url: 'https://blog-api-c9wg.onrender.com',
        description: 'Deployed server url'
      },
      {
        url: 'http://localhost:5000',
        description: 'Local server url'
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