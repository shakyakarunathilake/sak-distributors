const mongoose = require("mongoose");

const quotationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    quotationid: { type: String, required: true },
    supplier: { type: String, required: true },
    validityperiod: { type: String, required: true },
    issuingdate: { type: String, required: true },
    enddate: { type: String, required: true },
    quotationfile: { type: Object, required: true },
})

module.exports = mongoose.model('Quotation', quotationSchema);