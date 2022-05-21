const employeedetails = JSON.parse(sessionStorage.getItem("Auth"));

const getDistributorEndPoints = [
    "http://localhost:8080/metadata/purchase-orders-meta-data",
]

const getHREndPoints = [
]

const getManagerEndPoints = [
    "http://localhost:8080/metadata/delivered-customer-orders-meta-data",
]

const getPurchasingManagerEndPoints = [
    "http://localhost:8080/metadata/supplier-payments-meta-data",
]

const getStoreKeeperEndPoints = [
    "http://localhost:8080/metadata/grn-meta-data",
    "http://localhost:8080/metadata/pending-customer-orders-meta-data",
    "http://localhost:8080/metadata/processing-gin-meta-data",
]

const getSalesRepresentativeEndPoints = [
    "http://localhost:8080/metadata/promotions-meta-data"
]

const getDeliveryRepresentativeEndPoints = [
    `http://localhost:8080/metadata/dispatched-gin-meta-data/${employeedetails.employeeid}`,
    `http://localhost:8080/metadata/dispatched-customer-orders-meta-data/${employeedetails.employeeid}`,
]

export function metaDataServices(designation) {
    if (designation === "Distributor") {
        return (getDistributorEndPoints)
    }
    if (designation === "Human Resources") {
        return (getHREndPoints)
    }
    if (designation === "Manager") {
        return (getManagerEndPoints)
    }
    if (designation === "Purchasing Manager") {
        return (getPurchasingManagerEndPoints)
    }
    if (designation === "Store Keeper") {
        return (getStoreKeeperEndPoints)
    }
    if (designation === "Sales Representative") {
        return (getSalesRepresentativeEndPoints)
    }
    if (designation === "Delivery Representative") {
        return (getDeliveryRepresentativeEndPoints)
    }
}