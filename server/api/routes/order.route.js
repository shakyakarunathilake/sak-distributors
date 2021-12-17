const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const Order = require("../models/order.model");
const MetaData = require("../models/metadata.model");

const formDataBody = multer();

//Check whether the endpoint works
router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Handeling GET requests to /orders"
    });
});

//Get all table sales and invoice data
router.get("/get-all-sales-and-invoice-table-data", (req, res, next) => {

    Order
        .find()
        .exec()
        .then(doc => {

            const tbody = doc.map(x => ({
                "orderno": x.orderno,
                "storename": x.storename,
                "status": x.status,
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
})

//Get next invoice number
router.get("/get-next-invoiceno", (req, res, next) => {

    var today = new Date();
    var date = `${today.getFullYear()}${(today.getMonth() + 1)}${today.getDate()}`;

    function pad(num, size) {
        while (num.length < size) num = "0" + num;
        return date + num;
    }

    Order
        .find({}, { invoiceno: 1, _id: 0 })
        .exec()
        .then(doc => {
            let invoicearray;

            if (!doc.length === 0) {
                invoicearray = doc.map(x => {
                    return parseInt(x.invoiceno.slice(9))
                });
            } else {
                invoicearray = [000];
            }

            const nextinvoiceno = pad(String(Math.max(...invoicearray) + 1), 3);

            res.status(200).json({
                message: "Handeling GET requests to /get-next-invoiceno",
                nextinvoiceno: nextinvoiceno
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

    console.log("ORDER BODY: ", req.body);
    const items = JSON.parse(req.body.items);

    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        contactnumber: req.body.contactnumber,
        customer: req.body.customer,
        customerid: req.body.customerid,
        deliverydate: req.body.deliverydate,
        orderno: req.body.orderno,
        orderplacedat: req.body.orderplacedat,
        route: req.body.route,
        ordercreatedby: req.body.ordercreatedby,
        shippingaddress: req.body.shippingaddress,
        items: items,
        storename: req.body.storename,
        status: 'Pending',
    });

    order
        .save()
        .then(result => {

            MetaData
                .findOneAndUpdate(
                    {},
                    {
                        $push: {
                            'customerorders': {
                                'orderno': result.orderno,
                                'storename': result.storename,
                                'status': 'Pending',
                                'ordercreatedby': result.ordercreatedby
                            },
                        },
                    },
                    { upsert: true }
                )
                .exec()
                .then(result => { console.log("META DATA ADDED: ", result) })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ "Error": err });
                })

            res.status(201).json({
                message: "Handeling POST requests to /orders/create-order, ORDER CREATED",
                type: 'success',
                alert: `${result.orderno} added`,
            });
        })
        .catch(err => {

            console.log("ERROR: ", err);

            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not add order`,
            });
        })

});


module.exports = router;