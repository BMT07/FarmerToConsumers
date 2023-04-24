const express = require('express');
const bcrypt = require('bcryptjs')
const router = express.Router();
const users = require('../data/model')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator/check')

router.get('/users/getAll', async (req, res) => {
    try {
        const data = await users.find();
        res.status(200).json(data)
    }
    catch (err) {
        console.log(err)
    }
})
router.post('/authenficate', [check('email', 'please include a valid email').isEmail(), check('password', 'password is required').exists()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { email, password } = req.body;
        try {
            let user = await users.findOne({ email })
            if (!user) {
                res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
            }
            if (user.role !== "Admin") {
                res.status(401).json({ errors: [{ msg: "Unauthorized Access" }] });
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
            }


            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(payload, "mySecretToken", { expiresIn: 360000 }, (err, token) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Internal Server Error");
                } else {
                    res.json({ token });
                }
            });



        } catch (err) {
            console.log(err.message)

        }


    })



router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await users.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/users/add', async (req, res) => {
    const { name, email, password, role, phoneNumber } = req.body
    try {
        let user = await users.findOne({ email });
        if (user) {
            res.status(400).json("user Already exist")
        }
        user = new users({
            name,
            email,
            password,
            role,
            phoneNumber
        })
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)
        await user.save()

        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, "mySecretToken", { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token })
        })

    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
})
router.delete('/users/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await users.findByIdAndDelete(id);
        res.status(200).json({ message: "deleted successfully" })
    }
    catch (err) {

    }
})
router.put('/users/update/:id', async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        const options = { new: true }
        const result = await users.findByIdAndUpdate(id, data, options)
        res.status(200).json({ result })
    }
    catch (err) {
        console.log(err.message)
    }
})
module.exports = router;