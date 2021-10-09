const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    invoiceno: { type: String, required: true },
})

module.exports = mongoose.model('Order', orderSchema);