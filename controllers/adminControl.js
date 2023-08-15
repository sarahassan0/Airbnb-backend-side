const express = require("express");
var bcrypt = require("bcrypt");
const adminModel = require("../models/Admin");
var jwt = require("jsonwebtoken")
require('dotenv').config();



exports.addAdmin = async (req, res, next) => {
    let newAdmin = req.body;
    try {
        let admin = await adminModel.create(newAdmin);
        var token = jwt.sign({
            data: { adminID: admin.id, email: admin.email }
        }, process.env.JWT_SECRET, { expiresIn: '29 days' });
        res.status(201).json({ admin, token })
    } catch (err) {
        res.status(400).json(`Unable to create Admin account . Error: ${err}`);
    }

}


exports.loginAdmin = async function (req, res, next) {
    const { email, password } = req.body;
    try {
        var admin = await adminModel.findOne({ email: email }).exec()
        if (admin) {
            var validpass = bcrypt.compareSync(password, admin.password);
            if (validpass) {
                var token = jwt.sign({
                    data: { adminID: admin.id, email: admin.email }
                }, process.env.JWT_SECRET, { expiresIn: '29 days' });
                res.status(200).json({ admin, token })
            } else {
                res.status(203).json("Cannot login. Incorrect email or password , try again")
            }
        } else {
            res.status(203).json("Cannot login. Incorrect email or password , try again");
        }
    } catch (err) {
        res.status(400).json(`Unable to login Admin. Error: ${err}`)

    }
}


exports.getAdmin = async (req, res, next) => {
    // const _id = req.params.id;
    try {
        if (req.adminID) {
            let admin = await adminModel.findById(req.adminID)
            res.status(200).json(admin);
        } else res.status(401).json('Unauthorized User')
    } catch (err) {
        res.status(420).json(`Cannot get Admin. Error: ${err}`);
    }
}



exports.updateAdmin = async (req, res, next) => {

    const _id = req.params.id;
    let updatedAdmin = req.body;
    let password = req.body.password
    try {
        admin = await adminModel.findById(_id);
        if (user) {
            if (admin.id == req.adminID) {
                if (password) {
                    const salt = bcrypt.genSaltSync(15);
                    const hashedPass = bcrypt.hashSync(password, salt);
                    updatedAdmin.password = hashedPass
                    await adminModel.findByIdAndUpdate(_id, updatedAdmin, {
                        runValidators: true,
                    });
                    res.status(200).json(`this Admin has been updated , also password updated`);
                } else {
                    await adminModel.findByIdAndUpdate(_id, updatedAdmin, {
                        runValidators: true,
                    });
                    res.status(200).json(`this Admin has been updated `);
                }
            } else res.status(401).json('Unauthorized Admin cannot edit Admin info')
        } else {
            res.status(203).json(`Please enter valid Admin ID`);
        }
    } catch (err) {
        res.status(400).json(`Cannot update Admin with ID ${_id}.Error: ${err} `);
    }
}





exports.deleteAdmin = async (req, res, next) => {
    const _id = req.params.id;
    try {
        let admin = await adminModel.findById(_id)
        if (admin) {
            if (admin.id == req.adminID) {
                admin = await adminModel.findByIdAndRemove(_id);
                res.status(200).json(`Admin with ID ${_id} has been deleted`);
            } else res.status(401).json('Unauthorized Admin')
        } else res.status(203).json(`Cannot find Admin with ID ${_id}. Enter valid ID`);
    } catch (err) {
        res.status(400).json(`Cannot delete Admin with ID ${_id}.Error: ${err} `);
    }
}