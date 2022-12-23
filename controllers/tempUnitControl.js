const TempUnitModel = require('../models/TempUnit');
require('dotenv').config();
const adminModel = require("../models/Admin");
const userModel = require("../models/User");


exports.addTemp = async (req, res, next) => {
    let newTemp = req.body;
    console.log(newTemp);
    try {
        if (req.userID) {
            let user = await userModel.findById(req.userID)
            if (user) {
                let temp = await TempUnitModel.create(newTemp);
                res.status(201).json(temp)
            } else res.status(401).json('Unauthorized User')
        }
    } catch (err) {
        res.status(400).json(`Unable to create Temp Unit . Error: ${err}`);
    }

}


exports.getAllTemps = async (req, res, next) => {
    console.log(55);
    try {
        if (req.adminID) {
            let admin = await adminModel.findById(req.adminID)
            if (admin) {
                let temps = await TempUnitModel.find().populate('host')
                res.status(200).json(temps);
            } else res.status(401).json('Unauthorized Admin')
        } else res.status(401).json('Unauthorized Admin')
    } catch (err) {
        res.status(420).json(`Cannot get Temp Units. Error: ${err}`);
    }
}


exports.getTemp = async (req, res, next) => {
    const _id = req.params.id;
    try {
        let temp = await TempUnitModel.findById(_id).populate('host')
        console.log(temp);
        if (temp) {
            let admin = await adminModel.findById(req.adminID)
            if (admin) {
                console.log(3333);
                res.status(200).json(temp)
            } else res.status(401).json('Unauthorized Admin')
        } else res.status(203).json(`Cannot find Temp Unit with ID ${_id}. Enter valid ID`);
    } catch (err) {
        console.log(2222);
        res.status(420).json(`Cannot get User with ID ${_id}. Error: ${err}`);
    }
}



exports.deleteTemp = async (req, res, next) => {
    const _id = req.params.id;
    try {
        let temp = await TempUnitModel.findById(_id)
        if (temp) {
            if (req.adminID) {
                let admin = await adminModel.findById(req.adminID)
                if (admin) {
                    await TempUnitModel.findByIdAndDelete(_id)
                    res.status(200).json('User has been deleted');
                } else res.status(401).json('Unauthorized Admin')
            } else res.status(401).json('Unauthorized Admin')
        } else res.status(203).json(`Cannot find Temp Unit with ID ${_id}. Enter valid ID`);
    } catch (err) {
        res.status(400).json(`Cannot deleteTemp Unit with ID ${_id}.Error: ${err} `);
    }
}