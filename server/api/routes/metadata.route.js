const express = require("express");
const router = express.Router();

const MetaData = require("../models/metadata.model");

//Check whether the endpoint works
router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Handeling GET requests to /metadata"
    });
});

router.get("/promotions-meta-data", (req, res, next) => {

    MetaData
        .find()
        .exec()
        .then(doc => {
            res.status(201).json({
                message: "Handeling GET requests to /promotions-meta-data",
                promotionsMetaData: doc[0].promotions
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })
});

router.get("/grn-meta-data", (req, res, next) => {

    MetaData
        .find()
        .exec()
        .then(doc => {
            res.status(201).json({
                message: "Handeling GET requests to /grn-meta-data",
                grnMetaData: doc[0].grn
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })
});

router.get("/customer-orders-meta-data", (req, res, next) => {

    MetaData
        .find()
        .exec()
        .then(doc => {

            res.status(201).json({
                message: "Handeling GET requests to /customer-orders-meta-data",
                customerOrdersMetaData: doc[0].customerOrders
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })
});

router.get("/purchase-orders-meta-data", (req, res, next) => {

    MetaData
        .find()
        .exec()
        .then(doc => {
            res.status(201).json({
                message: "Handeling GET requests to /purchase-orders-meta-data",
                purchaseOrdersMetaData: doc[0].purchaseOrders
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })
});

router.get("/supplier-payments-meta-data", (req, res, next) => {

    MetaData
        .find()
        .exec()
        .then(doc => {

            const supplierPayments = doc[0].supplierPayments.filter(x => x.status !== "Advance Payment Paid")

            res.status(201).json({
                message: "Handeling GET requests to /supplier-payments-meta-data",
                supplierPaymentsMetaData: supplierPayments
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })
});

module.exports = router;
