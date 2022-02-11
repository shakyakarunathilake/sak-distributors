const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailNotify = require("./email.notify");

const router = express.Router();

const Employee = require("../models/employee.model");

//change-password
router.put("/change-password/", (req, res, next) => {
    const newpassword = req.body.newpassword;

    Employee
        .find({ employeeid: req.body.employeeid })
        .exec()
        .then(employee => {

            bcrypt.compare(`${req.body.currentpassword}`, employee[0].password, function (err, isMatch) {
                if (err) {
                    console.log(err);
                } else if (!isMatch) {
                    return res.status(200).json({
                        type: "error",
                        message: "Current Password Incorrect"
                    });
                } else {
                    bcrypt.hash(newpassword.toString(), 10, (err, hash) => {
                        if (err) {
                            console.log(err);
                        } else {
                            Employee
                                .findOneAndUpdate({ employeeid: req.body.employeeid }, { password: hash, firsttimelogin: req.body.firsttimelogin }, { new: true })
                                .exec()
                                .then(doc => {

                                    emailNotify.sendEmail({
                                        "tomail": doc.email,
                                        "subject": "Change Password",
                                        "content": `This email is an auto generated email to inform you that your password to SAK Distributors Site has been changed. Thank you.`,
                                    })

                                    res.status(200).json({
                                        type: "success",
                                        message: "Password Changed"
                                    });
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.status(500).json({
                                        type: "error",
                                        message: "Server Error"
                                    });
                                });
                        }
                    });
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                type: "error",
                message: "Server Error",
                "Error": err
            });
        });
});

//Forgot Password
router.post("/forgot-password", (req, res, next) => {

    Employee
        .find({ email: req.body.email })
        .exec()
        .then(employee => {

            emailNotify.sendEmail({
                "tomail": employee[0].email,
                "subject": "Instructions to reset your password",
                "content": `Please use this one time password with your username to login to your account`,
            })

            return employee;
        })
        .then(employee =>

            res.status(200).json({
                type: "success",
                message: `Hi ${employee[0].firstname} ${employee[0].lastname}. The reset instruction has been sent to your email address. Have a nice day`
            })

        )
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