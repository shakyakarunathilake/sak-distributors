const express = require("express");
const { response } = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");  /* For images */

const Employee = require("../models/employees.model");

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, req.body.employeeid + ".jpg");
    }
});

const uploads = multer({ storage: storage });

router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Handeling GET requests to /employees",
        info: "This is information about SAK Distributors' Employees"
    });
});

router.post("/create-employee", uploads.single('photo'), (req, res, next) => {

    const employee = new Employee({
        _id: new mongoose.Types.ObjectId(),
        employeeid: req.body.employeeid,
        employeeimage: `localhost:8080/${req.body.employeeid}.jpg`,
        fullname: req.body.fullname,
        callingname: req.body.callingname,
        dob: req.body.dob,
        age: req.body.age,
        address: req.body.address,
        nic: req.body.nic,
        gender: req.body.gender,
        mobilenumber: req.body.mobilenumber,
        telephonenumber: req.body.telephonenumber,
        designation: req.body.designation,
        civilstatus: req.body.civilstatus,
        employeestatus: req.body.employeestatus
    });

    employee
        .save()
        .then(result => {
            res.status(201).json({
                message: "Handeling POST requests to /employees/create-employee",
                addedEmployee: result
            });
        })
        .catch(err => {
            console.log("Error: ", err)
        })
});

router.get("/:employeeId", (req, res, next) => {
    const id = req.params.employeeId;

    Employee
        .findById(id)
        .exec()
        .then(doc => {
            console.log(doc)
            res.status(200).json(doc)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ "Error": err })
        })
});

module.exports = router;