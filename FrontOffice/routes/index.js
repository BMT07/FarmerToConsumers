var express = require('express');
const {
  activateEmail,
  Register,
  Login,
  Profile,
  EditProfile,
  resetPassword,
  checkSecretCode,
  resetNewPassword,
} = require('../controllers/users.controllers');
var router = express.Router();
// npm install passport-jwt
const { ROLES, inRole } = require('../security/Rolemiddleware');
const passport = require('passport'); //npm i passport pour sécurité des routes
const User = require('../models/users.models');


/* Register */
router.post('/register', Register);
router.post('/activation', 
  activateEmail
);
router.post('/login', Login);
router.get(
  '/profile/:email',
  
  Profile
);
router.put(
  '/Editprofile/:email',
  
  EditProfile
);

router.get(
  '/order',
  passport.authenticate('jwt', { session: false }),
  inRole(ROLES.RESTAURANT),
  function (req, res) {
    try {
      if (req.body) {
        res.status(200).send('restaurant manager interface');
      }
    } catch (error) {
      res.status(404).send('not allowed');
    }
  }
);

router.get(
  '/products',
  passport.authenticate('jwt', { session: false }),
  inRole(ROLES.FARMER),
  function (req, res, next) {
    try {
      if (req.body) {
        res.status(200).send('farmer interface');
      }
    } catch (error) {
      res.status(404).send('not allowed');
    }
  }
);
router.get(
  '/admin',
  passport.authenticate('jwt', { session: false }),
  inRole(ROLES.ADMIN),
  function (req, res, next) {
    try {
      if (req.body) {
        res.status(200).send('admin interface');
      }
    } catch (error) {
      res.status(404).send('not allowed');
    }
  }
);
// Create new user
router.post('/PostGoogle', async (req, res) => {
  const { name, email } = req.body;
  try {
    const user= await User.findOne({ email: email }) 
    if(user){
      const updatedUser = {
        email:email
    }
    await User.findOneAndUpdate(
      { email: user.email },
      { $set: updatedUser },
      { new: true }
    )
    }
  else{
    const newUser = await User.create({
      name,
      email,
      role:"RESTAURANT",
      location:{
        streetAddress:" ",
        city:" ",
        postalCode:" "
      },
      phoneNumber:" ",
      description:" "

    });
    res.status(201).json(newUser);
  }
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating user' });
  }
});
//reset password
router.post('/resetPassword', resetPassword);
//check secret code
router.post('/CheckSecretCode', checkSecretCode);
//update password
router.put('/resetNewPassword/:id', resetNewPassword);
module.exports = router;
