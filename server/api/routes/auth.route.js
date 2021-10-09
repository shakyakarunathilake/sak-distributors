const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

const Employee = require("../models/employee.model");

//Sign in
router.post("/signin", (req, res, next) => {

    Employee
        .find({ employeeid: req.body.username })
        .exec()
        .then(employee => {

            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                employee[0].password
            );

            if (!passwordIsValid) {
                return res.status(200).json({
                    accessToken: null,
                    type: 'error',
                    message: "Invalid Password"
                });
            }

            const token = jwt.sign(
                {
                    username: employee[0].employeeid,
                    role: employee[0].designation,
                    firstname: employee[0].firstname,
                    lastname: employee[0].lastname,
                    email: employee[0].email,
                    employeeimage: employee[0].employeeimage,
                    contactnumber: employee[0].contactnumber
                },
                "authconfig.secret",
                { expiresIn: 7200 }
            );

            res.status(200).json({
                auth_status: "AUTHORIZED",
                employeeid: employee[0].employeeid,
                role: employee[0].designation,
                firstname: employee[0].firstname,
                lastname: employee[0].lastname,
                email: employee[0].email,
                employeestatus: employee[0].employeestatus,
                employeeimage: employee[0].employeeimage,
                firsttimelogin: employee[0].firsttimelogin,
                contactnumber: employee[0].contactnumber,
                accessToken: token
            });
        })
        .catch(err => {

            console.log("Invalid Employee Id"); //Development Stage

            return res.status(200).json({
                accessToken: null,
                type: 'error',
                message: "Invalid Username"
            })
        })
});

module.exports = router;