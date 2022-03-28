const fastifyPlugin = require("fastify-plugin");
const fastifySwagger = require("fastify-swagger");

const swagger = async (fastify) => {
    const { config } = fastify;
    const opts = {
        routePrefix: '/api-docs',
        swagger: {
            info: {
                title: 'Fastify API swagger',
                description: 'Testing the Fastify swagger API',
                version: '1.0.0'
            },
            host: `${config.HOST}:${config.PORT}`,
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json'],
            tags: [
                { name: 'user', description: 'User related end-points' }
            ],
        },
        exposeRoute: true
    }

    fastify.register(fastifySwagger, opts)
}

module.exports = fastifyPlugin(swagger);