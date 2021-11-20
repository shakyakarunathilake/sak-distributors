const mongoose = require("mongoose");

const purchaseOrderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ponumber: { type: String, required: true },
    supplier: { type: String, required: true },
    requesteditems: { type: Array, require: true },
    createdat: { type: String, required: true }
})

module.exports = mongoose.model('PurchaseOrder', purchaseOrderSchema);