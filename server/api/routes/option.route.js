const express = require("express");
const router = express.Router();

const { db } = require("../models/product.model");

const Employee = require("../models/employee.model");
const Product = require("../models/product.model");
const Customer = require("../models/customer.model");
const Supplier = require("../models/supplier.model");
const Vehicle = require("../models/vehicle.model");
const Routes = require("../models/routes.model");

//Check whether the endpoint works
router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Handeling GET requests to /options"
    });
});

//Get PO product options
router.get("/product-options-for-purchase-order", (req, res, next) => {

    Product
        .find()
        .exec()
        .then(doc => {

            const data = doc.filter(x => x.status === "Active");

            const productOptions = data.map(x => ({
                productid: x.productid,
                name: x.name,
                supplier: x.supplier,
            }))

            res.status(200).json({
                message: "Handeling GET requests to /product-options-for-purchase-order",
                productOptions: productOptions,
            })
        })
        .catch(err => {
            console.log("ERROR: ", err);
            res.status(500).json({ "Error": err });
        })
})

//Get PO supplier options
router.get("/supplier-options-for-purchase-order", (req, res, next) => {

    Supplier
        .find()
        .exec()
        .then(doc => {

            const supplierOptions = doc.map(x => ({
                id: x.supplierid,
                title: x.name,
                abbreviation: x.abbreviation,
                givenid: x.givenid,
            }))

            res.status(200).json({
                message: "Handeling GET requests to /product-options-for-purchase-order",
                supplierOptions: supplierOptions
            })
        })
        .catch(err => {
            console.log("ERROR: ", err);
            res.status(500).json({ "Error": err });
        })
})

//Get all product options
router.get("/product-options-for-product", (req, res, next) => {

    Product
        .find()
        .exec()
        .then(doc => {
            function getVariantId(str, num, size) {
                var matches = str.match(/\b(\w)/g);
                var acronym = matches.join('');
                while (num.length < size) num = "0" + num;
                return acronym + num;
            }

            const productOptions = doc.map(x => ({
                productid: x.productid,
                name: x.name,
                supplier: x.supplier,
                addedby: x.addedby,
                addeddate: x.addeddate,
                productimage: x.productimage,
                status: x.status,
                variantid: getVariantId(x.name, String(x.variants.length + 1), 4)
            }))

            res.status(200).json({
                message: "Handeling GET requests to /product-options-for-product",
                productOptions: productOptions,
            })
        })
        .catch(err => {
            console.log("ERROR: ", err);
            res.status(500).json({ "Error": err });
        })
})

//Get all product variant options
router.get("/product-variant-options-for-product", (req, res, next) => {

    var pipeline = [
        {
            $unwind: "$variants"
        },
        {
            $match: {
                "variants.type": "General"
            }
        },
        {
            $project: {
                _id: 0,
                productid: "$productid",
                variantid: "$variants.variantid",
                name: "$name"
            }
        }
    ];


    const doc = db.collection('products').aggregate(pipeline);

    doc.toArray((error, result) => {

        if (error) {

            return res.status(500).send(error);

        } else {

            const productVariantOptions = result.map(x =>
                `${x.productid}${x.variantid}-${x.name}`
            )

            res.status(201).json({
                message: "Handeling GET requests to /product-variant-options-for-product",
                productVariantOptions: productVariantOptions,
            })
        }

    });

})


//Get all employee options
router.get("/employee-options-for-product", (req, res, next) => {

    Employee
        .find({ designation: "Purchasing Manager" || "Manager" })
        .exec()
        .then(doc => {

            const employeeOptions = doc.map(x => ({
                title: `${x.employeeid} : ${x.firstname} ${x.lastname} (${x.designation})`,
                id: x.employeeid
            }))

            res.status(201).json({
                message: "Handeling GET requests to /employee-options-for-product",
                employeeOptions: employeeOptions,
            })
        })
        .catch(err => {
            console.log("ERROR: ", err);
            res.status(500).json({ "Error": err });
        })
})

//Get all employee options for admin
router.get("/employee-options-for-admin", (req, res, next) => {

    Employee
        .find()
        .exec()
        .then(doc => {

            const candidates = doc.filter(x =>
                x.employeestatus === 'Active' && x.adminprivileges === false
            );

            const employeeOptions = candidates.map(x => ({
                title: `${x.employeeid} : ${x.firstname} ${x.lastname} (${x.designation})`,
                employeeid: x.employeeid
            }))

            res.status(201).json({
                message: "Handeling GET requests to /employee-options-for-admin",
                employeeOptions: employeeOptions,
            })
        })
        .catch(err => {
            console.log("ERROR: ", err);
            res.status(500).json({ "Error": err });
        })
})

//Get all product options for create order 
router.get("/product-options", (req, res, next) => {

    Product
        .find()
        .exec()
        .then(doc => {

            let productoptions = []

            const data = doc.filter(x => x.status === "Active");

            const getPiecesPerCases = (name) => {

                const relevantProduct = data.filter(x =>
                    x.productid === name.substring(0, 7)
                )

                const relevantVariant = relevantProduct[0].variants.filter(x =>
                    x.variantid === name.substring(7, name.indexOf('-'))
                )

                return relevantVariant[0].piecespercase;
            }

            data.map(product => {

                const activeVariants = product.variants.filter(x => x.status === "Active");

                activeVariants.forEach(variant => {
                    productoptions.push({
                        productid: product.productid,
                        variantid: variant.variantid,
                        name: product.name,
                        mrp: variant.mrp,
                        sellingprice: variant.sellingprice,
                        type: variant.type,
                        offercaption: variant.offercaption,
                        piecespercase: variant.piecespercase,
                        eligibleqty: variant.eligibleqty,
                        eligibleqtytype: variant.eligibleqtytype,
                        freeqty: variant.freeqty,
                        freeqtytype: variant.freeqtytype,
                        discount: variant.discount,
                        freeproductname: variant.freeproductname,
                        title: `${product.productid}${variant.variantid}-${product.name}`,
                        freeproductpiecespercase: variant.freeproductname && getPiecesPerCases(variant.freeproductname)
                    })
                })
            })

            res.status(200).json({
                message: "Handeling GET requests to /product-options",
                productoptions: productoptions,
            })
        })
        .catch(err => {
            console.log("ERROR: ", err);
            res.status(500).json({ "Error": err });
        })
})

//Get all customer options for create order
router.get("/customer-options", (req, res, next) => {

    Customer
        .find()
        .exec()
        .then(doc => {

            const customeroptions = doc.map(x => ({
                "id": x.customerid,
                "storename": x.storename,
                "route": x.route,
                "shippingaddress": x.shippingaddress,
                "contactnumber": x.storecontactnumber,
                "title": `${x.storename} (${x.customerid})`,
                "loyaltypoints": x.loyaltypoints,
                "creditamounttosettle": x.creditamounttosettle.toFixed(2),
                'eligibilityforcredit': ((x.creditamounttosettle === 0) && (x.loyaltypoints > 10)) ? true : false,
            }))

            res.status(201).json({
                message: "Handeling GET requests to /customer-options",
                customeroptions: customeroptions
            })
        })
        .catch(err => {
            console.log("ERROR: ", err);
            res.status(500).json({ "Error": err });
        })
})

//Get all employee options for gin
router.get("/employee-options-for-gin", (req, res, next) => {

    Employee
        .find()
        .exec()
        .then(doc => {

            const candidates = doc.filter(x =>
                x.designation === 'Delivery Representative' && x.employeestatus === 'Active'
            );

            const employeeOptions = candidates.map(x => ({
                title: `${x.firstname} ${x.lastname} (${x.employeeid})`,
                id: x.employeeid
            }))

            res.status(201).json({
                message: "Handeling GET requests to /employee-options-for-gin",
                employeeOptions: employeeOptions,
            })
        })
        .catch(err => {
            console.log("ERROR: ", err);
            res.status(500).json({ "Error": err });
        })
})

//Get all vehicle options for gin
router.get("/vehicle-options-for-gin", (req, res, next) => {

    Vehicle
        .find()
        .exec()
        .then(doc => {

            const candidates = doc.filter(x =>
                x.status === 'Active'
            );

            const vehicleOptions = candidates.map(x => ({
                title: `${x.vehicle} (${x.licenseplatenumber})`,
                id: x.licenseplatenumber
            }))

            res.status(201).json({
                message: "Handeling GET requests to /vehicle-options-for-gin",
                vehicleOptions: vehicleOptions,
            })
        })
        .catch(err => {
            console.log("ERROR: ", err);
            res.status(500).json({ "Error": err });
        })
})

//Get all route options 
router.get("/route-options", (req, res, next) => {

    Routes
        .find()
        .exec()
        .then(doc => {

            const candidates = doc.filter(x =>
                x.status === 'Active'
            );

            const routeOptions = candidates.map(x => ({
                title: x.title,
                id: x.routeid
            }))

            res.status(201).json({
                message: "Handeling GET requests to /route-options",
                routeOptions: routeOptions,
            })
        })
        .catch(err => {
            console.log("ERROR: ", err);
            res.status(500).json({ "Error": err });
        })
})


//Get all supplier options 
router.get("/supplier-options", (req, res, next) => {

    Supplier
        .find()
        .exec()
        .then(doc => {

            const supplierOptions = doc.map(x => ({
                title: x.name,
                id: x.supplierid
            }))

            res.status(201).json({
                message: "Handeling GET requests to /supplier-options",
                supplierOptions: supplierOptions,
            })
        })
        .catch(err => {
            console.log("ERROR: ", err);
            res.status(500).json({ "Error": err });
        })
})

module.exports = router;
