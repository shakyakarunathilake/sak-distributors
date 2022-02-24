const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    contactnumber: { type: String, required: false },
    customertype: { type: String, required: false },
    customerid: { type: String, required: false },
    storename: { type: String, required: false },
    deliverydate: { type: String, required: false },
    orderno: { type: String, required: false },
    orderplacedat: { type: String, required: false },
    route: { type: String, required: false },
    ordercreatedby: { type: String, required: false },
    shippingaddress: { type: String, required: false },
    items: { type: Array, required: false },
    deliveredby: { type: String, required: false },
    deliveredat: { type: String, required: false },
    completedat: { type: String, required: false },
    completedby: { type: String, required: false },
    status: { type: String, required: false },
    loyaltypoints: { type: Number, required: false },
    eligibilityforcredit: { type: Boolean, required: false },
    maximumcreditamount: { type: String, required: false },
    creditamounttosettle: { type: String, required: false },
    currentinvoicecreditamount: { type: String, required: false },
    minimumpayment: { type: String, required: false },
    advancepayment: { type: String, required: false },
    total: { type: String, required: false },
    invoicesettlementvalue: { type: String, required: false },
    ginnumber: { type: String, required: false }
})

module.exports = mongoose.model('Order', orderSchema);