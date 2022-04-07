const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const Vehicle = require("../models/vehicle.model");

const formDataBody = multer();

//Checks whether the endpoint works
router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Handeling GET requests to /vehicles"
    });
});

//Get all table vehicle data
router.get("/get-all-vehicle-table-data", (req, res, next) => {

    Vehicle
        .find()
        .exec()
        .then(doc => {

            const tbody = doc.map(x => ({
                "licenseplatenumber": x.licenseplatenumber,
                "vehicle": x.vehicle,
                "ownership": x.ownership,
                "vehicleowner": x.vehicleowner,
                "status": x.status,
                "rate": x.rate ? `Rs ${x.rate} / ${x.per}` : ''
            }))

            res.status(201).json({
                message: "Handeling GET requests to /get-all-vehicle-table-data",
                tbody: tbody,
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })
})

//Create a vehicle
router.post("/add-vehicle", formDataBody.fields([]), (req, res, next) => {

    const addeddate = new Date(req.body.addeddate).toISOString().split('T')[0];

    const vehicle = new Vehicle({
        _id: new mongoose.Types.ObjectId(),
        licenseplatenumber: req.body.licenseplatenumber,
        vehicle: req.body.vehicle,
        ownership: req.body.ownership,
        status: req.body.status,
        addedby: req.body.addedby,
        addeddate: addeddate,
        vehicleowner: req.body.vehicleowner,
        address: req.body.address,
        title: req.body.title,
        contactperson: req.body.contactperson,
        contactnumber: req.body.contactnumber,
        rate: req.body.rate,
        per: req.body.per,
    });

    vehicle
        .save()
        .then(result => {
            res.status(201).json({
                message: "Handeling POST requests to /vehicles/create-vehicle, VEHICLE SAVED",
                type: 'success',
                alert: `${result.licenseplatenumber} ${result.vehicle} added`,
            });
        })
        .catch(err => {
            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not add vehicle`,
            });
            console.log("Error: ", err)
        })
});

//Get vehicle data by license plate number
router.get("/:licenseplatenumber", (req, res, next) => {

    Vehicle
        .findOne({ licenseplatenumber: req.params.licenseplatenumber })
        .exec()
        .then(doc => {

            const vehicle = {
                'licenseplatenumber': doc.licenseplatenumber,
                'vehicle': doc.vehicle,
                'ownership': doc.ownership,
                'status': doc.status,
                'addedby': doc.addedby,
                'addeddate': doc.addeddate,
                'vehicleowner': doc.vehicleowner,
                'address': doc.address,
                'title': doc.title,
                'contactperson': doc.contactperson,
                'contactnumber': doc.contactnumber,
                'rate': doc.rate,
                'per': doc.per,
            }

            res.status(200).json({
                message: "Handeling GET requests to /:licenseplatenumber",
                vehicle: vehicle
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })
})

//Update vehicle data by licenses plate number
router.post("/update-by-licenseplatenumber/:licenseplatenumber", formDataBody.fields([]), (req, res, next) => {

    Vehicle
        .findOneAndUpdate(
            { licenseplatenumber: req.params.licenseplatenumber },
            req.body,
            { new: true }
        )
        .exec()
        .then(doc => {
            res.status(200).json({
                message: "Handling POST requests to /vehicles/update-by-licenseplatenumber/:licenseplatenumber, VEHICLE UPDATED",
                type: 'success',
                alert: `${doc.licenseplatenumber} updated`,
            });
        })
        .catch(err => {
            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not update vehicle`,
            });
            console.log(err);
        });
});

module.exports = router;