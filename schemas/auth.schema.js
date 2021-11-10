const register = {
    type: "object",
    required: ["username", "email", "password", "passwordConfirm"],
    properties: {
        username: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
        passwordConfirm: { type: "string" }
    }
}

const login = {
    type: "object",
    required: ["email", "password"],
    properties: {
        email: {
            type: "string",
            pattern: "^\\S+@\\S+\\.\\S+$"
        },
        password: {
            type: "string"
        }
    }
}

const refreshToken = {
    type: "object",
    required: ["refreshToken"],
    properties: {
        refreshToken: { type: "string" }
    }
}

const logout = {
    type: "object",
    required: ["refreshToken"],
    properties: {
        refreshToken: { type: "string" }
    }
}

module.exports = {
    register,
    login,
    refreshToken,
    logout
}
