const CreateError = require("http-errors")
const { AuthHelper } = require("../helpers")
const { AuthConstant } = require("../constants")

class AuthMiddlewares {
    async verifyToken(req, res, next) {
        try {
            const authorization =
                req.body.token || req.query.token || req.headers["x-access-token"] || req.headers.authorization
            const token = authorization.split(" ")[1]
            if (!token) throw new CreateError.Unauthorized(AuthConstant.ERROR_CODES.UNAUTHORIZED)
            /* Verify access token */
            const user = await AuthHelper.verifyAccessToken(token)
            req.user = user
            next()
        } catch (err) {
            console.error("VerifyToken Err", err)
            const error = new CreateError.Unauthorized(AuthConstant.ERROR_CODES.TOKEN_INVALID)
            next(error)
        }
    }
}

module.exports = new AuthMiddlewares()
