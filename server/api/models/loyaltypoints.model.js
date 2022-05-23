const mongoose = require("mongoose");

const loyaltyPointsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    customerid: { type: String, required: true },
    loyaltypoints: [{
        orderno: { type: String, required: false },
        status: { type: String, required: false },
        noOfPoints: { type: Number, required: false }
    }],
    totalLoyaltyPoints: { type: Number, required: false }
})

module.exports = mongoose.model('LoyaltyPoints', loyaltyPointsSchema);