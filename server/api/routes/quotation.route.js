const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const multer = require("multer");  /* For images */

const Quotation = require("../models/quotation.model");

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './quotations');
    },
    filename: function (req, file, callback) {
        callback(null, req.body.quotationid + ".jpg");
    }
});

const quotations = multer({ storage: storage });

//Checks whether the endpoint works
router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Handeling GET requests to /quotations"
    });
});

//Get Next Quotation ID
router.get("/get-next-quotationid", (req, res, next) => {

    function pad(num, size) {
        while (num.length < size) num = "0" + num;
        return "Q" + num;
    }

    Quotation
        .find({}, { quotationid: 1, _id: 0 })
        .exec()
        .then(doc => {
            const quotationidarray = doc.map(x => {
                return parseInt(x.quotationid.slice(1))
            })

            const nextquotationid = pad(String(Math.max(...quotationidarray) + 1), 5);

            res.status(200).json({
                message: "Handeling GET requests to /get-next-quotationid",
                nextquotationid: nextquotationid
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })

})

//Create an quotation
router.post("/create-quotation", quotations.single('quotationfile'), (req, res, next) => {

    quotation
        .save()
        .then(result => {

            res.status(201).json({
                message: "Handling POST requests to /quotations/create-quotation, QUOTATION SAVED",
                type: 'success',
                alert: `${result.quotationid} saved`,
            });
        })
        .catch(err => {
            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not add quotation`,
            });
            console.log("Error: ", err)
        })
});

module.exports = router;