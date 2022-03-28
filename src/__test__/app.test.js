const { start, fastify} = require('../app');

jest.mock('fastify-postgres', () => {
    const wrapper = (localfastify, opts, done) => {
        const pg = {
                connect: jest.fn().mockReturnThis(),
                query: jest.fn(),
                release: jest.fn()
            }
        localfastify.pg = pg
        done()
    }

    const fastifyPlugin = require('fastify-plugin')
    return fastifyPlugin(wrapper)
})



beforeAll(async () => {
    await start()
})

afterAll(async () => {
    fastify.close()
})

describe('API endpoints', () => {
    beforeEach(() => {
        jest.clearAllMocks
    })
    it('Should get users', async () => {
        const rows = [{
            id: 1,
            name: 'demo',
            lastname: 'demo'
        }]
        fastify.pg.query.mockImplementation(() => {
            return { rows };
        })
        const request = {
            method: 'GET',
            url: '/v1/user'
        }
        const response = await fastify.inject(request)
        expect(response.statusCode).toEqual(200)
        expect(JSON.parse(response.payload)).toEqual({
            users: rows,
        })
    })
    it('Should get user by ID', async () => {
        const rows = [{
            id: 1,
            name: 'demo',
            lastname: 'demo'
        }]
        fastify.pg.query.mockImplementation(() => {
            return { rows };
        })
        const request = {
            method: 'GET',
            url: '/v1/user/1'
        }
        const response = await fastify.inject(request)
        expect(response.statusCode).toEqual(200)
        expect(JSON.parse(response.payload)).toEqual(rows[0])
    })
    it('Should get user by ID not found', async () => {
        const rows = []
        fastify.pg.query.mockImplementation(() => {
            return { rows };
        })
        const request = {
            method: 'GET',
            url: '/v1/user/1'
        }
        const response = await fastify.inject(request)
        expect(response.statusCode).toEqual(404)
        expect(JSON.parse(response.payload)).toEqual({ msg: `No existe el usuario Nº1` })
    })
    it('Should post new user', async () => {
        const rows = [{
            id: 1,
            name: 'demo',
            lastname: 'demo'
        }]
        fastify.pg.query.mockImplementation(() => {
            return { rows };
        })
        const request = {
            method: 'POST',
            url: '/v1/user',
            payload: {
                name: 'demo',
                lastname: 'demo'
            }
        }
        const response = await fastify.inject(request)
        expect(response.statusCode).toEqual(201)
        expect(JSON.parse(response.payload)).toEqual({ msg: 'Se pudo crear el usuario', user: rows[0] })
    })
    it('Should overwrite user', async () => {
        const rows = [{
            id: 1,
            name: 'demo',
            lastname: 'demo'
        }]
        fastify.pg.query.mockImplementation(() => {
            return { rows };
        })
        const request = {
            method: 'PUT',
            url: '/v1/user/1',
            payload: {
                name: 'demo',
                lastname: 'demo'
            }
        }
        const response = await fastify.inject(request)
        expect(response.statusCode).toEqual(200)
        expect(JSON.parse(response.payload)).toEqual(rows[0])
    })
    it('Should not overwrite user', async () => {
        const rows = []
        fastify.pg.query.mockImplementation(() => {
            return { rows };
        })
        const request = {
            method: 'PUT',
            url: '/v1/user/1',
            payload: {
                name: 'demo',
                lastname: 'demo'
            }
        }
        const response = await fastify.inject(request)
        expect(response.statusCode).toEqual(404)
        expect(JSON.parse(response.payload)).toEqual({ msg: `No existe el usuario Nº1` })
    })
    it('Should update user partially', async () => {
        const rows = [{
            id: 1,
            name: 'cambio',
            lastname: 'demo'
        }]
        fastify.pg.query.mockImplementation(() => {
            return { rows };
        })
        const request = {
            method: 'PATCH',
            url: '/v1/user/1',
            payload: {
                name: 'cambio',
            }
        }
        const response = await fastify.inject(request)
        expect(response.statusCode).toEqual(200)
        expect(JSON.parse(response.payload)).toEqual(rows[0])
    })
    it('Should not work', async () => {
        const rows = []
        fastify.pg.query.mockImplementation(() => {
            return { rows };
        })
        const request = {
            method: 'PATCH',
            url: '/v1/user/1',
            payload: {}
        }
        const response = await fastify.inject(request)
        expect(response.statusCode).toEqual(400)
        expect(JSON.parse(response.payload)).toEqual({ msg: `Por favor suministre un dato a actualizar` })
    })
    it('Should not update user partially', async () => {
        const rows = []
        fastify.pg.query.mockImplementation(() => {
            return { rows };
        })
        const request = {
            method: 'PATCH',
            url: '/v1/user/3',
            payload: {
                name: 'demo',
                lastname: 'demo'
            }
        }
        const response = await fastify.inject(request)
        expect(response.statusCode).toEqual(404)
        expect(JSON.parse(response.payload)).toEqual({ msg: `No existe el usuario Nº3` })
    })
    it('Should delete user', async () => {
        const rows = [{
            id: 1,
            name: 'demo',
            lastname: 'demo'
        }]
        fastify.pg.query.mockImplementation(() => {
            return { rows };
        })
        const request = {
            method: 'DELETE',
            url: '/v1/user/1'
        }
        const response = await fastify.inject(request)
        expect(response.statusCode).toEqual(200)
        expect(JSON.parse(response.payload)).toEqual(rows[0])
    })
    it('Should not delete user', async () => {
        const rows = []
        fastify.pg.query.mockImplementation(() => {
            return { rows };
        })
        const request = {
            method: 'DELETE',
            url: '/v1/user/1'
        }
        const response = await fastify.inject(request)
        expect(response.statusCode).toEqual(404)
        expect(JSON.parse(response.payload)).toEqual({ msg: `No existe el usuario Nº1` })
    })
    it('Should catch error when the API fails', async () => {
        try {
            await start()
        } catch (error) {
            expect(error).toBeInstanceOf(Error)
        }
    })
})