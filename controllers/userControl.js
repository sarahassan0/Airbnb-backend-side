const express = require("express");
var bcrypt = require("bcrypt");
const userModel = require("../models/User");
var jwt = require("jsonwebtoken")
require('dotenv').config();
const adminModel = require("../models/Admin");



exports.addUser = async (req, res, next) => {
    let newUser = req.body;
    try {
        let user = await userModel.create(newUser);
        var token = jwt.sign({
            data: { userID: user.id, email: user.email, host: user.isHost }
        }, process.env.JWT_SECRET, { expiresIn: '29 days' });
        res.status(201).json({ user, token })
    } catch (err) {
        res.status(400).json(`Unable to create User account . Error: ${err}`);
    }

}


exports.loginUser = async function (req, res, next) {
    const { email, password } = req.body;
    try {
        var user = await userModel.findOne({ email: email }).exec()
        if (user) {
            var validpass = bcrypt.compareSync(password, user.password);
            if (validpass) {
                var token = jwt.sign({
                    data: { userID: user.id, email: user.email, host: user.isHost }
                }, process.env.JWT_SECRET, { expiresIn: '29 days' });
                res.status(200).json({ user, token })
            } else {
                res.status(203).json("Cannot login. Incorrect email or password , try again")
            }
        } else {
            res.status(203).json("Cannot login. Incorrect email or password , try again");
        }
    } catch (err) {
        res.status(400).json(`Unable to login User. Error: ${err}`)

    }
}




exports.getAllUsers = async (req, res, next) => {
    try {
        if (req.adminID) {
            let admin = await adminModel.findById(req.adminID)
            if (admin) {
                let users = await userModel.find()
                res.status(200).json(users);
            } else res.status(401).json('Unauthorized Admin')
        } else res.status(401).json('Unauthorized Admin')
    } catch (err) {
        res.status(420).json(`Cannot get Users. Error: ${err}`);
    }
}


exports.getUser = async (req, res, next) => {
    // const _id = req.params.id;
    try {
        if (req.userID) {
            let user = await userModel.findById(req.userID)   //.populate('orders');
            res.status(200).json(user);
        } else res.status(401).json('Unauthorized User')
    } catch (err) {
        res.status(420).json(`Cannot get User with ID ${_id}. Error: ${err}`);
    }
}



exports.updateUser = async (req, res, next) => {

    const _id = req.params.id;
    let updatedUser = req.body;
    let password = req.body.password
    try {
        user = await userModel.findById(_id);
        if (user) {
            if (user.id == req.userID) {
                if (password) {
                    const salt = bcrypt.genSaltSync(15);
                    const hashedPass = bcrypt.hashSync(password, salt);
                    updatedUser.password = hashedPass
                    await userModel.findByIdAndUpdate(_id, updatedUser, {
                        runValidators: true,
                    });
                    res.status(200).json(`this User has been updated , also password updated`);
                } else {
                    await userModel.findByIdAndUpdate(_id, updatedUser, {
                        runValidators: true,
                    });
                    res.status(200).json(`this User has been updated `);
                }
            } else res.status(401).json('Unauthorized User cannot edit User info')
        } else {
            res.status(203).json(`Please enter valid User ID`);
        }
    } catch (err) {
        res.status(400).json(`Cannot update User with ID ${_id}.Error: ${err} `);
    }
}





exports.deleteUser = async (req, res, next) => {
    const _id = req.params.id;
    try {
        let user = await userModel.findById(_id)
        if (user) {
            if (req.adminID) {
                let admin = await adminModel.findById(req.adminID)
                if (admin) {
                    let users = await userModel.findByIdAndDelete(_id)
                    res.status(200).json('User has been deleted');
                } else res.status(401).json('Unauthorized Admin')
            } else res.status(401).json('Unauthorized Admin')
        } else res.status(203).json(`Cannot find User with ID ${_id}. Enter valid ID`);
    } catch (err) {
        res.status(400).json(`Cannot delete User with ID ${_id}.Error: ${err} `);
    }
}