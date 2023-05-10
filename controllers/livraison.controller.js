const deliveryModel=require('../models/Livraison')
const usersModels = require('../models/users.models');
const orderModel= require('../models/Order')
const Product = require('../models/Product')
const axios= require("axios");
const nodemailer = require('nodemailer');
const GetUserLivraison = async (req, res) => {
    try {
      const data = await usersModels.findOne({ email: req.params.email });
      res.status(200).json(data);
    } catch (error) {
      res.status(404).json(error.message);
    }
  };
const GetFarmerOrder= async (req, res)=>{
  try {
    const farmer = await usersModels.findById(req.user.id).select('-password');
    const productsfarmer= await Product.find({user:farmer._id})
    const productsId= productsfarmer.map(product => product._id)
    const orderFarmer = await orderModel.find({ products: { $in: productsId } });
    const livraisons= await deliveryModel.find({order: {$in: orderFarmer.map(e=>e._id)}})
    res.status(200).json(livraisons)
  } catch (error) {
    res.status(404).json(error.message);
  }
}
const GetLivraisonByReference=async(req,res)=>{
  try {
    const livraison= await deliveryModel.findOne({reference: req.params.ref})
    const order= await orderModel.findOne({_id: livraison.order})
    const farmer = await usersModels.findById(req.user.id).select('-password');
    const productsfarmer= await Product.find({user:farmer._id})
    const ListProducts=[]
    
    order.productsNameQty.forEach(op => {
      productsfarmer.forEach(p => {
        if (op._id.equals(p._id)) {
          ListProducts.push(op);
        }
      })
    })
    
    const response={
      "products":ListProducts,
      "address":livraison.address+" "+livraison.city+" "+livraison.postalCode,
      "frais":livraison.frais
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(404).json(error.message);
  }
}
const PlaceOrder= async (req,res)=>{
  try {
    const user = await usersModels.findById(req.user.id).select('-password');
    const newOrder= new orderModel({
      user: user._id,
      products: req.body.products,
      // productsName: req.body.productsName,
      // productsQty: req.body.productsQty,
      productsNameQty:req.body.productsNameQty,
      total: req.body.total,
      statusPayment: false,
      etat:false
      
    })
    const order= await newOrder.save();

    const newDelivery=new deliveryModel({
      order: order._id,
      address:req.body.address,
      streetAddress:req.body.streetAddress,
      city: req.body.city,
      postalCode:req.body.postalCode,
      dateLivraison:req.body.dateLivraison,
      frais:req.body.frais,
      reference: Math.floor(Math.random() * (99999 - 10000 + 1) + 10000)
    })
    const delivery =await newDelivery.save();
    res.json(order + delivery);
  } catch (error) {
    res.json(error);
  }
}
const GetOrder= async (req,res)=>{
  try {
    const order=await orderModel.find({user:req.user.id})
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json(error.message);

  }
}
const Payment= async(req,res)=>{
    const url="https://developers.flouci.com/api/generate_payment"
    const payload= {
      "app_token": "33f7202a-1643-42dd-8590-159e919b1a0d", 
      "app_secret": process.env.SECRET_FLOUCI,
      "amount": req.body.amount,
      "accept_card": "true",
      "session_timeout_secs": 1200,
      "success_link": "http://localhost:3000/success",
      "fail_link": "http://localhost:3000/failed",
      "developer_tracking_id": "b44f3dde-ef71-4ecd-8405-ec22419da361"
  }
  await axios.post(url, payload)
  .then(result=>{
    res.send(result.data)
  }).catch(err=>console.log(err))
}
const updateOrder = async (req, res) => {
  try {
    const order = await orderModel.findOne({ user: req.user.id, statusPayment: false }).sort({ createdAt: -1 }).exec();
    if (!order) {
      return res.status(404).json({ message: "No order found" });
    }
    order.statusPayment = true;
    await order.save();
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const cancelOrder= async (req,res)=>{
  try {
    const order=await orderModel.findById(req.params.id)
    const livraison=await deliveryModel.findOne({order:order._id})
    await order.remove()
    await livraison.remove()
    res.status(200).json({message:"deleted"})
  } catch (error) {
    res.status(404).json({ message: "Server error" });
  }
}
const Verify= async(req,res)=>{
  const payment_id=req.params.id;
  await axios.get(`https://developers.flouci.com/api/verify_payment/${payment_id}`,{
    headers:{
      'Content-Type': 'application/json' ,
      'apppublic': '33f7202a-1643-42dd-8590-159e919b1a0d' ,
      'appsecret': process.env.SECRET_FLOUCI
    }
  }).then((result)=>{
    res.send(result.data)
  }).catch((err)=>{
    console.log(err.message)
  })
}

  module.exports = {
    GetUserLivraison, PlaceOrder, Payment, Verify, updateOrder,GetOrder,cancelOrder,GetFarmerOrder,GetLivraisonByReference
  };
  