const { userHandler } = require('../index');

const { getUsers, getUserById, createUser, updateUserById, patchUserById, deleteUserById } = userHandler;

const mockPostgres = {
    connect: jest.fn().mockReturnThis(),
    query: jest.fn(),
    release: jest.fn()
}

const mockLogger = {
    info: jest.fn(),
    error: jest.fn()
}

const context = {
    dbClient: mockPostgres,
    log: mockLogger
}

describe('User handler', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })
    it('Should get user list', async () => {
        const rows = []
        context.dbClient.query.mockImplementation(() => ({ rows }))
        const users = await getUsers(context)
        expect(users).toEqual(rows);
        expect(context.dbClient.release).toHaveBeenCalled();
    })
    it('Should get user by id', async () => {
        const rows = [
            {
                id: 1,
                name: 'demo',
                lastname: 'demo'
            }
        ]
        const params = {
            id: 1
        }
        context.dbClient.query.mockImplementation(() => ({ rows }));
        const user = await getUserById(context, params)
        expect(user).toEqual(rows[0])
        expect(context.dbClient.release).toHaveBeenCalled();
    })
    it('Should create user', async () => {
        const rows = [
            {
                id: 1,
                name: 'demo',
                lastname: 'demo'
            }
        ]
        const request = {
            body: {
                name: 'demo',
                lastname: 'demo'
            }
        }
        context.dbClient.query.mockImplementation(() => ({ rows }))
        const userCreated = await createUser(context, request)
        const dataToSave = context.dbClient.query.mock.calls[0][0]

        expect(userCreated).toEqual(rows[0])
        expect(dataToSave.values).toEqual([request.body.name, request.body.lastname])
        expect(context.dbClient.release).toHaveBeenCalled()
    })
    it('Should overwrite user', async () => {
        const rows = [
            {
                id: 1,
                name: 'demo',
                lastname: 'demo'
            }
        ]
        const body = {
            name: 'demo',
            lastname: 'demo'
        }
        const params = {
            id: 1
        }
        context.dbClient.query.mockImplementation(() => ({ rows }))
        const userOverwrote = await updateUserById(context, params, body)
        const dataToUpdate = context.dbClient.query.mock.calls[0][0]

        expect(userOverwrote).toEqual(rows[0])
        expect(dataToUpdate.values).toEqual([body.name, body.lastname, params.id])
        expect(context.dbClient.release).toHaveBeenCalled()
    })
    it('Should update user partially', async () => {
        const rows = [
            {
                id: 1,
                name: 'demo',
                lastname: 'demo'
            }
        ]
        const body = {
            lastname: 'demo'
        }
        const params = {
            id: 1
        }
        context.dbClient.query.mockImplementation(() => ({ rows }))
        const userOverwrote = await patchUserById(context, params, body)
        const dataToUpdate = context.dbClient.query.mock.calls[0][0]

        expect(userOverwrote).toEqual(rows[0])
        expect(dataToUpdate.values).toEqual([body.lastname, params.id])
        expect(context.dbClient.release).toHaveBeenCalled()
    })
    it('Should delete user by id', async () => {
        const rows = [
            {
                id: 1,
                name: 'demo',
                lastname: 'demo'
            }
        ]
        const params = {
            id: 1
        }
        context.dbClient.query.mockImplementation(() => ({ rows }));
        const user = await deleteUserById(context, params)
        const userToDelete = context.dbClient.query.mock.calls[0][0]

        expect(user).toEqual(rows[0])
        expect(userToDelete.values).toEqual([params.id])
        expect(context.dbClient.release).toHaveBeenCalled();
    })
})