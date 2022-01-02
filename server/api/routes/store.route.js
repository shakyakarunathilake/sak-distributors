const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Store = require("../models/store.model");


//Check whether the endpoint works
router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Handeling GET requests to /store"
    });
});

//Get all table store data
router.get("/get-all-store-table-data", (req, res, next) => {

    Store
        .find()
        .exec()
        .then(doc => {

            let tbody = []
            let rowid = 1;

            doc.forEach(product => {
                tbody.push({
                    id: rowid,
                    name: product.name,
                    productid: product.productid,
                });

                let parentid = rowid;
                rowid++;

                product.storequantity.forEach(details => {
                    tbody.push({
                        id: rowid,
                        parentid: parentid,
                        productid: product.productid,
                        name: product.name,
                        grnginnumber: details.grnginnumber,
                        date: details.date,
                        piecespercase: details.piecespercase,
                        salesqtycases: details.salesqtycases,
                        salesqtypieces: details.salesqtypieces,
                        freeqtycases: details.freeqtycases,
                        freeqtypieces: details.freeqtypieces,
                        damaged: details.damaged,
                        returned: details.returned
                    })

                    rowid++;
                })
            });

            res.status(201).json({
                message: "Handeling GET requests to /get-all-store-table-data",
                tbody: tbody,
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })
})




module.exports = router;