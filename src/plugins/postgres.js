const fastifyPlugin = require("fastify-plugin");
const fastifyPostgres = require("fastify-postgres");

const pgClient = async (fastify) => {
    const { config } = fastify;
    const { 
        DB_HOST,
        DB_PORT,
        DB_PASSWORD,
        DB_USER,
        DB_NAME
     } = config;
    const opts = {
        connectionString: `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
    }
    fastify.register(fastifyPostgres,opts )
}

module.exports = fastifyPlugin(pgClient);