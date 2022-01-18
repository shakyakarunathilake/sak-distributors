const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    contactnumber: { type: Number, required: true },
    customerid: { type: String, required: false },
    customertype: { type: String, required: true },
    deliverydate: { type: String, required: true },
    orderno: { type: String, required: true },
    orderplacedat: { type: String, required: true },
    route: { type: String, required: true },
    ordercreatedby: { type: String, required: true },
    deliveredby: { type: String, required: false },
    deliveredat: { type: String, required: false },
    shippingaddress: { type: String, required: true },
    status: { type: String, required: true },
    storename: { type: String, required: true },
    total: { type: String, required: true },
    items: { type: Array, required: true },
    currentcreditamount: { type: String, required: true }
})

module.exports = mongoose.model('Order', orderSchema);