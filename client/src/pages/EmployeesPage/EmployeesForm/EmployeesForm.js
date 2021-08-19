import React from 'react';

//Development Stage
import * as employeeservice from "../../../services/employeeService";

//Shared Components
import { useForm } from '../../../components/useForm';
import TextField from '../../../shared/TextField/TextField';
import Select from '../../../shared/Select/Select';
import DatePicker from '../../../shared/DatePicker/DatePicker';

//Material UI Components
import Button from '@material-ui/core/Button';

//Images and SVGS
import user from '../../../images/user.svg';

//SCSS Style
import style from './EmployeesForm.module.scss';

const initialFieldValues = {
    employeeid: Number,
    fullname: String,
    callingname: String,
    email: String,
    dob: Date,
    age: Number,
    address: String,
    nic: String,
    gender: String,
    mobilenumber: Number,
    telephonenumber: Number,
    designation: String,
    civilstatus: String,
    employeestatus: String,
};

export default function EmployeesForm() {

    const validate = () => {
        let temp = {}
        temp.fullname = values.fullname ? "" : "This field is required";
        // temp.callingname = values.callingname ? "" : "This field is required";
        // temp.email = values.email ? "" : "This field is required"
        // temp.email = (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(values.email) ? "" : "Email is not valid";
        // temp.dob = values.dob === Date ? "" : "This field is required";
        // temp.address = values.address ? "" : "This field is required";
        // temp.nic = values.nic ? "" : "This field is required";
        // temp.gender = values.gender ? "" : "This field is required";
        // temp.mobilenumber = values.mobilenumber ? "" : "This field is required";
        // temp.mobilenumber = values.mobilenumber.length > 10 ? "" : "Mobile number is not valid";
        // temp.telephonenumber = values.telephonenumber.length > 10 ? "" : "Telephone number is not valid";
        // temp.designation = values.designation ? "" : "This field is required";
        // temp.civilstatus = values.civilstatus ? "" : "This field is required";
        // temp.employeestatus = values.employeestatus ? "" : "This field is required";

        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x == "");

    }

    const handleSubmit = e => {
        e.preventDefault()

        if (validate())
            window.alert('testing...')
    }

    const {
        errors,
        values,
        setErrors,
        handleInputChange
    } = useForm(initialFieldValues);


    return (
        <div className={style.container}>

            <div className={style.header}>
                New Employee
            </div>

            <div className={style.body}>
                <form
                    className={style.form}
                    onSubmit={handleSubmit}
                >
                    <div className={style.rowA}>
                        <div className={style.columnA}>

                            <div className={style.row}>
                                <TextField
                                    //error={checkError("fullname")}
                                    fullWidth
                                    //helperText={getError("fullname")}
                                    label="Full Name"
                                    onChange={handleInputChange}
                                    placeholder="Ex: Abesinghe Mudiyanselage Shakya Madara Karunathilake"
                                    value={values?.fullname}

                                />
                            </div>

                            <div className={style.gridrow}>
                                <div className={style.column}>
                                    <TextField
                                        //error={checkError("callingname")}
                                        fullWidth
                                        //helperText={getError("callingname")}
                                        label="Calling Name"
                                        onChange={handleInputChange}
                                        placeholder="Ex: Shakya"
                                        value={values?.callingname}
                                    />
                                </div>
                                <div className={style.column}>
                                    <TextField
                                        //error={checkError("nic")}
                                        fullWidth
                                        //helperText={getError("nic")}
                                        label="NIC"
                                        onChange={handleInputChange}
                                        placeholder="Ex: 199950910239"
                                        value={values?.nic}
                                    />
                                </div>
                            </div>

                            <div className={style.gridrow}>
                                <div className={style.column}>
                                    <DatePicker
                                        //error={checkError("dob")}
                                        fullWidth
                                        //helperText={getError("dob")}
                                        label="Date of Birth"
                                        onChange={handleInputChange}
                                        value={values?.dob}
                                    />
                                </div>
                                <div className={style.column}>
                                    <TextField
                                        fullWidth
                                        label="Age"
                                        onChange={handleInputChange}
                                        placeholder="Autogenerated"
                                        value={values?.age}
                                    />
                                </div>
                            </div>

                            <div className={style.gridrow}>
                                <div className={style.column}>
                                    <Select
                                        //error={checkError("designation")}
                                        //helperText={getError("designation")}
                                        label="Designation"
                                        //onChange={handleSelectChange("designation")}
                                        options={employeeservice.getDesignationOptions()}
                                        value={values?.designation}
                                    />
                                </div>
                                <div className={style.column}>
                                    <Select
                                        //error={checkError("employeestatus")}
                                        //helperText={getError("employeestatus")}
                                        label="Employee Status"
                                        //onChange={handleSelectChange("employeestatus")}
                                        options={employeeservice.getEmployeeStatusOptions()}
                                        value={values?.employeestatus}
                                    />
                                </div>
                            </div>

                            <div className={style.gridrow}>
                                <div className={style.column}>
                                    <Select
                                        //error={checkError("gender")}
                                        //helperText={getError("gender")}
                                        label="Gender"
                                        //onChange={handleSelectChange("gender")}
                                        options={employeeservice.getGenderOptions()}
                                        value={values?.gender}
                                    />
                                </div>
                                <div className={style.column}>
                                    <Select
                                        //error={checkError("civilstatus")}
                                        //helperText={getError("civilstatus")}
                                        label="Civil Status"
                                        //onChange={handleSelectChange("civilstatus")}
                                        options={employeeservice.getCivilStatusOptions()}
                                        value={values?.civilstatus}
                                    />
                                </div>
                            </div>

                            <div className={style.gridrow}>
                                <div className={style.column}>
                                    <TextField
                                        //error={checkError("mobilenumber")}
                                        fullWidth
                                        //helperText={getError("mobilenumber")}
                                        label="Mobile Number"
                                        onChange={handleInputChange}
                                        placeholder="Ex: 071 2686790"
                                        value={values?.mobilenumber}
                                    />
                                </div>
                                <div className={style.column}>
                                    <TextField
                                        //error={checkError("telephonenumber")}
                                        fullWidth
                                        //helperText={getError("telephonenumber")}
                                        label="Telephone Number"
                                        onChange={handleInputChange}
                                        placeholder="Ex: 035 2266327"
                                        value={values?.telephonenumber}
                                    />
                                </div>
                            </div>

                            <div className={style.row}>
                                <TextField
                                    //error={checkError("address")}
                                    fullWidth
                                    //helperText={getError("address")}
                                    label="Address"
                                    onChange={handleInputChange}
                                    placeholder="Ex: Weekadawatta, Kansalagamuwa, Rambukkana"
                                    value={values?.address}
                                />
                            </div>

                            <div className={style.row}>
                                <TextField
                                    //error={checkError("email")}
                                    fullWidth
                                    //helperText={getError("email")}
                                    label="Email"
                                    onChange={handleInputChange}
                                    placeholder="Ex: karunathilakeshakya@gmail.com"
                                    value={values?.email}

                                />
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
                            className={style.cancelBtn}
                            size="medium"
                            variant="contained"
                        >
                            Cancel
                        </Button>
                        <Button
                            className={style.submitBtn}
                            onClick={handleSubmit}
                            size="medium"
                            variant="contained"
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </div>

        </div >
    );
};
