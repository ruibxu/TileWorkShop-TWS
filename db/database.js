
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();

const uri = "mongodb+srv://tileworkshop:twscse416@cluster0.nqqoxyo.mongodb.net/?retryWrites=true&w=majority";
mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })
    
const db = mongoose.connection

module.exports = db

