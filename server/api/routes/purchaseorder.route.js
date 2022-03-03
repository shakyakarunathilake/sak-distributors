const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const MetaData = require("../models/metadata.model")
const PurchaseOrder = require("../models/purchaseorder.model");
const GRN = require("../models/grn.model");
const Supplier = require("../models/supplier.model");
const SupplierPayment = require("../models/supplierpayment.model");

const formDataBody = multer();

//Checks whether the endpoint works
router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Handeling GET requests to /purchaseorders"
    });
});

//Get all table purchaseorder data
router.get("/get-all-purchaseorder-table-data", (req, res, next) => {

    PurchaseOrder
        .find()
        .exec()
        .then(doc => {

            const purchaseorder = doc.slice(0).reverse().map(x => ({
                ponumber: x.ponumber,
                supplier: x.supplier,
                createdby: x.createdby,
                createdat: x.createdat,
                approvedby: x.approvedby,
                approvedat: x.approvedat,
                status: x.status,
            }))

            console.log("PURCHASE ORDER: ", purchaseorder);

            res.status(201).json({
                message: "Handeling GET requests to /get-all-purchaseorder-table-data",
                purchaseorder: purchaseorder,
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })

})

//Get purchase order details by PO Number
router.get("/:ponumber", (req, res, next) => {

    PurchaseOrder
        .findOne({ ponumber: req.params.ponumber })
        .exec()
        .then(doc => {

            const purchaseorder = {
                'ponumber': doc.ponumber,
                'supplier': doc.supplier,
                'givenid': doc.givenid,
                'createdat': doc.createdat,
                'createdby': doc.createdby,
                'customername': doc.customername,
                'customeraddress': doc.customeraddress,
                'contactnumber': doc.contactnumber,
                'approvedat': doc.approvedat,
                'approvedby': doc.approvedby,
                'deliveredat': doc.deliveredat,
                'status': doc.status,
                'items': doc.items,
                'grosstotal': doc.grosstotal,
                'receiveddiscounts': doc.receiveddiscounts,
                'damagedmissingitems': doc.damagedmissingitems,
                'total': doc.total,
            }

            res.status(200).json({
                message: "Handeling GET requests to  purchaseorder/:ponumber",
                purchaseorder: purchaseorder
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ "Error": err });
        })

})

//Create a purchaseorder
router.post("/create-purchaseorder", formDataBody.fields([]), (req, res, next) => {

    const items = JSON.parse(req.body.items);

    const purchaseorder = new PurchaseOrder({
        _id: new mongoose.Types.ObjectId(),
        ponumber: req.body.ponumber,
        customername: req.body.customername,
        customeraddress: req.body.customeraddress,
        contactnumber: req.body.contactnumber,
        supplier: req.body.supplier,
        givenid: req.body.givenid,
        createdat: req.body.createdat,
        createdby: req.body.createdby,
        approvedat: '',
        approvedby: '',
        status: req.body.status,
        deliveredat: '',
        items: items,
        grosstotal: req.body.grosstotal,
        receiveddiscounts: req.body.receiveddiscounts,
        total: req.body.total,
    });

    purchaseorder
        .save()
        .then(result => {

            MetaData
                .findOneAndUpdate(
                    {},
                    {
                        $push: {
                            'noofpurchaseordertobeapproved': {
                                'ponumber': result.ponumber,
                                'createdat': result.createdat,
                                'createdby': result.createdby
                            },
                        },
                    },
                    { upsert: true }
                )
                .exec()
                .then(() => {
                    console.log("******** CREATE PURCHASE ORDER METADATA ADDED ********");
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ "Error": err });
                })

            return result;
        })
        .then(result =>
            res.status(201).json({
                message: "Handeling POST requests to /purchaseorders/create-purchaseorder, PURCHASE ORDER CREATED",
                type: 'success',
                alert: `${result.ponumber} added`,
            })
        )
        .catch(err => {

            console.log("ERROR: ", err);

            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not add purchaseorder`,
            });
        })

});

//Update purchase order details by po number
router.post("/update-by-ponumber/:ponumber", formDataBody.fields([]), (req, res, next) => {

    const items = JSON.parse(req.body.items);

    PurchaseOrder
        .findOneAndUpdate(
            { ponumber: req.params.ponumber },
            {
                'items': items,
                'grosstotal': req.body.grosstotal,
                'total': req.body.total,
                'receiveddiscounts': req.body.receiveddiscounts
            },
            { new: true, upsert: true }
        )
        .exec()
        .then(doc =>
            res.status(200).json({
                message: "Handling POST requests to /purchaseorders/update-by-ponumber/:ponumber, PURCHASE ORDER UPDATED",
                type: 'success',
                alert: `${doc.ponumber} updated`,
            })
        )
        .catch(err => {
            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not update purchase order`,
            });
            console.log(err);
        });
})

//Update purchase order details by po number
router.post("/approve-by-ponumber/:ponumber", formDataBody.fields([]), (req, res, next) => {

    const items = JSON.parse(req.body.items);

    PurchaseOrder
        .findOneAndUpdate(
            { ponumber: req.params.ponumber },
            {
                'items': items,
                'grosstotal': req.body.grosstotal,
                'total': req.body.total,
                'receiveddiscounts': req.body.receiveddiscounts,
                'approvedat': req.body.approvedat,
                'approvedby': req.body.approvedby,
                'status': req.body.status,
            },
            { new: true, upsert: true }
        )
        .exec()
        .then(result => {

            const items = [];

            result.items.forEach(item => {

                items.push({
                    "productid": item.productid,
                    "freeqtycases": item.freeqtycases,
                    "deliveredfreeqtycases": item.deliveredfreeqtycases ? item.deliveredfreeqtycases : item.freeqtycases,
                    "freeqtypieces": item.freeqtypieces,
                    "deliveredfreeqtypieces": item.deliveredfreeqtypieces ? item.deliveredfreeqtypieces : item.freeqtypieces,
                    "damagedfreeqty": 0,
                    "damagedsalesqty": 0,
                    "description": item.description,
                    "piecespercase": parseInt(item.piecespercase),
                    "listprice": item.listprice,
                    "salesqtycases": parseInt(item.salesqtycases),
                    "deliveredsalesqtycases": item.deliveredsalesqtycases ? item.deliveredsalesqtycases : parseInt(item.salesqtycases),
                    "value": item.value,
                    "grnvalue": item.value,
                    "salesqtypieces": parseInt(item.salesqtypieces),
                    "deliveredsalesqtypieces": item.deliveredsalesqtypieces ? item.deliveredsalesqtypieces : parseInt(item.salesqtypieces),
                    "tableData": item.tableData
                })

            });

            const grn = new GRN({
                _id: new mongoose.Types.ObjectId(),
                ponumber: result.ponumber,
                givenid: result.givenid,
                grnnumber: `GRN-${result.ponumber}`,
                supplier: result.supplier,
                status: "Pending",
                items: items,
                createdat: '',
                createdby: '',
                pototal: result.total,
                damagedmissingitems: '0.00',
                grntotal: '0.00'
            });

            grn
                .save()
                .then(
                    console.log("********  APPROVE PURCHASE ORDER ********")
                )
                .catch(err => {
                    console.log("********  APPROVE PURCHASE ORDER GRN ERROR ********");
                    console.log(err);
                })

            return result;

        })
        .then(result => {

            MetaData
                .findOneAndUpdate(
                    {},
                    {
                        $push: {
                            'noofawaitinggrn': {
                                'ponumber': result.ponumber,
                                'grnnumber': `GRN-${result.ponumber}`,
                                'status': result.status,
                            }
                        },
                        $pull: {
                            'noofpurchaseordertobeapproved': {
                                'ponumber': result.ponumber
                            }
                        }
                    },
                    { new: true, upsert: true }
                )
                .exec()
                .then(
                    console.log("********  APPROVE PURCHASE ORDER METADATA ADDED ********")
                )
                .catch(err => {
                    console.log("********  APPROVE PURCHASE ORDER METADATA ERROR ********")
                    console.log(err)
                })

            return result;
        })
        .then(result => {

            const supplierpayment = new SupplierPayment({
                _id: new mongoose.Types.ObjectId(),
                supplier: result.supplier,
                ponumber: result.ponumber,
                grnnumber: '',
                status: 'Advance Payment To Be Paid',
                pogrosstotal: result.grosstotal,
                receiveddiscounts: result.receiveddiscounts,
                pototal: result.total,
                grngrosstotal: '0.00',
                grntotal: '0.00',
                paidamount: '0.00',
                advancepayment: '',
                advancepaymentpaidat: '',
                advancepaymentpaidby: '',
                paymentcompletedat: '',
                paymentcompletedby: '',
                grndamagedmissingitems: '',
                debt: parseInt(result.total),
            });

            supplierpayment
                .save()
                .then(
                    console.log("******** SUPPLIER PAYMENT ADDED ********")
                )
                .catch(err => {
                    res.status(200).json({
                        type: 'error',
                        alert: `Something went wrong. Could not add supplier payment`,
                    });
                    console.log("Error: ", err)
                })

            return result;
        })
        .then(result =>
            res.status(200).json({
                message: "Handling POST requests to /employees/approved-by-ponumber/:ponumber, PURCHASE ORDER APPROVED",
                type: 'success',
                alert: `${result.ponumber} approved`,
            })
        )
        .catch(err => {
            res.status(200).json({
                type: 'error',
                alert: `Something went wrong. Could not approve purchase order`,
            });
            console.log(err);
        });
})

module.exports = router;
