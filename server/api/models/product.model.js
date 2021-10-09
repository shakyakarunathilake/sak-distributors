const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productid: { type: String, required: true },
    name: { type: String, required: true },
    supplier: { type: String, required: true },
    productimage: { type: Object, required: true },
    mrp: { type: String, required: true },
    price: { type: String, required: true },
    mfgdt: { type: String, required: true },
    exp: { type: String, required: true }
})

module.exports = mongoose.model('Product', productSchema);