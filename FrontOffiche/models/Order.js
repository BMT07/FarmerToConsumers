const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const OrderModel = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'products'
    }],
    productsNameQty:[{name:{type:String,required:true},quantity:{type:Number,required:true}}],
    // productsQty:[Number],
    total:Number,
    statusPayment: Boolean,
    etat:Boolean,
    

},{
    timestamps: true
})

module.exports = mongoose.model('order', OrderModel)