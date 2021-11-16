const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const formDataBody = multer();

const Employee = require("../models/employee.model");

//Checks whether the endpoint works
router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Handeling GET requests to /admin"
    });
});

//Get all table admin data
router.get("/get-all-admin-table-data", (req, res, next) => {

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

            const data = doc.filter(x => x.adminprivileges === true);

            const tbody = data.map(x => ({
                "employeeid": x.employeeid,
                "title": x.title,
                "name": x.firstname + " " + x.lastname,
                "designation": x.designation,
                "status": x.employeestatus,
                "hireddate": x.hireddate,
            }))

            console.log("TBODY: ", tbody);

            res.status(200).json({
                message: "Handeling GET requests to /get-all-admin-table-data",
                tbody: tbody,
                defaultkey: 0,
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        });
});


//Update employee admin privileges by Employee ID
router.post("/add-admin", formDataBody.fields([]), (req, res, next) => {
    console.log("UPDATE: ", req.body);

    Employee
        .findOneAndUpdate(
            { "employeeid": req.body.employeeid },
            {
                '$set': {
                    'adminprivileges': req.body.adminprivileges,
                }
            },
            { upsert: true }
        )
        .exec()
        .then(doc => {
            res.status(200).json({
                message: "Handling POST requests to /employees/add-admin/:employeeid, ADMIN ADDED",
                type: 'success',
                alert: `${doc.firstname} ${doc.lastname} added`,
            });
        })
        .catch(err => {
            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not add admin`,
            });
            console.log(err);
        });
});

module.exports = router;