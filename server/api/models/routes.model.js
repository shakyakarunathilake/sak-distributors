const mongoose = require('mongoose');

const routeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    routeid: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    title: { type: String, required: true },
    status: { type: String, required: true },
    addeddate: { type: String, required: true },
    addedby: { type: String, required: true }
})

module.exports = mongoose.model('Route', routeSchema);