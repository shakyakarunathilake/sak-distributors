const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const SupplierPayment = require("../models/supplierpayment.model");
const Supplier = require("../models/supplier.model");
const MetaData = require("../models/metadata.model");

const formDataBody = multer();

//Checks whether the endpoint works
router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Handeling GET requests to /supplier-payment"
    });
});

//Get all table supplier payment data
router.get("/get-all-supplier-payments-table-data", (req, res, next) => {

    SupplierPayment
        .find()
        .exec()
        .then(doc => {

            const tbody = doc.slice(0).reverse().map(x => ({
                "ponumber": x.ponumber,
                "supplier": x.supplier,
                "grnnumber": x.grnnumber,
                "status": x.status,
                "paymentcompletedat": x.paymentcompletedat
            }))

            res.status(200).json({
                message: "Handeling GET requests to /get-all-supplier-payment-table-data",
                tbody: tbody,
                defaultkey: 0,
            });
        })
        .catch(err => {
            console.log("Error: ", err);
            res.status(500).json({ "Error": err });
        });
});

//Get supplier payment by ponumber
router.get("/:ponumber", (req, res, next) => {
    const ponumber = req.params.ponumber;

    SupplierPayment
        .findOne({ "ponumber": ponumber })
        .exec()
        .then(doc => {

            const supplierpayment = {
                "supplier": doc.supplier,
                "ponumber": doc.ponumber,
                "grnnumber": doc.grnnumber,
                "status": doc.status,
                "pogrosstotal": doc.pogrosstotal,
                "receiveddiscounts": doc.receiveddiscounts,
                "pototal": doc.pototal,
                "grndamagedmissingitems": doc.grndamagedmissingitems,
                "grntotal": doc.grntotal,
                "paidamount": doc.paidamount,
                "advancepayment": doc.advancepayment,
                "advancepaymentpaidat": doc.advancepaymentpaidat,
                "advancepaymentpaidby": doc.advancepaymentpaidby,
                "paymentcompletedat": doc.paymentcompletedat,
                "paymentcompletedby": doc.paymentcompletedby,
                "debt": doc.debt
            };

            res.status(200).json({
                message: "Handeling GET requests to /:ponumber",
                supplierpayment: supplierpayment
            });

        })
        .catch(err => {
            console.log("Error: ", err);
            res.status(500).json({ "Error ": err });
        })
})

//Update supplier payment by PO number
router.post("/advance-payment-complete/:ponumber", formDataBody.fields([]), (req, res, next) => {

    SupplierPayment
        .findOneAndUpdate(
            { "ponumber": req.params.ponumber },
            {
                '$set': {
                    'grnnumber': `GRN-${req.params.ponumber}`,
                    'advancepaymentpaidat': req.body.advancepaymentpaidat,
                    'advancepaymentpaidby': req.body.advancepaymentpaidby,
                    'advancepayment': req.body.advancepayment,
                    'paidamount': req.body.paidamount,
                    'debt': parseInt(req.body.debt),
                    'status': 'Advance Payment Paid',
                },
            },
            { new: true, upsert: true }
        )
        .exec()
        .then(result => {

            MetaData
                .findOneAndUpdate(
                    { 'supplierPayments.ponumber': result.ponumber },
                    {
                        $set: {
                            'supplierPayments.$.status': 'Advance Payment Paid',
                        },
                    },
                    { new: true, upsert: true }
                )
                .exec()
                .then(
                    console.log("******** ADVANCE PAYMENT PAID METADATA ADDED ********")
                )
                .catch(err => {
                    console.log("********  ADVANCE PAYMENT PAID METADATA ERROR ********")
                    console.log(err)
                })

            return result;
        })
        .then(result =>
            res.status(200).json({
                message: "Handling POST requests to /supplier-payments/update-by-ponumber/:ponumber, SUPPLIER PAYMENT UPDATED",
                type: 'success',
                alert: `Supplier payment for ${result.ponumber} updated`,
            })
        )
        .catch(err => {
            console.log("Error: ", err);
            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not update supplier payment`,
            });
        });
});

//Update supplier payment by PO number
router.post("/payment-complete/:ponumber", formDataBody.fields([]), (req, res, next) => {

    SupplierPayment
        .findOneAndUpdate(
            { "ponumber": req.params.ponumber },
            {
                '$set': {
                    'paymentcompletedat': req.body.paymentcompletedat,
                    'paymentcompletedby': req.body.paymentcompletedby,
                    'paidamount': req.body.paidamount,
                    'debt': parseInt(req.body.debt),
                    'status': 'Payment Complete',
                },
            },
            { new: true, upsert: true }
        )
        .exec()
        .then(doc => {

            Supplier
                .findOneAndUpdate(
                    { name: doc.supplier },
                    {
                        $inc: {
                            'damagedmissingitems': -parseInt(doc.grndamagedmissingitems)
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
                });

            return doc;
        })
        .then(doc => {

            MetaData
                .findOneAndUpdate(
                    {},
                    {
                        $pull: {
                            'supplierPayments': {
                                'ponumber': doc.ponumber
                            }
                        },
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
                });

            return doc;
        })
        .then(doc =>
            res.status(200).json({
                message: "Handling POST requests to /supplier-payments/payment-complete/:ponumber, SUPPLIER PAYMENT UPDATED",
                type: 'success',
                alert: `Supplier payment for ${doc.ponumber} updated`,
            })
        )
        .catch(err => {
            console.log("Error: ", err);
            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not update supplier payment`,
            });
        });
});

module.exports = router;