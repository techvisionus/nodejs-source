const mongoose = require("mongoose")
const config = require("./config")

let url = config.MONGO_DB

if (process.env.NODE_ENV === "production") {
    url = `mongodb://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_IP}:${config.MONGO_PORT}/${config.MONGO_DB_NAME}?authSource=admin`
}

mongoose.connect(url, config.MONGO_OPTIONS, err => {
    if (err) {
        console.log("Connect to database fail!")
    } else {
        console.log("Connect database Success!")
    }
})
/* If connect throw error */
mongoose.connection.on("error", err => {
    console.info(`Mongoose default connection error: ${err}`)
})
/* When the connection is disconnected */
mongoose.connection.on("disconnected", () => {
    console.info("Mongoose default connection disconnected")
})

process.on("SIGINT", () => {
    mongoose.connection.close(() => {
        console.info("Mongoose default connection disconnected through app termination")
        throw new Error("Mongoose default connection disconnected through app termination")
    })
})
