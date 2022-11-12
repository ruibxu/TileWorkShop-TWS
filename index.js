// THESE ARE NODE APIs WE WISH TO USE
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

// CREATE OUR SERVER
dotenv.config()
const PORT = process.env.PORT || 4000;
const app = express()

// SETUP THE MIDDLEWARE
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: ["http://localhost:3000",
    "http://localhost:4000",
    "https://tileworkshop.herokuapp.com/"],
    credentials: true
}))

app.use(express.json({limit: '50mb'}))
app.use(cookieParser())
// Sendgrid
//const sgMail = require('@sendgrid/mail')
//sgMail.setApiKey(process.env.SENDGRID_API_KEY)

//app.use(express.static(path.join(__dirname, "client", "build")));

/*
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/TWS',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB has been connected"))
  .catch((err) => console.log(err));
*/



// SETUP OUR OWN ROUTERS AS MIDDLEWARE
const authRouter = require('./routes/auth-router')
app.use('/auth', authRouter)
const tilemapRouter = require('./routes/tilemap-router')
app.use('/api', tilemapRouter)
const tilesetRouter = require('./routes/tileset-router')
app.use('/api', tilesetRouter)
const commentRouter = require('./routes/comment-router')
app.use('/api', commentRouter)
const communityRouter = require('./routes/community-router')
app.use('/api', communityRouter)
const searchRouter = require('./routes/search-router')
app.use('/api', searchRouter)
const emailRouter = require('./routes/email-router')
app.use('/api', emailRouter)
const cloudinaryRouter = require('./routes/cloudinary-router')
app.use('/api', cloudinaryRouter)

// INITIALIZE OUR DATABASE OBJECT
const db = require('./db/database')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))


// app.use(express.static('client/build'));
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/client/build/index.html'));
// });

const path = require("path");

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});


// PUT THE SERVER IN LISTENING MODE
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))




