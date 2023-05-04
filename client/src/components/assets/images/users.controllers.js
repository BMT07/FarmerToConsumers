const UserModel = require('../models/users.models');
const SecretCode = require('../models/SecretCode');
const { ValidateRegister, ValidateLogin } = require('../validation/Validation');
const bcrypt = require('bcryptjs'); //npm i bcryptjs --save
const jwt = require('jsonwebtoken'); //npm i jsonwebtoken
const usersModels = require('../models/users.models');
const nodemailer = require('nodemailer');
const sendMail = require('./sendMail');
const salt = bcrypt.genSaltSync(10);

const { CLIENT_URL } = process.env;

const Register = async (req, res) => {
  const { errors, isValid } = ValidateRegister(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      const hash = bcrypt.hashSync(req.body.password, 10);
      const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: hash,
        role: req.body.role,
        location: {
          streetAddress: req.body.streetAddress,
          city: req.body.city,
          postalCode: req.body.postalCode,
        },
        phoneNumber: req.body.phoneNumber,
        description: req.body.description,
      };

      const activation_token = createActivationToken(newUser);
      //console.log({ activation_token });
      const url = `${CLIENT_URL}/activationemail/${activation_token}`;
      const email = req.body.email;
      const name = req.body.name;
      const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        service: process.env.SERVICE,
        port: Number(process.env.EMAIL_PORT),
        secure: Boolean(process.env.SECURE),
        auth: {
          user: process.env.SENDER_MAIL,
          pass: process.env.SENDER_PASS,
        },
      });
      await transporter.sendMail({
        from: process.env.SENDER_MAIL,
        to: email,
        subject: 'verify mail',
        html: `
        
        <div style="text-align: center;">
        <p><strong>Hello ${name}</strong></p>
          <p>You registered an account on Farmer To Resto, before being able to use your account</p>
          <p>you need to verify that this is your email address by clicking here:</p> <a href=${url}><button style ="background-color:#609966; display:inline-block; padding:20px; width:200px;color: #ffffff;text-align:center;" >Click here</button>  </a>
          <br>
          <p>Kind Regards, FTR</p>
        </div>
          `,
      });
      //await sendMail(email, 'Password Reset', url);

      res.status(200).json({
        messages:
          'Please activate your account to finish your register process',
      });
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const activateEmail = async (req, res) => {
  try {
    const { activation_token } = req.body;
    const user = jwt.verify(activation_token, process.env.PRIVATE_KEY);
    //console.log(user);
    //console.log(activation_token);
    const { name, email, password, role, location, phoneNumber, description } =
      user;

    const check = await UserModel.findOne({ email });
    //console.log(check);
    if (check)
      return res.status(400).json({ msg: 'This email already exists' });

    const newUser = new UserModel({
      name,
      email,
      password,
      role,
      location,
      phoneNumber,
      description,
    });
    //console.log(newUser);
    await newUser.save();

    res.json({ msg: 'Your account has been activated' });
  } catch (err) {
    res.json(err.message);
  }
};

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.PRIVATE_KEY, { expiresIn: '5m' });
};

const Login = async (req, res) => {
  const { errors, isValid } = ValidateLogin(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      UserModel.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
          errors.email = 'not found user with this email';
          res.status(404).json(errors);
        } else {
          bcrypt.compare(req.body.password, user.password).then((isMatch) => {
            if (!isMatch) {
              errors.password = 'incorrect password';
              res.status(404).json(errors);
            } else {
              var token = jwt.sign(
                {
                  id: user._id,
                  name: user.name,
                  email: user.email,
                  role: user.role,
                },
                process.env.PRIVATE_KEY,
                { expiresIn: '1H' }
              );
              res.status(200).json({
                message: 'success',
                token: 'Bearer ' + token,
              });
            }
          });
        }
      });
    }
  } catch (error) {}
};
const EditProfile = async (req, res) => {
  try {
    await usersModels
      .findOneAndUpdate({ email: req.params.email }, req.body, { new: true })
      .then((result) => {
        res.status(200).json(result);
      });
  } catch (error) {
    res.status(404).json(error.message);
  }
};
const Profile = async (req, res) => {
  try {
    const data = await usersModels.findById(req.user.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
async function SendMail(user, code) {
  // Create a SMTP transporter object
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SENDER_MAIL,
      pass: process.env.SENDER_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  // Message object
  let message = {
    from: process.env.USER,
    to: user.email,
    // Subject of the message
    subject: 'Récuprération du mot de passe',
    // plaintext body
    // text: msg,
    html: `<div>
    <p><strong>Hello ${user.name} </strong></p>\

     <p> This is your reset password code: ${code} </p>
     
     <p>Kind Regards, FTR</p>
     </div>`,
  };
  await transporter.sendMail(message, (error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent successfully!');
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
      return res.status(400).send({ msg: 'Compte non trouvé' });
    }

    // Generate Secret Code
    const code = Math.floor(100000 + Math.random() * 900000);

    // Save code in DB with user id
    const newcode = await SecretCode.create({ user: finduser._id, code });

    // Send Email to user
    SendMail(finduser, code);
    res.status(200).send({
      msg: 'Veuillez consulter votre email pour la récupération du code',
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ msg: 'Récupération du mot de passe échouée', error });
  }
};

//submit secret code from mail
const checkSecretCode = async (req, res) => {
  try {
    // Get secret code from req.body
    const code = req.body.code;
    // find secret code
    const findcode = await SecretCode.findOne({ code: code })
      .populate('user')
      .sort({ _id: -1 })
      .limit(1);
    if (!findcode) {
      return res.status(400).send({ msg: 'Code invalide !' });
    }
    // send ok
    res.status(200).send({ msg: 'Code Valid', findcode });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: 'Vérification du code échouée', error });
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
        .send({ msg: 'Les mots de passe ne sont pas identiques' });
    }
    // replace password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(newpass, salt);
    await UserModel.updateOne(
      { _id: id },
      { $set: { password: hashedpassword } }
    );

    res.status(200).send({ msg: 'Mot de passe changé !' });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: 'Changement du mot de passe echoué', error });
  }
};
const SendContactMail = async (req,res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SENDER_MAIL,
      pass: process.env.SENDER_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  // Message object
  let message = {
    from: req.body.email,
    to: process.env.SENDER_MAIL,
    subject: "Message from Contact Form",
    html: `<div>
            <p><strong>Email from: ${req.body.Lastname} ${req.body.Firstname}</strong></p>
             <br>
             <p>  <strong>Email: ${req.body.email} </strong></span> </p>
             <p>  <strong>Message: ${req.body.msg} </strong></span> </p>
             </div>`,
  };
try {
  await transporter.sendMail(message, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to send email. Please try again later." });
    } else {
      console.log("Email sent successfully!");
      res.status(200).json({ message: "Email sent successfully!" });
    }
  });
} catch (error) {
  console.log(error);
  res.status(500).json({ message: "Failed to send email. Please try again later." });
}};
module.exports = {
  activateEmail,
  Register,
  Login,
  Profile,
  EditProfile,
  resetNewPassword,
  resetPassword,
  checkSecretCode,
  SendContactMail
};
