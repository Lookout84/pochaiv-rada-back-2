const Joi = require('joi')

const schemaCreateArticle = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    // author: Joi.string().min(3).max(30).required(),
    body: Joi.string().min(3).required(),
    date: Joi.date(),
    // icon: Joi.string().min(3).max(100).required(),
    isFavorite: Joi.boolean().optional(),
})

const schemaUpdateArticles = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    // author: Joi.string().min(3).max(30).required(),
    body: Joi.string().min(3).required(),
    date: Joi.date(),
    // icon: Joi.string().min(3).max(100).required(),
    isFavorite: Joi.boolean().optional(),
}).or('title', 'author', 'body', 'date', 'icon', 'isFavorite')

const schemaUpdateStatusArticle = Joi.object({
    isFavorite: Joi.boolean().required(),
})

const validate = async (schema, obj, next) => {
    try {
        await schema.validateAsync(obj)
        next()
    } catch (err) {
        next({
            status: 400,
            message: err.message.replace(/"/g, ''),
        })
    }
}

module.exports = {
    validationCreateArticle: (req, res, next) => {
        return validate(schemaCreateArticle, req.body, next)
    },
    validationUpdateArticles: (req, res, next) => {
        return validate(schemaUpdateArticles, req.body, next)
    },
    validationUpdateStatusArticles: (req, res, next) => {
        return validate(schemaUpdateStatusArticle, req.body, next)
    }
}
