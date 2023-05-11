const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
//const users = require('../data/model')
const { users, Product, Order } = require('./model');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator/check');

router.get('/users/getAll', async (req, res) => {
  try {
    const data = await users.find();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});
router.post(
  '/authenficate',
  [
    check('email', 'please include a valid email').isEmail(),
    check('password', 'password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await users.findOne({ email });
      if (!user) {
        res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
      if (user.role !== 'Admin') {
        res.status(401).json({ errors: [{ msg: 'Unauthorized Access' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        'mySecretToken',
        { expiresIn: 360000 },
        (err, token) => {
          if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
          } else {
            res.json({ token });
          }
        }
      );
    } catch (err) {
      console.log(err.message);
    }
  }
);

router.get('/getOne/:id', async (req, res) => {
  try {
    const data = await users.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/users/add', async (req, res) => {
  const { name, email, password, role, phoneNumber } = req.body;
  try {
    let user = await users.findOne({ email });
    if (user) {
      res.status(400).json('user Already exist');
    }
    user = new users({
      name,
      email,
      password,
      role,
      phoneNumber,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(payload, 'mySecretToken', { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.delete('/users/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await users.findByIdAndDelete(id);
    res.status(200).json({ message: 'deleted successfully' });
  } catch (err) {}
});
router.put('/users/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const options = { new: true };
    const result = await users.findByIdAndUpdate(id, data, options);
    res.status(200).json({ result });
  } catch (err) {
    console.log(err.message);
  }
});

// *
// *
// *
// *
//PRODUCT ROUTES
// *
// *
// *
// *
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
// Set up Cloudinary credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Set up Multer storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'products',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});
const upload = multer({ storage });
//get all products
router.get('/products/getAll', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Get a single product
router.get('/products/:id', getProduct, (req, res) => {
  res.json(res.product);
});
// Middleware to get a product by ID
async function getProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.product = product;
  next();
}

// Create a new product
// router.post('/', async (req, res) => {
//     const product = new Product({
//       name: req.body.name,
//       price: req.body.price,
//       description: req.body.description,
//       image: req.body.image,
//       quantity: req.body.quantity,

//     });

//     try {
//       const newProduct = await product.save();
//       res.status(201).json(newProduct);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   });

// Update a product
router.patch('/products/:id', getProduct, async (req, res) => {
  if (req.body.name != null) {
    res.product.name = req.body.name;
  }
  if (req.body.price != null) {
    res.product.price = req.body.price;
  }
  if (req.body.productionDate != null) {
    res.product.productionDate = req.body.productionDate;
  }
  if (req.body.image != null) {
    res.product.image = req.body.image;
  }
  if (req.body.farmer != null) {
    res.product.farmer = req.body.farmer;
  }
  if (req.body.quantity != null) {
    res.product.quantity = req.body.quantity;
  }
  if (req.body.organic != null) {
    res.product.organic = req.body.organic;
  }
  if (req.body.category != null) {
    res.product.category = req.body.category;
  }

  try {
    const updatedProduct = await res.product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a product
router.delete('/products/:id', getProduct, async (req, res) => {
  try {
    await res.product.remove();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//get all orders
router.get('/orders/getAll', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single order
router.get('/orders/:id', getOrder, (req, res) => {
  res.json(res.order);
});
// Middleware to get a order by ID
async function getOrder(req, res, next) {
  let order;
  try {
    order = await Order.findById(req.params.id);
    if (order == null) {
      return res.status(404).json({ message: 'Order not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.order = order;
  next();
}

// Update an order
router.patch('/orders/:id', getOrder, async (req, res) => {
  if (req.body.statusPayment != null) {
    res.order.statusPayment = req.body.statusPayment;
  }
  if (req.body.etat != null) {
    res.order.etat = req.body.etat;
  }

  try {
    const updatedOrder = await res.order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an order
router.delete('/orders/:id', getOrder, async (req, res) => {
  try {
    await res.order.remove();
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
