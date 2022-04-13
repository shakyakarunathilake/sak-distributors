const express = require("express");
const { db } = require("../models/order.model");
const router = express.Router();

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
    const lastDateTwoWeeksBackWithoutTime = lastDateTwoWeeksBack.getFullYear() + '-' + (lastDateTwoWeeksBack.getMonth() > 9 ? lastDateTwoWeeksBack.getMonth() + 1 : `0${lastDateTwoWeeksBack.getMonth() + 1}`) + '-' + (lastDateTwoWeeksBack.getDate() > 9 ? lastDateTwoWeeksBack.getDate() + 1 : `0${lastDateTwoWeeksBack.getDate() + 1}`);

    var pipeline = [
        {
            $match: {
                "orderplacedat": {
                    $gte: "2021-01-04",
                    $lte: "2021-01-15"
                }
            }
        },
        {
            $group: {
                _id: "$ordercreatedby",
                totalValue: {
                    $sum: {
                        $toDouble: "$total"
                    }
                },
            }
        },
        {
            $sort: {
                _id: 1
            }
        }
    ];

    const doc = db.collection('orders').aggregate(pipeline);

    doc.toArray((error, result) => {

        if (error) {

            return res.status(500).send(error);

        } else {

            const labels = [];
            const chartData = [];

            result.forEach((element) => {

                labels.push(element._id)
                chartData.push(element.totalValue)

            });

            res.status(201).json({
                message: "Handeling GET requests to /get-total-sales",
                labels: labels,
                chartData: chartData,
                label: 'Total Values of Sales per Sales Representative'
            })
        }

    });

});

module.exports = router;