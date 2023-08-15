var mongoose = require('mongoose')
var bcrypt = require('bcrypt')

// Define User Schema
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        minLength: 2,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        minLength: 2,
        trim: true,
        required: true,
    },
    birthDate: {
        type: String,
        required: true
    },
    email: {
        type: String,
        // minLength: 8,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        minLength: 4,
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        minLength: 13,
    },
    address:
    {
        country: { type: String, trim: true },
        city: { type: String, trim: true }
    }
    ,
    gender: {
        type: String,
    },
    profileImg: {
        type: String,
    },
    isHost: {
        type: Boolean,
        required: true,
        default: false
    }
},
    { timestamps: true }
)


//hashing password before send it to DB
userSchema.pre("save", function (next) {
    const salt = bcrypt.genSaltSync(15);
    const hashedPass = bcrypt.hashSync(this.password, salt);
    this.password = hashedPass
    next()
})

userSchema.pre("update", function (next) {
    const salt = bcrypt.genSaltSync(15);
    const hashedPass = bcrypt.hashSync(this.password, salt);
    this.password = hashedPass
    next()
})


// Create User Collection 
const userModel = mongoose.model("User", userSchema)





module.exports = userModel