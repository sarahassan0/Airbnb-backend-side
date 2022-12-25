const express = require("express");
const cors = require('cors');
var mongoose = require('mongoose')
var unitRouter = require('./routes/unit');
var tempUnitRouter = require('./routes/tempUnit');
var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');
var reservationRouter = require('./routes/reservation');
const dotenv = require('dotenv');
dotenv.config();

// Init the server
const app = express()
app.use(express.json())
app.use(cors())

// Connecting to local DB 
// mongoose.connect(`${process.env.DB_BaseURL}`).then(() => {
//     console.log("Database Connected");
// }).catch((err) => {
//     throw new Error(err);
// });


mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@airbnb-database.rtchlri.mongodb.net/?retryWrites=true&w=majority`).then(() => {
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
app.use('/admins', adminRouter)
app.use('/units', unitRouter)
app.use('/reservations', reservationRouter)
app.use('/tempUnits', tempUnitRouter);




app.use("*", function (req, res, next) {
    res.status(404).json("Not Found")

})

module.exports = app