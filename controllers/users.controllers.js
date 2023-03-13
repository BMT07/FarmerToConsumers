const UserModel = require("../models/users.models")
const SecretCode = require("../models/SecretCode");
const {ValidateRegister, ValidateLogin} = require('../validation/Validation')
const bcrypt= require("bcryptjs") //npm i bcryptjs --save
const jwt=require("jsonwebtoken") //npm i jsonwebtoken
const usersModels = require("../models/users.models")
const nodemailer = require("nodemailer");
const salt = bcrypt.genSaltSync(10);
const Register= async (req,res)=>{
    const { errors, isValid } = ValidateRegister(req.body)
    try {
       if(!isValid){
        res.status(404).json(errors)
       } else{
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
    } catch (error) {
        res.status(404).json(error.message)
    }
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
const EditProfile = async (req ,res)=>{
   //const { errors, isValid } = ValidateProfile(req.body)
    try {
        // if(!isValid){
        //     res.status(404).json(errors)
        //    } else{
               await  usersModels.findOneAndUpdate(
                {_id: req.user.id},
                    req.body,
                    { new: true }
                ).then(result=>{
                    res.status(200).json(result)
                })  
        }
     catch (error) {
         res.status(404).json(error.message)
    }
}
const Profile = async (req ,res)=>{
    try {
        const data =  await usersModels.findOne({email: req.params.email});
        res.status(200).json(data) 
     } catch (error) {
         res.status(404).json(error.message)
     }
}
async function SendMail(user, code) {
    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "hadaamani8@gmail.com",
        pass: "lxninhmyyfnlsafx",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  
    // Message object
    let message = {
      from: "farmertoconsumer@gmail.com",
      to: user.email,
      // Subject of the message
      subject: "Récuprération du mot de passe",
      // plaintext body
      // text: msg,
      html: `<div>
              <p><strong>Bonjour ${user.name}</strong></p>\
               <br>
               <p> Veuillez trouver ici le code de récupération de votre mot de passe : <span style="font-weight:500"> <strong>${code} </strong></span> </p>
               </div>`,
    };
  
    await transporter.sendMail(message, (error, success) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent successfully!");
      }
    });
    transporter.close();
  }
  //send secret code to mail // reset password
const resetPassword = async (req, res) => {
    try {
      // Get email from req.body
      const { email } = req.body;
  
      // Check user
      const finduser = await UserModel.findOne({ email });
      if (!finduser) {
        return res.status(400).send({ msg: "Compte non trouvé" });
      }
  
      // Generate Secret Code
      const code = Math.floor(100000 + Math.random() * 900000);
  
      // Save code in DB with user id
      const newcode = await SecretCode.create({ user: finduser._id, code });
  
      // Send Email to user
      SendMail(finduser, code);
      res.status(200).send({
        msg: "Veuillez consulter votre email pour la récupération du code",
      });
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .send({ msg: "Récupération du mot de passe échouée", error });
    }
  };
  
  //submit secret code from mail
  const checkSecretCode = async (req, res) => {
    try {
      // Get secret code from req.body
      const code  = req.body.code;
      // find secret code
      const findcode = await SecretCode.findOne({ code:code })
        .populate("user")
        .sort({ _id: -1 })
        .limit(1);
      if (!findcode) {
        return res.status(400).send({ msg: "Code invalide !" });
      }
      // send ok
      res.status(200).send({ msg: "Code Valid", findcode });
    } catch (error) {
      console.log(error);
      res.status(400).send({ msg: "Vérification du code échouée", error });
    }
  };
  
  //reset new password
  const resetNewPassword = async (req, res) => {
    try {
      // Get new and confirm password from req.body
      const { newpass, confirmpass } = req.body;
      // Get user id from req.params
      const { id } = req.params;
      // Check if 2 password is equal
      if (newpass !== confirmpass) {
        return res
          .status(400)
          .send({ msg: "Les mots de passe ne sont pas identiques" });
      }
      // replace password
      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(newpass, salt);
      await UserModel.updateOne({ _id: id }, { $set: { password: hashedpassword } });
  
      res.status(200).send({ msg: "Mot de passe changé !" });
    } catch (error) {
      console.log(error);
      res.status(400).send({ msg: "Changement du mot de passe echoué", error });
    }
  };
module.exports={
    Register, Login, Profile, EditProfile, resetNewPassword, resetPassword,checkSecretCode
}