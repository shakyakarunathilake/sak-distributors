const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    employeeid: { type: String, required: false },
    employeeimage: { type: String, required: false },
    fullname: { type: String, required: false },
    title: { type: String, required: false },
    firstname: { type: String, required: false },
    lastname: { type: String, required: false },
    email: { type: String, requied: false },
    dob: { type: String, required: false },
    hireddate: { type: String, required: false },
    address: { type: String, required: false },
    nic: { type: String, required: false },
    gender: { type: String, required: false },
    contactnumber: { type: Number, required: false },
    designation: { type: String, required: false },
    civilstatus: { type: String, required: false },
    employeestatus: { type: String, required: false },
    password: { type: String, required: false }
})

module.exports = mongoose.model('Employee', employeeSchema);