const mongoose = require("mongoose")

const employeeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    employeeid: String,
    fullname: String,
    callingname: String,
    dob: Date,
    age: Number,
    address: String,
    nic: String,
    gender: String,
    mobilenumber: Number,
    telephonenumber: Number,
    designation: String,
    civilstatus: String,
    employeestatus: String
})

module.exports = mongoose.model('Employee', employeeSchema)