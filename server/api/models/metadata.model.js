const mongoose = require("mongoose");

const metaDataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    purchaseorderapprovaldata: { type: Array, required: false },
    awaitinggrndata: { type: Array, required: false },
    customerorders: { type: Array, required: false },
    awaitinggindata: { type: Array, required: false },
})

module.exports = mongoose.model('MetaData', metaDataSchema);