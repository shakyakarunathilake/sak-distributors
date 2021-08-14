const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    employeeid: { type: String, required: true },
    employeeimage: { type: String, required: true },
    fullname: { type: String, required: true },
    callingname: { type: String, required: true },
    dob: { type: Date, required: true },
    age: { type: Number, required: true },
    address: { type: String, required: true },
    nic: { type: String, required: true },
    gender: { type: String, required: true },
    mobilenumber: { type: Number, required: true },
    telephonenumber: { type: Number, required: true },
    designation: { type: String, required: true },
    civilstatus: { type: String, required: true },
    employeestatus: { type: String, required: true }
})

module.exports = mongoose.model('Employee', employeeSchema);