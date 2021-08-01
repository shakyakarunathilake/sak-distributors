import style from './EmployeesForm.module.scss'

//Components
import useForm from '../../components/useForm'

//Images
import user from '../../img/user.svg'

//Material UI Components
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

//Shared Components
import Select from '../../shared/Select/Select'

//Select Options
import * as employeeservice from '../../services/EmployeeServices'

export default function EmployeesForm() {

    // function WithoutTime(dateTime: Date) {
    //     var date = new Date(dateTime.getTime());
    //     date.setHours(0, 0, 0, 0);
    //     return date;
    // }

    const initialFValues = {
        employeeid: Number,
        fullname: '',
        callingname: '',
        dob: new Date(),
        age: Number,
        address: '',
        nic: '',
        gender: '',
        mobilenumber: Number,
        telephonenumber: Number,
        designation: '',
        civilstatus: '',
        employeestatus: '',
    }

    const validate = () => {
        let temp = {} as any
        temp.fullname = values.fullname ? "" : "This field is required"
        temp.callingname = values.callingname ? "" : "This field is required"
        // temp.dob = values.dob == new Date ? "" : "This field is required"
        // temp.age = values.age > 0 ? "" : "This field is required"
        temp.address = values.address ? "" : "This field is required"
        temp.nic = values.nic ? "" : "This field is required"
        temp.gender = values.gender ? "" : "This field is required"
        temp.mobilenumber = values.mobilenumber.length > 10 ? "" : "This field is required"
        temp.telephonenumber = values.telephonenumber.length > 10 ? "" : "This field is required"
        temp.designation = values.designation ? "" : "This field is required"
        temp.civilstatus = values.civilstatus ? "" : "This field is required"
        temp.employeestatus = values.employeestatus ? "" : "This field is required"

        setErrors({ ...temp })

        return Object.values(temp).every(x => x === "")
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()

        if (validate())
            window.alert('testing...')
    }

    const {
        checkError,
        getError,
        errors,
        setErrors,
        values,
        // setValues,
        handleChange,
        handleSelectChange
    } = useForm({ initialFValues })


    return (
        <div className={style.container}>

            <div className={style.header}>
                New Employee
            </div>

            <div className={style.body}>
                <form className={style.form} onSubmit={handleSubmit}>
                    <div className={style.rowA}>
                        <div className={style.columnA}>

                            <div className={style.row}>
                                <TextField
                                    error={checkError("fullname")}
                                    fullWidth
                                    helperText={getError("fullname")}
                                    label="Full Name"
                                    onChange={handleChange("fullname")}
                                    placeholder="Ex: Abesinghe Mudiyanselage Shakya Madara Karunathilake"
                                    value={values.fullname}
                                    variant="outlined"
                                />
                            </div>

                            <div className={style.gridrow}>
                                <div className={style.column}>
                                    <TextField
                                        error={checkError("callingname")}
                                        fullWidth
                                        helperText={getError("callingname")}
                                        label="Calling Name"
                                        onChange={handleChange("callingname")}
                                        placeholder="Ex: Shakya"
                                        value={values.callingname}
                                        variant="outlined"
                                    />
                                </div>
                                <div className={style.column}>
                                    <TextField
                                        error={checkError("nic")}
                                        fullWidth
                                        helperText={getError("nic")}
                                        label="NIC"
                                        onChange={handleChange("nic")}
                                        placeholder="Ex: 199950910239"
                                        value={values.nic}
                                        variant="outlined"
                                    />
                                </div>
                            </div>

                            <div className={style.gridrow}>
                                <div className={style.column}>
                                    <TextField
                                        error={checkError("dob")}
                                        fullWidth
                                        helperText={getError("dob")}
                                        label="Date of Birth"
                                        onChange={handleChange("dob")}
                                        type="date"
                                        value={values.dob}
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                                <div className={style.column}>
                                    <TextField
                                        fullWidth
                                        label="Age"
                                        onChange={handleChange("age")}
                                        placeholder=""
                                        value={values.age}
                                        variant="outlined"
                                    />
                                </div>
                            </div>

                            <div className={style.gridrow}>
                                <div className={style.column}>
                                    <TextField
                                        error={checkError("mobilenumber")}
                                        fullWidth
                                        helperText={getError("mobilenumber")}
                                        label="Mobile Number"
                                        onChange={handleChange("mobilenumber")}
                                        placeholder="Ex: 071 2686790"
                                        value={values.mobilenumber}
                                        variant="outlined"
                                    />
                                </div>
                                <div className={style.column}>
                                    <TextField
                                        error={checkError("telephonenumber")}
                                        fullWidth
                                        helperText={getError("telephonenumber")}
                                        label="Telephone Number"
                                        onChange={handleChange("telephonenumber")}
                                        placeholder="Ex: 035 2266327"
                                        value={values.telephonenumber}
                                        variant="outlined"
                                    />
                                </div>
                            </div>

                            <div className={style.row}>
                                <TextField
                                    error={checkError("address")}
                                    fullWidth
                                    helperText={getError("address")}
                                    label="Address"
                                    onChange={handleChange("address")}
                                    placeholder="Ex: Weekadawatta, Kansalagamuwa, Rambukkana"
                                    value={values.address}
                                    variant="outlined"
                                />
                            </div>

                            <div className={style.gridrow}>
                                <div className={style.column}>
                                    <Select
                                        error={checkError("designation")}
                                        helperText={getError("designation")}
                                        label="Designation"
                                        onChange={handleSelectChange("designation")}
                                        options={employeeservice.getDesignationOptions()}
                                        value={values.designation}
                                    />
                                </div>
                                <div className={style.column}>
                                    <Select
                                        error={checkError("employeestatus")}
                                        helperText={getError("employeestatus")}
                                        label="Employee Status"
                                        onChange={handleSelectChange("employeestatus")}
                                        options={employeeservice.getEmployeeStatusOptions()}
                                        value={values.employeestatus}
                                    />
                                </div>
                            </div>

                            <div className={style.gridrow}>
                                <div className={style.column}>
                                    <Select
                                        error={checkError("gender")}
                                        helperText={getError("gender")}
                                        label="Gender"
                                        onChange={handleSelectChange("gender")}
                                        options={employeeservice.getGenderOptions()}
                                        value={values.gender}
                                    />
                                </div>
                                <div className={style.column}>
                                    <Select
                                        error={checkError("civilstatus")}
                                        helperText={getError("civilstatus")}
                                        label="Civil Status"
                                        onChange={handleSelectChange("civilstatus")}
                                        options={employeeservice.getCivilStatusOptions()}
                                        value={values.civilstatus}
                                    />
                                </div>
                            </div>

                        </div>

                        <div className={style.columnB}>
                            <div className={style.image}>
                                <img src={user} alt="" />
                                <div className={style.partialCircle}></div>
                            </div>
                            <div className={style.employeeId}>
                                ID: 21868221
                            </div>
                        </div>
                    </div>

                    <div className={style.rowB}>
                        <Button
                            color="primary"
                            onClick={handleSubmit}
                            variant="contained"
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </div>

        </div>
    )
}

