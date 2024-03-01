const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/apiError')
const {Device, DeviceInfo} = require('../models/models')


class DeviceController{
    async create(req, res, next){
        try{//если запрос не сработает вызывается функция об ошибке из файла ApiError
            const {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"//файл с рандомным id
            img.mv(path.resolve(__dirname, '..', 'static', fileName))//путь до папки где будет сохранен файл
            
            if(info){// проверяем есть ли массив info 
                info = JSON.parse(info)//парсим массив и перебераем его
                info.forEach(i => {
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviseId: device.id
                    })
                });
            }

            const device = await Device.create({name, price, brandId, typeId, img: fileName})// создание девайса
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }

        
    }

    async getAll(req, res){
        
        let {brandId, typeId, limit, page} = req.query // пагинация limit, page
        let devices;
        page = page || 1 // по дефолту 1
        limit = limit || 8 // по дефолту 8
        let offset = page * limit - limit // считаем отступ

        if(!brandId && !typeId){
            devices = await Device.findAndCountAll({limit, offset})// findAndCountAll для пагинцаии , без findAll
        }
        if(brandId && !typeId){
            devices = await Device.findAndCountAll({where:{brandId}, limit, offset})
        }
        if(!brandId && typeId){
            devices = await Device.findAndCountAll({where:{typeId}, limit, offset})
        }
        if(brandId && typeId){
            devices = await Device.findAndCountAll({where:{typeId, brandId}, limit, offset})
        }
        return res.json(devices)
    }

    async getOne(req, res){
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},// условие по которому ищем девайс. по id
                include: [{model: DeviceInfo, as: 'info'}]
            },
        )
        return res.json(device)
    }

}

module.exports = new DeviceController()