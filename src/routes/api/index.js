const express = require("express")
const router = express.Router()


router.use('/users', require('./users'))
router.use('/news', require('./articles'))
// router.use('/admin', require('./admin'))
router.use('/sessions', require('./sessions'))


module.exports = router
