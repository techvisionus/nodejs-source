const express = require("express")
require("express-async-errors")
const AuthController = require("../../controllers/auth.controller")
const { validateBody } = require("../../validators")
const { AuthSchema } = require("../../schemas")

const router = express.Router()
router.post("/register", validateBody(AuthSchema.register), AuthController.register)
router.post("/login", validateBody(AuthSchema.login), AuthController.login)
router.post("/logout", AuthController.logout)

module.exports = router
