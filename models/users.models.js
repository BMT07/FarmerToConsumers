const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({
    name: "string",
    email: {
        type: "string",
        trim: true, //pour effacer les espaces
        unique: true
    },
    password: "string",
    role: "string",
    location:{
        streetAddress: "string",
        city: "string",
        postalCode: {
            type: Number,
            trim: true
        }
    },
    phoneNumber:{
        type: Number,
        trim: true
    },
    description: "string"
},// najmou nzidou isAdmin boolean houni 
    {
        timestamps: true
    }

)
const User =  mongoose.model('users', UserSchema)

// Generate Token
UserSchema.methods.generateToken = function() {
    return jwt.sign({ id: this._id, isAdmin: this.isAdmin },process.env.JWT_SECRET_KEY);
  }


// Validate Change Password
function validateChangePassword(obj) {
    const schema = Joi.object({
      password: Joi.string().trim().min(6).required(),
    });
    return schema.validate(obj);
  }



  module.exports = {
    User,
    validateChangePassword
  }