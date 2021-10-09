const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const Product = require("../models/product.model");

const formDataBody = multer();

//Check whether the endpoint works
router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Handeling GET requests to /products"
    });
});

module.exports = router;