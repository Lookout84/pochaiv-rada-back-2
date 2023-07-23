const { Session, Author, Variation } = require('../../models')
const { query } = require('express')

const getAllSessions = async () => {
    const result = await Session.find()
    return result
}

const getById = async (id) => {
    const result = await Session.findOne({ where: id })
    return result
}

const remove = async (id) => {
    const session = await Session.findOne({ where: id })
    if (session) {
        await Session.destroy({ where: id })
        return session
    }
    return null
}

const addSession = async (body) => {
    const result = await Session.create(
        {
            ...body
        })
    return result
}

const update = async (id, body) => {
    await Session.update(body, { where: id })
    return await getById(id)
}

module.exports = {
    getAllSessions,
    getById,
    remove,
    addSession,
    update,
}
