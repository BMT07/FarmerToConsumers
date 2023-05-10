const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const ProductModel = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: "string",
    price: Number,
    category: "string",
    description: "string",
    quantity: Number,
    productionDate: "string",
    organic: Boolean,
    farmer: "string",
    image: {
        public_id: {
            type: "string",
            required: true
        },
        url: {
            type: "string",
            required: true
        }
    },
    likes: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    ratings: [
        {
            star: Number,
            postedBy: { type: Schema.Types.ObjectId, ref: "users" }
        }
    ],
    totalrating: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('products', ProductModel)