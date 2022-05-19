const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const multer = require("multer");

const Product = require("../models/product.model");
const Store = require("../models/store.model");
const MetaData = require("../models/metadata.model");


const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, req.body.productid + ".jpg");
    }
});

const uploads = multer({ storage: storage });

//Check whether the endpoint works
router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Handeling GET requests to /products"
    });
});

//Get all table product data
router.get("/get-all-product-table-data", (req, res, next) => {

    Product
        .find()
        .exec()
        .then(doc => {

            let tbody = []
            let rowid = 1;

            doc.forEach(main => {
                tbody.push({
                    id: rowid,
                    name: main.name,
                    productid: main.productid,
                    status: main.status,
                    supplier: main.supplier
                });

                let parentid = rowid;
                rowid++;

                main.variants.forEach(sub => {
                    tbody.push({
                        id: rowid,
                        parentid: parentid,
                        productid: main.productid,
                        name: main.name,
                        supplier: main.supplier,
                        purchaseprice: sub.purchaseprice,
                        variantid: sub.variantid,
                        offercaption: sub.offercaption,
                        type: sub.type,
                        status: sub.status,
                    })

                    rowid++;
                })
            });

            res.status(201).json({
                message: "Handeling GET requests to /get-all-product-table-data",
                tbody: tbody,
            });
        })
        .catch(err => {
            console.log("ERROR: ", err);
            res.status(500).json({ "Error": err });
        })
})

// Get next product id
router.get("/get-next-productid", (req, res, next) => {

    Product
        .find(
            {},
            {
                productid: 1,
                _id: 0
            }
        )
        .sort({
            productid: 'desc'
        })
        .exec()
        .then(doc => {

            let postfix = "00001";

            if (doc.length && doc.length > 0) {
                const firstelementnumber = doc[0].productid.substring(1, 7);
                postfix = parseInt(firstelementnumber) + 1;
            }

            const nextproductid = 'P' + postfix.toString().padStart(6, '0');

            res.status(200).json({
                message: "Handeling GET requests to /get-next-productid",
                nextproductid: nextproductid,
            });
        })
        .catch(err => {
            console.log("ERROR: ", err);
            res.status(500).json({ "Error": err });
        })

})

//Create a product
router.post("/create-product", uploads.single("productimage"), (req, res, next) => {

    const addeddate = new Date(req.body.addeddate).toISOString().split('T')[0];

    const product = new Product({
        _id: mongoose.Types.ObjectId(),
        productid: req.body.productid,
        name: req.body.name,
        supplier: req.body.supplier,
        productimage: `localhost:8080/${req.body.productid}.jpg`,
        status: req.body.status,
        addeddate: addeddate,
        addedby: req.body.addedby,
    })

    product
        .save()
        .then(result => {

            const store = new Store({
                _id: mongoose.Types.ObjectId(),
                productid: result.productid,
                name: result.name,
                storequantity: {
                    salesqtycases: 0,
                    salesqtypieces: 0,
                    freeqtycases: 0,
                    freeqtypieces: 0,
                }
            })

            store
                .save()
                .then(result => {

                    console.log("********  STORE UPDATED  ********")
                    console.log(result)

                })
                .catch(error => {

                    console.log("******** ERROR WHILE UPDATING THE STORE  ********")
                    console.log(error)

                    res.status(200).json({
                        type: 'error',
                        alert: `Something went wrong. Could not update store`
                    });
                });

            return result;
        })
        .then(result =>

            res.status(201).json({
                message: "Handeling POST requests to /products/create-product, PRODUCT SAVED",
                type: 'success',
                alert: `${result.name} (${result.productid}) added`,
            })

        )
        .catch(err => {
            console.log("Error: ", err)
            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not add product`
            });
        })
});

//Create new product variant
router.post("/add-new-variant/:productid", uploads.single("productimage"), (req, res, next) => {

    Product
        .findOneAndUpdate(
            { "productid": req.params.productid },
            {
                $push: {
                    'variants': {
                        'variantid': req.body.variantid,
                        'type': req.body.type,
                        'piecespercase': req.body.piecespercase,
                        'bulkprice': req.body.bulkprice,
                        'mrp': req.body.mrp,
                        'sellingprice': req.body.sellingprice,
                        'purchaseprice': req.body.purchaseprice,
                        'status': req.body.variantstatus,
                        'eligibleqty': req.body.eligibleqty ? req.body.eligibleqty : '',
                        'eligibleqtytype': req.body.eligibleqtytype ? req.body.eligibleqtytype : '',
                        'freeqty': req.body.freeqty ? req.body.freeqty : '',
                        'freeqtytype': req.body.freeqtytype ? req.body.freeqtytype : '',
                        'discount': req.body.discount ? req.body.discount : '',
                        'freeproductname': req.body.freeproductname ? req.body.freeproductname : '',
                        'offercaption': req.body.offercaption ? req.body.offercaption : '',
                        'addeddate': req.body.variantaddeddate,
                        'addedby': req.body.variantaddedby,
                    }
                }
            },
            { new: true, upsert: true }
        )
        .exec()
        .then(doc => {

            MetaData
                .findOneAndUpdate(
                    {},
                    {
                        $push: {
                            'promotions': {
                                'productid': doc.productid,
                                'name': doc.name,
                                'productstatus': doc.status,
                                'productimage': doc.productimage,
                                'variantid': doc.variants[doc.variants.length - 1].variantid,
                                'variantstatus': doc.variants[doc.variants.length - 1].status,
                                'offercaption': doc.variants[doc.variants.length - 1].offercaption
                            },
                        },
                    },
                    { upsert: true, new: true }
                )
                .exec()
                .then(
                    console.log("META DATA ADDED")
                )
                .catch(error => {
                    console.log("META DATA ERROR: ", error)
                })

            return doc;
        })
        .then(doc =>
            res.status(200).json({
                message: "Handling POST requests to /products/add-new-variant/:productid , VARIANT SAVED",
                type: 'success',
                alert: `${doc.name} (${doc.productid}): ${req.body.variantid} added`,
            })
        )
        .catch(err => {
            console.log("ERROR: ", err);
            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not update product`,
            });
        });
});

//Get product data by Product ID
router.get("/:productid", (req, res, next) => {
    const productid = req.params.productid;

    Product
        .findOne({ "productid": productid })
        .exec()
        .then(doc => {

            const product = {
                "productid": doc.productid,
                "name": doc.name,
                "supplier": doc.supplier,
                "productimage": doc.productimage,
                "addeddate": doc.addeddate,
                "addedby": doc.addedby,
                "status": doc.status,
            };

            res.status(200).json({
                message: "Handeling GET requests to /:productid",
                product: product
            });
        })
        .catch(err => {
            console.log("ERROR: ", err);
            res.status(500).json({ "Error ": err });
        })
})

//Get product data by Product ID and Variant ID
router.get("/:productid/:variantid", (req, res, next) => {
    const productid = req.params.productid;
    const variantid = req.params.variantid;

    Product
        .findOne({ "productid": productid })
        .exec()
        .then(doc => {

            let product = {
                "productid": doc.productid,
                "name": doc.name,
                "supplier": doc.supplier,
                "productimage": doc.productimage,
                "addeddate": doc.addeddate,
                "addedby": doc.addedby,
                "status": doc.status,

            };

            let variant = doc.variants.filter(obj => {
                return obj.variantid === variantid
            })

            variant = variant[0]

            product = {
                ...product,
                'variant': {
                    'variantid': variant.variantid,
                    'type': variant.type,
                    'piecespercase': variant.piecespercase,
                    'bulkprice': variant.bulkprice.toFixed(2),
                    'mrp': variant.mrp.toFixed(2),
                    'sellingprice': variant.sellingprice.toFixed(2),
                    'purchaseprice': variant.purchaseprice.toFixed(2),
                    'status': variant.status,
                    'addeddate': variant.addeddate,
                    'addedby': variant.addedby,
                    'eligibleqty': variant.eligibleqty,
                    'eligibleqtytype': variant.eligibleqtytype,
                    'freeqty': variant.freeqty,
                    'freeqtytype': variant.freeqtytype,
                    'discount': variant.discount,
                    'freeproductname': variant.freeproductname,
                    'offercaption': variant.offercaption,
                }
            }

            res.status(200).json({
                message: "Handeling GET requests to /:productid",
                product: product
            });
        })
        .catch(err => {
            console.log("ERROR: ", err);
            res.status(500).json({ "Error ": err });
        })
})

//Update product data by Product ID
router.post("/update-by-id/:productid", uploads.single("productimage"), (req, res, next) => {

    Product
        .findOneAndUpdate(
            { "productid": req.params.productid },
            {
                '$set': {
                    'name': req.body.name,
                    'status': req.body.status,
                    'supplier': req.body.supplier,
                    'productimage': `localhost:8080/${req.params.productid}.jpg`,
                }
            },
            { new: true, upsert: true }
        )
        .exec()
        .then(doc => {

            MetaData
                .findOneAndUpdate(
                    { 'promotions.productid': doc.productid },
                    {
                        $set: {
                            'promotions.$.name': doc.name,
                            'promotions.$.productstatus': doc.status,
                            'promotions.$.productimage': doc.productimage,
                        },
                    },
                    { upsert: true, new: true }
                )
                .exec()
                .then(doc =>
                    console.log("META DATA ADDED")
                )
                .catch(error => {
                    console.log("META DATA ERROR: ", error)
                })

            return doc;
        })
        .then(doc => {

            Store
                .findOneAndUpdate(
                    { "productid": doc.productid },
                    {
                        '$set': {
                            'name': doc.name,
                        }
                    },
                    { new: true, upsert: true }
                )
                .exec()
                .then(() =>
                    console.log("********  STORE UPDATED  ********")
                )
                .catch(error => {

                    console.log("******** ERROR WHILE UPDATING THE STORE  ********")
                    console.log(error)

                    res.status(200).json({
                        type: 'error',
                        alert: `Something went wrong. Could not update store`
                    });
                });

            return doc;
        })
        .then(doc =>
            res.status(200).json({
                message: "Handling POST requests to /products/update-by-id/:productid, PRODUCT UPDATED",
                type: 'success',
                alert: `${doc.name} (${doc.productid}) Updated`,
            })
        )
        .catch(err => {
            console.log("ERROR: ", err);
            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not update product`,
            });
        });
});

//Update product data by Product ID and Variant ID
router.post("/update-by-id/:productid/:variantid", uploads.single("productimage"), (req, res, next) => {

    Product
        .findOneAndUpdate(
            { "productid": req.params.productid, "variants.variantid": req.params.variantid },
            {
                '$set': {
                    'variants.$.type': req.body.type,
                    'variants.$.piecespercase': req.body.piecespercase,
                    'variants.$.bulkprice': req.body.bulkprice,
                    'variants.$.purchaseprice': req.body.purchaseprice,
                    'variants.$.sellingprice': req.body.sellingprice,
                    'variants.$.mrp': req.body.mrp,
                    'variants.$.status': req.body.variantstatus,
                    'variants.$.eligibleqty': req.body.eligibleqty ? req.body.eligibleqty : '',
                    'variants.$.eligibleqtytype': req.body.eligibleqtytype ? req.body.eligibleqtytype : '',
                    'variants.$.freeqty': req.body.freeqty ? req.body.freeqty : '',
                    'variants.$.freeqtytype': req.body.freeqtytype ? req.body.freeqtytype : '',
                    'variants.$.discount': req.body.discount ? req.body.discount : '',
                    'variants.$.freeproductname': req.body.freeproductname ? req.body.freeproductname : '',
                    'variants.$.offercaption': req.body.offercaption ? req.body.offercaption : '',
                }
            },
            { upsert: true, new: true }
        )
        .exec()
        .then(doc => {

            const variant = doc.variants.filter(x => x.variantid === req.params.variantid)

            if (variant.type !== "General") {

                MetaData
                    .findOneAndUpdate(
                        { 'promotions.productid': req.params.productid, 'promotions.variantid': req.params.variantid },
                        {
                            $set: {
                                'promotions.$.variantstatus': variant[0].status,
                                'promotions.$.offercaption': variant[0].offercaption
                            },
                        },
                        { new: true }
                    )
                    .exec()
                    .then(
                        console.log("META DATA ADDED")
                    )
                    .catch(error => {
                        console.log("META DATA ERROR: ", error)
                    })
            }

            return doc;
        })
        .then(doc => {

            res.status(200).json({
                message: "Handling POST requests to /products/update-by-id/:productid, PRODUCT UPDATED",
                type: 'success',
                alert: `${doc.name} (${doc.productid}) : ${req.params.variantid} Updated`,
            })
        })
        .catch(err => {
            console.log("ERROR: ", err);
            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not update product`,
            });
        });
});

module.exports = router;