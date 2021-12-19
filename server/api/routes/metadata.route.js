const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const MetaData = require("../models/metadata.model");

const formDataBody = multer();

router.get("/get-meta-data", (req, res, next) => {

    MetaData
        .find()
        .exec()
        .then(doc => {
            res.status(201).json({
                message: "Handeling GET requests to /get-meta-data",
                doc: doc,
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })
})

module.exports = router;
