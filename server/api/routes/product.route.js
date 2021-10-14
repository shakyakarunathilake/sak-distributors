const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const multer = require("multer");
const { rawListeners } = require("../models/product.model");

const Product = require("../models/product.model");

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


//Get next product id
router.get("/get-next-product-variant-grn-id", (req, res, next) => {

    function pad(num, size) {
        while (num.length < size) num = "0" + num;
        return "P" + num;
    }

    Product
        .find({}, { productid: 1, _id: 0 })
        .exec()
        .then(doc => {
            const productidarray = doc.map(x => {
                return parseInt(x.productid.slice(1))
            })

            const nextproductid = pad(String(Math.max(...productidarray) + 1), 6);
            const nextvariantid = "PV0001";
            const nextgrnid = "GRN0001";

            console.log("PRODUCT ID: ", nextproductid);
            console.log("VARIANTID: ", nextvariantid);
            console.log("GRN ID:", nextgrnid);

            // res.status(200).json({
            //     message: "Handeling GET requests to /get-next-productid",
            //     nextproductid: nextproductid,
            //     nextvariantid: nextvariantid,
            //     nextgrnid: nextgrnid
            // });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })

})


//Get all table product data
router.get("/get-all-products-table-data", (req, res, next) => {

    Product
        .find()
        .exec()
        .then(doc => {

            const thead = [
                "Prod. ID",
                "Name",
                "Supplier",
                "Var. ID",
                "Price",
                "MRP",
                "Status",
                "Type"
            ]

            const tbody = doc.map(x => [
                x.productid,
                x.name,
                x.supplier,
                x.variants[0].variantid,
                x.variants[0].price,
                x.variants[0].mrp,
                x.variants[0].status,
                x.variants[0].type
            ])

            res.status(201).json({
                message: "Handeling GET requests to /get-all-product-table-data",
                thead: thead,
                tbody: tbody,
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
    console.log("Added Date: ", req.body.addeddate, "Variant Added Date:", req.body.variantaddeddate);

    const addeddate = new Date(req.body.addeddate).toISOString().split('T')[0];
    const variantaddeddate = new Date(req.body.variantaddeddate).toISOString().split('T')[0];

    const product = new Product({
        _id: mongoose.Types.ObjectId(),
        productid: req.body.productid,
        name: req.body.name,
        supplier: req.body.supplier,
        productimage: `localhost:8080/${req.body.productid}.jpg`,
        addeddate: addeddate,
        addedby: req.body.addedby,
        variants: {
            variantid: req.body.variantid,
            type: req.body.type,
            bulkprice: req.body.bulkprice,
            mrp: req.body.mrp,
            price: req.body.price,
            grnid: req.body.grnid,
            offercaption: req.body.offercaption,
            status: req.body.status,
            addeddate: variantaddeddate,
            addedby: req.body.variantaddedby
        },

    })

    product
        .save()
        .then(result => {

            console.log("Product Created: ", result);

            res.status(201).json({
                message: "Handeling POST requests to /products/create-product, PRODUCT SAVED",
                type: 'success',
                alert: `${result.name} (${result.productid}) : ${result.variants[0].variantid} : ${result.variants[0].grnid} added`,
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


//Get product data by Product ID
router.get("/:productid/:variantid", (req, res, next) => {
    const productid = req.params.productid;
    const variantid = req.params.variantid;

    Product
        .findOne({ "productid": productid })
        .exec()
        .then(doc => {

            let result = doc.variants.map(x => {
                if (x.variantid = variantid) {
                    return x
                }
            })

            console.log(result)

            const product = {
                "productid": doc.productid,
                "name": doc.name,
                "supplier": doc.supplier,
                "productimage": doc.productimage,
                "addeddate": doc.addeddate,
                "addedby": doc.addedby,
                "variantid": result[0].variantid,
                "type": result[0].type,
                "bulkprice": result[0].bulkprice,
                "mrp": result[0].mrp,
                "price": result[0].price,
                "grnid": result[0].grnid,
                "offercaption": result[0].offercaption,
                "status": result[0].status,
                "variantaddeddate": result[0].addeddate,
                "variantaddedby": result[0].addedby,
            };

            console.log(product);

            res.status(200).json({
                message: "Handeling GET requests to /:productid/:variantid",
                product: product
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error ": err });
        })
})
module.exports = router;