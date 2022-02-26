const mongoose = require('mongoose');

const supplierSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    supplierid: { type: String, required: true },
    givenid: { type: String, required: true },
    name: { type: String, required: true },
    abbreviation: { type: String, required: true },
    address: { type: String, required: true },
    title: { type: String, required: true },
    contactperson: { type: String, required: true },
    addedby: { type: String, required: true },
    addeddate: { type: String, required: true },
    contactnumber: { type: Number, required: true },
    email: { type: String, required: true },
    damagedmissingitems: { type: Number, required: false },
})

module.exports = mongoose.model('Supplier', supplierSchema);