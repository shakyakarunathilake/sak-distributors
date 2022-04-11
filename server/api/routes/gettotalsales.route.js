const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Order = require("../models/order.model");

//Checks whether the endpoint works
router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Handeling GET requests to /get-total-sales"
    });
});

//Get daily total sales analytics
router.get("/daily", (req, res, next) => {

    var today = new Date();
    var first = today.getDate() - today.getDay();

    var lastDateTwoWeeksBack = new Date(today.setDate(first));
    var firstDateTwoWeeksBack = new Date(today.setDate(first - 12));

    const firstDateTwoWeeksBackWithoutTime = firstDateTwoWeeksBack.getFullYear() + '-' + (firstDateTwoWeeksBack.getMonth() > 9 ? firstDateTwoWeeksBack.getMonth() + 1 : `0${firstDateTwoWeeksBack.getMonth() + 1}`) + '-' + (firstDateTwoWeeksBack.getDate() > 9 ? firstDateTwoWeeksBack.getDate() : `0${firstDateTwoWeeksBack.getDate()}`);
    const lastDateTwoWeeksBackWithoutTime = lastDateTwoWeeksBack.getFullYear() + '-' + (lastDateTwoWeeksBack.getMonth() > 9 ? lastDateTwoWeeksBack.getMonth() + 1 : `0${lastDateTwoWeeksBack.getMonth() + 1}`) + '-' + (lastDateTwoWeeksBack.getDate() > 9 ? lastDateTwoWeeksBack.getDate() : `0${lastDateTwoWeeksBack.getDate()}`);

    Order
        .find(

        )
        .exec()
        .then(doc => {

            const labels = [];
            const dataSets = [];

            res.status(201).json({
                message: "Handeling GET requests to /get-total-sales",
                labels: labels,
                dataSets: dataSets
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })

});

module.exports = router;