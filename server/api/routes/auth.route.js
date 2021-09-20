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
                return res.status(401).json({
                    accessToken: null,
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
                },
                "authconfig.secret",
                { expiresIn: 7200 }
            );

            res.status(200).json({
                auth_status: "AUTHORIZED",
                username: employee[0].username,
                role: employee[0].designation,
                firsttimelogin: employee[0].firsttimelogin,
                accessToken: token
            });
        })
        .catch(err => {

            console.log("Invalid Username");

            return res.status(401).json({
                accessToken: null,
                message: "Invalid Username"
            })
        })
});

module.exports = router;