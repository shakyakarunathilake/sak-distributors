const mongoose = require("mongoose");

const GRNSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ponumber: { type: String, required: true },
    grnnumber: { type: String, required: true },
    givenid: { type: String, required: true },
    status: { type: String, required: true },
    supplier: { type: String, required: true },
    items: { type: Array, required: true },
    createdat: { type: String, required: false },
    createdby: { type: String, requried: false },
    grosstotal: { type: String, required: true },
    damagedmissingitems: { type: String, required: true },
    total: { type: String, required: true },
})

module.exports = mongoose.model('GRN', GRNSchema);