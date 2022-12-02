const express = require("express");
const cors = require('cors');
var mongoose = require('mongoose')
// var unitsRouter = require('./routes/units');
var userRouter = require('./routes/user');
const dotenv = require('dotenv');
dotenv.config();

// Init the server
const app = express()
app.use(express.json())
app.use(cors())

// Connecting to local DB 
mongoose.connect(`${process.env.DB_BaseURL}`).then(() => {
    console.log("Database Connected");
}).catch((err) => {
    throw new Error(err);
});


// main root
app.get('/', (req, res, next) => {
    res.status(200).json('Welcome to Airbnb API')
})

//API's
app.use('/users', userRouter)
// app.use('/units', unitRouter)


app.use("*", function (req, res, next) {
    res.status(404).json("Not Found")

})

module.exports = app