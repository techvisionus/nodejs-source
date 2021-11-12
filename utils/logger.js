const winston = require("winston")
const DailyRotateFile = require("winston-daily-rotate-file")
const path = require("path")

const { combine } = winston.format

const transport = new DailyRotateFile({
    /* 
        +winston.format.json()
        +winston.format.splat()
        + 2 option này sẽ cho ta khi log vào file với định dạng JSON, chỉ cần:
            + logger.error("error: ", error) => write log full error
            + logger.error(`error ${error}`) => sử dụng string template chỉ write được message
    */
    format: winston.format.combine(winston.format.json(), winston.format.splat()) /*  */,
    filename: "application-%DATE%.log",
    datePattern: "YYYY-MM-DD-HH",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
    dirname: "./var/log" /* change thành /var/log khi build trên server linux */,
    stderrLevels: ["error", "warning", "info"]
})

const logFormat = winston.format.printf(info => {
    const splat = info[Symbol.for("splat")]
    if (splat) {
        return `[${info.level}] ${info.message} - meta: ${JSON.stringify(splat[0])}`
    }
    return `[${info.timestamp}] ${info.level} [${info.label}]: ${info.message}`
})

const logger = winston.createLogger({
    exitOnError: false,
    levels: {
        debug: 4,
        info: 3,
        silly: 2,
        warn: 1,
        error: 0
    },
    format: combine(
        winston.format.colorize(),
        winston.format.label({ label: path.basename(process.mainModule.filename) }),
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" })
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), logFormat)
        }),
        transport
    ]
})

module.exports = logger
