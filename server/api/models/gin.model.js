const mongoose = require("mongoose");

const GINSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ginnumber: { type: String, required: true },
    createdat: { type: String, required: true },
    createdby: { type: String, requried: true },
    route: { type: String, requried: true },
    vehicle: { type: String, requried: true },
    incharge: { type: String, required: true },
    ordernumbers: { type: Array, required: true },
    items: { type: Array, required: true },
    total: { type: String, required: true },
    status: { type: String, required: true },
})

module.exports = mongoose.model('GIN', GINSchema);