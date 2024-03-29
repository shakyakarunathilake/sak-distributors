const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const Order = require("../models/order.model");
const GIN = require("../models/gin.model");
const MetaData = require("../models/metadata.model");
const Store = require("../models/store.model");

const formDataBody = multer();

//Checks whether the endpoint works
router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Handeling GET requests to /gin"
    });
});

//Get all table gin data
router.get("/get-all-gin-table-data", (req, res, next) => {

    GIN
        .find()
        .exec()
        .then(doc => {

            const tbody = doc.slice(0).reverse().map(x => ({
                ginnumber: x.ginnumber,
                route: x.route,
                incharge: x.incharge,
                status: x.status,
                createdby: x.createdby
            }))

            res.status(201).json({
                message: "Handeling GET requests to /get-all-gin-table-data",
                tbody: tbody,
            });
        })
        .catch(err => {
            console.log("Error: ", err)
            res.status(500).json({ "Error": err });
        })

})

router.get("/get-all-gin-table-data/:employee", (req, res, next) => {

    GIN
        .find({ incharge: req.params.employee })
        .exec()
        .then(doc => {

            const candidates = doc.filter(x => x.status === "Dispatched" || "Complete")

            const tbody = candidates.slice(0).reverse().map(x => ({
                ginnumber: x.ginnumber,
                route: x.route,
                incharge: x.incharge,
                status: x.status,
                createdby: x.createdby
            }))

            res.status(201).json({
                message: "Handeling GET requests to /get-all-gin-table-data",
                tbody: tbody,
            });
        })
        .catch(err => {
            console.log("Error: ", err)
            res.status(500).json({ "Error": err });
        })

})

//Get gin data by ginnumber
router.get("/:ginnumber", (req, res, next) => {
    const id = req.params.ginnumber;

    GIN
        .findOne({ ginnumber: id })
        .exec()
        .then(doc => {
            res.status(200).json({
                message: "Handeling GET requests to /:ginnumber",
                gin: doc
            });
        })
        .catch(err => {
            console.log("Error: ", err)
            res.status(500).json({ "Error": err });
        })
})

//Create GIN
router.post("/create-gin", formDataBody.fields([]), (req, res, next) => {

    const items = JSON.parse(req.body.items);
    const ordernumbers = JSON.parse(req.body.ordernumbers);

    const gin = new GIN({
        _id: new mongoose.Types.ObjectId(),
        ginnumber: req.body.ginnumber,
        createdat: req.body.createdat,
        createdby: req.body.createdby,
        route: req.body.route,
        ordernumbers: ordernumbers,
        items: items,
        total: req.body.total,
        status: req.body.status,
        incharge: '',
        vehicle: ''
    })

    gin
        .save()
        .then(doc => {

            doc.ordernumbers.map(order => {

                Order
                    .findOneAndUpdate(
                        { orderno: order.ordernumber },
                        {
                            'status': doc.status,
                            'ginnumber': doc.ginnumber
                        },
                        { new: true, upsert: true }
                    )
                    .exec()
                    .then(
                        console.log("**** ORDER STATUS UPDATED ****")
                    )
                    .catch(err => {

                        console.log("ORDER STATUS UPDATE ERROR: ", err);

                        res.status(200).json({
                            type: 'error',
                            alert: `Something went wrong. Could not update order status`,
                        });
                    });
            })

            return doc;

        })
        .then(doc => {

            doc.ordernumbers.map(order => {

                MetaData
                    .findOneAndUpdate(
                        { 'customerOrders.orderno': order.ordernumber },
                        {
                            $set: {
                                'customerOrders.$.status': doc.status
                            }
                        },
                        { upsert: true }
                    )
                    .exec()
                    .then(
                        console.log("**** META DATA ADDED ****")
                    )
                    .catch(err => {
                        console.log("**** META DATA ERROR ****")
                        console.log(err);
                    });
            })

            return doc;
        })
        .then(doc => {

            MetaData
                .findOneAndUpdate(
                    {},
                    {
                        $push: {
                            'gin': {
                                'ginnumber': doc.ginnumber,
                                'status': doc.status,
                                'createdby': doc.createdby,
                                'incharge': ''
                            }
                        }
                    },
                    { upsert: true }
                )
                .exec()
                .then(
                    console.log("******** META DATA ADDED ********")
                )
                .catch(err => {
                    console.log("******** META DATA ERROR!!!!! ********");
                    console.log(err);
                });

            return doc;
        })
        .then(doc => {

            doc.items.map((item, i) => {

                Store
                    .findOne({ productid: item.productid })
                    .exec()
                    .then(result => {

                        let storesalesqtypieces = result.storequantity.salesqtypieces;
                        let storesalesqtycases = result.storequantity.salesqtycases;
                        let storefreeqtypieces = result.storequantity.freeqtypieces;
                        let storefreeqtycases = result.storequantity.freeqtycases;

                        let newNoOfTotalSalesPieces = (storesalesqtycases * item.piecespercase) + storesalesqtypieces - (item.salesqtycases * item.piecespercase) - item.salesqtypieces;
                        let newNoOfTotalFreePieces = (storefreeqtycases * item.piecespercase) + storefreeqtypieces - (item.freeqtycases * item.piecespercase) - item.freeqtypieces;

                        let newstoresalesqtypieces = newNoOfTotalSalesPieces % item.piecespercase;
                        let newstorefreeqtypieces = newNoOfTotalFreePieces % item.piecespercase;
                        let newstoresalesqtycases = 0;
                        let newstorefreeqtycases = 0;

                        if (storesalesqtycases > 0) {
                            newstoresalesqtycases = Math.floor(newNoOfTotalSalesPieces / item.piecespercase);
                        } else {
                            newstoresalesqtycases = Math.ceil(newNoOfTotalSalesPieces / item.piecespercase);
                        }

                        if (storesalesqtycases > 0) {
                            newstorefreeqtycases = Math.floor(newNoOfTotalFreePieces / item.piecespercase);
                        } else {
                            newstorefreeqtycases = Math.ceil(newNoOfTotalFreePieces / item.piecespercase);
                        }

                        Store
                            .findOneAndUpdate(
                                { productid: item.productid },
                                {
                                    $set: {
                                        'storequantity.salesqtypieces': newstoresalesqtypieces,
                                        'storequantity.salesqtycases': newstoresalesqtycases,
                                        'storequantity.freeqtypieces': newstorefreeqtypieces,
                                        'storequantity.freeqtycases': newstorefreeqtycases,
                                    },
                                    $push: {
                                        'grngin': {
                                            'grnnumberginnumber': doc.ginnumber,
                                            'date': doc.createdat,
                                            'piecespercase': item.piecespercase,
                                            'listorsellingprice': item.sellingprice,
                                            'salesqtycases': item.salesqtycases,
                                            'salesqtypieces': item.salesqtypieces,
                                            'freeqtycases': item.freeqtycases,
                                            'freeqtypieces': item.freeqtypieces,
                                        }
                                    }
                                },
                                { new: true, upsert: true }
                            )
                            .exec()
                            .then()
                            .catch(err =>
                                console.log("Error: ", err)
                            )

                    })
                    .catch(err => {
                        console.log("******** STORE UPDATE ERROR!!!!! ********");
                        console.log(err);
                    })
            })

            return doc;
        })
        .then(doc =>

            res.status(201).json({
                message: "Handeling POST requests to /gin/create-gin, GIN CREATED",
                type: 'success',
                alert: `${doc.ginnumber} added`,
            })
        )
        .catch(err => {

            console.log("******** CREATE GIN ERROR!!!!! ********");
            console.log(err);

            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not create GIN`,
            });
        })
})

//Approve dispatch GIN by GIN Number
router.post("/approve-dispatch/:ginnumber", formDataBody.fields([]), (req, res, next) => {

    GIN
        .findOneAndUpdate(
            { "ginnumber": req.params.ginnumber },
            {
                '$set': {
                    'status': req.body.status,
                    'vehicle': req.body.vehicle,
                    'incharge': req.body.incharge,
                }
            },
            { new: true, upsert: true }
        )
        .exec()
        .then(doc => {

            const incharge = doc.incharge;

            doc.ordernumbers.map(order => {

                Order
                    .findOneAndUpdate(
                        { "orderno": order.ordernumber },
                        {
                            '$set': {
                                'status': 'Dispatched',
                                'deliveredby': incharge,
                            }
                        },
                        { new: true, upsert: true }
                    )
                    .exec()
                    .then(
                        console.log("**** UPDATED ORDER STATUS OF ORDER NUMBER ****")
                    )
                    .catch(err => {
                        console.log("Error: ", err)
                        res.status(200).json({
                            type: 'error',
                            alert: `Something went wrong. Could not update status of relevant orders`,
                        });
                    });

            });

            return doc;
        })
        .then(doc => {

            MetaData
                .findOneAndUpdate(
                    { 'gin.ginnumber': doc.ginnumber },
                    {
                        $set: {
                            'gin.$.status': doc.status,
                            'gin.$.incharge': doc.incharge
                        }
                    },
                    { upsert: true }
                )
                .exec()
                .then(
                    console.log("******** META DATA ADDED ********")
                )
                .catch(err => {
                    console.log("Error: ", err)
                });

            return doc;
        })
        .then(doc => {

            doc.ordernumbers.map(order => {

                MetaData
                    .findOneAndUpdate(
                        { 'customerOrders.orderno': order.ordernumber },
                        {
                            $set: {
                                'customerOrders.$.status': doc.status,
                                'customerOrders.$.incharge': doc.incharge
                            }
                        },
                        { upsert: true }
                    )
                    .exec()
                    .then(
                        console.log("**** META DATA ADDED ****")
                    )
                    .catch(err => {
                        console.log("Error: ", err)
                    });
            })

            return doc;
        })
        .then(doc =>
            res.status(200).json({
                message: "Handling POST requests to /gin/approve-dispatch/:ginnumber, GIN STATUS CHANGED TO DISPATCHED",
                type: 'success',
                alert: `${doc.ginnumber} status updated`,
            })
        )
        .catch(err => {
            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not update GIN`,
            });
            console.log("Error: ", err)
        });
});

module.exports = router;