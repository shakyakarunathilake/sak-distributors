const mongoose = require("mongoose");

const metaDataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    purchaseOrders: [{
        ponumber: { type: String, required: false },
        status: { type: String, required: false },
        createdat: { type: String, required: false },
        createdby: { type: String, required: false },
    }],
    grn: [{
        ponumber: { type: String, required: false },
        grnnumber: { type: String, required: false },
        status: { type: String, required: false },
        createdat: { type: String, required: false },
        createdby: { type: String, required: false },
    }],
    supplierPayments: [{
        ponumber: { type: String, required: false },
        grnnumber: { type: String, required: false },
        status: { type: String, required: false },
    }],
    customerOrders: [{
        orderno: { type: String, required: false },
        route: { type: String, required: false },
        status: { type: String, required: false },
        incharge: { type: String, required: false },
    }],
    gin: [{
        ginnumber: { type: String, required: false },
        status: { type: String, required: false },
        createdby: { type: String, required: false },
        incharge: { type: String, required: false },
    }],
    promotions: [{
        productid: { type: String, required: false },
        name: { type: String, required: false },
        productimage: { type: String, required: false },
        variantid: { type: String, required: false },
        variantstatus: { type: String, required: false },
        offercaption: { type: String, required: false },
        productstatus: { type: String, required: false },
    }],
})

module.exports = mongoose.model('MetaData', metaDataSchema);