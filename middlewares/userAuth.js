var jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();



function userAuth(req, res, next) {
    const token = req.headers.authorization
    console.log("token",token),
    console.log("userId",req.body);
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (decoded) {
            req.userID = decoded.data.userID
            console.log("sssssss",req.userID);

            next()
        }
        if (err) {
            console.log("dddddddd",req.userID);
            res.status(401).json('Unauthorized User')
        }
    });

}

module.exports = userAuth
