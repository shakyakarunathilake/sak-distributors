const mongoose = require("mongoose");

const purchaseOrderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ponumber: { type: String, required: true },
    supplier: { type: String, required: true },
    status: { type: String, required: true },
    createdat: { type: String, required: true },
    createdby: { type: String, requried: true },
    approvedby: { type: String, requried: false },
    requesteditems: { type: Array, required: true },
    grosstotal: { type: String, required: true },
    receiveddiscounts: { type: String, required: true },
    damagedexpireditems: { type: String, required: true },
    total: { type: String, required: true },
})

module.exports = mongoose.model('PurchaseOrder', purchaseOrderSchema);