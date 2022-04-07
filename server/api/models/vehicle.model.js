const mongoose = require("mongoose");

const vehicleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    licenseplatenumber: { type: String, required: true },
    vehicle: { type: String, required: true },
    ownership: { type: String, required: true },
    status: { type: String, required: true },
    addedby: { type: String, required: true },
    addeddate: { type: String, required: true },
    vehicleowner: { type: String, required: false },
    address: { type: String, required: false },
    title: { type: String, required: false },
    contactperson: { type: String, required: false },
    contactnumber: { type: String, required: false },
    rate: { type: String, required: false },
    per: { type: String, required: false },
})

module.exports = mongoose.model('Vehicle', vehicleSchema);