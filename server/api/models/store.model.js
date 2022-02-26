const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productid: { type: String, required: true },
    name: { type: String, required: true },
    racknumber: { type: String, required: false },
    storequantity: {
        salesqtycases: { type: Number, required: false },
        salesqtypieces: { type: Number, required: false },
        freeqtycases: { type: Number, required: false },
        freeqtypieces: { type: Number, required: false },
    },
    grngin: [{
        grnnumberginnumber: { type: String, required: false },
        date: { type: String, required: false },
        piecespercase: { type: String, required: false },
        listorsellingprice: { type: String, required: false },
        salesqtycases: { type: String, required: false },
        salesqtypieces: { type: String, required: false },
        freeqtycases: { type: String, required: false },
        freeqtypieces: { type: String, required: false },
        damagedfreeqty: { type: String, required: false },
        damagedsalesqty: { type: String, required: false },
    }],
})

module.exports = mongoose.model('Store', storeSchema);