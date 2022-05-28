const express = require("express");
const { db } = require("../models/order.model");
const router = express.Router();

//Checks whether the endpoint works
router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Handeling GET requests to /total-sales"
    });
});

//Get daily total sales analytics
router.get("/daily", (req, res, next) => {

    var today = new Date();
    var first = today.getDate();

    var lastDateTwoWeeksBack = new Date(today.setDate(first));
    var firstDateTwoWeeksBack = new Date(today.setDate(first - 14));

    const firstDate =
        firstDateTwoWeeksBack.getFullYear() + '-' +
        (firstDateTwoWeeksBack.getMonth() > 9 ? firstDateTwoWeeksBack.getMonth() + 1 : `0${firstDateTwoWeeksBack.getMonth() + 1}`) + '-' +
        (firstDateTwoWeeksBack.getDate() > 9 ? firstDateTwoWeeksBack.getDate() : `0${firstDateTwoWeeksBack.getDate()}`);

    const lastDate =
        lastDateTwoWeeksBack.getFullYear() + '-' +
        (lastDateTwoWeeksBack.getMonth() > 9 ? lastDateTwoWeeksBack.getMonth() + 1 : `0${lastDateTwoWeeksBack.getMonth() + 1}`) + '-' +
        (lastDateTwoWeeksBack.getDate() > 9 ? lastDateTwoWeeksBack.getDate() : `0${lastDateTwoWeeksBack.getDate()}`);

    var pipeline = [
        {
            $match: {
                "orderplacedat": {
                    $gte: "2022-04-14",
                    $lte: "2022-04-27"
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
                        'day': "$_id.day",
                    }
                },
                _id: 0
            }
        },
        {
            $sort: {
                date: 1
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

            const label = {
                label: 'Total Value of Sales per Day',
                axisLabelOne: 'Total Value',
                axisLabelTwo: 'Date'
            }

            res.status(201).json({
                message: "Handeling GET requests to /get-total-sales/daily",
                labels: labels,
                chartData: chartData,
                label: label
            })
        }

    });

});

//Get weekly total sales analytics
router.get("/weekly", (req, res, next) => {

    var today = new Date();
    var first = today.getDate();

    var lastDateTwoWeeksBack = new Date(today.setDate(first));
    var firstDateTwoWeeksBack = new Date(today.setDate(first - 56));

    const firstDate =
        firstDateTwoWeeksBack.getFullYear() + '-' +
        (firstDateTwoWeeksBack.getMonth() > 9 ? firstDateTwoWeeksBack.getMonth() + 1 : `0${firstDateTwoWeeksBack.getMonth() + 1}`) + '-' +
        (firstDateTwoWeeksBack.getDate() > 9 ? firstDateTwoWeeksBack.getDate() : `0${firstDateTwoWeeksBack.getDate()}`);

    const lastDate =
        lastDateTwoWeeksBack.getFullYear() + '-' +
        (lastDateTwoWeeksBack.getMonth() > 9 ? lastDateTwoWeeksBack.getMonth() + 1 : `0${lastDateTwoWeeksBack.getMonth() + 1}`) + '-' +
        (lastDateTwoWeeksBack.getDate() > 9 ? lastDateTwoWeeksBack.getDate() : `0${lastDateTwoWeeksBack.getDate()}`);

    var pipeline = [
        {
            $match: {
                "orderplacedat": {
                    $gte: "2022-03-02",
                    $lte: "2022-04-27"
                }
            }
        },
        {
            $group: {
                _id: {
                    week: {
                        $week: {
                            $subtract: [
                                {
                                    $dateFromString: {
                                        dateString: "$orderplacedat"
                                    }
                                },
                                25200000
                            ]
                        }
                    },
                    year: {
                        $year: {
                            $subtract: [
                                {
                                    $dateFromString: {
                                        dateString: "$orderplacedat"
                                    }
                                },
                                25200000
                            ]
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
            $sort: {
                _id: 1
            }
        },
        {
            $project: {
                totalValue: 1,
                startDate: {
                    $dateToString: {
                        date: {
                            $dateFromParts: {
                                isoWeekYear: "$_id.year",
                                isoWeek: "$_id.week"
                            }
                        },
                        format: "%Y-%m-%d",
                    },
                },
                endDate: {
                    $dateToString: {
                        date: {
                            $add: [
                                {
                                    $dateFromParts: {
                                        isoWeekYear: "$_id.year",
                                        isoWeek: "$_id.week"
                                    }
                                },
                                518400000,
                            ],
                        },
                        format: "%Y-%m-%d",
                    },
                },
                _id: 0
            }
        },
    ];

    const doc = db.collection('orders').aggregate(pipeline);

    doc.toArray((error, result) => {

        if (error) {

            return res.status(500).send(error);

        } else {

            const labels = [];
            const chartData = [];

            result.forEach((element) => {
                labels.push(element.startDate + " to " + element.endDate)
                chartData.push(element.totalValue)
            });

            const label = {
                label: 'Total Value of Sales per Day',
                axisLabelOne: 'Total Value',
                axisLabelTwo: 'Week'
            }

            res.status(201).json({
                message: "Handeling GET requests to /total-sales/weekly",
                labels: labels,
                chartData: chartData,
                label: label
            })
        }

    });

});

//Get monthly total sales analytics
router.get("/monthly", (req, res, next) => {

    var today = new Date();
    var first = today.getDate();

    var lastDateTwoWeeksBack = new Date(today.setDate(first));
    var firstDateTwoWeeksBack = new Date(today.setDate(first - 365));

    const firstDate =
        firstDateTwoWeeksBack.getFullYear() + '-' +
        (firstDateTwoWeeksBack.getMonth() > 9 ? firstDateTwoWeeksBack.getMonth() + 1 : `0${firstDateTwoWeeksBack.getMonth() + 1}`) + '-' +
        (firstDateTwoWeeksBack.getDate() > 9 ? firstDateTwoWeeksBack.getDate() : `0${firstDateTwoWeeksBack.getDate()}`);

    const lastDate =
        lastDateTwoWeeksBack.getFullYear() + '-' +
        (lastDateTwoWeeksBack.getMonth() > 9 ? lastDateTwoWeeksBack.getMonth() + 1 : `0${lastDateTwoWeeksBack.getMonth() + 1}`) + '-' +
        (lastDateTwoWeeksBack.getDate() > 9 ? lastDateTwoWeeksBack.getDate() : `0${lastDateTwoWeeksBack.getDate()}`);

    var pipeline = [
        {
            $match: {
                "orderplacedat": {
                    $gte: "2021-04-27",
                    $lte: "2022-04-27"
                }
            }
        },
        {
            $group: {
                _id: {
                    month: {
                        $month: {
                            $subtract: [
                                {
                                    $dateFromString: {
                                        dateString: "$orderplacedat"
                                    }
                                },
                                25200000
                            ]
                        }
                    },
                    year: {
                        $year: {
                            $subtract: [
                                {
                                    $dateFromString: {
                                        dateString: "$orderplacedat"
                                    }
                                },
                                25200000
                            ]
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
            $sort: {
                _id: 1
            }
        },
        {
            $addFields: {
                month: {
                    $let: {
                        vars: {
                            monthsInString: [, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                        },
                        in: {
                            $arrayElemAt: ['$$monthsInString', '$_id.month']
                        }
                    }
                },
                year: "$_id.year"
            },
        },
        {
            $sort: {
                year: 1
            }
        },
        {
            $project: {
                totalValue: 1,
                month: 1,
                year: 1,
                _id: 0
            }
        },
    ];

    const doc = db.collection('orders').aggregate(pipeline);

    doc.toArray((error, result) => {

        if (error) {

            return res.status(500).send(error);

        } else {

            const labels = [];
            const chartData = [];

            result.forEach((element) => {
                labels.push(element.month + " " + element.year)
                chartData.push(element.totalValue)
            });

            const label = {
                label: 'Total Value of Sales per Day',
                axisLabelOne: 'Total Value',
                axisLabelTwo: 'Month'
            }

            res.status(201).json({
                message: "Handeling GET requests to /total-sales/monthly",
                labels: labels,
                chartData: chartData,
                label: label
            })
        }

    });

});

//Get annually total sales analytics
router.get("/annually", (req, res, next) => {

    var today = new Date();
    var first = today.getDate();

    var lastDateTwoWeeksBack = new Date(today.setDate(first));
    var firstDateTwoWeeksBack = new Date(today.setDate(first - 2922));

    const firstDate =
        firstDateTwoWeeksBack.getFullYear() + '-' +
        (firstDateTwoWeeksBack.getMonth() > 9 ? firstDateTwoWeeksBack.getMonth() + 1 : `0${firstDateTwoWeeksBack.getMonth() + 1}`) + '-' +
        (firstDateTwoWeeksBack.getDate() > 9 ? firstDateTwoWeeksBack.getDate() : `0${firstDateTwoWeeksBack.getDate()}`);

    const lastDate =
        lastDateTwoWeeksBack.getFullYear() + '-' +
        (lastDateTwoWeeksBack.getMonth() > 9 ? lastDateTwoWeeksBack.getMonth() + 1 : `0${lastDateTwoWeeksBack.getMonth() + 1}`) + '-' +
        (lastDateTwoWeeksBack.getDate() > 9 ? lastDateTwoWeeksBack.getDate() : `0${lastDateTwoWeeksBack.getDate()}`);

    var pipeline = [
        {
            $match: {
                "orderplacedat": {
                    $gte: "2019-04-27",
                    $lte: "2022-04-27"
                }
            }
        },
        {
            $group: {
                _id: {
                    year: {
                        $year: {
                            $subtract: [
                                {
                                    $dateFromString: {
                                        dateString: "$orderplacedat"
                                    }
                                },
                                25200000
                            ]
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
            $sort: {
                _id: 1
            }
        },
        {
            $project: {
                totalValue: 1,
                year: "$_id.year",
                _id: 0
            }
        },
    ];

    const doc = db.collection('orders').aggregate(pipeline);

    doc.toArray((error, result) => {

        if (error) {

            return res.status(500).send(error);

        } else {

            const labels = [];
            const chartData = [];

            result.forEach((element) => {
                labels.push(element.year)
                chartData.push(element.totalValue)
            });

            const label = {
                label: 'Total Value of Sales per Day',
                axisLabelOne: 'Total Value',
                axisLabelTwo: 'Year'
            }

            res.status(201).json({
                message: "Handeling GET requests to /total-sales/annually",
                labels: labels,
                chartData: chartData,
                label: label
            })
        }

    });

});

module.exports = router;