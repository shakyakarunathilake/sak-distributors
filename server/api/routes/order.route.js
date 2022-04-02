const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const Order = require("../models/order.model");
const Customer = require("../models/customer.model");
const MetaData = require("../models/metadata.model");
const GIN = require("../models/gin.model");

const formDataBody = multer();

//Check whether the endpoint works
router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Handeling GET requests to /orders"
    });
});

//Get next invoice number
router.get("/get-next-orderno/:employeeid", (req, res, next) => {

    const employeeid = req.params.employeeid;

    const today = new Date();
    const date = today.getFullYear() +
        (today.getMonth() > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`) +
        (today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`);

    Order
        .find(
            {
                "ordercreatedby": {
                    "$regex": employeeid,
                    "$options": "i"
                }
            },
            { orderno: 1, _id: 0 }
        )
        .sort({ orderno: 'desc' })
        .exec()
        .then(doc => {

            let postfix = "001";

            if (doc.length && doc.length > 0) {

                let firstelementdate = doc[0].orderno.substring(6, (doc[0].orderno.length - 3));

                if (firstelementdate === date) {
                    firstelementnumber = parseInt(doc[0].orderno.slice(-3)) + 1;
                    postfix = firstelementnumber.toString().padStart(3, '0')
                }
            }

            const nextorderno = employeeid + date + postfix;

            res.status(200).json({
                message: "Handeling GET requests to /get-next-orderno",
                nextorderno: nextorderno
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                "Error": err
            });
        })

});

//Create a order
router.post("/create-order", formDataBody.fields([]), (req, res, next) => {

    const items = JSON.parse(req.body.items);

    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        contactnumber: req.body.contactnumber,
        customerid: req.body.customerid ? req.body.customerid : '',
        customertype: req.body.customertype,
        deliverydate: req.body.deliverydate,
        deliveredby: '',
        deliveredat: '',
        orderno: req.body.orderno,
        orderplacedat: req.body.orderplacedat,
        route: req.body.route,
        ordercreatedby: req.body.ordercreatedby,
        shippingaddress: req.body.shippingaddress,
        storename: req.body.storename,
        items: items,
        total: req.body.total,
        currentinvoicecreditamount: req.body.currentinvoicecreditamount === '0' ? '0.00' : req.body.currentinvoicecreditamount,
        loyaltypoints: req.body.loyaltypoints,
        eligibilityforcredit: req.body.eligibilityforcredit,
        maximumcreditamount: req.body.maximumcreditamount,
        status: 'Pending',
        creditamounttosettle: req.body.creditamounttosettle,
        minimumpayment: req.body.minimumpayment,
        advancepayment: req.body.advancepayment,
        completedat: '',
        completedby: '',
        invoicesettlementvalue: req.body.invoicesettlementvalue,
        ginnumber: ''
    });

    order
        .save()
        .then(result => {

            MetaData
                .findOneAndUpdate(
                    {},
                    {
                        $push: {
                            'noofcustomerorders': {
                                'orderno': result.orderno,
                                'route': result.route,
                                'status': result.status
                            },
                        },
                    },
                    { upsert: true }
                )
                .exec()
                .then(
                    console.log("META DATA ADDED")
                )
                .catch(error => {

                    console.log("META DATA ERROR: ", error)

                    res.status(200).json({
                        type: 'error',
                        alert: error,
                    });
                })

            return result;
        })
        .then(result => {

            if (result.customertype === "Registered Customer" && result.currentinvoicecreditamount !== 0.00) {

                Customer
                    .findOneAndUpdate(
                        { customerid: result.customerid },
                        { 'creditamounttosettle': parseInt(result.currentinvoicecreditamount) },
                        { new: true }
                    )
                    .exec()
                    .then(result => {
                        console.log("CUSTOMER CREDIT AMOUNT TO SETTLE UPDATED ")
                    })
                    .catch(error => {

                        console.log("CUSTOMER ERROR: ", error)

                        res.status(200).json({
                            type: 'error',
                            alert: error,
                        });
                    });
            }

            return result;
        })
        .then(result =>
            res.status(201).json({
                message: "Handeling POST requests to /orders/create-order, ORDER CREATED",
                type: 'success',
                alert: `${result.orderno} added`,
            })
        )
        .catch(error => {

            console.log("ORDER ERROR: ", error)

            res.status(200).json({
                type: 'error',
                alert: error,
            });
        })

});

//Get order details by order number
router.post("/update-by-id/:orderno", formDataBody.fields([]), (req, res, next) => {
    console.log("UPDATE:", req.body);

    const items = JSON.parse(req.body.items);

    Order
        .findOneAndUpdate(
            { orderno: req.params.orderno },
            {
                'items': items,
                'currentinvoicecreditamount': req.body.currentinvoicecreditamount,
                'invoicesettlementvalue': req.body.invoicesettlementvalue,
                'minimumpayment': req.body.minimumpayment,
                'advancepayment': req.body.advancepayment,
                'total': req.body.total,
            },
            { new: true }
        )
        .exec()
        .then(result => {

            if (result.customertype === "Registered Customer" && result.currentinvoicecreditamount !== 0.00) {

                Customer
                    .findOneAndUpdate(
                        { customerid: result.customerid },
                        { 'creditamounttosettle': result.currentinvoicecreditamount },
                        { new: true }
                    )
                    .exec()
                    .then(result => {
                        console.log("CUSTOMER UPDATED: ", result)
                    })
                    .catch(error => {

                        console.log("CUSTOMER ERROR: ", error)

                        res.status(200).json({
                            type: 'error',
                            alert: error,
                        });
                    });
            }

            return result;
        })
        .then(result => {
            res.status(200).json({
                message: "Handling POST requests to /orders/update-by-orderno/:orderno, ORDER UPDATED",
                type: 'success',
                alert: `${result.orderno} updated`,
            });
        })
        .catch(err => {
            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not update order`,
            });
            console.log(err);
        });
});

//Approve delivery by order number
router.post("/approve-delivery/:orderno", formDataBody.fields([]), (req, res, next) => {

    Order
        .findOneAndUpdate(
            { "orderno": req.params.orderno },
            {
                '$set': {
                    'status': req.body.status,
                    'deliveredat': req.body.deliveredat,
                    'deliveredby': req.body.deliveredby
                }
            },
            { new: true, upsert: true }
        )
        .exec()
        .then(doc => {

            console.log("**** ORDER STATUS UPDATED ****")

            const ordernumber = doc.orderno;
            const ginnumber = doc.ginnumber;

            GIN
                .findOneAndUpdate(
                    { "ginnumber": ginnumber, "ordernumbers.ordernumber": ordernumber },
                    {
                        '$set': {
                            'ordernumbers.$.complete': 'Yes'
                        }
                    },
                    { new: true, upsert: true }
                )
                .exec()
                .then(doc => {

                    console.log("**** GIN ORDER NUMBERS ARRAY UPDATED ****")

                    if (!doc.ordernumbers.some(e => e.complete === 'No')) {

                        GIN
                            .findOneAndUpdate(
                                { "ginnumber": doc.ginnumber },
                                {
                                    '$set': {
                                        'status': 'Complete'
                                    }
                                },
                                { new: true, upsert: true }
                            )
                            .exec()
                            .then(
                                console.log("**** GIN STATUS SET TO COMPLETE ****")
                            )
                            .catch(err => {
                                res.status(200).json({
                                    type: 'error',
                                    alert: `Something went wrong. Could not update GIN`,
                                });
                                console.log(err);
                            });
                    }
                })
                .catch(err => {
                    res.status(200).json({
                        type: 'error',
                        alert: `Something went wrong. Could not update GIN`,
                    });
                    console.log(err);
                });

            return doc;
        })
        .then(doc => {

            res.status(200).json({
                message: "Handling POST requests to /orders/approve-delivery/:orderno, ORDER STATUS CHANGED TO COMPLETE",
                type: 'success',
                alert: `${doc.orderno} status updated`,
            });
        })
        .catch(err => {
            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not update order`,
            });
            console.log(err);
        })

})

//Approve complete by order number
router.post("/approve-complete/:orderno", formDataBody.fields([]), (req, res, next) => {

    Order
        .findOneAndUpdate(
            { "orderno": req.params.orderno },
            {
                '$set': {
                    'status': req.body.status,
                    'completedat': req.body.completedat,
                    'completedby': req.body.completedby
                }
            },
            { upsert: true }
        )
        .exec()
        .then(doc => {
            res.status(200).json({
                message: "Handling POST requests to /orders/approve-complete/:orderno, ORDER STATUS CHANGED TO COMPLETE",
                type: 'success',
                alert: `${doc.orderno} status updated`,
            });
        })
        .catch(err => {
            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not update order`,
            });
            console.log(err);
        })

});

//Get all table sales and invoice data
router.get("/get-all-sales-and-invoice-table-data", (req, res, next) => {

    Order
        .find()
        .exec()
        .then(doc => {

            const tbody = doc.slice(0).reverse().map(x => ({
                "orderno": x.orderno,
                "customertype": x.customertype,
                "storename": x.storename,
                "status": x.status,
                "ordercreatedby": x.ordercreatedby,
                "total": x.total,
            }))

            res.status(201).json({
                message: "Handeling GET requests to /get-all-sales-and-invoice-table-data",
                tbody: tbody,
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })
});

router.get("/get-all-sales-and-invoice-table-data-for-sales-representative/:employee", (req, res, next) => {

    Order
        .find({ ordercreatedby: req.params.employee })
        .exec()
        .then(doc => {

            const tbody = doc.slice(0).reverse().map(x => ({
                "orderno": x.orderno,
                "storename": x.storename,
                "status": x.status,
            }))

            res.status(201).json({
                message: "Handeling GET requests to /get-all-sales-and-invoice-table-data-for-sales-representative/:employee",
                tbody: tbody,
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })
});

router.get("/get-all-sales-and-invoice-table-data-for-delivery-representative/:employee", (req, res, next) => {

    Order
        .find({ deliveredby: req.params.employee })
        .exec()
        .then(doc => {

            const tbody = doc.slice(0).reverse().map(x => ({
                "orderno": x.orderno,
                "storename": x.storename,
                "status": x.status,
            }))

            res.status(201).json({
                message: "Handeling GET requests to /get-all-sales-and-invoice-table-data-for-delivery-representative/:employee",
                tbody: tbody,
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })
});

//Get Order Records 
router.get("/get-order-records", (req, res, next) => {

    Order
        .find()
        .exec()
        .then(doc => {

            const candidates = doc.filter(x => x.status == 'Pending');

            const orderRecords = candidates.map(x => ({
                "orderno": x.orderno,
                "items": x.items,
                "route": x.route
            }))

            res.status(200).json({
                message: "Handeling GET requests to /get-order-records",
                orderRecords: orderRecords
            })
        })
        .catch(error => {

            console.log(error);

            res.status(500).json({
                "Error": error
            });
        })
});

//Get order details by order number
router.get("/:orderno", (req, res, next) => {

    Order
        .findOne({ orderno: req.params.orderno })
        .exec()
        .then(doc => {

            const order = {
                'orderno': doc.orderno,
                'customertype': doc.customertype,
                'contactnumber': doc.contactnumber,
                'customerid': doc.customerid,
                'deliverydate': doc.deliverydate,
                'deliveredby': doc.deliveredby,
                'deliveredat': doc.deliveredat,
                'orderno': doc.orderno,
                'orderplacedat': doc.orderplacedat,
                'route': doc.route,
                'ordercreatedby': doc.ordercreatedby,
                'shippingaddress': doc.shippingaddress,
                'storename': doc.storename,
                'items': doc.items,
                'total': doc.total,
                'status': doc.status,
                'currentinvoicecreditamount': doc.currentinvoicecreditamount,
                'loyaltypoints': doc.loyaltypoints,
                'eligibilityforcredit': doc.eligibilityforcredit,
                'maximumcreditamount': doc.maximumcreditamount,
                'creditamounttosettle': doc.creditamounttosettle,
                'minimumpayment': doc.minimumpayment,
                'advancepayment': doc.advancepayment,
                'invoicesettlementvalue': doc.invoicesettlementvalue
            }

            res.status(200).json({
                message: "Handeling GET requests to  orders/:orderno",
                order: order,
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })

});

module.exports = router;