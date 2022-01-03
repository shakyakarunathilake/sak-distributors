const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const Order = require("../models/order.model");
const GIN = require("../models/gin.model");

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

            const tbody = doc.map(x => ({
                ginnumber: x.ginnumber,
                route: x.route,
                incharge: x.incharge,
                status: x.status
            }))

            res.status(201).json({
                message: "Handeling GET requests to /get-all-gin-table-data",
                tbody: tbody,
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })

})

router.get("/get-all-gin-table-data/:employee", (req, res, next) => {

    GIN
        .find({ incharge: req.params.employee })
        .exec()
        .then(doc => {

            const candidates = doc.filter(x => x.status === "Dispatched" || "Complete")

            const tbody = candidates.map(x => ({
                ginnumber: x.ginnumber,
                route: x.route,
                incharge: x.incharge,
                status: x.status
            }))

            res.status(201).json({
                message: "Handeling GET requests to /get-all-gin-table-data",
                tbody: tbody,
            });
        })
        .catch(err => {
            console.log(err);
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
            console.log(err);
            res.status(500).json({ "Error": err });
        })
})

//Create GIN
router.post("/create-gin", formDataBody.fields([]), (req, res, next) => {

    const items = JSON.parse(req.body.items);
    const ordernumbers = JSON.parse(req.body.ordernumbers);

    console.log(req.body)

    const gin = new GIN({
        _id: new mongoose.Types.ObjectId(),
        ginnumber: req.body.ginnumber,
        createdat: req.body.createdat,
        createdby: req.body.createdby,
        route: req.body.route,
        vehicle: req.body.vehicle,
        incharge: req.body.incharge,
        ordernumbers: ordernumbers,
        items: items,
        total: req.body.total,
        status: req.body.status
    })

    gin
        .save()
        .then(result => {

            result.ordernumbers.map(order => {

                Order
                    .findOneAndUpdate(
                        { orderno: order },
                        {
                            'status': result.status,
                        },
                        { new: true }
                    )
                    .exec()
                    .then(doc => {
                        console.log("ORDER STATUS UPDATED: ", doc);
                    })
                    .catch(err => {

                        console.log("ORDER STATUS UPDATE ERROR: ", err);

                        res.status(200).json({
                            type: 'error',
                            alert: `Something went wrong. Could not update order status`,
                        });
                    });
            })

            return result;

        })
        .then(result => {

            result.ordernumbers.map(order => {

                MetaData
                    .findOneAndUpdate(
                        {},
                        {
                            $pull: {
                                'noofcustomerorders': {
                                    'orderno': order
                                }
                            }
                        },
                        { upsert: true }
                    )
                    .exec()
                    .then(doc => {
                        console.log("****** META DATA ADDED ******");
                        console.log(doc);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(200).json({
                            type: 'error',
                            alert: `Something went wrong. Could not update Meta Data `,
                        })
                    });
            })

            return result;
        })
        .then(result =>
            res.status(201).json({
                message: "Handeling POST requests to /gin/create-gin, GIN CREATED",
                type: 'success',
                alert: `${result.ginnumber} added`,
            })
        )
        .catch(err => {

            console.log("CREATE GIN ERROR: ", err);

            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not create GIN`,
            });
        })
})

//Update GIN by GIN Number
router.post("/update-by-ginnumber/:ginnumber", formDataBody.fields([]), (req, res, next) => {

    GIN
        .findOneAndUpdate(
            { "ginnumber": req.params.ginnumber },
            {
                '$set': {
                    'vehicle': req.body.vehicle,
                    'incharge': req.body.incharge,
                }
            },
            { upsert: true }
        )
        .exec()
        .then(doc =>
            res.status(200).json({
                message: "Handling POST requests to /gin/update-by-id/:ginnumber, GIN UPDATED",
                type: 'success',
                alert: `${doc.ginnumber} updated`,
            })
        )
        .catch(err => {
            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not update GIN`,
            });
            console.log(err);
        });
});

//Approve dispatch GIN by GIN Number
router.post("/approve-dispatch/:ginnumber", formDataBody.fields([]), (req, res, next) => {

    GIN
        .findOneAndUpdate(
            { "ginnumber": req.params.ginnumber },
            {
                '$set': {
                    'status': req.body.status,
                }
            },
            { upsert: true }
        )
        .exec()
        .then(doc => {

            const incharge = doc.incharge;

            doc.ordernumbers.map(orderno => {

                Order
                    .findOneAndUpdate(
                        { "orderno": orderno },
                        {
                            '$set': {
                                'status': 'Dispatched',
                                'deliveredby': incharge,
                            }
                        },
                        { upsert: true }
                    )
                    .exec()
                    .then(doc =>
                        console.log("UPDATED ORDER STATUS OF ORDER NUMBER: ", doc.orderno)
                    )
                    .catch(err => {
                        res.status(200).json({
                            type: 'error',
                            alert: `Something went wrong. Could not update status of relevant orders`,
                        });
                        console.log(err);
                    });

            });

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
            console.log(err);
        });
});


//Approve complete GIN by GIN Number
router.post("/approve-complete/:ginnumber", formDataBody.fields([]), (req, res, next) => {

    GIN
        .findOneAndUpdate(
            { "ginnumber": req.params.ginnumber },
            {
                '$set': {
                    'status': req.body.status,
                }
            },
            { upsert: true }
        )
        .exec()
        .then(doc =>
            res.status(200).json({
                message: "Handling POST requests to /gin/approve-complete/:ginnumber, GIN STATUS CHANGED TO COMPLETED",
                type: 'success',
                alert: `${doc.ginnumber} status updated`,
            })
        )
        .catch(err => {
            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not update GIN`,
            });
            console.log(err);
        });
});

module.exports = router;