const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const MetaData = require("../models/metadata.model");
const Supplier = require("../models/supplier.model")
const PurchaseOrder = require("../models/purchaseorder.model");
const GRN = require("../models/grn.model");
const Store = require("../models/store.model");
const SupplierPayment = require("../models/supplierpayment.model");

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

            const tbody = doc.slice(0).reverse().map(x => ({
                ponumber: x.ponumber,
                grnnumber: x.grnnumber,
                supplier: x.supplier,
                status: x.status,
                createdby: x.createdby,
                createdat: x.createdat
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
                'grnnumber': doc.grnnumber,
                'supplier': doc.supplier,
                'pototal': doc.pototal,
                'status': doc.status,
                'givenid': doc.givenid,
                'createdat': doc.createdat,
                'createdby': doc.createdby,
                'items': doc.items,
                'damagedmissingitems': doc.damagedmissingitems,
                'grntotal': doc.grntotal,
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
router.post("/update-by-grnnumber/:grnnumber", formDataBody.fields([]), (req, res, next) => {

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
            { new: true, upsert: true }
        )
        .exec()
        .then(doc => {

            PurchaseOrder
                .findOneAndUpdate(
                    { "ponumber": doc.ponumber },
                    {
                        '$set': {
                            'status': 'Delivered',
                            'deliveredat': doc.createdat,
                            'total': doc.grntotal,
                            'damagedmissingitems': doc.damagedmissingitems,
                        }
                    },
                    { new: true, upsert: true }
                )
                .exec()
                .then(
                    console.log("******** PURCHASE ORDER UPDATED ********")
                )
                .catch(err => {
                    console.log("******** PURCHASE ORDER UPDATED ERROR!!!!! ********");
                    console.log(err);

                    res.status(200).json({
                        type: 'error',
                        alert: `Something went wrong. Could not update relevant Purchase Order `,
                    });
                });

            return doc;

        })
        .then(doc => {

            SupplierPayment
                .findOneAndUpdate(
                    { "ponumber": doc.ponumber },
                    {
                        '$set': {
                            'grnnumber': doc.grnnumber,
                            'grndamagedmissingitems': doc.damagedmissingitems,
                            'grntotal': doc.grntotal,
                            'status': 'Payment To Be Complete'
                        },
                        '$inc': {
                            'debt': -parseInt(req.body.damagedmissingitems)
                        }
                    },
                    { new: true, upsert: true }
                )
                .exec()
                .then(
                    console.log("******** SUPPLIER PAYMENT ADDED ********")
                )
                .catch(err => {
                    console.log(err);
                    res.status(200).json({
                        type: 'error',
                        alert: `Something went wrong. Could not update relevant supplier payment`,
                    });
                });

            return doc;
        })
        .then(doc => {

            doc.items.map(item => {

                Store
                    .findOne({ productid: item.productid })
                    .exec()
                    .then(result => {

                        console.log("***********************************************************");

                        console.log("ITEM.NAME :", item.description);
                        console.log("item.salesqtycases :", item.salesqtycases);
                        console.log("item.salesqtypieces :", item.salesqtypieces);
                        console.log("item.freeqtycases :", item.freeqtycases);
                        console.log("item.freeqtypieces :", item.freeqtypieces);

                        let storesalesqtypieces = result.storequantity.salesqtypieces;
                        let storesalesqtycases = result.storequantity.salesqtycases;
                        let storefreeqtypieces = result.storequantity.freeqtypieces;
                        let storefreeqtycases = result.storequantity.freeqtycases;

                        console.log("storesalesqtycases :", storesalesqtycases);
                        console.log("storesalesqtypieces :", storesalesqtypieces);
                        console.log("storefreeqtycases :", storefreeqtycases);
                        console.log("storefreeqtypieces :", storefreeqtypieces);

                        let newNoOfTotalSalesPieces = (storesalesqtycases * item.piecespercase) + storesalesqtypieces + (item.deliveredsalesqtycases * item.piecespercase) + item.deliveredsalesqtypieces - item.damagedsalesqty;
                        let newNoOfTotalFreePieces = (storefreeqtycases * item.piecespercase) + storefreeqtypieces + (item.deliveredfreeqtycases * item.piecespercase) + item.deliveredfreeqtypieces - item.damagedfreeqty;


                        console.log("newNoOfTotalSalesPieces :", newNoOfTotalSalesPieces);
                        console.log("newNoOfTotalFreePieces :", newNoOfTotalFreePieces);

                        let newstoresalesqtypieces = newNoOfTotalSalesPieces % item.piecespercase;
                        let newstoresalesqtycases = Math.floor(newNoOfTotalSalesPieces / item.piecespercase);
                        let newstorefreeqtypieces = newNoOfTotalFreePieces % item.piecespercase;
                        let newstorefreeqtycases = Math.floor(newNoOfTotalFreePieces / item.piecespercase);


                        console.log("newstoresalesqtycases :", newstoresalesqtycases);
                        console.log("newstoresalesqtypieces :", newstoresalesqtypieces);
                        console.log("newstorefreeqtycases :", newstorefreeqtycases);
                        console.log("newstorefreeqtypieces :", newstorefreeqtypieces);

                        console.log("*******************************************************")

                        Store
                            .findOneAndUpdate(
                                { productid: item.productid },
                                {
                                    $set: {
                                        'storequantity.salesqtypieces': newstoresalesqtypieces,
                                        'storequantity.salesqtycases': newstoresalesqtycases,
                                        'storequantity.freeqtypieces': newstorefreeqtypieces,
                                        'storequantity.freeqtycases': newstorefreeqtycases,
                                    },
                                    $push: {
                                        'grngin': {
                                            'grnnumberginnumber': doc.grnnumber,
                                            'date': req.body.createdat,
                                            'piecespercase': item.piecespercase,
                                            'listorsellingprice': parseInt(item.listprice).toFixed(2),
                                            'salesqtycases': item.deliveredsalesqtycases,
                                            'salesqtypieces': item.deliveredsalesqtypieces,
                                            'freeqtycases': item.deliveredfreeqtycases,
                                            'freeqtypieces': item.deliveredfreeqtypieces,
                                            'damagedfreeqty': item.damagedfreeqty,
                                            'damagedsalesqty': item.damagedsalesqty
                                        }
                                    }
                                },
                                { new: true }
                            )
                            .exec()
                            .then(
                                console.log("******** ITEMS ADDED TO STORE ********")
                            )
                            .catch(err => {
                                console.log(err);
                            })

                    })
                    .catch(err =>
                        console.log(err)
                    )

            })

            return doc;
        })
        .then(doc => {

            Supplier
                .findOneAndUpdate(
                    { name: doc.supplier },
                    {
                        $inc: {
                            'damagedmissingitems': parseInt(doc.damagedmissingitems)
                        }
                    },
                    { new: true, upsert: true }
                )
                .exec()
                .then(
                    console.log("******** SUPPLIER DAMAGED MISSING ITEMS REFUND UPDATED ********")
                )
                .catch(err => {
                    console.log("******** COULDN'T UPDATE SUPPLIER DAMAGED MISSING ITEMS REFUND ********");
                    console.log(err);

                    res.status(200).json({
                        type: 'error',
                        alert: `Something went wrong. Could not update Meta Data `,
                    })
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
                .then(
                    console.log("******** META DATA ADDED ********")
                )
                .catch(err => {
                    console.log("******** META DATA ERROR!!!!! ********");
                    console.log(err);

                    res.status(200).json({
                        type: 'error',
                        alert: `Something went wrong. Could not update Meta Data `,
                    })
                });

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