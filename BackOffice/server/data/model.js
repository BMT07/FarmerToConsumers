const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const UserModel = new Schema(
  {
    name: 'string',
    email: {
      type: 'string',
      trim: true,
      unique: true,
    },
    password: 'string',
    role: 'string',
    location: {
      streetAddress: 'string',
      city: 'string',
      postalCode: {
        type: Number,
        trim: true,
      },
    },
    phoneNumber: {
      type: Number,
      trim: true,
    },
    description: 'string',
    statut: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = new Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  productionDate: {
    type: Date,
  },
  image: {
    type: String,
  },
  organic: {
    type: Boolean,
  },
  category: {
    type: String,
    enum: ['Fruits', 'Vegetables', 'Dairy', 'Grains'],
  },
  likes: Number,
  description: String,
  farmer: {
    type: String,
  },
});
// ProductModel.pre('save', function (next) {
//   if (this.productionDate) {
//     this.productionDate = moment(this.productionDate).format('DD-MM-YYYY');
//   }
//   next();
// });
const Product = mongoose.model('products', ProductModel);
const users = mongoose.model('users', UserModel);
module.exports = { users, Product };
