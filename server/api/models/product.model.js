const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productid: { type: String, required: true },
    name: { type: String, required: true },
    supplier: { type: String, required: true },
    productimage: { type: Object, required: false },
    addeddate: { type: String, required: true },
    addedby: { type: String, required: true },
    status: { type: String, required: true },
    variants: [{
        variantid: { type: String, required: true },
        type: { type: String, required: true },
        piecespercase: { type: String, required: true },
        bulkprice: { type: Number, required: true },
        mrp: { type: Number, required: true },
        purchaseprice: { type: Number, required: true },
        sellingprice: { type: Number, required: true },
        offercaption: { type: String, required: false },
        status: { type: String, required: true },
        addeddate: { type: String, required: true },
        addedby: { type: String, required: true },
    }]
})

module.exports = mongoose.model('Product', productSchema);