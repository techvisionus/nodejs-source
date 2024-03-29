const app = require("./app")
const configs = require("./configs")
require("./global")

const server = app.listen(configs.PORT, () => {
    console.log(`🚀 Running on port ${configs.PORT}`)
})

process.on("uncaughtException", exception => {
    console.error(exception)
})

process.on("unhandledRejection", reason => {
    console.error(reason.stack || reason)
})
function shutdown() {
    server.close(err => {
        if (err) {
            console.error("SHUTDOWN ERROR", err)
            process.exitCode = 1
        }
        process.exit()
    })
}

process.on("SIGINT", () => {
    console.error("Got SIGINT (aka ctrl-c in docker). Graceful shutdown")
    shutdown()
})

process.on("SIGTERM", () => {
    console.error("Got SIGTERM (docker container stop). Graceful shutdown")
    shutdown()
})
