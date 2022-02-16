const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const path = require("path");

const multer = require("multer");  /* For images */

const Quotation = require("../models/quotation.model");

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './quotations');
    },
    filename: function (req, file, callback) {
        callback(null, req.body.quotationid + ".xlsx");
    }
});

const quotations = multer({ storage: storage });

//Checks whether the endpoint works
router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Handeling GET requests to /quotations"
    });
});

//Get all table quotation data
router.get("/get-all-quotations-table-data", (req, res, next) => {

    Quotation
        .find()
        .exec()
        .then(doc => {

            const tbody = doc.map(x => ({
                "quotationid": x.quotationid,
                "supplier": x.supplier,
                "validityperiod": x.validityperiod,
                "issuingdate": x.issuingdate,
                "enddate": x.enddate,
            }))

            console.log("TBODY: ", tbody);

            res.status(200).json({
                message: "Handeling GET requests to /get-all-quotations-table-data",
                tbody: tbody,
                defaultkey: 0,
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
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

            let nextquotationid = 'Q00001';

            if (doc.length !== 0) {
                const quotationidarray = doc.map(x => {
                    return parseInt(x.quotationid.slice(1))
                })

                nextquotationid = pad(String(Math.max(...quotationidarray) + 1), 5);
            }

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

//Create quotation
router.post("/create-quotation", quotations.single('quotationfile'), (req, res, next) => {

    const quotation = new Quotation({
        _id: new mongoose.Types.ObjectId(),
        quotationid: req.body.quotationid,
        supplier: req.body.supplier,
        validityperiod: req.body.validityperiod,
        issuingdate: req.body.issuingdate,
        enddate: req.body.enddate,
        quotationfile: `${req.body.quotationid}.xlsx`,
    });

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


//Get quotation by quotationid
router.get("/:quotationid", (req, res, next) => {
    const quotationid = req.params.quotationid;

    Quotation
        .findOne({ "quotationid": quotationid })
        .exec()
        .then(doc => {

            const quotation = {
                "quotationid": doc.quotationid,
                "supplier": doc.supplier,
                "validityperiod": doc.validityperiod,
                "issuingdate": doc.issuingdate,
                "enddate": doc.enddate,
            };

            res.status(200).json({
                message: "Handeling GET requests to /:quotationid",
                quotation: quotation
            });

            next()

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error ": err });
        })
})

router.get("/xlsx-file/:quotationid", (req, res, next) => {
    const quotationid = req.params.quotationid;

    Quotation
        .findOne({ "quotationid": quotationid })
        .exec()
        .then(doc => {
            res.attachment(path.resolve(`../../quotations/${doc.quotationfile}`))
            res.send()

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error ": err });
        })
})

module.exports = router;