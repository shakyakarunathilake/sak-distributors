const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const MetaData = require("../models/metadata.model")
const PurchaseOrder = require("../models/purchaseorder.model");
const GRN = require("../models/grn.model");
const Store = require("../models/store.model");

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
                'damagedmissingitems': doc.damagedmissingitems,
                'grntotal': doc.total,
                'items': doc.items
            }

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
router.post("/create-grnnumber/:grnnumber", formDataBody.fields([]), (req, res, next) => {

    const items = JSON.parse(req.body.items);

    GRN
        .findOneAndUpdate(
            { "grnnumber": req.params.grnnumber },
            {
                '$set': {
                    'createdat': req.body.createdat,
                    'createdby': req.body.createdby,
                    'status': req.body.status,
                    'items': items,
                    'grntotal': req.body.grntotal,
                    'damagedmissingitems': req.body.damagedmissingitems,
                }
            },
            { upsert: true }
        )
        .exec()
        .then(doc => {

            PurchaseOrder
                .findOneAndUpdate(
                    { "ponumber": doc.ponumber },
                    {
                        '$set': {
                            'status': 'Delivered',
                        }
                    },
                    { upsert: true }
                )
                .exec()
                .then(doc => {
                    console.log("******** GRN STATUS DELIVERED AND PURCHASE ORDER UPDATED ********");
                })
                .catch(err => {
                    console.log("******** GRN STATUS DELIVERED AND PURCHASE ORDER UPDATED ERROR!!!!! ********");
                    console.log(err);

                    res.status(200).json({
                        type: 'error',
                        alert: `Something went wrong. Could not update relevant Purchase Order `,
                    });
                });

            return doc;

        })
        .then(doc => {

            MetaData
                .findOneAndUpdate(
                    {},
                    {
                        $pull: {
                            'noofawaitinggrn': {
                                'ponumber': doc.ponumber
                            }
                        }
                    },
                    { upsert: true }
                )
                .exec()
                .then(doc => {
                    console.log("******** GRN STATUS DELIVERED AND META DATA ADDED ********");
                })
                .catch(err => {
                    console.log("******** GRN STATUS DELIVERED AND META DATA ERROR!!!!! ********");
                    console.log(err);

                    res.status(200).json({
                        type: 'error',
                        alert: `Something went wrong. Could not update Meta Data `,
                    })
                });

            return doc;
        })
        .then(doc => {

            doc.items.map(item => {
                Store
                    .findOneAndUpdate(
                        { name: item.description },
                        {
                            $inc: {
                                'storequantity.salesqtycases': parseInt(item.deliveredsalesqtycases),
                                'storequantity.salesqtypieces': parseInt(item.deliveredsalesqtypieces),
                                'storequantity.freeqtypieces': parseInt(item.deliveredfreeqtypieces),
                                'storequantity.freeqtycases': parseInt(item.deliveredfreeqtycases)
                            },
                            $push: {
                                'grngin': {
                                    'grnnumberginnumber': doc.grnnumber,
                                    'date': req.body.createdat,
                                    'piecespercase': item.piecespercase,
                                    'listorsellingprice': item.listprice,
                                    'salesqtycases': item.deliveredsalesqtycases,
                                    'salesqtypieces': item.deliveredsalesqtypieces,
                                    'freeqtycases': item.deliveredfreeqtycases,
                                    'freeqtypieces': item.deliveredfreeqtypieces,
                                }
                            }
                        },
                        { new: true }
                    )
                    .exec()
                    .then(doc => {
                        console.log("******** ITEMS ADDED TO STORE ********");
                        console.log(doc);
                    })
                    .catch(err => {
                        res.status(200).json({
                            type: 'error',
                            alert: `Something went wrong. Could not update store`,
                        });
                        console.log(err);
                    })
            })

            return doc;
        })
        .then(doc =>
            res.status(200).json({
                message: "Handling POST requests to /grn/update-by-id/:grnnumber, GRN UPDATED",
                type: 'success',
                alert: `${doc.grnnumber} updated`,
            })
        )
        .catch(err => {
            console.log(err);
            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not update GRN`,
            });
        });
});

module.exports = router;