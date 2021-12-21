const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    contactnumber: { type: Number, required: false},
    customerid: { type: String, required: false },
    customertype: { type: String, required: false},
    deliverydate: { type: String, required: false},
    orderno: { type: String, required: false},
    orderplacedat: { type: String, required: false},
    route: { type: String, required: false},
    ordercreatedby: { type: String, required: false},
    shippingaddress: { type: String, required: false},
    status: { type: String, required: false},
    storename: { type: String, required: false},
    total: { type: String, required: false},
    items: { type: Array, required: false},

})

module.exports = mongoose.model('Order', orderSchema);