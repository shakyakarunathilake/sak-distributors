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

//Get grn data by grnnumber
router.get("/:grnnumber", (req, res, next) => {
    const id = req.params.grnnumber;

    GRN
        .findOne({ grnnumber: id })
        .exec()
        .then(doc => {

            const grn = {
                'grnnumber': doc.grnnumber,
                'ponumber': doc.ponumber,
                'supplier': doc.supplier,
                'status': doc.status,
                'requesteditems': doc.requesteditems,
                'pocreatedat': doc.pocreatedat,
                'pocreatedby': doc.pocreatedby,
                'createdat': doc.createdat,
                'createdby': doc.createdby,
                'grosstotal': doc.grosstotal,
                'receiveddiscounts': doc.receiveddiscounts,
                'damagedexpireditems': doc.damagedexpireditems,
                'total': doc.total,
                'grntotal': doc.grntotal,
            }

            console.log("GRN RECORDS: ", grn);

            res.status(200).json({
                message: "Handeling GET requests to /:grnnumber",
                grn: grn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })
})

module.exports = router;