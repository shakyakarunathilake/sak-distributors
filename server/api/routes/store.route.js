const express = require("express");
const router = express.Router();

const Store = require("../models/store.model");
const { db } = require("../models/store.model");


//Check whether the endpoint works
router.get("/", (req, res, next) =>
    res.status(200).json({
        message: "Handeling GET requests to /store"
    })
);

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
                    productid: product.productid,
                    name: product.name,
                    racknumber: product.racknumber,
                    cases: parseInt(product.storequantity.salesqtycases) + parseInt(product.storequantity.freeqtycases),
                    pieces: parseInt(product.storequantity.salesqtypieces) + parseInt(product.storequantity.freeqtypieces),
                    // freeqtycases: product.storequantity.freeqtycases,
                    // freeqtypieces: product.storequantity.freeqtypieces,
                });

                let parentid = rowid;
                rowid++;

                product.grngin.forEach(details => {
                    tbody.push({
                        id: rowid,
                        parentid: parentid,
                        productid: product.productid,
                        name: product.name,
                        listorsellingprice: details.listorsellingprice,
                        grnnumberginnumber: details.grnnumberginnumber,
                        date: details.date,
                        piecespercase: details.piecespercase,
                        damagedqty: details.damagedsalesqty ? `${details.damagedsalesqty} / ${details.damagedfreeqty}` : '-',
                        cases: `${details.salesqtycases} / ${details.freeqtycases}`,
                        pieces: `${details.salesqtypieces} / ${details.freeqtypieces}`,
                        // freeqtycases: details.freeqtycases,
                        // freeqtypieces: details.freeqtypieces,
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
            console.log("Error: ", err);
            res.status(500).json({ "Error": err });
        })
})

//Get all missing product details
router.get("/get-all-missing-product-details", (req, res, next) => {

    var pipeline = [
        {
            $project: {
                _id: false,
                productid: true,
                name: true,
                storecasequantity: {
                    $add: [
                        '$storequantity.salesqtycases',
                        '$storequantity.freeqtycases'
                    ]
                },
                storepiecesquantity: {
                    $add: [
                        '$storequantity.salesqtypieces',
                        '$storequantity.freeqtypieces'
                    ]
                },
            }
        },
        {
            $match: {
                storecasequantity: { $lte: 6 },
            }
        },
        {
            $lookup: {
                from: "products",
                localField: "productid",
                foreignField: "productid",
                as: "productdetails"
            }
        },
        {
            $project: {
                productid: true,
                name: true,
                storecasequantity: true,
                storepiecesquantity: true,
                supplier: { $arrayElemAt: ['$productdetails.supplier', 0] },
                productimage: { $arrayElemAt: ['$productdetails.productimage', 0] }
            }
        }
    ]

    const doc = db.collection('stores').aggregate(pipeline);

    doc.toArray((error, result) => {

        if (error) {
            return res.status(500).send(error);

        } else {
            res.status(201).json({
                message: "Handeling GET requests to /get-all-missing-product-details",
                missingProducts: result
            })
            
        }

    });
})



module.exports = router;