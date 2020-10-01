const {createHashedPassword} = require('./user-utils');

const createUser = ({username, password}) => global.mysqlConnection.execute('insert into users (username, password) values(?,?)', [username, createHashedPassword(password)]);

module.exports = {createUser};