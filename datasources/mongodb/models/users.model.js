const mongoose = require("mongoose")
const crypto = require("crypto")
const { STATUS, TYPES, ROLES } = require("../../../constants/users.constant")

const { Schema } = mongoose

const UserSchema = new Schema(
    {
        fullName: { type: String, trim: true },
        username: { type: String, unique: true, trim: true },
        phone: String,
        salt: { type: String },
        password: { type: String },
        email: { type: String, trim: true, index: true },
        status: {
            type: Number,
            default: STATUS.ACTIVE,
            enum: Object.values(STATUS)
        },
        type: {
            type: String,
            default: TYPES.NORMAL,
            enum: Object.values(TYPES)
        },
        facebookId: String,
        googleId: String,
        profilePicture: {
            type: String,
            default: "https://res.cloudinary.com/minhnhat-dev/image/upload/v1629896485/icons/avatar.png"
        },
        coverPicture: {
            type: String,
            default: "https://res.cloudinary.com/minhnhat-dev/image/upload/v1629886823/covers/cover-3.jpg"
        },
        description: String,
        role: {
            type: Number,
            default: ROLES.NORMAL,
            enum: Object.values(ROLES)
        },
        gender: Number,
        activated: { type: Boolean, default: false }
    },
    { versionKey: false, timestamps: true }
)

UserSchema.methods.setPassword = function createPassword(password) {
    this.salt = crypto.randomBytes(16).toString("hex")
    this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 512, "sha512").toString("hex")
}

UserSchema.methods.validatePassword = async function validatePassword(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 512, "sha512").toString("hex")
    return this.password === hash
}
module.exports = mongoose.model("Users", UserSchema)
