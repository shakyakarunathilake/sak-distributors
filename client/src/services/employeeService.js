//Should be called from the backend
export const getCivilStatusOptions = () => ([
    { id: "cs01", title: "Unmarried" },
    { id: "cs02", title: "Married" },
    { id: "cs03", title: "Divorced" },
    { id: "cs04", title: "Widowed" }
])

export const getDesignationOptions = () => ([
    { id: "d01", title: "Sales Manager" },
    { id: "d02", title: "Purchase Manager" },
    { id: "d03", title: "Account Clerk" },
    { id: "d04", title: "Sales Representative" },
    { id: "d05", title: "Driver" },
    { id: "d06", title: "Sales Helper" },
])

export const getGenderOptions = () => ([
    { id: "g01", title: "Male" },
    { id: "g02", title: "Female" },
    { id: "g03", title: "Other" }
])

export const getEmployeeStatusOptions = () => ([
    { id: "es01", title: "Active" },
    { id: "es02", title: "Inactive" },
])

export const getRoleOptions = () => ([
    { id: "r01", title: "Admin" },
    { id: "r02", title: "Owner" },
    { id: "r03", title: "Purchase Manager" },
    { id: "r04", title: "Sales Manager" },
    { id: "r05", title: "Sales Representative" },
])

export const getCustomerOptions = () => ([
    { id: "c01", title: "Registered Customer" },
    { id: "c02", title: "One Time Customer" },
])