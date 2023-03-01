var express = require('express');
const { Register, Login } = require('../controllers/users.controllers');
var router = express.Router();
// npm install passport-jwt  
const { ROLES, inRole } = require('../security/Rolemiddleware');
const passport= require('passport') //npm i passport pour sécurité des routes

/* Register */
router.post('/register', Register );
router.post('/login', Login );
router.get('/products',passport.authenticate('jwt', { session: false }), inRole(ROLES.FARMER), function(req, res, next){
  try {
    res.status(200).send("farmer interface")
  } catch (error) {
    res.status(404).send("not allowed")
  }
})
router.get('/order', passport.authenticate('jwt', { session: false }), inRole(ROLES.RESTAURANT_MANAGER), function(req, res){
  try {
    res.status(200).send("restaurant manager interface")
  } catch (error) {
    res.status(404).send("not allowed")
  }
})
module.exports = router;
