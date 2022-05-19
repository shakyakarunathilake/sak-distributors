const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const path = require("path");

const multer = require("multer");  /* For images */

const Quotation = require("../models/quotation.model");

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './api/routes/quotations');
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
router.get("/get-all-quotation-table-data", (req, res, next) => {

    Quotation
        .find()
        .exec()
        .then(doc => {

            const tbody = doc.slice(0).reverse().map(x => ({
                "quotationid": x.quotationid,
                "supplier": x.supplier,
                "validityperiod": x.validityperiod,
                "issuingdate": x.issuingdate,
                "enddate": x.enddate,
            }))

            res.status(200).json({
                message: "Handeling GET requests to /get-all-quotation-table-data",
                tbody: tbody,
                defaultkey: 0,
            });
        })
        .catch(err => {
            console.log("Error: ", err)
            res.status(500).json({ "Error": err });
        });
});

//Get Next Quotation ID
router.get("/get-next-quotationid", (req, res, next) => {

    Quotation
        .find(
            {},
            {
                quotationid: 1,
                _id: 0
            }
        )
        .sort({
            quotationid: 'desc'
        })
        .exec()
        .then(doc => {

            let postfix = "00001";

            if (doc.length && doc.length > 0) {
                const firstelementnumber = doc[0].quotationid.substring(1, 6);
                postfix = parseInt(firstelementnumber) + 1;
            }

            const nextquotationid = 'Q' + postfix.toString().padStart(5, '0');

            res.status(200).json({
                message: "Handeling GET requests to /get-next-quotationid",
                nextquotationid: nextquotationid
            });
        })
        .catch(err => {
            console.log("Error: ", err)
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
            console.log("Error: ", err)
            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not add quotation`,
            });
        })
});

//Get active quotation data
router.get("/get-all-active-quotation-data", (req, res, next) => {

    const today = new Date();

    const date = today.getFullYear() + '-' +
        (today.getMonth() > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`) + '-' +
        (today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`);

    Quotation
        .find({ "issuingdate": { $lte: date }, "enddate": { $gte: date } })
        .exec()
        .then(doc => {

            const quotationOptions = doc.slice(0).reverse().map(x => ({
                "id": x.quotationid,
                "title": `${x.quotationid} ( ${x.supplier} )`,
            }))

            res.status(200).json({
                message: "Handeling GET requests to /get-all-active-quotation-data",
                quotationOptions: quotationOptions,
            });
        })
        .catch(err => {
            console.log("Error: ", err)
            res.status(500).json({ "Error": err });
        });
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

        })
        .catch(err => {
            console.log("Error: ", err)
            res.status(500).json({ "Error ": err });
        })
})

router.get("/xlsx-file/:quotationid", (req, res, next) => {

    const quotationid = req.params.quotationid;

    var options = {
        root: path.join(__dirname)
    };

    res.sendFile(`/quotations/${quotationid}.xlsx`, options, function (err) {
        if (err) {
            console.log("Error: ", err)
        } else {
            console.log('Sent:', `${quotationid}.xlsx`);
        }
    });

})

module.exports = router;