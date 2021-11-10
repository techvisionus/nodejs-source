const { UserService } = require("../services")

class UsersController {
    async getList(req, res) {
        const { users = [], total } = await UserService.getList(req.query)
        res.sendItems({ items: users, total })
    }
}

module.exports = new UsersController()
