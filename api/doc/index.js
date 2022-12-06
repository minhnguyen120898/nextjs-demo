const swaggerTools = require('swagger-tools');
const jsYaml = require('js-yaml');
const path = require('path');
const fs = require('fs');

/**
 * @description SwaggerRouter configuration && Initialize the Swagger middleware
 */
const initSwaggerTools = (app) => {
    const swaggerUi = path.join(__dirname, 'swagger_api_doc.json');
    const optionsSwagger = {
        swaggerUi,
        useStubs: process.env.NODE_ENV === 'development', // Conditionally turn on stubs (mock mode)
    }
    const spec = fs.readFileSync(swaggerUi, 'utf8');// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
    const swaggerDoc = jsYaml.safeLoad(spec)
    swaggerTools.initializeMiddleware(swaggerDoc, (middleware) => {
        app.use(middleware.swaggerMetadata());// Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
        app.use(middleware.swaggerValidator());// Validate Swagger requests
        app.use(middleware.swaggerRouter(optionsSwagger));// Route validated requests to appropriate controller
        app.use(middleware.swaggerUi());// Serve the Swagger documents and Swagger UI
    });
}

module.exports = {
    initSwaggerTools
}