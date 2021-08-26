const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");  /* For images */

const Employee = require("../models/employee.model");

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, req.body.employeeid + ".jpg");
    }
});

const uploads = multer({ storage: storage });

//Checks whether the endpoint works
router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Handeling GET requests to /employees"
    });
});

//Create an employee
router.post("/create-employee", uploads.single('photo'), (req, res, next) => {

    const employee = new Employee({
        _id: new mongoose.Types.ObjectId(),
        employeeid: req.body.employeeid,
        // employeeimage: `localhost:8080/${req.body.employeeid}.jpg`,
        fullname: req.body.fullname,
        title: req.body.title,
        callingname: req.body.callingname,
        email: req.body.email,
        dob: req.body.dob,
        hireddate: req.body.hireddate,
        address: req.body.address,
        nic: req.body.nic,
        gender: req.body.gender,
        telephonenumber: req.body.telephonenumber,
        mobilenumber: req.body.mobilenumber,
        designation: req.body.designation,
        civilstatus: req.body.civilstatus,
        employeestatus: req.body.employeestatus
    });

    employee
        .save()
        .then(result => {
            res.status(201).json({
                message: "Handling POST requests to /employees/create-employee, EMPLOYEE SAVED",
                addedEmployee: result
            });
        })
        .catch(err => {
            console.log("Error: ", err)
        })
});

//Get all employee data
router.get("/get-all-employees", (req, res, next) => {

    Employee
        .find()
        .exec()
        .then(doc => {
            const thead = [
                "Emp. ID",
                "Full Name",
                "Title",
                "Calling Name",
                "Hired Date",
                "Designation",
                "Status",
                "NIC",
                "Address",
                "Telephone Number",
                "Mobile Number",
                "Email",
                "DOB",
                "Gender",
                "Civil Status",
                "Action"
            ]

            const tbody = doc.map(x => [
                x.employeeid,
                x.fullname,
                x.title,
                x.callingname,
                x.hireddate,
                x.designation,
                x.employeestatus,
                x.nic,
                x.address,
                x.telephonenumber,
                x.mobilenumber,
                x.email,
                x.dob,
                x.gender,
                x.civilstatus,
            ])
            res.status(200).json({ thead: thead, tbody: tbody, })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ "Error": err })
        })
});


//Get employee data by Employee ID
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