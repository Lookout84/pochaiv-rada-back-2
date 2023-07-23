const express = require("express")
const router = express.Router()
const ctrl = require("../../../controllers/users")
const guard = require("../../../helpers/guard")

const {
  validationCreateUser,
  validationLoginUser,
} = require("./validation")
const roleMiddleware = require('../../../helpers/roleMiddleware')

router.post("/register", validationCreateUser, ctrl.register)
router.post("/login", validationLoginUser, ctrl.login)
router.post("/logout", guard, ctrl.logout)
router.get("/users", guard, roleMiddleware(['Admin']), ctrl.currentUser)


module.exports = router
