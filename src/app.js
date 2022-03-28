// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const envPlugin = require('./plugins/env')
const pgPlugin = require('./plugins/postgres')
const swagger = require('./plugins/swagger')
const cors = require('./plugins/cors')
const routesV1 = require('./routes');

fastify.register(envPlugin)
fastify.register(pgPlugin)
fastify.register(cors) //antes de las rutas
fastify.register(swagger)

// Declare a route
fastify.register(routesV1, {prefix: '/v1'});

// Run the server!
const start = async () => {
  try {
    await fastify.ready();
    //console.info('config: ', fastify.config)
    await fastify.listen(fastify.config.PORT, fastify.config.HOST);
    return fastify
  } catch (err) {
    fastify.log.error(err);
    // process.exit(1);
    throw err;
  }
};

module.exports = {
    start,
    fastify,
}