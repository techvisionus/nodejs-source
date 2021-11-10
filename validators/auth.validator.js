const CreateError = require("http-errors")
const _ = require("lodash")
const { ERROR_CODES } = require("../constants/users.constant")
const { UsersModel } = require("../datasources/mongodb/models")

class AuthValidator {
    async validateCreateUser(body) {
        const { email, password, passwordConfirm, username } = body
        if (password !== passwordConfirm) {
            throw new CreateError.BadRequest(ERROR_CODES.PASSWORD_CONFIRM_NOT_MATCH)
        }

        const countEmail = await UsersModel.countDocuments({ email })
        if (countEmail) {
            throw new CreateError.BadRequest(ERROR_CODES.EMAIL_ALREADY_EXISTS)
        }

        const countUsername = await UsersModel.countDocuments({ username })
        if (countUsername) {
            throw new CreateError.BadRequest(ERROR_CODES.USERNAME_ALREADY_EXISTS)
        }
        return _.cloneDeep(body)
    }

    async validateUserLogin(body) {
        const { email, password } = body
        const user = await UsersModel.findOne({ email })
        if (!user) throw new CreateError.NotFound(ERROR_CODES.USER_NOT_FOUND)
        const isCorrect = await user.validatePassword(password)
        if (!isCorrect) throw new CreateError.BadRequest(ERROR_CODES.PASSWORD_INVALID)
        return user
    }
}

module.exports = new AuthValidator()
