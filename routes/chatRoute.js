const express = require('express')
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')
const { accessChat } = require("../controllers/chatControllers")
const { fetchChats } = require('../controllers/chatControllers')

router.route("/").post(protect, accessChat)
router.route("/").get(protect, fetchChats)

module.exports = router;