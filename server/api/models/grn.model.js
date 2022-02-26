const mongoose = require("mongoose");

const GRNSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ponumber: { type: String, required: false },
    grnnumber: { type: String, required: false },
    givenid: { type: String, required: false },
    status: { type: String, required: false },
    supplier: { type: String, required: false },
    items: { type: Array, required: false },
    createdat: { type: String, required: false },
    createdby: { type: String, requried: false },
    pototal: { type: String, required: false },
    previousdamagedmissingitems: { type: String, required: false },
    damagedmissingitems: { type: String, required: false },
    grntotal: { type: String, required: false },
})

module.exports = mongoose.model('GRN', GRNSchema);