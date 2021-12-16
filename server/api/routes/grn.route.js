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
                'ponumber': doc.ponumber,
                'status': doc.status,
                'grnnumber': doc.grnnumber,
                'supplier': doc.supplier,
                'createdat': doc.createdat,
                'createdby': doc.createdby,
                'total': doc.total,
                'grntotal': doc.total,
                'items': [
                    {
                        "freeqtycases": doc.items[0].freeqtycases,
                        "deliveredfreeqtycases": doc.items[0].freeqtycases,
                        "freeqtypieces": doc.items[0].freeqtypieces,
                        "deliveredfreeqtypieces": doc.items[0].freeqtypieces,
                        "damaged": 0,
                        "return": 0,
                        "description": doc.items[0].description,
                        "piecespercase": doc.items[0].piecespercase,
                        "listprice": doc.items[0].listprice,
                        "salesqtycases": doc.items[0].salesqtycases,
                        "deliveredsalesqtycases": doc.items[0].salesqtycases,
                        "value": doc.items[0].value,
                        "grnvalue": doc.items[0].value,
                        "salesqtypieces": doc.items[0].salesqtypieces,
                        "deliveredsalesqtypieces": doc.items[0].salesqtypieces,
                        "tableData": doc.items[0].tableData
                    }
                ]
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

//Update GRN by GRN Number
router.post("/update-by-grnnumber/:grnnumber", formDataBody.fields([]), (req, res, next) => {
    console.log("UPDATE: ", req.body);

    const items = JSON.parse(req.body.items);

    GRN
        .findOneAndUpdate(
            { "grnnumber": req.params.grnnumber },
            {
                '$set': {
                    'status': req.body.status,
                    'createdat': req.body.createdat,
                    'createdby': req.body.createdby,
                    'grntotal': req.body.grntotal,
                    'items': items,
                }
            },
            { upsert: true }
        )
        .exec()
        .then(doc => {
            res.status(200).json({
                message: "Handling POST requests to /grn/update-by-id/:grnnumber, GRN UPDATED",
                type: 'success',
                alert: `${doc.grnnumber} updated`,
            });
        })
        .catch(err => {
            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not update grn`,
            });
            console.log(err);
        });
});

module.exports = router;