const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    customerid: { type: String, required: true },
    fullname: { type: String, requied: true },
    title: { type: String, requied: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    brn: { type: String, required: true },
    storename: { type: String, required: true },
    route: { type: String, required: true },
    addeddate: { type: String, required: true },
    storecontactnumber: { type: String, required: false },
    customercontactnumber: { type: String, required: true },
    billingaddress: { type: String, required: true },
    shippingaddress: { type: String, required: true },
    email: { type: String, required: false },
    registeredby: { type: String, required: true },
    creditamounttosettle: { type: Number, required: false },
    loyaltypoints: { type: Number, required: false }
})

module.exports = mongoose.model('Customer', customerSchema);