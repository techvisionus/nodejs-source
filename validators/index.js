const Ajv = require("ajv")
const CreateError = require("http-errors")
const _ = require("lodash")

const ajv = new Ajv({
    allErrors: true,
    useDefaults: true,
    removeAdditional: true,
    async: true,
    jsonPointers: true,
    passContext: true,
    coerceTypes: true
})

require("ajv-errors")(ajv)
require("ajv-bsontype")(ajv)

function formatErrors(errors) {
    const newErrors = errors.map(error => {
        const { keyword, params } = error
        const { missingProperty } = params

        if (keyword === "required") {
            const message = `${missingProperty}_${keyword}`.toUpperCase()
            return message
        }
        if (keyword === "pattern") {
            const field = error.instancePath.split("/")[1]
            const message = `${field}_INVALID`.toUpperCase()
            return message
        }

        return "ERROR"
    })
    return [...newErrors]
}

function validateSchema(schema, path = "body") {
    if (!schema) throw CreateError.InternalServerError("Schema is required.")
    const newSchema = _.cloneDeep(schema)
    newSchema.$async = true

    return async (req, res, next) => {
        try {
            await ajv.validate(newSchema, req[path])
            next()
        } catch (err) {
            if (!(err instanceof Ajv.ValidationError)) {
                throw CreateError.InternalServerError(err.message)
            }
            const errors = formatErrors(err.errors)
            throw new CreateError.BadRequest(errors)
        }
    }
}

function validateBody(schema) {
    return validateSchema(schema, "body")
}

function validateQuery(schema) {
    return validateSchema(schema, "query")
}

function validateParams(schema) {
    return validateSchema(schema, "params")
}

const AuthValidator = require("./auth.validator")

module.exports = {
    AuthValidator,
    validateBody,
    validateQuery,
    validateParams
}
