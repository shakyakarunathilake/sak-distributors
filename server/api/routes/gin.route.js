const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const MetaData = require("../models/metadata.model")
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
                orderno: x.orderno,
                ginnumber: x.ginnumber,
                customer: x.customerid ? `${x.storename} (${x.customerid})` : x.storename,
                status: x.status,
            }))

            console.log("TBODY: ", tbody);

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

            const gin = {
                'orderno': doc.orderno,
                'status': doc.status,
                'ginnumber': doc.ginnumber,
                'customer':  doc.customerid ? `${doc.storename} (${doc.customerid})` : doc.storename,
                'createdat': doc.createdat,
                'createdby': doc.createdby,
                'total': doc.total,
                'gintotal': doc.total,
                'items': [
                    {
                        "freeqtycases": doc.items[0].freeqtycases,
                        "deliveringfreeqtycases": doc.items[0].deliveringfreeqtycases ? doc.items[0].deliveringfreeqtycases : doc.items[0].freeqtycases,
                        "freeqtypieces": doc.items[0].freeqtypieces,
                        "deliveringfreeqtypieces": doc.items[0].deliveringfreeqtypieces ? doc.items[0].deliveringfreeqtypieces : doc.items[0].freeqtypieces,
                        "description": doc.items[0].description,
                        "piecespercase": doc.items[0].piecespercase,
                        "price": doc.items[0].price,
                        "salesqtycases": doc.items[0].salesqtycases,
                        "deliveringsalesqtycases": doc.items[0].deliveringsalesqtycases ? doc.items[0].deliveringsalesqtycases : doc.items[0].salesqtycases,
                        "grossamount": doc.items[0].grossamount,
                        "gingrossamount": doc.items[0].grossamount,
                        "salesqtypieces": doc.items[0].salesqtypieces,
                        "deliveringsalesqtypieces": doc.items[0].deliveringsalesqtypieces ? doc.items[0].deliveringsalesqtypieces : doc.items[0].salesqtypieces,
                        "tableData": doc.items[0].tableData
                    }
                ]
            }

            console.log("GIN RECORDS: ", gin);

            res.status(200).json({
                message: "Handeling GET requests to /:ginnumber",
                gin: gin
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })
})

//Update GIN by GIN Number
router.post("/update-by-ginnumber/:ginnumber", formDataBody.fields([]), (req, res, next) => {
    console.log("UPDATE: ", req.body);

    const items = JSON.parse(req.body.items);

    GIN
        .findOneAndUpdate(
            { "ginnumber": req.params.ginnumber },
            {
                '$set': {
                    'createdat': req.body.createdat,
                    'createdby': req.body.createdby,
                    'status': req.body.status,
                    'items': items,
                    'gintotal': req.body.gintotal,
                }
            },
            { upsert: true }
        )
        .exec()
        .then(doc => {

            Order
                .findOneAndUpdate(
                    { "orderno": doc.orderno },
                    {
                        '$set': {
                            'status': 'Completed',
                        }
                    },
                    { upsert: true }
                )
                .exec()
                .then(doc => {

                    console.log("ORDER ADDED: ", doc)

                    MetaData
                        .findOneAndUpdate(
                            {},
                            {
                                $pull: {
                                    'customerorders': {
                                        'orderno': doc.orderno
                                    },
                                    'awaitinggindata': {
                                        'orderno': doc.orderno
                                    },
                                }
                            },
                            { upsert: true }
                        )
                        .exec()
                        .then(result =>
                            console.log("META DATA ADDED: ", result)
                        )
                        .catch(err => {
                            console.log(err);
                            res.status(200).json({
                                type: 'error',
                                alert: `Something went wrong. Could not update Meta Data `,
                            })
                        })
                })
                .catch(err => {
                    res.status(200).json({
                        type: 'error',
                        alert: `Something went wrong. Could not update relevant Order `,
                    });
                    console.log(err);
                })

            res.status(200).json({
                message: "Handling POST requests to /gin/update-by-id/:ginnumber, GIN UPDATED",
                type: 'success',
                alert: `${doc.ginnumber} updated`,
            });
        })
        .catch(err => {
            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not update GIN`,
            });
            console.log(err);
        });
});

module.exports = router;