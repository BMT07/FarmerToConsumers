const express = require('express')
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')

const { rating } = require('../controllers/productControllers')

router.route("/").put(protect, rating)

module.exports = router;
