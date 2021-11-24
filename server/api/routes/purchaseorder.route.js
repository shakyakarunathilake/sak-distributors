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
        items: items,
        approvedby: req.body.approvedby,
        grosstotal: req.body.grosstotal,
        receiveddiscounts: req.body.receiveddiscounts,
        damagedexpireditems: req.body.damagedexpireditems,
        total: req.body.total,
    });

    purchaseorder
        .save()
        .then(result => {

            const grn = new GRN({
                _id: new mongoose.Types.ObjectId(),
                ponumber: result.ponumber,
                grnnumber: `GRN-${result.ponumber}`,
                supplier: result.supplier,
                status: "Pending",
                items: items,
                pocreatedat: createdat,
                pocreatedby: result.createdby,
                createdat: "Pending",
                createdby: "Pending",
                grosstotal: result.grosstotal,
                receiveddiscounts: result.receiveddiscounts,
                damagedexpireditems: result.damagedexpireditems,
                total: result.total,
                grntotal: "Pending",
            });

            grn
                .save()
                .then(result => { console.log("GRN CREATED: ", result) })
                .catch(err => {
                    console.log("ERROR: ", err);

                    res.status(200).json({
                        type: 'error',
                        alert: `Something went wrong. Could not add purchaseorder`,
                    });
                })

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

            const tbody = doc.map(x => ({
                ponumber: x.ponumber,
                supplier: x.supplier,
                status: x.status,
                items: x.items,
                createdby: x.createdby,
                createdat: x.createdat,
                approvedby: x.approvedby,
                grosstotal: x.grosstotal,
                receiveddiscounts: x.receiveddiscounts,
                damagedexpireditems: x.damagedexpireditems,
                total: x.total,
            }))

            console.log("TBODY: ", tbody);

            res.status(201).json({
                message: "Handeling GET requests to /get-all-purchaseorder-table-data",
                tbody: tbody,
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })

})

module.exports = router;