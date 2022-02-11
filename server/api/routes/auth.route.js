const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require('../config/auth.config');

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
                    designation: employee[0].designation,
                    firstname: employee[0].firstname,
                    lastname: employee[0].lastname,
                    email: employee[0].email,
                    employeeimage: employee[0].employeeimage,
                    contactnumber: employee[0].contactnumber
                },
                authConfig.secret,
                { expiresIn: 7200 }
            );

            res.status(200).json({
                auth_status: "AUTHORIZED",
                employeeid: employee[0].employeeid,
                designation: employee[0].designation,
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

//Forgot Password
router.post("/forgot-password", (req, res, next) => {
    Employee
        .find({ email: req.body.email })
        .exec()
        .then(employee => {
            res.status(200).json({
                type: "success",
                message: `Hi ${employee[0].firstname} ${employee[0].lastname}. The reset instruction has been sent to your email address. Have a nice day`
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                type: "error",
                message: "Server Error",
                "Error": err
            });
        })
});
module.exports = router;