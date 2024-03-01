const jwt = require('jsonwebtoken')

module.exports = function(role){
    return function(req, res, next){
        if(req.method === "OPTIONS"){
            next()
        }
        try{
            const token = req.headers.autorization.split(' ')[1]//вытаскиваем токен из хедера

            if(!token){
                return res.status(401).json({message: "Вы не авторизованны"})
            }

            const decoded = jwt.verify(token, process.env.SECRET_KEY)

            if(!decoded.role !== role){//сравниваем роли
                return res.status(403).json({message: "Нет доступа"})
            }

            req.user = decoded
            next()
        } catch (e) {
            res.status(403).json({message: "Пользователь не авторизован"})
        }
    }
}