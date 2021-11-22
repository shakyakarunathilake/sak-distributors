const mongoose = require("mongoose");

const GRNSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ponumber: { type: String, required: true },
    grnnumber: { type: String, required: true },
    supplier: { type: String, required: true },
    status: { type: String, required: true },
    requesteditems: { type: Array, required: true },
    createdat: { type: String, required: false },
    createdby: { type: String, requried: false },
    grosstotal: { type: String, required: false },
    damagedexpireditems: { type: String, required: false },
    total: { type: String, required: false },
})

module.exports = mongoose.model('GRN', GRNSchema);