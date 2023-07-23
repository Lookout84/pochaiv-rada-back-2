const { Article, User, Role } = require('../../models')
const { query } = require('express')

const getAll = async (userId, query) => {
  const {
    sortBy,
    sortByDesc,
    filter,
    favorited = null,
    limit = 10,
    offset = 0,
  } = query
  const options = {
    offset,
    limit,
    where: {
      author: userId,
      ...(favorited !== null ? { isFavorite: favorited } : {})
    },
    include: [
      {
        model: User, attributes: ['id', 'name', 'email', 'role'],
        include: { model: Role, attributes: ['value'] }
      },
    ],
  }
  const order = []
  if (sortBy) {
    order.push([`${sortBy}`])
    options.order = order
  }
  if (sortByDesc) {
    order.push([`${sortByDesc}`, 'DESC'])
    options.order = order
  }
  if (filter) {
    const attributes = filter.split('|')
    options.attributes = attributes
  }
  const { count, rows } = await Article.findAndCountAll(options)
  return { articles: rows, total: count, limit, offset }
}

const getAllArticles = async () => {
  const result = await Article.find()
  return result
}

const getById = async (userId, id) => {
  const result = await Article.findOne({ where: id, author: userId })
  return result
}

const remove = async (userId, id) => {
  const article = await Article.findOne({ where: id, author: userId })
  if (article) {
    await Article.destroy({ where: id, author: userId })
    return article
  }
  return null
}

const addArticle = async (userId, body) => {
  const result = await Article.create(
    {
      author: userId,
      ...body
    })
  return result
}

const update = async (userId, id, body) => {
  await Article.update(body, { where: id, author: userId })
  return await getById(userId, id)
}


module.exports = {
  getAll,
  getById,
  remove,
  addArticle,
  update,
  getAllArticles,
}
