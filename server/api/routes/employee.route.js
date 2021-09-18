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

//Get Next Registration Number
router.get("/get-next-regno", (req, res, next) => {

    function pad(num, size) {
        while (num.length < size) num = "0" + num;
        return "E" + num;
    }

    Employee
        .find({}, { employeeid: 1, _id: 0 })
        .exec()
        .then(doc => {
            const employeeidarray = doc.map(x => {
                return parseInt(x.employeeid.slice(1))
            })

            const nextemployeeid = pad(String(Math.max(...employeeidarray) + 1), 5);

            res.status(200).json({
                message: "Handeling GET requests to /get-next-regno",
                doc: nextemployeeid
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })

})


//Create an employee
router.post("/create-employee", uploads.single('employeeimage'), (req, res, next) => {

    const dob = new Date(req.body.dob);
    const hireddate = new Date(req.body.hireddate);

    const employee = new Employee({
        _id: new mongoose.Types.ObjectId(),
        employeeid: req.body.employeeid,
        employeeimage: `localhost:8080/${req.body.employeeid}.jpg`,
        fullname: req.body.fullname,
        title: req.body.title,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        dob: dob.toISOString().split('T')[0],
        hireddate: hireddate.toISOString().split('T')[0],
        address: req.body.address,
        nic: req.body.nic,
        gender: req.body.gender,
        contactnumber: req.body.contactnumber,
        designation: req.body.designation,
        civilstatus: req.body.civilstatus,
        employeestatus: req.body.employeestatus,
        password: req.body.password, //Development Stage
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
                { id: "employeeid", label: "Emp. ID" },
                // { id: "fullname", label: "Full Name" },
                { id: "title", label: "Title" },
                { id: "name", label: "Name" },
                // { id: "firstname", label: "First Name" },
                // { id: "lastname", label: "Last Name" },
                // { id: "nic", label: "NIC" },
                { id: "designation", label: "Designation" },
                { id: "employeestatus", label: "Status" },
                { id: "hireddate", label: "Hired Date" },
                // { id: "contactnumber", label: "Contact Number" },
                // { id: "email", label: "Email" },
                // { id: "address", label: "Address" },
                // { id: "dob", label: "DOB" },
                // { id: "gender", label: "Gender" },
                // { id: "civilstatus", label: "Civil Status" }
            ]

            const tbody = doc.map(x => [
                { id: "employeeid", label: x.employeeid },
                // { id: "fullname", label: x.fullname },
                { id: "title", label: x.title },
                { id: "name", label: x.firstname + " " + x.lastname },
                // { id: "firstname", label: x.firstname },
                // { id: "lastname", label: x.lastname },
                //  { id: "nic", label: x.nic },
                { id: "designation", label: x.designation },
                { id: "employeestatus", label: x.employeestatus },
                { id: "hireddate", label: x.hireddate },
                // { id: "contactnumber", label: x.contactnumber },
                // { id: "email", label: x.email },
                // { id: "address", label: x.address },
                // { id: "dob", label: x.dob },
                // { id: "gender", label: x.gender },
                // { id: "civilstatus", label: x.civilstatus }
            ])

            res.status(200).json({
                thead: thead,
                tbody: tbody,
                defaultkey: 0,
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        });
});

//Get employee data by Employee ID
router.get("/:employeeid", (req, res, next) => {
    const id = req.params.employeeid;

    Employee
        .findOne({ employeeid: id })
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        });
});

//Update employee data by Employee ID
router.put("/update-by-id/:employeeid", (req, res, next) => {
    const id = req.params.employeeid;
    const update = req.body;

    Employee
        .findOneAndUpdate({ employeeid: id }, update, { new: true })
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        });
});

module.exports = router;