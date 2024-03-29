const sequelize = require('../database');
const {DataTypes} = require('sequelize');

//описание моделей
const User = sequelize.define('user', {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    email: {type: DataTypes.STRING, unique:true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const Basket = sequelize.define('basket', {
    id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},

})

const BasketDevice = sequelize.define('basket_device', {
    id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},

})

const Device = sequelize.define('device', {
    id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name: {type: DataTypes.STRING, unique:true, allowNull:false},
    price: {type: DataTypes.INTEGER, allowNull:false},
    img: {type: DataTypes.STRING, allowNull:false},
})

const Type = sequelize.define('type', {
    id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name: {type: DataTypes.STRING, unique:true, allowNull:false},
})

const Brand = sequelize.define('brand', {
    id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name: {type: DataTypes.STRING, unique:true, allowNull:false},
})

const DeviceInfo = sequelize.define('device_info', {
    id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    title: {type: DataTypes.STRING, allowNull:false},
    description: {type: DataTypes.STRING, allowNull:false},
})

//связи
const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
})

User.hasOne(Basket)
Basket.belongsTo(User)

Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)

Brand.hasMany(Device)
Device.belongsTo(Brand)

Type.hasMany(Device)
Device.belongsTo(Type)

Device.hasMany(DeviceInfo, {as: 'info'})// массив info у поля харктеристик
DeviceInfo.belongsTo(Device)

Type.belongsToMany(Brand, {through: TypeBrand})
Brand.belongsToMany(Type, {through: TypeBrand})

//экспорт моделей

module.exports = {
    User,
    Basket,
    BasketDevice,
    Device,
    Type,
    Brand,
    TypeBrand,
    DeviceInfo
}


