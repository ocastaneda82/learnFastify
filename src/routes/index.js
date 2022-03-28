const {userHandler} = require('./handlers')
const {getUsersSchema, getUserByIdSchema, postNewUserSchema, putUserSchema, deleteUserSchema, patchUserSchema} = require('./schemas/user')

module.exports = (fastify, opts, done) => {
    const getContext = () => {
        const context = {}

        context.dbClient = fastify.pg
        context.config = fastify.config
        context.log = fastify.log

        return context;
        
    }

    // Declare a route
    fastify.get('/user', getUsersSchema, async (request, reply) => {
        const context = getContext()
        const users = await userHandler.getUsers(context)
        return { users }
    })

    fastify.post('/user', postNewUserSchema, async (request, reply) => {
        const context = getContext()
        const newUser = await userHandler.createUser(context, request)
        return reply.code(201).send({ msg: 'Se pudo crear el usuario', user: newUser })
    })

    fastify.get('/user/:id', getUserByIdSchema,  async (request, reply) => {
        const context = getContext()
        const { params } = request;
        const userById = await userHandler.getUserById(context, params)

        return !userById ? (
            reply.code(404).send({ msg: `No existe el usuario Nº${params.id}` })
        ) : userById;

    })

    fastify.put('/user/:id', putUserSchema, async (request, reply) => {
        const context = getContext()
        const { params, body } = request;
        const user = await userHandler.updateUserById(context, params, body)
        return !user ? (
            reply.code(404).send({ msg: `No existe el usuario Nº${params.id}` })
        ) : user;
        
    })

    fastify.delete('/user/:id', deleteUserSchema, async (request, reply) => {
        const context = getContext()
        const { params } = request;
        const user = await userHandler.deleteUserById(context, params)
        return !user ? (
            reply.code(404).send({ msg: `No existe el usuario Nº${params.id}` })
        ) : user;
    })

    fastify.patch('/user/:id', patchUserSchema, async (request, reply) => {
        const context = getContext()
        const { params, body } = request;
        if (Object.keys(body).length == 0){
            return reply.code(400).send({ msg: `Por favor suministre un dato a actualizar` })
        }
        const user = await userHandler.patchUserById(context, params, body);
        return !user ? (
            reply.code(404).send({ msg: `No existe el usuario Nº${params.id}` })
        ) : user;
    })



    done();
}