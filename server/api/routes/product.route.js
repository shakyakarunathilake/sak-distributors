const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const multer = require("multer");

const Product = require("../models/product.model");
const Store = require("../models/store.model");

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
                        variantid: sub.variantid,
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
            console.log(err);
            res.status(500).json({ "Error": err });
        })
})


// Get next product id
router.get("/get-next-productid", (req, res, next) => {

    function pad(num, size) {
        while (num.length < size) num = "0" + num;
        return "P" + num;
    }

    Product
        .find({}, { productid: 1, _id: 0 })
        .exec()
        .then(doc => {

            let nextproductid;

            if (doc.length === 0) {
                nextproductid = "P000001"
            } else {
                const productidarray = doc.map(x => {
                    return parseInt(x.productid.slice(1))
                })
                nextproductid = pad(String(Math.max(...productidarray) + 1), 6);
            }

            res.status(200).json({
                message: "Handeling GET requests to /get-next-productid",
                nextproductid: nextproductid,
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })

})

//Create a product
router.post("/create-product", uploads.single("productimage"), (req, res, next) => {

    console.log("Body: ", req.body);
    console.log("Added Date: ", req.body.addeddate);

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
            })

            store
                .save()
                .then(result => {
                    console.log("****  STORE UPDATED  ****")
                    console.log("STORE UPDATED AS: ", result)
                })
                .catch(err => {
                    console.log("Error: ", err)
                    res.status(200).json({
                        type: 'error',
                        alert: `Something went wrong. Could not update store`
                    });
                });

            return result;
        })
        .then(result => {

            res.status(201).json({
                message: "Handeling POST requests to /products/create-product, PRODUCT SAVED",
                type: 'success',
                alert: `${result.name} (${result.productid}) added`,
                addedProduct: result,
            })
            
        })
        .catch(err => {
            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not add product`
            });
            console.log("Error: ", err)
        })
});

//Create new product variant
router.post("/add-new-variant/:productid", uploads.single("productimage"), (req, res, next) => {

    console.log("FormData: ", req.body);

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
                        'offercaption': req.body.offercaption,
                        'status': req.body.variantstatus,
                        'addeddate': req.body.variantaddeddate,
                        'addedby': req.body.variantaddedby
                    }
                }
            },
            { upsert: true }
        )
        .exec()
        .then(doc => {
            res.status(200).json({
                message: "Handling POST requests to /products/add-new-variant/:productid , VARIANT SAVED",
                type: 'success',
                alert: `${doc.name} (${doc.productid}): ${req.body.variantid} added`,
                addedVariant: doc
            });
        })
        .catch(err => {
            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not update product`,
            });
            console.log(err);
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
            console.log(err);
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
                variant
            }

            console.log("Document: ", doc);
            console.log("Product: ", product);
            console.log("Variant: ", variant);

            res.status(200).json({
                message: "Handeling GET requests to /:productid",
                product: product
            });
        })
        .catch(err => {
            console.log(err);
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
                    'productimage': req.body.productimage,
                    'addeddate': req.body.addeddate,
                    'addedby': req.body.addedby,
                }
            },
            { upsert: true }
        )
        .exec()
        .then(doc => {
            res.status(200).json({
                message: "Handling POST requests to /products/update-by-id/:productid, PRODUCT UPDATED",
                type: 'success',
                alert: `${doc.name} (${doc.productid}) Updated`,
            });
        })
        .catch(err => {
            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not update product`,
            });
            console.log(err);
        });
});

//Update product data by Product ID and Variant ID
router.post("/update-by-id/:productid/:variantid", uploads.single("productimage"), (req, res, next) => {

    Product
        .findOneAndUpdate(
            { "productid": req.params.productid, "variants.variantid": req.params.variantid },
            {
                '$set': {
                    'productid': req.body.productid,
                    'status': req.body.productstatus,
                    'variants.$.type': req.body.type,
                    'variants.$.piecespercase': req.body.piecespercase,
                    'variants.$.bulkprice': req.body.bulkprice,
                    'variants.$.mrp': req.body.mrp,
                    'variants.$.price': req.body.price,
                    'variants.$.offercaption': req.body.offercaption,
                    'variants.$.status': req.body.variantstatus,
                    'variants.$.variantaddeddate': req.body.variantaddeddate,
                    'variants.$.variantaddedby': req.body.variantaddedby
                }
            },
            { upsert: true }
        )
        .exec()
        .then(doc => {
            res.status(200).json({
                message: "Handling POST requests to /products/update-by-id/:productid, PRODUCT UPDATED",
                type: 'success',
                alert: `${doc.name} (${doc.productid}) : ${req.params.variantid} Updated`,
                updatedProduct: doc
            });
        })
        .catch(err => {
            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not update product`,
            });
            console.log(err);
        });
});

module.exports = router;