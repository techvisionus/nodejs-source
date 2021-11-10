const express = require("express")
require("express-async-errors")
const { UsersController } = require("../../controllers")
const { validateQuery } = require("../../validators")
const { UserSchema } = require("../../schemas")
const { AuthMiddleware } = require("../../middlewares")

const router = express.Router()
router.use(AuthMiddleware.verifyToken)
router.get("/", validateQuery(UserSchema.getList), UsersController.getList)

module.exports = router
