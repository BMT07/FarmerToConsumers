const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const BlogModel = new Schema({
    Name: "string",
    CompanyName: "string",
    subject: "string",
    description:"string"
    
})

module.exports = mongoose.model('Blogs', BlogModel)