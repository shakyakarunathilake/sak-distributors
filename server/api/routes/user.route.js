const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../models/user.model");

router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            console.log(err);
        } else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                username: req.body.username,
                password: hash
            });

            user
                .save()
                .then(result => {
                    res.status(201).json({
                        message: "Handling POST requests to /signup, ***USER REGISTRATION COMPLETE***",
                        createdUser: result
                    })
                })
                .catch(err => {
                    console.log(err);
                })
        };
    });
});

router.post("/signin", (req, res, next) => {

    User
        .find({ username: req.body.username })
        .exec()
        .then(user => {
            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user[0].password
            );

            if (!passwordIsValid) {
                return res.status(401).json({
                    accessToken: null,
                    message: "Invalid Password"
                });
            }

            const token = jwt.sign(
                { username: user[0].username, role: "User" },
                "authconfig.secret",
                { expiresIn: 7200 }
            );

            res.status(200).json({
                auth_status: "AUTHORIZED",
                username: user[0].username,
                role: "User",
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