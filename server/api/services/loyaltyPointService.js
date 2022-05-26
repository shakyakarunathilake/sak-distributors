exports.earnedLoyaltyPoints = (param) => {

    let total = parseInt(param);

    if (total < 10000) {
        return 0
    } else if (10000 <= total && total < 15000) {
        return 10;
    } else if (15000 <= total && total < 20000) {
        return 15;
    } else if (20000 <= total && total < 25000) {
        return 20;
    } else if (25000 <= total && total < 30000) {
        return 25;
    } else if (30000 <= total) {
        return 30;
    }

}

exports.spentLoyaltyPoints = (param) => {

    let currentinvoicecreditamount = parseInt(param);
    let noOfPoints = Math.ceil(currentinvoicecreditamount / 100);

    return noOfPoints;
}
