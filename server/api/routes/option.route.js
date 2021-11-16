const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Employee = require("../models/employee.model");
const Order = require("../models/order.model");
const Product = require("../models/product.model");
const Customer = require("../models/customer.model");

//Check whether the endpoint works
router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Handeling GET requests to /options"
    });
});


//Get PO product options
router.get("/product-options-for-purchase-order", (req, res, next) => {

    Product
        .find()
        .exec()
        .then(doc => {
            function pad(str, num, size) {
                var matches = str.match(/\b(\w)/g);
                var acronym = matches.join('');
                while (num.length < size) num = "0" + num;
                return acronym + num;
            }

            const data = doc.filter(x => x.status === "Active");

            const productOptions = data.map(x => ({
                productid: x.productid,
                name: x.name,
                supplier: x.supplier,
                variantid: pad(x.name, String(x.variants.length + 1), 4)
            }))

            res.status(200).json({
                message: "Handeling GET requests to /product-options-for-purchase-order",
                productOptions: productOptions,
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })
})

//Get all product options
router.get("/product-options-for-product", (req, res, next) => {

    Product
        .find()
        .exec()
        .then(doc => {
            function pad(str, num, size) {
                var matches = str.match(/\b(\w)/g);
                var acronym = matches.join('');
                while (num.length < size) num = "0" + num;
                return acronym + num;
            }

            const productOptions = doc.map(x => ({
                title: `${x.name} (${x.productid})`,
                productid: x.productid,
                name: x.name,
                supplier: x.supplier,
                addedby: x.addedby,
                addeddate: x.addeddate,
                productimage: x.productimage,
                status: x.status,
                variantid: pad(x.name, String(x.variants.length + 1), 4)
            }))

            res.status(200).json({
                message: "Handeling GET requests to /product-options",
                productOptions: productOptions,
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })
})

//Get all employee options
router.get("/employee-options-for-product", (req, res, next) => {

    Employee
        .find({ designation: "Purchasing Manager" })
        .exec()
        .then(doc => {

            const employeeOptions = doc.map(x => ({
                title: `${x.employeeid} : ${x.firstname} ${x.lastname} (${x.designation})`,
                id: x.employeeid
            }))

            res.status(201).json({
                message: "Handeling GET requests to /employee-options",
                employeeOptions: employeeOptions,
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })
})

//Get all employee options for admin
router.get("/employee-options-for-admin", (req, res, next) => {

    Employee
        .find()
        .exec()
        .then(doc => {

            const candidates = doc.filter(x =>
                (x.designation === 'Distributor' && x.employeestatus === 'Active') ||
                (x.designation === 'Manager' && x.employeestatus === 'Active') ||
                (x.designation === 'Human Resources' && x.employeestatus === 'Active') ||
                (x.designation === 'Purchasing Manager' && x.employeestatus === 'Active') ||
                (x.designation === 'Store Keeper' && x.employeestatus === 'Active') ||
                (x.designation === 'Sales Representative' && x.employeestatus === 'Active')
            );

            const employeeOptions = candidates.map(x => ({
                title: `${x.employeeid} : ${x.firstname} ${x.lastname} (${x.designation})`,
                id: x.employeeid
            }))

            res.status(201).json({
                message: "Handeling GET requests to /employee-options-for-admin",
                employeeOptions: employeeOptions,
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })
})

module.exports = router;
