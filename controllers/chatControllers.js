const asyncHandler = require('express-async-handler')
const Chat = require("../models/chatModel")
const User = require("../models/users.models")
const Product = require('../models/Product');
const accessChat = asyncHandler(async (req, res) => {
    const { userId, productId } = req.body;
    if (!userId || !productId) {
        console.log("user id or product id param not sent with request");
        return res.sendStatus(400);
    }

    const isChat = await Chat.find({
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
            { product: { $eq: productId } }
        ]
    })
        .populate("users", "-password")
        .populate("latestMessage")
        .populate("product")
        .populate({
            path: "latestMessage.sender",
            select: "name email"
        });

    if (isChat.length !== 0) {
        res.send(isChat[0]);
    } else {
        const chatData = {
            chatName: "sender",
            users: [req.user._id, userId],
            product: productId
        };
        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id })
                .populate("users", "-password")
                .populate("product");
            res.status(200).send(FullChat);
        } catch (error) {
            console.log(error.message);
        }
    }
});


const fetchChats = asyncHandler(async (req, res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } }).populate("users", "-password").populate("latestMessage").populate("product", "name").sort({ updatedAt: -1 }).then(async (result) => {
            result = await User.populate(result, {
                path: "latestMessage.sender",
                select: "name email"
            });


            res.status(200).send(result)
        })

    } catch (error) {
        console.log(error.message)
    }
})


module.exports = { accessChat, fetchChats }