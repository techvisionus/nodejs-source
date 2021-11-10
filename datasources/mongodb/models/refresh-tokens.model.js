const mongoose = require("mongoose")

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const RefreshTokenSchema = new Schema(
    {
        userId: { type: ObjectId, ref: "Users" },
        token: { type: String, required: true }
    },
    { versionKey: false, timestamps: true }
)

RefreshTokenSchema.index({ userId: 1, token: 1 })

module.exports = mongoose.model("RefreshTokens", RefreshTokenSchema, "refresh-tokens")
