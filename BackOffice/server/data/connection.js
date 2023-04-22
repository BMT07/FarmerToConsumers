require('dotenv').config()

const mongoose = require('mongoose')

const db_url = process.env.DB_URL;

const connect = function () {
    mongoose.connect(db_url).then((val) => {
        console.log('Database connected')
    }).catch((err) => {
        console.log(err.message)
    })
}

module.exports = connect;