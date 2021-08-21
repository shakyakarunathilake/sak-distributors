const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    employeeid: { type: String, required: false },
    //employeeimage: { type: String, required: false },
    fullname: { type: String, required: true },
    callingname: { type: String, required: true },
    email: { type: String, requied: true },
    dob: { type: Date, required: true },
    hireddate: { type: Date, required: true },
    address: { type: String, required: true },
    nic: { type: String, required: true },
    gender: { type: String, required: true },
    phonenumber: { type: Number, required: true },
    role: { type: String, required: true },
    designation: { type: String, required: true },
    civilstatus: { type: String, required: true },
    employeestatus: { type: String, required: true }
})

module.exports = mongoose.model('Employee', employeeSchema);