const { AuthValidator } = require("../validators")
const { AuthService } = require("../services")
const { AuthHelper } = require("../helpers")

class AuthController {
    async login(req, res) {
        const user = await AuthValidator.validateUserLogin(req.body)
        /* generate tokens */
        const payload = { id: user._id.toString() }

        const { accessToken, refreshToken } = AuthHelper.generateTokens(payload)
        /* save refresh token */
        const refreshSave = {
            userId: user._id,
            token: refreshToken
        }
        await AuthService.storageRefreshToken(refreshSave)
        return res.status(200).send({ user, accessToken, refreshToken, auth: true })
    }

    async register(req, res) {
        const data = await AuthValidator.validateCreateUser(req.body)
        const user = await AuthService.createUser(data)
        /* generate tokens */
        const payload = { id: user._id.toString() }

        const { accessToken, refreshToken } = AuthHelper.generateTokens(payload)
        /* save refresh token */
        const refreshSave = {
            userId: user._id,
            token: refreshToken
        }
        await AuthService.storageRefreshToken(refreshSave)
        return res.status(200).send({ user, accessToken, refreshToken, auth: true })
    }

    async logout(req, res) {
        const { refreshToken } = req.body
        await AuthValidator.validateLogout(req.body)
        const payload = {
            token: refreshToken
        }
        await AuthService.removeRefreshToken(payload)
        return res.status(200).send({ user: null, auth: false })
    }
}

module.exports = new AuthController()
