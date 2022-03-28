const fastifyPlugin = require("fastify-plugin");
const fastifyCors = require("fastify-cors");

const cors = async (fastify) => {
    const opts = {
        origin: '*',
    }

    fastify.register(fastifyCors, opts)
}

module.exports = fastifyPlugin(cors);