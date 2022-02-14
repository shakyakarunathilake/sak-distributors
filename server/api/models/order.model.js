const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    contactnumber: { type: String, required: true },
    customertype: { type: String, required: true },
    customerid: { type: String, required: false },
    storename: { type: String, required: true },
    deliverydate: { type: String, required: true },
    orderno: { type: String, required: true },
    orderplacedat: { type: String, required: true },
    route: { type: String, required: true },
    ordercreatedby: { type: String, required: true },
    shippingaddress: { type: String, required: true },
    items: { type: Array, required: true },
    deliveredby: { type: String, required: false },
    deliveredat: { type: String, required: false },
    status: { type: String, required: true },
    loyaltypoints: { type: Number, required: false },
    eligibilityforcredit: { type: Boolean, required: false },
    maximumcreditamount: { type: String, required: false },
    creditamounttosettle: { type: String, required: false },
    currentinvoicecreditamount: { type: String, required: false },
    minimumpayment: { type: String, required: false },
    advancepayment: { type: String, required: false },
    total: { type: String, required: true },
})

module.exports = mongoose.model('Order', orderSchema);