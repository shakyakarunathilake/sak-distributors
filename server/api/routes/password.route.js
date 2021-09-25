const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

const Employee = require("../models/employee.model");

//change-password
router.put("/change-password/:employeeid", (req, res, next) => {
    const newpassword = req.body.newpassword;

    Employee
        .find({ employeeid: req.params.employeeid })
        .exec()
        .then(employee => {

            bcrypt.compare(`${req.body.currentpassword}`, employee[0].password, function (err, isMatch) {
                if (err) {
                    console.log(err);
                } else if (!isMatch) {
                    return res.status(401).json({
                        type: "error",
                        message: "Authorization failed"
                    });
                } else {
                    bcrypt.hash(newpassword.toString(), 10, (err, hash) => {
                        if (err) {
                            console.log(err);
                        } else {
                            Employee
                                .findOneAndUpdate({ employeeid: req.params.employeeid }, { password: hash, firsttimelogin: req.body.firsttimelogin }, { new: true })
                                .exec()
                                .then(doc => {
                                    console.log(doc);
                                    res.status(200).json({
                                        type: "success",
                                        message: "Password updated"
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