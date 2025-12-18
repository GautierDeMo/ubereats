const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'UberEats API',
            version: '1.0.0',
            description: 'Documentation de l’API UberEats',
        },
        servers: [
        // v1 de l'API
        {
            url: 'http://localhost:8000/v1',
            description: 'Serveur de développement - v1',
        },
        // v2 de l'API par exemple
        {
            url: 'http://localhost:8000/v2',
            description: 'Serveur de développement - v2',
        },
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'Bearer',
              bearerFormat: 'JWT'
            }
          }
        },
    },
    apis: [
        './docs/**/*.ts'
        /** au départ il fallait spécifier les paths des APIs car la doc se trouvait
         * dans les router, controller, ...
         * Maintenant c'est dans le dossier 'docs'
         */
        // './src/routes/v1/index.ts',
        // './src/routes/v1/admin.routes.ts',
        // './src/routes/v1/restaurant.routes.ts',
        // './src/dtos/v1/restaurant.dto.ts',
        // './src/dtos/v1/food.dto.ts',
    ], // chemins vers les routes et dtos (grâce aux annotations @swagger)
};

export default swaggerOptions;
