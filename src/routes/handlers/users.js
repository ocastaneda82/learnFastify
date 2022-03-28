const getUsers = async (context) => {
    const { dbClient } = context;
    const client = await dbClient.connect()
    const { rows:users } = await client.query(
        'select id, name, lastname from users order by id desc;'
    )
    await client.release()
    return users;
}

const createUser =  async (context, request) => {
    const { dbClient, log } = context;
    const { body } = request;
    const client = await dbClient.connect()
    const { rows:[newUser] } = await client.query({
        text: 'insert into users (name, lastname) values ($1, $2) returning *',
        values: [body.name, body.lastname]
    } )
    await client.release()
    log.info(newUser)

    return newUser;
}

const getUserById = async (context, params) => {
    const { dbClient } = context;
    const client = await dbClient.connect();
    const { rows } =  await client.query({
        text: 'select id, name, lastname from users where id = $1',
        values: [params.id]
    })
    const [user] = rows
    await client.release()
    return user;

}

const updateUserById = async (context, params, body) => {
    const { dbClient, log } = context;
    const client = await dbClient.connect();
    const {rows} = await client.query({
        text: 'update users set name=$1, lastname=$2  where id = $3 returning *',
        values: [body.name, body.lastname, params.id]
    })
    const [user] = rows
    await client.release()
    return user;

}

const patchUserById = async (context, params, body) => {
    const { dbClient } = context;
    const client = await dbClient.connect();
    const values = [];
    const columnsToUpdate = [];
    let querySql = [];
    querySql.push('update users set');
    Object.entries(body).forEach((entry, index) => {
        const entryPropertyName = entry[0];
        const entryPropertyValue = entry[1];
        columnsToUpdate.push(`${entryPropertyName}=$${index+1}`);
        values.push(entryPropertyValue);
    })
    querySql.push(columnsToUpdate.join(','));
    querySql.push(`where id = $${columnsToUpdate.length + 1} returning *`);
    querySql = querySql.join(" ");
    values.push(params.id);
    const {rows} = await client.query({
        text: querySql,
        values
    })
    const [user] = rows
    await client.release()
    return user;
}

const deleteUserById = async (context, params) => {
    const { dbClient, log } = context;
    const client = await dbClient.connect();
    const {rows} = await client.query({
        text: 'delete from users where id = $1 returning *',
        values: [params.id]
    })
    const [user] = rows
    await client.release()
    return user;

}

module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById,
    patchUserById
}