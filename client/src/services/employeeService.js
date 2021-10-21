//Should be called from the backend
export const getCivilStatusOptions = () => ([
    { id: "cs01", title: "Unmarried" },
    { id: "cs02", title: "Married" },
    { id: "cs03", title: "Divorced" },
    { id: "cs04", title: "Widowed" }
])

export const getDesignationOptions = () => ([
    { id: "d01", title: "Distributor" },
    { id: "d02", title: "Human Resources" },
    { id: "d03", title: "Manager" },
    { id: "d04", title: "Purchasing Manager" },
    { id: "d05", title: "Store Keeper" },
    { id: "d06", title: "Sales Representative" },
    { id: "d07", title: "Warehouse Worker" },
    { id: "d08", title: "Driver" },
    { id: "d09", title: "Product Handler" },

])

export const getGenderOptions = () => ([
    { id: "g01", title: "Male" },
    { id: "g02", title: "Female" },
    { id: "g03", title: "Other" }
])

export const getTitleOptions = () => ([
    { id: "t01", title: "Miss" },
    { id: "t02", title: "Mr" },
    { id: "t03", title: "Mrs" },
])

export const getEmployeeStatusOptions = () => ([
    { id: "es01", title: "Active" },
    { id: "es02", title: "Inactive" },
    { id: "es03", title: "Limited Access" }
])

export const getCustomerOptions = () => ([
    { id: "c01", title: "Registered Customer" },
    { id: "c02", title: "One Time Customer" },
])

export const getRouteOptions = () => ([
    { id: "rt001", title: "Rambukkana - Kegalle" },
    { id: "rt002", title: "Rambukkana - Kurunegala" },
    { id: "rt003", title: "Rambukkana - Parape" },
    { id: "rt004", title: "Rambukkana - Mawanella" },
    { id: "rt005", title: "Rambukkana - Mawathagama" },
    { id: "rt006", title: "Rambukkana - Hatharaliyadda" },
])

export const getSupplierOptions = () => ([
    { id: "s001", title: "Milco Srilanka (Pvt) Ltd" },
    { id: "s002", title: "Wijaya Products" },
    { id: "s003", title: "Cherish Biscuits (Pvt) Ltd" },
    { id: "s004", title: "Link Natural Products (Pvt) Ltd" },
    { id: "s005", title: "Swadeshi Industrial Works PLC" },
])

export const getVariantTypeOptions = () => ([
    { id: "vt001", title: "General" },
    { id: "vt002", title: "Promotion" },
])

export const getVariantStatusOptions = () => ([
    { id: "vs001", title: "Active" },
    { id: "vs002", title: "Inactive" },
])
export const getProductStatusOptions = () => ([
    { id: "ps001", title: "Active" },
    { id: "ps002", title: "Inactive" },
])