const express = require("express");
const { db } = require("../models/order.model");
const router = express.Router();

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
            {
                completedat: {
                    $gte: "2021-01-01",
                    $lte: "2021-01-14"
                }
            },
        )
        .sort({
            completedat: 'asc'
        })
        .exec()
        .then(doc => {

            const labelsWithDuplicates = doc.map(x => x.completedat.slice(0, 10));

            const labels = labelsWithDuplicates.filter(function (item, pos) {
                return labelsWithDuplicates.indexOf(item) == pos;
            })

            const dataSetsWithLabels = {};

            labelsWithDuplicates.forEach(x => {
                dataSetsWithLabels[x] = (dataSetsWithLabels[x] || 0) + 1
            });

            const chartData = Object.values(dataSetsWithLabels);

            res.status(201).json({
                message: "Handeling GET requests to /get-total-sales",
                labels: labels,
                chartData: chartData,
                label: 'No. of Orders'
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })

});


//Get weekly total sales analytics
router.get("/weekly", (req, res, next) => {

    var pipeline = [
        { $sort: { "completedat": 1 } },
        {
            $project: {
                "completedatweek": { "$week": "$completedat" },
            }
        },
        {
            $unwind: "$completedatweek"
        }
    ];

    const doc = db.collection('orders').aggregate(pipeline);

    doc.toArray((error, result) => {
        if (error) {
            return res.status(500).send(error);
        }
        // res.send(result);
        console.log("RESULT: ", result);
    });
});

module.exports = router;