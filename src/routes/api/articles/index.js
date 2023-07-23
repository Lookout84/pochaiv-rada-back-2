const express = require('express')
const router = express.Router()
const ctrl = require('../../../controllers/articles')
const guard = require('../../../helpers/guard')

const {
    validationCreateArticle,
    validationUpdateArticles,
    validationUpdateStatusArticles
} = require('./validation')

router.use((req, res, next) => {
    console.log(req.url)
    next()
})

router
    .get('/', guard, ctrl.getAll)
    .post('/', guard, validationCreateArticle, ctrl.create)

router
    .get('/:id', guard, ctrl.getById)
    .delete('/:id', guard, ctrl.remove)
    .put('/:id', guard, validationUpdateArticles, ctrl.update)
// router
//     .get('/articles', ctrl.getAllArticles)

router.patch('/:id/favorited', guard, validationUpdateStatusArticles, ctrl.update)

module.exports = router