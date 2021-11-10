const { GlobalConstant } = require("../constants")

const mongoObjectId = {
    type: "string",
    minLength: 24,
    maxLength: 24,
    pattern: "^[0-9a-fA-F]{24}$"
}

const getListSkip = {
    type: "integer",
    minimum: 0,
    default: GlobalConstant.SKIP_DEFAULT
}

const getListLimit = {
    type: "integer",
    minimum: 1,
    default: GlobalConstant.LIMIT_DEFAULT
}

module.exports = {
    getListSkip,
    getListLimit,
    mongoObjectId
}
