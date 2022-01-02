const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productid: { type: String, required: true },
    name: { type: String, required: true },
    racknumber: { type: String, required: true },
    storequantity: [{
        salesqtycases: { type: String, required: false },
        salesqtypieces: { type: String, required: false },
        freeqtycases: { type: String, required: false },
        freeqtypieces: { type: String, required: false },
    }],

})

module.exports = mongoose.model('Store', storeSchema);