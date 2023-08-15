var jwt = require('jsonwebtoken')

require('dotenv').config();


function adminAuth(req, res, next) {
    const token = req.headers.authorization
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (decoded) {
            req.adminID = decoded.data.adminID
            next()
        }
        if (err) {
            res.status(401).json('Unauthorized Admin')
        }
    });

}

module.exports = adminAuth

