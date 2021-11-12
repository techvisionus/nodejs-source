function errorMiddleware(error, req, res, next) {
    logger.error("error: ", error)
    const isString = typeof error.message === "string"
    return res.status(error.status || 500).send({
        code: error.status || 500,
        errors: isString ? [error.message] : error.message
    })
}

module.exports = {
    errorMiddleware
}
