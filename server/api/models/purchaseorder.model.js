const mongoose = require("mongoose");

const purchaseOrderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ponumber: { type: String, required: true },
    customername: { type: String, required: true },
    customeraddress: { type: String, required: true },
    contactnumber: { type: String, required: true },
    supplier: { type: String, required: true },
    givenid: { type: String, required: true },
    createdat: { type: String, required: true },
    createdby: { type: String, requried: true },
    approvedat: { type: String, required: false },
    approvedby: { type: String, requried: false },
    deliveredat: { type: String, required: false },
    status: { type: String, requried: false },
    items: { type: Array, required: true },
    grosstotal: { type: String, required: true },
    receiveddiscounts: { type: String, required: true },
    total: { type: String, required: true },
})

module.exports = mongoose.model('PurchaseOrder', purchaseOrderSchema);