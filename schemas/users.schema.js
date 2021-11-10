const shared = require("./shared.schema")

const getList = {
    type: "object",
    properties: {
        skip: shared.getListSkip,
        limit: shared.getListLimit
    }
}

module.exports = {
    getList
}
