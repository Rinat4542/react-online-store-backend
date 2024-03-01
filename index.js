require('dotenv').config()
const fileUpload = require('express-fileupload')
const express = require('express');
const sequelize = require('./database')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT
const app = express();
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))// получние файла по названию в url
app.use(fileUpload({}))
app.use('/api', router)

//обработка ошибок последний middleware
app.use(errorHandler)

app.get('/', (req, res) => {
    res.send('Привет')
})


const start  = async () =>{
    try{
        await sequelize.authenticate()
        await sequelize.sync()//сверяет состояние бд со схемой данных
        app.listen(PORT, () => console.log(`Сервер запустился на порту: ${PORT}`));
    }
    catch (e) {
        console.log(e)
    }
}

start();

