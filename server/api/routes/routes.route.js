const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const Routes = require("../models/routes.model");

const formDataBody = multer();

//Checks whether the endpoint works
router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Handeling GET requests to /routes"
    });
});

//Create a route
router.post("/add-route", formDataBody.fields([]), (req, res, next) => {

    const addeddate = new Date(req.body.addeddate).toISOString().split('T')[0];

    const route = new Routes({
        _id: new mongoose.Types.ObjectId(),
        routeid: req.body.routeid,
        title: req.body.title,
        from: req.body.from,
        to: req.body.to,
        status: req.body.status,
        addeddate: addeddate,
        addedby: req.body.addedby
    });

    route
        .save()
        .then(result => {
            res.status(201).json({
                message: "Handeling POST requests to /routes/add-route, ROUTE SAVED",
                type: 'success',
                alert: `${result.title} added`,
                addedRoute: result
            });
        })
        .catch(err => {
            console.log("Error: ", err)
            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not add route`,
            });
        })
});

//Get all table route data
router.get("/get-all-route-table-data", (req, res, next) => {

    Routes
        .find()
        .exec()
        .then(doc => {

            const tbody = doc.map(x => ({
                "routeid": x.routeid,
                "title": x.title,
                "status": x.status,
                "addeddate": x.addeddate,
                "addedby": x.addedby
            }))

            res.status(201).json({
                message: "Handeling GET requests to /get-all-route-table-data",
                tbody: tbody,
            });
        })
        .catch(err => {
            console.log("Error: ", err)
            res.status(500).json({ "Error": err });
        })
})

//Get route data by Route ID
router.get("/:routeid", (req, res, next) => {

    const id = req.params.routeid;

    Routes
        .findOne({ routeid: id })
        .exec()
        .then(doc => {

            const route = {
                "routeid": doc.routeid,
                "from": doc.from,
                "to": doc.to,
                "title": doc.title,
                "status": doc.status,
                "addeddate": doc.addeddate,
                "addedby": doc.addedby
            }

            res.status(200).json({
                message: "Handeling GET requests to /:routeid",
                route: route
            });
        })
        .catch(err => {
            console.log("Error: ", err)
            res.status(500).json({ "Error": err });
        })
})

//Update route data by Route ID
router.post("/update-by-id/:routeid", formDataBody.fields([]), (req, res, next) => {

    Routes
        .findOneAndUpdate(
            { routeid: req.params.routeid },
            req.body,
            { new: true }
        )
        .exec()
        .then(doc => {
            res.status(200).json({
                message: "Handling POST requests to /routes/update-by-id/:routeid, ROUTE UPDATED",
                type: 'success',
                alert: `${doc.title} updated`,
            });
        })
        .catch(err => {
            console.log("Error: ", err)
            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not update route`,
            });
        });
});

module.exports = router;