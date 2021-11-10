const { UsersModel, RefreshTokensModel } = require("../datasources/mongodb/models")

class AuthService {
    async updateRefreshToken(payload) {
        const { userId, token } = payload
        return RefreshTokensModel.updateOne({ userId }, { token })
    }

    async removeRefreshToken(payload) {
        const { token } = payload
        return RefreshTokensModel.deleteOne({ token })
    }

    async createUser(data) {
        const user = new UsersModel(data)
        user.setPassword(data.password)
        await user.save()
        return user
    }

    async storageRefreshToken(data) {
        const refreshToken = await RefreshTokensModel.create(data)
        return refreshToken
    }
}

module.exports = new AuthService()
