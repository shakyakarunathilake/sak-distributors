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
                _id: {
                    day: {
                        $dayOfYear: {
                            $dateFromString: {
                                dateString: "$orderplacedat"
                            }
                        }
                    },
                    month: {
                        $month: {
                            $dateFromString: {
                                dateString: "$orderplacedat"
                            }
                        }
                    },
                    year: {
                        $year: {
                            $dateFromString: {
                                dateString: "$orderplacedat"
                            }
                        }
                    },
                },
                totalValue: {
                    $sum: {
                        $toDouble: "$total"
                    }
                },
            }
        },
        {
            $project: {
                totalValue: 1,
                date: {
                    $dateFromParts: {
                        'year': "$_id.year",
                        'month': "$_id.month",
                        'day': "$_id.day",
                    }
                },
                _id: 0
            }
        },
        {
            $sort: {
                Date: 1
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
                labels.push(element.date.toISOString().slice(0, 10))
                chartData.push(element.totalValue)
            });

            res.status(201).json({
                message: "Handeling GET requests to /get-total-sales",
                labels: labels,
                chartData: chartData,
                label: 'Total Value of Sales per Day'
            })
        }

    });

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