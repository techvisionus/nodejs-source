/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
const mung = require("express-mung")

const classifiedKeys = ["password", "salt"]

function removeclassifiedKey(object, classifiedKey) {
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            const value = object[key]
            if (key === classifiedKey) {
                delete object[key]
            } else if (value && value instanceof Object) {
                removeclassifiedKey(value, classifiedKey)
            } else if (value && value instanceof Array) {
                for (let index = 0; index < value.length; index++) {
                    const element = value[index]
                    removeclassifiedKey(element, classifiedKey)
                }
            }
        }
    }
}

/* Remove any classified information from the response. */
function redact(body, req, res) {
    classifiedKeys.forEach(key => removeclassifiedKey(body, key))
    return body
}

module.exports = mung.json(redact)
