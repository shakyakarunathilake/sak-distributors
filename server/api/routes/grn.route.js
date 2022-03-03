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

                let pieces = 0;
                let cases = 0;
                let totalnumberofpieces = 0;

                const getPieces = (noofpieces, piecespercase) => {
                    pieces = noofpieces % piecespercase;
                    return pieces;
                }

                const getCases = (noofpieces, piecespercase) => {
                    cases = Math.floor(noofpieces / piecespercase);
                    return cases;
                }

                const getTotalNumberOfPieces = (itemcases, itempieces, damaged, piecespercase) => {
                    totalnumberofpieces = (itemcases * piecespercase) + itempieces - damaged;
                    return totalnumberofpieces;
                }


                let salesqtypieces = getPieces(getTotalNumberOfPieces(item.deliveredsalesqtycases, item.deliveredsalesqtypieces, item.damagedsalesqty, item.piecespercase), item.piecespercase);
                let salesqtycases = getCases(getTotalNumberOfPieces(item.deliveredsalesqtycases, item.deliveredsalesqtypieces, item.damagedsalesqty, item.piecespercase), item.piecespercase);
                let freeqtypieces = getPieces(getTotalNumberOfPieces(item.deliveredfreeqtycases, item.deliveredfreeqtypieces, item.damagedfreeqty, item.piecespercase), item.piecespercase);
                let freeqtycases = getCases(getTotalNumberOfPieces(item.deliveredfreeqtycases, item.deliveredfreeqtypieces, item.damagedfreeqty, item.piecespercase), item.piecespercase);

                Store
                    .findOneAndUpdate(
                        { productid: item.productid },
                        {
                            $inc: {
                                'storequantity.salesqtypieces': salesqtypieces,
                                'storequantity.salesqtycases': salesqtycases,
                                'storequantity.freeqtypieces': freeqtypieces,
                                'storequantity.freeqtycases': freeqtycases,
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
                        res.status(200).json({
                            type: 'error',
                            alert: `Something went wrong. Could not update store`,
                        });
                        console.log(err);
                    })
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