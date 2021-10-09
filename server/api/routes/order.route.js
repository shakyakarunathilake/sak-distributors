const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const Order = require("../models/order.model");

const formDataBody = multer();

//Check whether the endpoint works
router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Handeling GET requests to /orders"
    });
});

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

module.exports = router;