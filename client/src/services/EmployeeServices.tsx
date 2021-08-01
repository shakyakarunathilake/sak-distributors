//Should be called from the backend
export const getCivilStatusOptions = () => ([
    { id: "cs01", title: "Unmarried" },
    { id: "cs02", title: "Married" },
    { id: "cs03", title: "Divorced" },
    { id: "cs04", title: "Widowed" }
])

export const getDesignationOptions = () => ([
    { id: "d01", title: "Clerk" },
])

export const getGenderOptions = () => ([
    { id: "g01", title: "Male" },
    { id: "g02", title: "Female" },
    { id: "g03", title: "Other" }
])

export const getEmployeeStatusOptions = () => ([
    { id: "es01", title: "Full Time" },
    { id: "es02", title: "Part Time" },
    { id: "es03", title: "Temporary" },
])