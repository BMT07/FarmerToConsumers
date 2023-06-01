const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageModel = mongoose.Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    content: { type: "string", trime: true },
    chat: { type: Schema.Types.ObjectId, ref: "chats" }
}, {
    timestamps: true
})

module.exports = mongoose.model('message', messageModel)