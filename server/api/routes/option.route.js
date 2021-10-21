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

//Get all product options
router.get("/product-options", (req, res, next) => {

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
router.get("/employee-options", (req, res, next) => {

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

module.exports = router;
