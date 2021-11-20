const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const PurchaseOrder = require("../models/purchaseorder.model");

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

    const purchaseorder = new PurchaseOrder({
        _id: new mongoose.Types.ObjectId(),
        ponumber: req.body.ponumber,
        supplier: req.body.supplier,
        requesteditems: req.body.requesteditems,
        createdat: createdat
    });

    purchaseorder
        .save()
        .then(result => {
            res.status(201).json({
                message: "Handeling POST requests to /purchaseorders/create-purchaseorder, PURCHASE ORDER CREATED",
                type: 'success',
                alert: `${result.ponumber} ${result.ponumber} added`,
            });
        })
        .catch(err => {
            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not add purchaseorder`,
            });
            console.log("Error: ", err)
        })
});

module.exports = router;