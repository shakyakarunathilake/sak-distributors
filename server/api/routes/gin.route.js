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

            const tbody = doc.map(x => ({
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
                status: x.status,
                createdby: x.createdby
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
        .then(result => {

            result.ordernumbers.map(order => {

                Order
                    .findOneAndUpdate(
                        { orderno: order.ordernumber },
                        {
                            'status': result.status,
                            'ginnumber': result.ginnumber
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
                                    'orderno': order.ordernumber
                                }
                            }
                        },
                        { upsert: true }
                    )
                    .exec()
                    .then(
                        console.log("**** META DATA ADDED ****")
                    )
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
        .then(doc => {

            doc.items.map(item => {

                const name = item.description.substring(item.description.indexOf("-") + 1);
                let pieces = 0;
                let cases = 0;
                let totalnumberofpieces = 0;

                const getPieces = (noofpieces, piecespercase) => {
                    pieces = noofpieces % piecespercase;
                    return pieces;
                }

                const getCases = (noofpieces, piecespercase) => {
                    cases = Math.floor(noofpieces / piecespercase);
                    return cases;
                }

                const getTotalNumberOfPieces = (itemcases, itempieces, piecespercase) => {
                    totalnumberofpieces = (itemcases * piecespercase) + itempieces;
                    return totalnumberofpieces;
                }

                //GIN Quantities
                let salesqtypieces = getPieces(getTotalNumberOfPieces(item.salesqtycases, item.salesqtypieces, item.piecespercase), item.piecespercase);
                let salesqtycases = getCases(getTotalNumberOfPieces(item.salesqtycases, item.salesqtypieces, item.piecespercase), item.piecespercase);
                let freeqtypieces = getPieces(getTotalNumberOfPieces(item.freeqtycases, item.freeqtypieces, item.piecespercase), item.piecespercase);
                let freeqtycases = getCases(getTotalNumberOfPieces(item.freeqtycases, item.freeqtypieces, item.piecespercase), item.piecespercase);


                Store
                    .findOne({ name: name })
                    .exec()
                    .then(result => {
                        let storesalesqtypieces = result.storequantity.salesqtypieces;
                        let storesalesqtycases = result.storequantity.salesqtycases;
                        let storefreeqtypieces = result.storequantity.freeqtypieces;
                        let storefreeqtycases = result.storequantity.freeqtycases;
                        let newstoresalesqtypieces = 0;
                        let newstoresalesqtycases = 0;
                        let newstorefreeqtypieces = 0;
                        let newstorefreeqtycases = 0;

                        if (storesalesqtypieces < salesqtypieces) {
                            let releasecases = Math.ceil(salesqtypieces / item.piecespercase);
                            newstoresalesqtypieces = storesalesqtypieces + (item.piecespercase * releasecases) - salesqtypieces;
                            newstoresalesqtycases = storesalesqtycases - ((item.piecespercase * releasecases) + salesqtycases);
                        }

                        if (storefreeqtypieces < freeqtypieces) {
                            let releasecases = Math.ceil(freeqtypieces / item.piecespercase);
                            newstorefreeqtypieces = storefreeqtypieces + (item.piecespercase * releasecases) - freeqtypieces;
                            newstorefreeqtycases = storefreeqtycases - ((item.piecespercase * releasecases) + freeqtycases);
                        }

                        Store
                            .findOneAndUpdate(
                                { name: name },
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
                            .then(
                                console.log("**** ITEMS ADDED TO STORE ****")
                            )
                            .catch(err => {
                                res.status(200).json({
                                    type: 'error',
                                    alert: `Something went wrong. Could not update store`,
                                });
                                console.log(err);
                            })

                    })
                    .catch(err => {
                        res.status(200).json({
                            type: 'error',
                            alert: `Something went wrong. Could not update store`,
                        });
                        console.log(err);
                    })
            })

            return doc;
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

// //Update GIN by GIN Number
// router.post("/update-by-ginnumber/:ginnumber", formDataBody.fields([]), (req, res, next) => {

//     GIN
//         .findOneAndUpdate(
//             { "ginnumber": req.params.ginnumber },
//             {
//                 '$set': {
//                     'vehicle': req.body.vehicle,
//                     'incharge': req.body.incharge,
//                 }
//             },
//             { upsert: true }
//         )
//         .exec()
//         .then(doc =>
//             res.status(200).json({
//                 message: "Handling POST requests to /gin/update-by-id/:ginnumber, GIN UPDATED",
//                 type: 'success',
//                 alert: `${doc.ginnumber} updated`,
//             })
//         )
//         .catch(err => {
//             res.status(200).json({
//                 type: 'error',
//                 alert: `Something went wrong. Could not update GIN`,
//             });
//             console.log(err);
//         });
// });

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
// router.post("/approve-complete/:ginnumber", formDataBody.fields([]), (req, res, next) => {

//     GIN
//         .findOneAndUpdate(
//             { "ginnumber": req.params.ginnumber },
//             {
//                 '$set': {
//                     'status': req.body.status,
//                 }
//             },
//             { upsert: true }
//         )
//         .exec()
//         .then(doc =>
//             res.status(200).json({
//                 message: "Handling POST requests to /gin/approve-complete/:ginnumber, GIN STATUS CHANGED TO COMPLETED",
//                 type: 'success',
//                 alert: `${doc.ginnumber} status updated`,
//             })
//         )
//         .catch(err => {
//             res.status(200).json({
//                 type: 'error',
//                 alert: `Something went wrong. Could not update GIN`,
//             });
//             console.log(err);
//         });
// });

module.exports = router;