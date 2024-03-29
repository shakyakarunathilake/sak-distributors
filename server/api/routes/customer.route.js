const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const Customer = require("../models/customer.model");

const formDataBody = multer();

//Checks whether the endpoint works
router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Handeling GET requests to /customers"
    });
});

//Get Next Registration Number
router.get("/get-next-regno", (req, res, next) => {

    Customer
        .find(
            {},
            {
                customerid: 1,
                _id: 0
            }
        )
        .sort({
            customerid: 'desc'
        })
        .exec()
        .then(doc => {

            let postfix = "00001";

            if (doc.length && doc.length > 0) {
                const firstelementnumber = doc[0].customerid.substring(1, 6);
                postfix = parseInt(firstelementnumber) + 1;
            }

            const nextcustomerid = 'C' + postfix.toString().padStart(5, '0');

            res.status(200).json({
                message: "Handeling GET requests to /get-next-regno",
                nextcustomerid: nextcustomerid
            });
        })
        .catch(err => {
            console.log("ERROR: ", err);
            res.status(500).json({ "Error": err });
        })

})

//Create a customer
router.post("/create-customer", formDataBody.fields([]), (req, res, next) => {

    const addeddate = new Date(req.body.addeddate).toISOString().split('T')[0];

    const customer = new Customer({
        _id: new mongoose.Types.ObjectId(),
        customerid: req.body.customerid,
        fullname: req.body.fullname,
        title: req.body.title,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        brn: req.body.brn,
        storename: req.body.storename,
        route: req.body.route,
        addeddate: addeddate,
        storecontactnumber: req.body.storecontactnumber,
        customercontactnumber: req.body.customercontactnumber,
        email: req.body.email,
        billingaddress: req.body.billingaddress,
        shippingaddress: req.body.shippingaddress,
        registeredby: req.body.registeredby,
        creditamounttosettle: 0,
        loyaltypoints: 0,

    });

    customer
        .save()
        .then(result => {
            res.status(201).json({
                message: "Handeling POST requests to /customers/create-customer, CUSTOMER SAVED",
                type: 'success',
                alert: `${result.storename} added`,
            });
        })
        .catch(err => {
            console.log("Error: ", err)
            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not add customer`,
            });
        })
});

//Get all basic customer info
router.get("/get-all-basic-customer-data", (req, res, next) => {

    Customer
        .find()
        .exec()
        .then(doc => {
            const customerinfo = doc.map(x => ({
                "customerid": x.customerid,
                "storename": x.storename,
                "route": x.route,
            }))

            res.status(201).json({
                message: "Handeling GET requests to /get-all-basic-customer-info",
                customerinfo: customerinfo
            })
        })
        .catch(err => {
            console.log("Error: ", err)
            res.status(500).json({ "Error": err });
        })
});

//Get all table customer data
router.get("/get-all-customer-table-data", (req, res, next) => {

    Customer
        .find()
        .exec()
        .then(doc => {

            const tbody = doc.map(x => ({
                "customerid": x.customerid,
                "storename": x.storename,
                "customername": x.title + " " + x.firstname + " " + x.lastname,
                "shippingaddress": x.shippingaddress,
                "contactnumber": x.storecontactnumber,
                "route": x.route
            }))

            res.status(201).json({
                message: "Handeling GET requests to /get-all-customer-table-data",
                tbody: tbody,
            });
        })
        .catch(err => {
            console.log("Error: ", err)
            res.status(500).json({ "Error": err });
        })
})

//Get customer data by Customer ID
router.get("/:customerid", (req, res, next) => {
    const id = req.params.customerid;

    Customer
        .findOne({ customerid: id })
        .exec()
        .then(doc => {

            const customer = {
                'customerid': doc.customerid,
                'fullname': doc.fullname,
                'title': doc.title,
                'firstname': doc.firstname,
                'lastname': doc.lastname,
                'brn': doc.brn,
                'storename': doc.storename,
                'route': doc.route,
                'addeddate': doc.addeddate,
                'email': doc.email,
                'billingaddress': doc.billingaddress,
                'shippingaddress': doc.shippingaddress,
                'customercontactnumber': doc.customercontactnumber,
                'storecontactnumber': doc.storecontactnumber,
                'registeredby': doc.registeredby,
                'creditamounttosettle': doc.creditamounttosettle,
                'loyaltypoints': doc.loyaltypoints,

            }

            res.status(200).json({
                message: "Handeling GET requests to /:customerid",
                customer: customer
            });
        })
        .catch(err => {
            console.log("Error: ", err)
            res.status(500).json({ "Error": err });
        })
})

//Update customer data by Customer ID
router.post("/update-by-id/:customerid", formDataBody.fields([]), (req, res, next) => {

    Customer
        .findOneAndUpdate({ customerid: req.params.customerid }, req.body, { new: true })
        .exec()
        .then(doc => {
            res.status(200).json({
                message: "Handling POST requests to /customers/update-by-id/:customerid, CUSTOMER UPDATED",
                type: 'success',
                alert: `${doc.firstname} ${doc.lastname} updated`,
            });
        })
        .catch(err => {
            console.log("Error: ", err)
            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not update customer`,
            });
        });
});

module.exports = router;