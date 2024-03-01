const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    process.env.DB_NAME,// имя базы данных
    process.env.DB_USER,// имя пользователя
    process.env.DB_PASSWORD,// пароль
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        post: process.env.DB_POST
    }


)