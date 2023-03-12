var express = require('express');
const { Register, Login, Profile, EditProfile } = require('../controllers/users.controllers');
var router = express.Router();
// npm install passport-jwt  
const { ROLES, inRole } = require('../security/Rolemiddleware');
const passport= require('passport') //npm i passport pour sécurité des routes

/* Register */
router.post('/register', Register );
router.post('/login', Login );
router.get('/profile/:email', passport.authenticate('jwt', { session: false }), inRole(ROLES.RESTAURANT, ROLES.FARMER),Profile)
router.put('/Editprofile/:id', passport.authenticate('jwt', { session: false }), inRole(ROLES.RESTAURANT, ROLES.FARMER),EditProfile)

router.get('/order', passport.authenticate('jwt', { session: false }), inRole(ROLES.RESTAURANT), function(req, res){
  try {
    if(req.body){
    res.status(200).send("restaurant manager interface")}
  } catch (error) {
    res.status(404).send("not allowed")
  }
})

router.get('/products',passport.authenticate('jwt', { session: false }), inRole(ROLES.FARMER), function(req, res, next){
  try {
    if(req.body){
    res.status(200).send("farmer interface")}
  } catch (error) {
    res.status(404).send("not allowed")
  }
})
router.get('/admin',passport.authenticate('jwt', { session: false }), inRole(ROLES.ADMIN), function(req, res, next){
  try {
    if(req.body){
    res.status(200).send("admin interface")}
  } catch (error) {
    res.status(404).send("not allowed")
  }
})

module.exports = router;
