const mongoose = require("mongoose");

const SupplierPaymentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    supplier: { type: String, required: false },
    ponumber: { type: String, required: false },
    grnnumber: { type: String, required: false },
    status: { type: String, required: false },
    pogrosstotal: { type: String, required: false },
    receiveddiscounts: { type: String, required: false },
    podamagedmissingitems: { type: String, required: false },
    pototal: { type: String, required: false },
    grngrosstotal: { type: String, required: false },
    grndamagedmissingitems: { type: String, required: false },
    grntotal: { type: String, required: false },
    paidamount: { type: String, required: false },
    advancepayment: { type: String, requried: false },
    advancepaymentpaidat: { type: String, required: false },
    advancepaymentpaidby: { type: String, required: false },
    paymentcompletedat: { type: String, required: false },
    paymentcompletedby: { type: String, required: false },
    debt: { type: Number, required: false },
})

module.exports = mongoose.model('SupplierPayment', SupplierPaymentSchema);