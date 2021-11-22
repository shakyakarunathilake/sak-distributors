const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const GRN = require("../models/grn.model");

const formDataBody = multer();

//Checks whether the endpoint works
router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Handeling GET requests to /grn"
    });
});

//Get all table grn data
router.get("/get-all-grn-table-data", (req, res, next) => {

    GRN
        .find()
        .exec()
        .then(doc => {

            const tbody = doc.map(x => ({
                ponumber: x.ponumber,
                grnnumber: x.grnnumber,
                supplier: x.supplier,
                status: x.status,
            }))

            console.log("TBODY: ", tbody);

            res.status(201).json({
                message: "Handeling GET requests to /get-all-grn-table-data",
                tbody: tbody,
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })

})

module.exports = router;