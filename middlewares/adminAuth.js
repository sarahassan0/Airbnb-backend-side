var jwt = require('jsonwebtoken')
// const dotenv = require('dotenv');
// dotenv.config();

require('dotenv').config();


function adminAuth(req, res, next) {
    const token = req.headers.authorization
    console.log(token);
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (decoded) {
            req.adminID = decoded.data.adminID
            console.log(33);
            next()
        }
        if (err) {
            res.status(401).json('Unauthorized Admin')
        }
    });

}

module.exports = adminAuth

