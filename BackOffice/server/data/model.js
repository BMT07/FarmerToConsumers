const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    enum: ['Fruits', 'Vegetables', 'Dairy'],
  },
  farmer: {
    type: String,
  },
});
const OrderModel = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'products',
      },
    ],
    productsNameQty: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
  
    total: Number,
    statusPayment: Boolean,
    etat: Boolean,
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('orders', OrderModel);
const Product = mongoose.model('products', ProductModel);
const users = mongoose.model('users', UserModel);
module.exports = { users, Product, Order };
