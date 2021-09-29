const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    employeeid: { type: String, required: true },
    employeeimage: { type: Object, required: true },
    fullname: { type: String, required: true },
    title: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, requied: true },
    dob: { type: String, required: true },
    hireddate: { type: String, required: true },
    address: { type: String, required: true },
    nic: { type: String, required: true },
    gender: { type: String, required: true },
    contactnumber: { type: Number, required: true },
    designation: { type: String, required: true },
    civilstatus: { type: String, required: true },
    employeestatus: { type: String, required: true },
    firsttimelogin: { type: Boolean, required: true },
    password: { type: String, required: true }
})

module.exports = mongoose.model('Employee', employeeSchema);