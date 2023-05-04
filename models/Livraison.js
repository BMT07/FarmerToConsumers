const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const LivraisonModel = new Schema({
    order: {
        type: Schema.Types.ObjectId,
        ref: 'order'
    },
    address:"string",
    streetAddress: "string",
    city: "string",
    postalCode: {
            type: Number,
            trim: true
    },
    dateLivraison:Date,
    reference:"string",
    frais:Number
})

module.exports = mongoose.model('livraison', LivraisonModel)