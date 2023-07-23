const { User, Role } = require('../../models')
const bcrypt = require('bcryptjs')
const { Role: enumRole } = require('../helpers/constants')

const findById = async (id) => {
    return await User.findOne({ where: { id } })
}

const findByName = async (name) => {
    return await User.findOne({ where: { name } })
}

const findByEmail = async (email) => {
    return await User.findOne({ where: { email } })
}

const create = async (body) => {
    const { name, password, repeatPassword, email, role = enumRole.USER } = body
    const { id } = await Role.findOne({ where: { value: role } })
    const user = await User.create({
        name,
        email,
        password: await bcrypt.hash(password, bcrypt.genSaltSync(8)),
        repeatPassword: await bcrypt.hash(password, bcrypt.genSaltSync(8)),
        role: id
    })

    return await user
}

const updateToken = async (id, token) => {
    return await User.update({ token }, { where: { id } })
}

module.exports = {
    findById,
    findByEmail,
    findByName,
    create,
    updateToken,
}
