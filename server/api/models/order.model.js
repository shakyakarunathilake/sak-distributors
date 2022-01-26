const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    contactnumber: { type: Number, required: true },
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
    total: { type: String, required: true },
    currentinvoicecreditamount: { type: String, required: true },
    deliveredby: { type: String, required: false },
    deliveredat: { type: String, required: false },
    status: { type: String, required: true },
    loyaltypoints: { type: Number, required: true },
    eligibilityforcredit: { type: Boolean, required: true },
    maximumcreditamount: { type: String, required: true },
    creditamounttosettle: { type: String, required: true },
})

module.exports = mongoose.model('Order', orderSchema);