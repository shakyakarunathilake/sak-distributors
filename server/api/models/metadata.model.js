const mongoose = require("mongoose");

const metaDataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    noofpurchaseordertobeapproved: { type: Array, required: false },
    noofawaitinggrn: { type: Array, required: false },
    noofcustomerorders: { type: Array, required: false },
})

module.exports = mongoose.model('MetaData', metaDataSchema);