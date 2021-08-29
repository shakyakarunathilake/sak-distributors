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

//Create a customer
router.post("/create-customer", (req, res, next) => {
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
        addeddate: req.body.addeddate,
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
                addedCustomer: result
            });
        })
        .catch(err => {
            console.log("Error: ", err)
        })
});

router.get("/get-all-customers", (req, res, next) => {

    Customer
        .find()
        .exec()
        .then(doc => {
            const thead = [
                { id: "customerid", label: "Cus. ID" },
                { id: "storename", label: "Store Name" },
                { id: "brn", label: "BRN" },
                { id: "fullname", label: "Customer Full Name" },
                { id: "title", label: "Title" },
                { id: "firstname", label: "Customer First Name" },
                { id: "lastname", label: "Customer Last Name" },
                { id: "route", label: "Route" },
                { id: "billingaddress", label: "Billing Address" },
                { id: "shippingaddress", label: "Shipping Address" },
                { id: "storecontactnumber", label: "Store Contact Number" },
                { id: "customercontactnumber", label: "Customer Contact Number" },
                { id: "email", label: "Email" },
                { id: "addeddate", label: "Added Date" },
            ]

            res.status(201).json({
                thead: thead,
                tbody: doc,
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })
})

//Get customer data by Customer ID
router.get("/:customerId", (req, res, next) => {
    const id = req.params.customerId;

    Customer
        .findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })
})

module.exports = router;