const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const PurchaseOrder = require("../models/purchaseorder.model");
const GRN = require("../models/grn.model");

const formDataBody = multer();

//Checks whether the endpoint works
router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Handeling GET requests to /purchaseorders"
    });
});

//Create a purchaseorder
router.post("/create-purchaseorder", formDataBody.fields([]), (req, res, next) => {

    console.log("PURCHASE ORDER Body: ", req.body);
    console.log("Added Date: ", req.body.createdat);

    const createdat = new Date(req.body.createdat).toISOString().split('T')[0];
    const items = JSON.parse(req.body.items);

    const purchaseorder = new PurchaseOrder({
        _id: new mongoose.Types.ObjectId(),
        ponumber: req.body.ponumber,
        supplier: req.body.supplier,
        createdat: createdat,
        createdby: req.body.createdby,
        approvedat: req.body.approvedat,
        approvedby: req.body.approvedby,
        status: 'Pending',
        items: items,
        grosstotal: req.body.grosstotal,
        receiveddiscounts: req.body.receiveddiscounts,
        damagedexpireditems: req.body.damagedexpireditems,
        total: req.body.total,
    });

    purchaseorder
        .save()
        .then(result => {

            // const grn = new GRN({
            //     _id: new mongoose.Types.ObjectId(),
            //     ponumber: result.ponumber,
            //     grnnumber: `GRN-${result.ponumber}`,
            //     status: "Pending",
            //     items: items,
            //     addedat: "Pending",
            //     addedby: "Pending",
            //     grosstotal: result.grosstotal,
            //     damagedmissingitems: 0,
            //     total: result.total,
            // });

            // grn
            //     .save()
            //     .then(result => { console.log("GRN CREATED: ", result) })
            //     .catch(err => {
            //         console.log("ERROR: ", err);

            //         res.status(200).json({
            //             type: 'error',
            //             alert: `Something went wrong. Could not add purchaseorder`,
            //         });
            //     })

            res.status(201).json({
                message: "Handeling POST requests to /purchaseorders/create-purchaseorder, PURCHASE ORDER CREATED",
                type: 'success',
                alert: `${result.ponumber} added`,
            });
        })
        .catch(err => {

            console.log("ERROR: ", err);

            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not add purchaseorder`,
            });
        })
});

//Get all table purchaseorder data
router.get("/get-all-purchaseorder-table-data", (req, res, next) => {

    PurchaseOrder
        .find()
        .exec()
        .then(doc => {

            const purchaseorder = doc.map(x => ({
                ponumber: x.ponumber,
                supplier: x.supplier,
                createdby: x.createdby,
                approvedby: x.approvedby,
                status: x.status,
            }))

            console.log("PURCHASE ORDER: ", purchaseorder);

            res.status(201).json({
                message: "Handeling GET requests to /get-all-purchaseorder-table-data",
                purchaseorder: purchaseorder,
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })

})

module.exports = router;