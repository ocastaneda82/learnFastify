const fastifyPlugin = require("fastify-plugin");
const fastifyEnv = require("fastify-env");

const loadEnv = async fastify => {
    const schema = {
        type: 'object',
        required: ['PORT', 'HOST'],
        properties: {
            HOST: {
                type: 'string',
                default: 'localhost',
            },
            PORT: {
                type: 'string',
                default: 3000,
            },
            DB_HOST: {
                type: 'string',
            },
            DB_PORT: {
                type: 'number',
            },
            DB_USER: {
                type: 'string',
            },
            DB_PASSWORD: {
                type: 'string',
            },
            DB_NAME: {
                type: 'string',
            },
        },
    };

    const optionsEnv = {
        schema,
        dotenv: true,
        data: process.env,
        confKey: "config"
    }

    fastify.register(fastifyEnv, optionsEnv)
}

module.exports = fastifyPlugin(loadEnv);