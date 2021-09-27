const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const bcrypt = require("bcrypt"); /* For Passwords */

const multer = require("multer");  /* For images */

const notifyEmail = require("../services/notifyEmail");
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
                nextemployeeid: nextemployeeid
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })

})

//Create an employee
router.post("/create-employee", uploads.single('employeeimage'), (req, res, next) => {

    const dob = new Date(req.body.dob).toISOString().split('T')[0];
    const hireddate = new Date(req.body.hireddate).toISOString().split('T')[0];

    var nic = req.body.nic;
    var firstpassword = "";

    if (nic.slice(-1) == "v") {
        firstpassword = nic.substring(7, 11) + "-" + dob;
    } else {
        firstpassword = nic.substring(8, 12) + "-" + dob;
    }

    bcrypt.hash(firstpassword, 10, (err, hash) => {
        if (err) {
            console.log(err);
        } else {
            const employee = new Employee({
                _id: new mongoose.Types.ObjectId(),
                employeeid: req.body.employeeid,
                employeeimage: `localhost:8080/${req.body.employeeid}.jpg`,
                fullname: req.body.fullname,
                title: req.body.title,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                dob: dob,
                hireddate: hireddate,
                address: req.body.address,
                nic: req.body.nic,
                gender: req.body.gender,
                contactnumber: req.body.contactnumber,
                designation: req.body.designation,
                civilstatus: req.body.civilstatus,
                employeestatus: req.body.employeestatus,
                firsttimelogin: true,
                password: hash, //Development Stage
            });

            employee
                .save()
                .then(result => {
                    res.status(201).json({
                        message: "Handling POST requests to /employees/create-employee, EMPLOYEE SAVED",
                        type: 'success',
                        alert: `${result.firstname} ${result.lastname} added`,
                        addedEmployee: result
                    });
                    notifyEmail.notifyCreateEmployee({
                        firstname: result.firstname,
                        lastname: result.lastname,
                        designation: result.designation,
                        username: result.employeeid,
                        password: firstpassword
                    });
                })
                .catch(err => {
                    res.status(200).json({
                        type: 'error',
                        alert: `Something went wrong. Could not add employee`,
                    });
                    console.log("Error: ", err)
                })
        };
    });

});

//Get all table employee data
router.get("/get-all-employees-table-data", (req, res, next) => {

    Employee
        .find()
        .exec()
        .then(doc => {
            const thead = [
                "Emp. ID",
                "Title",
                "Name",
                "Designation",
                "Status",
                "Hired Date",
            ]

            const tbody = doc.map(x => [
                x.employeeid,
                x.title,
                x.firstname + " " + x.lastname,
                x.designation,
                x.employeestatus,
                x.hireddate,
            ])

            res.status(200).json({
                message: "Handeling GET requests to /get-all-employees-table-data",
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
            res.status(200).json({
                message: "Handeling GET requests to /:employeeid",
                employee: doc
            });
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
            res.status(200).json({
                message: "Handeling PUT requests to /update-by-id",
                employee: doc,
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        });
});

router.post("/check-notify-email", (req, res, next) => {
    notifyEmail.notifyCreateEmployee({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        designation: req.body.designation,
        username: req.body.employeeid,
        password: 2222
    });
})

module.exports = router;