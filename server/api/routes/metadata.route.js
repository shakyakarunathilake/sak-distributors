const express = require("express");
const router = express.Router();

const MetaData = require("../models/metadata.model");

//Check whether the endpoint works
router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Handeling GET requests to /metadata"
    });
});

router.get("/promotions", (req, res, next) => {

    MetaData
        .find()
        .exec()
        .then(doc => {
            res.status(201).json({
                message: "Handeling GET requests to /promotions",
                promotions: doc[0].promotions
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })
});

router.get("/awaiting-grn", (req, res, next) => {

    MetaData
        .find()
        .exec()
        .then(doc => {
            res.status(201).json({
                message: "Handeling GET requests to /awaiting-grn",
                noofawaitinggrn: doc[0].noofawaitinggrn
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })
});

router.get("/no-of-customer-orders", (req, res, next) => {

    MetaData
        .find()
        .exec()
        .then(doc => {

            res.status(201).json({
                message: "Handeling GET requests to /no-of-customer-orders",
                noofcustomerorders: doc[0].noofcustomerorders
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })
});

router.get("/purchase-orders-to-be-approved", (req, res, next) => {

    MetaData
        .find()
        .exec()
        .then(doc => {
            res.status(201).json({
                message: "Handeling GET requests to /purchase-orders-to-be-approved",
                purchaseorderstobeapproved: doc[0].noofpurchaseordertobeapproved
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })
});

module.exports = router;
