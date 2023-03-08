const UserModel = require("../models/users.models")
const {ValidateRegister, ValidateLogin} = require('../validation/Validation')
const bcrypt= require("bcryptjs") //npm i bcryptjs --save
const jwt=require("jsonwebtoken") //npm i jsonwebtoken
const Register= async (req,res)=>{
    // const { errors, isValid } = ValidateRegister(req.body)
    // try {
    //    if(!isValid){
    //     res.status(404).json(errors)
    //    } else{
    //     const hash = bcrypt.hashSync(req.body.password, 10)
    //     let User=new UserModel({
    //         "name":req.body.name,
    //         "email":req.body.email,
    //         "password": hash,
    //         "role": req.body.role,
    //         "location":{
    //             "streetAddress": req.body.streetAddress,
    //             "city": req.body.city,
    //             "postalCode": req.body.postalCode
    //         },
    //         "phoneNumber": req.body.phoneNumber,
    //         "description": req.body.description
    //     })
    //     await UserModel.create(User)
    //     res.status(200).json({ messages: "success" })
    //    }
    // } catch (error) {
    //     res.status(404).json(error.message)
    // }
    const hash = bcrypt.hashSync(req.body.password, 10)
        let User=new UserModel({
            "name":req.body.name,
            "email":req.body.email,
            "password": hash,
            "role": req.body.role,
            "location":{
                "streetAddress": req.body.streetAddress,
                "city": req.body.city,
                "postalCode": req.body.postalCode
            },
            "phoneNumber": req.body.phoneNumber,
            "description": req.body.description
        })
        await UserModel.create(User)
        res.status(200).json({ messages: "success" })
}
const Login=async (req,res)=>{
    const { errors, isValid } = ValidateLogin(req.body)
    try {
        if (!isValid) {
            res.status(404).json(errors)
        } else {
            UserModel.findOne({ email: req.body.email})
            .then(
                user=>{
                    if(!user){
                        errors.email="not found user with this email"
                        res.status(404).json(errors)
                    }else{
                        bcrypt.compare(req.body.password, user.password)
                        .then(isMatch=>{
                            if(!isMatch){
                                errors.password= "incorrect password"
                                res.status(404).json(errors)
                            }else{
                                var token = jwt.sign({
                                    id: user._id,
                                    name: user.name,
                                    email: user.email,
                                    role: user.role
                                }, process.env.PRIVATE_KEY, { expiresIn: '1h' });
                                res.status(200).json({
                                    message: "success",
                                    token: "Bearer "+token
                                })
                            }
                        })
                    }
                }
            )
        }
    } catch (error) {
        
    }
}
module.exports={
    Register, Login
}