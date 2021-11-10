const { UsersModel } = require("../datasources/mongodb/models")

class UsersService {
    async getList(query = {}) {
        const [users = [], total = 0] = await Promise.all([
            UsersModel.find(query).lean(),
            UsersModel.countDocuments(query)
        ])
        return { users, total }
    }
}

module.exports = new UsersService()
