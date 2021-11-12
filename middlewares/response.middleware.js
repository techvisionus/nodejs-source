const { GlobalConstant } = require("../constants")

class ResponseMiddleware {
    handlePaging(req, res, next) {
        res.sendItems = ({ items = [], total = 0 }) =>
            res.status(200).send({
                skip: req.query.skip || GlobalConstant.SKIP_DEFAULT,
                limit: req.query.limit || GlobalConstant.LIMIT_DEFAULT,
                items,
                total
            })
        next()
    }
}

module.exports = new ResponseMiddleware()
