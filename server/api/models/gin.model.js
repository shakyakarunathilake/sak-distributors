const mongoose = require("mongoose");

const GINSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ginnumber: { type: String, required: false },
    createdat: { type: String, required: false },
    createdby: { type: String, requried: false },
    route: { type: String, requried: false },
    vehicle: { type: String, requried: false },
    incharge: { type: String, required: false },
    items: { type: Array, required: false },
    total: { type: String, required: false },
    status: { type: String, required: false },
    ordernumbers: [{
        ordernumber: { type: String, requried: true },
        complete: { type: String, required: true }
    }],
})

module.exports = mongoose.model('GIN', GINSchema);