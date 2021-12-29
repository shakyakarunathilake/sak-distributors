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

            res.status(201).json({
                message: "Handeling POST requests to /gin/create-gin, GIN CREATED",
                type: 'success',
                alert: `${result.ginnumber} added`,
            });
        })
        .catch(err => {

            console.log("CREATE GIN ERROR: ", err);

            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not create GIN`,
            });
        })
})

//Update GIN by GIN Number
// router.post("/update-by-ginnumber/:ginnumber", formDataBody.fields([]), (req, res, next) => {
//     console.log("UPDATE: ", req.body);

//     const items = JSON.parse(req.body.items);

//     GIN
//         .findOneAndUpdate(
//             { "ginnumber": req.params.ginnumber },
//             {
//                 '$set': {
//                     'createdat': req.body.createdat,
//                     'createdby': req.body.createdby,
//                     'status': req.body.status,
//                     'items': items,
//                     'gintotal': req.body.gintotal,
//                 }
//             },
//             { upsert: true }
//         )
//         .exec()
//         .then(doc => {

//             Order
//                 .findOneAndUpdate(
//                     { "orderno": doc.orderno },
//                     {
//                         '$set': {
//                             'status': 'Completed',
//                         }
//                     },
//                     { upsert: true }
//                 )
//                 .exec()
//                 .then(doc => {

//                     console.log("ORDER ADDED: ", doc)

//                     MetaData
//                         .findOneAndUpdate(
//                             {},
//                             {
//                                 $pull: {
//                                     'customerorders': {
//                                         'orderno': doc.orderno
//                                     },
//                                     'awaitinggindata': {
//                                         'orderno': doc.orderno
//                                     },
//                                 }
//                             },
//                             { upsert: true }
//                         )
//                         .exec()
//                         .then(result =>
//                             console.log("META DATA ADDED: ", result)
//                         )
//                         .catch(err => {
//                             console.log(err);
//                             res.status(200).json({
//                                 type: 'error',
//                                 alert: `Something went wrong. Could not update Meta Data `,
//                             })
//                         })
//                 })
//                 .catch(err => {
//                     res.status(200).json({
//                         type: 'error',
//                         alert: `Something went wrong. Could not update relevant Order `,
//                     });
//                     console.log(err);
//                 })

//             res.status(200).json({
//                 message: "Handling POST requests to /gin/update-by-id/:ginnumber, GIN UPDATED",
//                 type: 'success',
//                 alert: `${doc.ginnumber} updated`,
//             });
//         })
//         .catch(err => {
//             res.status(200).json({
//                 type: 'error',
//                 alert: `Something went wrong. Could not update GIN`,
//             });
//             console.log(err);
//         });
// });

module.exports = router;