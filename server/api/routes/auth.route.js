const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require('../config/auth.config');
const emailNotify = require("./email.notify");

const router = express.Router();

const Employee = require("../models/employee.model");

function changePassword(details) {
    const newpassword = details.onetimepassword;

    console.log("DETAILS: ", details);

    bcrypt.hash(newpassword.toString(), 10, (err, hash) => {
        if (err) {
            console.log(err);
        } else {
            Employee
                .findOneAndUpdate(
                    { email: details.email },
                    {
                        password: hash,
                        firsttimelogin: true
                    },
                    { new: true }
                )
                .exec()
                .then(

                    emailNotify.sendEmail({
                        "tomail": details.email,
                        "subject": "Instructions to reset your password",
                        "content": `Please use this one time password with your username to login to your account: ${details.onetimepassword}. 
                        Once you log in you will be redirected to change password page where you have to input above mentioned one time password as the current password.
                         Thank you.`,
                    })

                )
                .catch(err => {
                    console.log(err);
                });
        }
    });

}

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
                { expiresIn: 99999 }
            );

            res.status(200).json({
                auth_status: "AUTHORIZED",
                pathname: employee[0].designation.replace(/\s+/g, '-').toLowerCase(),
                employeeid: employee[0].employeeid,
                designation: employee[0].designation,
                firstname: employee[0].firstname,
                lastname: employee[0].lastname,
                email: employee[0].email,
                employeestatus: employee[0].employeestatus,
                employeeimage: employee[0].employeeimage,
                firsttimelogin: employee[0].firsttimelogin,
                contactnumber: employee[0].contactnumber,
                adminprivileges: employee[0].adminprivileges,
                analyticprivileges: employee[0].analyticprivileges,
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

            changePassword({
                onetimepassword: Math.floor(100000 + Math.random() * 900000),
                email: req.body.email,
            });

            return employee;
        })
        .then(employee => {

            res.status(200).json({
                type: "success",
                message: `Hi ${employee[0].firstname} ${employee[0].lastname}. The reset instruction has been sent to your email address. Have a nice day`
            })

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