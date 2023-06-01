const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const UserModel = new Schema({
    name: "string",
    email: {
        type: "string",
        trim: true,
        unique: true
    },
    password: "string",
    role: "string",
    location: {
        streetAddress: "string",
        city: "string",
        postalCode: {
            type: Number,
            trim: true
        }
    },
    phoneNumber: {
        type: Number,
        trim: true
    },
    description: "string"
},
    {
        timestamps: true
    }

)
module.exports = mongoose.model('users', UserModel)