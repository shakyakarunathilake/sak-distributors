const mongoose = require("mongoose");

const GINSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    orderno: { type: String, required: true },
    ginnumber: { type: String, required: true },
    customerid: { type: String, required: false },
    storename: { type: String, required: true },
    status: { type: String, required: true },
    items: { type: Array, required: true },
    createdat: { type: String, required: false },
    createdby: { type: String, requried: false },
    total: { type: String, required: true },
})

module.exports = mongoose.model('GIN', GINSchema);