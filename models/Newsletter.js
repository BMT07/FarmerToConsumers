const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsletter = new Schema({
    email:{
        type: "string",
        trim: true,
        unique: true
    }
})
module.exports = mongoose.model('newsletter', newsletter)