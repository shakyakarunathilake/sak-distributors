const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Customer = require("../models/customer.model");

//Checks whether the endpoint works
router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Handeling GET requests to /customers"
    });
});

//Get Next Registration Number
router.get("/get-next-regno", (req, res, next) => {

    function pad(num, size) {
        while (num.length < size) num = "0" + num;
        return "C" + num;
    }

    Customer
        .find({}, { customerid: 1, _id: 0 })
        .exec()
        .then(doc => {
            const customeridarray = doc.map(x => {
                return parseInt(x.customerid.slice(1))
            })

            const nextcustomerid = pad(String(Math.max(...customeridarray) + 1), 5);

            res.status(200).json({
                message: "Handeling GET requests to /get-next-regno",
                nextcustomerid: nextcustomerid
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })

})

//Create a customer
router.post("/create-customer", (req, res, next) => {

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
    });

    customer
        .save()
        .then(result => {
            res.status(201).json({
                message: "Handeling POST requests to /customers/create-customer, CUSTOMER SAVED",
                type: 'success',
                alert: `${result.storename} added`,
                addedCustomer: result
            });
        })
        .catch(err => {
            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not add customer`,
            });
            console.log("Error: ", err)
        })
});

//Get all table customer data
router.get("/get-all-customer-table-data", (req, res, next) => {

    Customer
        .find()
        .exec()
        .then(doc => {
            const thead = [
                "Cus. ID",
                "Store Name",
                "Title",
                "Customer Name",
                "Route",
                "Store Contact Number",
            ]

            const tbody = doc.map(x => [
                x.customerid,
                x.storename,
                x.title,
                x.firstname + " " + x.lastname,
                x.route,
                x.storecontactnumber
            ])

            res.status(201).json({
                message: "Handeling GET requests to /get-all-customer-table-data",
                thead: thead,
                tbody: tbody,
            });
        })
        .catch(err => {
            console.log(err);
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
                'storecontactnumber': doc.storecontactnumber
            }

            res.status(200).json({
                message: "Handeling GET requests to /:customerid",
                customer: customer
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })
})

module.exports = router;