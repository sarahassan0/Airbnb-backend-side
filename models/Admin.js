var mongoose = require('mongoose')
var bcrypt = require('bcrypt')

// Define Admin Schema
const adminSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 2,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        minLength: 8,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        minLength: 4,
        required: true,
        trim: true
    }
},
    { timestamps: true }
)


//hashing password before send it to DB
adminSchema.pre("save", function (next) {

    // this step could be implemented in the route
    const salt = bcrypt.genSaltSync(15);
    const hashedPass = bcrypt.hashSync(this.password, salt);
    this.password = hashedPass
    next()
})

adminSchema.pre("update", function (next) {

    // this step could be implemented in the route
    const salt = bcrypt.genSaltSync(15);
    const hashedPass = bcrypt.hashSync(this.password, salt);
    this.password = hashedPass
    next()
})


// Create User Collection 
const adminModel = mongoose.model("Admin", adminSchema)





module.exports = adminModel