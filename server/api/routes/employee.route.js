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

    console.log(req.body);
    
    const dob = new Date(req.body.dob).toISOString().split('T')[0];
    const hireddate = new Date(req.body.hireddate).toISOString().split('T')[0];

    if (!req.body.employeestatus === "Limited Access") {
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
                    admin: req.body.adminprivileges,
                    fullname: req.body.fullname,
                    title: req.body.title,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    dob: dob,
                    hireddate: hireddate,
                    hiredby: req.body.hiredby,
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
                        // notifyEmail.notifyCreateEmployee({
                        //     firstname: result.firstname,
                        //     lastname: result.lastname,
                        //     designation: result.designation,
                        //     username: result.employeeid,
                        //     password: firstpassword
                        // });
                        console.log("Employee Created");
                        res.status(201).json({
                            message: "Handling POST requests to /employees/create-employee, EMPLOYEE SAVED",
                            type: 'success',
                            alert: `${result.firstname} ${result.lastname} added`,
                            addedEmployee: result
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
    } else {
        const employee = new Employee({
            _id: new mongoose.Types.ObjectId(),
            employeeid: req.body.employeeid,
            employeeimage: `localhost:8080/${req.body.employeeid}.jpg`,
            admin: req.body.adminprivileges,
            fullname: req.body.fullname,
            title: req.body.title,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            dob: dob,
            hireddate: hireddate,
            hiredby: req.body.hiredby,
            address: req.body.address,
            nic: req.body.nic,
            gender: req.body.gender,
            contactnumber: req.body.contactnumber,
            designation: req.body.designation,
            civilstatus: req.body.civilstatus,
            employeestatus: req.body.employeestatus,
        });

        employee
            .save()
            .then(result => {
                console.log("Employee Created");
                res.status(201).json({
                    message: "Handling POST requests to /employees/create-employee, EMPLOYEE SAVED",
                    type: 'success',
                    alert: `${result.firstname} ${result.lastname} added`,
                    addedEmployee: result
                });
            })
            .catch(err => {
                res.status(200).json({
                    type: 'error',
                    alert: `Something went wrong. Could not add employee`,
                });
                console.log("Error: ", err)
            })
    }
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

            const tbody = doc.map(x => ({
                "employeeid": x.employeeid,
                "title": x.title,
                "name": x.firstname + " " + x.lastname,
                "designation": x.designation,
                "status": x.employeestatus,
                "hireddate": x.hireddate,
            }))

            console.log("TBODY: ", tbody);

            res.status(200).json({
                message: "Handeling GET requests to /get-all-employees-table-data",
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

            const employee = {
                'employeeid': doc.employeeid,
                'employeeimage': doc.employeeimage,
                'adminprivileges': doc.adminprivileges,
                'fullname': doc.fullname,
                'title': doc.title,
                'firstname': doc.firstname,
                'lastname': doc.lastname,
                'email': doc.email,
                'dob': doc.dob,
                'hireddate': doc.hireddate,
                "address": doc.address,
                "nic": doc.nic,
                "gender": doc.gender,
                "contactnumber": doc.contactnumber,
                "designation": doc.designation,
                "civilstatus": doc.civilstatus,
                "employeestatus": doc.employeestatus,
                "hiredby": doc.hiredby,
            };

            res.status(200).json({
                message: "Handeling GET requests to /:employeeid",
                employee: employee
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        });
});

//Update employee data by Employee ID
router.post("/update-by-id/:employeeid", uploads.single('employeeimage'), (req, res, next) => {
    console.log("UPDATE: ", req.body);
    // formDataBody.fields([])
    Employee
        .findOneAndUpdate({ employeeid: req.params.employeeid }, req.body, { new: true })
        .exec()
        .then(doc => {
            res.status(200).json({
                message: "Handling POST requests to /employees/update-by-id/:employeeid, EMPLOYEE UPDATED",
                type: 'success',
                alert: `${doc.firstname} ${doc.lastname} updated`,
                updatedEmployee: doc
            });
        })
        .catch(err => {
            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not update employee`,
            });
            console.log(err);
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