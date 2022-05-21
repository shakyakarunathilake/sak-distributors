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
            console.log("ERROR: ", err);
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
            console.log("ERROR: ", err);
            res.status(500).json({ "Error": err });
        })
});

router.get("/processing-gin-meta-data", (req, res, next) => {

    MetaData
        .find()
        .exec()
        .then(doc => {

            let processingGIN = doc[0].gin.filter(x => x.status === "Processing");

            res.status(201).json({
                message: "Handeling GET requests to /processing-gin-meta-data",
                ginMetaData: processingGIN
            })
        })
        .catch(err => {
            console.log("ERROR: ", err);
            res.status(500).json({ "Error": err });
        })
});

router.get("/dispatched-gin-meta-data/:employeeid", (req, res, next) => {

    MetaData
        .find()
        .exec()
        .then(doc => {

            let dispatchedGIN = doc[0].gin.filter(x => x.incharge.includes(req.params.employeeid) && x.status === "Dispatched");

            res.status(201).json({
                message: "Handeling GET requests to /dispatched-gin-meta-data/:employeeid",
                ginMetaData: dispatchedGIN
            })
        })
        .catch(err => {
            console.log("ERROR: ", err);
            res.status(500).json({ "Error": err });
        })
});

router.get("/pending-customer-orders-meta-data", (req, res, next) => {

    MetaData
        .find()
        .exec()
        .then(doc => {

            let pendingCustomerOrders = doc[0].customerOrders.filter(x => x.status === "Pending");

            res.status(201).json({
                message: "Handeling GET requests to /pending-customer-orders-meta-data",
                customerOrdersMetaData: pendingCustomerOrders
            })
        })
        .catch(err => {
            console.log("ERROR: ", err);
            res.status(500).json({ "Error": err });
        })
});

router.get("/dispatched-customer-orders-meta-data/:employeeid", (req, res, next) => {

    MetaData
        .find()
        .exec()
        .then(doc => {

            let dispatchedCustomerOrders = doc[0].customerOrders.filter(x => x.incharge.includes(req.params.employeeid) && x.status === "Dispatched");

            res.status(201).json({
                message: "Handeling GET requests to /dispatched-customer-orders-meta-data/:employeeid",
                customerOrdersMetaData: dispatchedCustomerOrders
            })
        })
        .catch(err => {
            console.log("ERROR: ", err);
            res.status(500).json({ "Error": err });
        })
});

router.get("/delivered-customer-orders-meta-data", (req, res, next) => {

    MetaData
        .find()
        .exec()
        .then(doc => {

            let deliveredCustomerOrders = doc[0].customerOrders.filter(x => x.status === "Delivered");

            res.status(201).json({
                message: "Handeling GET requests to /delivered-customer-orders-meta-data",
                customerOrdersMetaData: deliveredCustomerOrders
            })
        })
        .catch(err => {
            console.log("ERROR: ", err);
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
            console.log("ERROR: ", err);
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
            console.log("ERROR: ", err);
            res.status(500).json({ "Error": err });
        })
});

router.get("/notifications/:designation/:employeeid", (req, res, next) => {

    const designation = req.params.designation;
    const employeeid = req.params.employeeid;

    MetaData
        .find()
        .exec()
        .then(doc => {

            let notifications = [];

            if (designation === "distributor") {
                notifications.push(...doc[0].purchaseOrders)

            } else if (designation === "manager") {
                notifications.push(...doc[0].customerOrders.filter(x => x.status === "Delivered"))

            } else if (designation === "purchasing-manager") {
                notifications.push(...doc[0].supplierPayments.filter(x => x.status !== "Advance Payment Paid"))

            } else if (designation === "store-keeper") {
                notifications.push(...doc[0].grn)
                notifications.push(...doc[0].customerOrders.filter(x => x.status === "Pending"))
                notifications.push(...doc[0].gin.filter(x => x.status === "Processing"))

            } else if (designation === "delivery-representative") {
                notifications.push(...doc[0].gin.filter(x => x.incharge.includes(employeeid) && x.status === "Dispatched"))
                notifications.push(...doc[0].customerOrders.filter(x => x.incharge.includes(employeeid) && x.status === "Dispatched"))

            }

            res.status(201).json({
                message: "Handeling GET requests to /notifications/:designation/:employeeid",
                notifications: notifications
            })
        })
        .catch(err => {
            console.log("ERROR: ", err);
            res.status(500).json({ "Error": err });
        })
});


module.exports = router;
