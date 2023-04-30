const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatModel = mongoose.Schema({
    chatName: { type: "string", trim: true },
    users: [{
        type: Schema.Types.ObjectId,
        ref: "users"
    }],
    product: {
        type: Schema.Types.ObjectId,
        ref: "products"
    },
    latestMessage: {
        type: Schema.Types.ObjectId,
        ref: "message"
    }


},
    {
        timestamps: true
    }


)

module.exports = mongoose.model('chats', chatModel);
