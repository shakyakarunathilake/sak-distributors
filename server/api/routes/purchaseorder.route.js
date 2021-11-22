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

    console.log("Body: ", req.body);
    console.log("Added Date: ", req.body.createdat);

    const createdat = new Date(req.body.createdat).toISOString().split('T')[0];
    const requesteditems = JSON.parse(req.body.requesteditems);

    const purchaseorder = new PurchaseOrder({
        _id: new mongoose.Types.ObjectId(),
        ponumber: req.body.ponumber,
        supplier: req.body.supplier,
        requesteditems: requesteditems,
        createdat: createdat,
        createdby: req.body.createdby,
        approvedby: req.body.approvedby,
        grosstotal: req.body.grosstotal,
        receiveddiscounts: req.body.receiveddiscounts,
        damagedexpireditems: req.body.damagedexpireditems,
        total: req.body.total,
    });

    const grn = new GRN({
        _id: new mongoose.Types.ObjectId(),
        ponumber: req.body.ponumber,
        grnnumber: `GRN/${req.body.ponumber}`,
        supplier: req.body.supplier,
        status: req.body.status,
        requesteditems: requesteditems,
        createdat: '',
        createdby: '',
        grosstotal: '',
        damagedexpireditems: '',
        total: '',
    });

    purchaseorder
        .save()
        .then(result => {
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

    grn
        .save()
        .then(result => {
            res.status(201).json({
                message: "Handeling POST requests to /purchaseorders/create-purchaseorder, GRN CREATED",
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
                requesteditems: x.requesteditems,
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