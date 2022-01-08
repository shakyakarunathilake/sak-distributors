const { Decimal128 } = require("mongodb");
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
        piecespercase: { type: Number, required: true },
        bulkprice: { type: Decimal128 , required: true },
        mrp: { type: Decimal128, required: true },
        purchaseprice: { type: Decimal128, required: true },
        sellingprice: { type: Decimal128, required: true },
        offercaption: { type: String, required: false },
        status: { type: String, required: true },
        addeddate: { type: String, required: true },
        addedby: { type: String, required: true },
    }]
})

module.exports = mongoose.model('Product', productSchema);