
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();

const uri = process.env.DB_CONNECT;
mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .catch(e => {
        console.error('Connection error', e.message)
    })
    
const db = mongoose.connection

module.exports = db

