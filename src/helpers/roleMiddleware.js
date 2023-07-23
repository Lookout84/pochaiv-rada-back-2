const { HttpCode } = require('./constants')
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY

module.exports = function (roles) {
    console.log(roles)
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(HttpCode.FORBIDDEN)
                    .json({ message: 'Користувач не авторизований' })
            }
            const { value } = jwt.verify(token, SECRET_KEY)
            const roleUser = [value]
            let hasRole = false
            roleUser.forEach(role => {
                if (roles.includes(role)) {
                    console.log(role);
                    hasRole = true
                }
            })
            if (!hasRole) {
                return res.status(HttpCode.FORBIDDEN).json({ message: 'У вас немає доступу' })
            }
            next()
        } catch (error) {
            console.log(error)
            return res.status(HttpCode.FORBIDDEN)
                .json({ message: 'Користувач не авторизований' })
        }
    }
}