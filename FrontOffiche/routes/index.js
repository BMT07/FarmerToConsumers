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
  SendContactMail,
  AddNewsletter,
  SendNewsletter,
  ProfileGoogle,
} = require('../controllers/users.controllers');

const { GetUserLivraison, PlaceOrder, Payment, Verify, updateOrder, GetOrder, cancelOrder, GetFarmerOrder, GetLivraisonByReference } = require('../controllers/livraison.controller')
const cloudinary = require('../controllers/utils/cloudinary')

var router = express.Router();
// npm install passport-jwt
const { ROLES, inRole } = require('../security/Rolemiddleware');
const passport = require('passport'); //npm i passport pour sécurité des routes
const User = require('../models/users.models');
const { check, validationResult } = require('express-validator/check')
const Product = require('../models/Product')
/* Register */
router.post('/register', Register);
router.post('/activation',
  activateEmail
);
router.post('/login', Login);
router.get(
  '/profile', passport.authenticate('jwt', { session: false }),
  Profile
);
router.get(
  '/profilegoogle/:email', 
  ProfileGoogle
);
router.put(
  '/Editprofile/:email', passport.authenticate('jwt', { session: false }),
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
    const user = await User.findOne({ email: email })
    if (user) {
      const updatedUser = {
        email: email
      }
      await User.findOneAndUpdate(
        { email: user.email },
        { $set: updatedUser },
        { new: true }
      )
    }
    else {
      const newUser = await User.create({
        name,
        email,
        role: "RESTAURANT",
        password: " ",
        location: {
          streetAddress: " ",
          city: " ",
          postalCode: " "
        },
        phoneNumber: " ",
        description: " "

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
//@route Post /addProduct
//@desc  create or update a user profile
//access  Private

router.post('/addProduct', [
  passport.authenticate('jwt', { session: false }),
  [check('name', 'Name is required').not().isEmpty(),
  check('price', 'Price is required').not().isEmpty(),
  check('productionDate', 'ProductionDate is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    try {

      const user = await User.findById(req.user.id).select('-password');
      const { name, price, productionDate, quantity, description, category, organic, image } = req.body;
      const result = await cloudinary.uploader.upload(image, {
        folder: "products"
      })

      const product = await Product.create({
        name, price, productionDate, quantity, description, category, organic, farmer: user.name, user: user.id,
        image: {
          public_id: result.public_id,
          url: result.secure_url
        }
      });
      SendNewsletter(product)
      res.json(product);

    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')

    }

  }

)

/////@route Get /GetProducts
////@Desc  getall products pour tous les farmers

router.get('/getProducts', async (req, res) => {
  try {
    const product = await Product.find();
    const productsWithImageUrls = product.map(product => {
      return {
        ...product.toJSON(),
        image: product.image.url
      };
    });

    res.json(productsWithImageUrls);


  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
)

router.get('/getProduct', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const products = await Product.find({ farmer: user.name });

    const productsWithImageUrls = products.map(product => {
      return {
        ...product.toJSON(),
        image: product.image.url
      };
    });

    res.json(productsWithImageUrls);


  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
});
/////@route getProducts/:id
////@Desc  get product by id

router.get('/getProducts/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" })
    }

    const productWithImageUrl = {
      ...product.toJSON(),
      image: product.image.url
    };

    res.json(productWithImageUrl);

  } catch (err) {
    console.error(err.message)
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Product not found" })
    }
    res.status(500).send('Server error')
  }
});

/////@route deleteProduct/:id
////@Desc  delete a post 
////@access private

router.delete('/deleteProduct/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" })
    }

    if (product.image && product.image.public_id) {
      await cloudinary.uploader.destroy(product.image.public_id);
    }

    await product.remove()
    res.json({ msg: "product removed" });

  } catch (err) {
    console.error(err.message)
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Product not found" })
    }
    res.status(500).send('Server error')
  }
});


/////@route Put update/:id
////@Desc update a post
////@access private
router.put('/update/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const user = await User.findById(req.user.id).select('-password');

    const { name, price, productionDate, quantity, description, category, organic, image } = req.body;

    let imageInfo = {};

    if (image) {
      const result = await cloudinary.uploader.upload(image, {
        folder: "products"
      });
      imageInfo = {
        public_id: result.public_id,
        url: result.secure_url
      };

      if (product.image.public_id) {
        await cloudinary.uploader.destroy(product.image.public_id);
      }
    } else {
      imageInfo = product.image;
    }

    product.name = name;
    product.price = price;
    product.productionDate = productionDate;
    product.quantity = quantity;
    product.description = description;
    product.category = category;
    product.organic = organic;
    product.image = imageInfo;
    product.farmer = user.name;
    product.user = user.id;

    await product.save();

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.put('/Like', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    Product.findByIdAndUpdate(req.body._id, { $push: { likes: req.user._id } }, { new: true })
      .then((result) => {
        res.status(200).json(result);
      })
  } catch (error) {
    res.status(500).json(error);
  }
})
router.put('/unlike', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    Product.findByIdAndUpdate(req.body._id, { $pull: { likes: req.user._id } }, { new: true })
      .then((result) => {
        res.status(200).json(result);
      })
  } catch (error) {
    res.status(500).json(error);
  }
})

/////////////////Livraison////////////////////////////
router.get('/donnes/:email', passport.authenticate('jwt', { session: false }), GetUserLivraison);
router.post('/addOrder', passport.authenticate('jwt', { session: false }), PlaceOrder)
router.post('/payment', Payment)
router.post('/payment/:id', Verify)
router.put('/modifyOrder', passport.authenticate('jwt', { session: false }), updateOrder)

router.get('/getOrder', passport.authenticate('jwt', { session: false }), GetOrder)
router.delete('/cancelOrder/:id', passport.authenticate('jwt', { session: false }), cancelOrder)
router.post('/contactus', SendContactMail)
router.get('/orderByFarmer', passport.authenticate('jwt', { session: false }), GetFarmerOrder)
router.get('/getorderbyref/:ref', passport.authenticate('jwt', { session: false }), GetLivraisonByReference)
router.post('/AddNewsletter', AddNewsletter)

module.exports = router;