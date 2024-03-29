require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const { HandlerErrorMiddleware, ResponseMiddleware } = require("./middlewares")
const routesV1 = require("./routes/v1")
require("./datasources")

const app = express()

app.use(express.urlencoded())
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(require("./middlewares/redact"))
app.use(require("./middlewares/normalize-mongoose"))

app.enable("trust proxy")
app.use(ResponseMiddleware.handlePaging)
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Techvisionus source !!"
    })
})
app.use("/api/v1", routesV1)
app.use(HandlerErrorMiddleware.errorMiddleware)

module.exports = app
