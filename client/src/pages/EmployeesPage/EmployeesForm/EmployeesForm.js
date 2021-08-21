import React from 'react';

//Development Stage
import * as employeeservice from "../../../services/employeeService";

//Shared Components
import useForm from '../../../components/useForm';
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
    employeeid: 0,
    fullname: '',
    callingname: '',
    email: '',
    dob: '',
    age: Number,
    address: '',
    nic: '',
    gender: '',
    phonenumber: Number,
    role: '',
    designation: '',
    civilstatus: '',
    employeestatus: '',
};

export default function EmployeesForm() {

    const validate = (fieldValues = values) => {

        let temp = { ...errors }

        if ('fullname' in fieldValues) {
            temp.fullname = fieldValues.fullname ? "" : "This field is required";
        }

        if ('caliingname' in fieldValues) {
            temp.callingname = fieldValues.callingname ? "" : "This field is required";
        }

        if ('email' in fieldValues) {
            temp.email = fieldValues.email ? "" : "This field is required";
            temp.email = (/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g).test(fieldValues.email) ? "" : "Email is not valid";
        }

        if ('dob' in fieldValues) {
            temp.dob = fieldValues.dob ? "" : "This field is required";
        }

        if ('address' in fieldValues) {
            temp.address = fieldValues.address ? "" : "This field is required";
        }

        if ('nic' in fieldValues) {
            temp.nic = fieldValues.nic ? "" : "This field is required";
            temp.nic = fieldValues.nic.length > 11 ? "" : "NIC is not valid";
        }

        if ('gender' in fieldValues) {
            temp.gender = fieldValues.gender ? "" : "This field is required";
        }

        if ('phonenumber' in fieldValues) {
            temp.phonenumber = fieldValues.phonenumber ? "" : "This field is required";
            temp.phonenumber = fieldValues.phonenumber.length > 9 ? "" : "Phone number is not valid";
        }

        if ('role' in fieldValues) {
            temp.role = fieldValues.role ? "" : "Role is not valid";

        }

        if ('designation' in fieldValues) {
            temp.designation = fieldValues.designation ? "" : "This field is required";
        }

        if ('civilstatus' in fieldValues) {
            temp.civilstatus = fieldValues.civilstatus ? "" : "This field is required";
        }

        if ('employeestatus' in fieldValues) {
            temp.employeestatus = fieldValues.employeestatus ? "" : "This field is required";
        }

        setErrors({
            ...temp
        })

        if (fieldValues === values) {
            return Object.values(temp).every(x => x === "");
        }

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
        resetForm,
        handleInputChange
    } = useForm(initialFieldValues, true, validate);


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
                                    error={errors.fullname}
                                    label="Full Name (Required)"
                                    onChange={handleInputChange}
                                    placeholder="Ex: Abesinghe Mudiyanselage Shakya Madara Karunathilake"
                                    value={values?.fullname}
                                    name="fullname"
                                />
                            </div>

                            <div className={style.gridrow}>
                                <div className={style.column}>
                                    <TextField
                                        error={errors.callingname}
                                        label="Calling Name (Required)"
                                        onChange={handleInputChange}
                                        placeholder="Ex: Shakya"
                                        value={values?.callingname}
                                        name="callingname"
                                    />
                                </div>
                                <div className={style.column}>
                                    <TextField
                                        error={errors.nic}
                                        label="NIC (Required)"
                                        onChange={handleInputChange}
                                        placeholder="Ex: 199950910239"
                                        value={values?.nic}
                                        name="nic"
                                    />
                                </div>
                            </div>

                            <div className={style.gridrow}>
                                <div className={style.column}>
                                    <DatePicker
                                        error={errors.dob}
                                        label="Date of Birth (Required)"
                                        onChange={handleInputChange}
                                        value={values?.dob}
                                        name="dob"
                                    />
                                </div>
                                <div className={style.column}>
                                    <TextField
                                        label="Age (Autogenerated)"
                                        onChange={handleInputChange}
                                        disabled={true}
                                        value={values?.age}
                                        name="age"
                                    />
                                </div>
                            </div>

                            <div className={style.gridrow}>
                                <div className={style.column}>
                                    <Select
                                        error={errors.designation}
                                        label="Designation (Required)"
                                        onChange={handleInputChange}
                                        options={employeeservice.getDesignationOptions()}
                                        value={values?.designation}
                                        name="designation"
                                    />
                                </div>
                                <div className={style.column}>
                                    <Select
                                        error={errors.employeestatus}
                                        label="Employee Status (Required)"
                                        onChange={handleInputChange}
                                        options={employeeservice.getEmployeeStatusOptions()}
                                        value={values?.employeestatus}
                                        name="employeestatus"
                                    />
                                </div>
                            </div>

                            <div className={style.gridrow}>
                                <div className={style.column}>
                                    <Select
                                        error={errors.gender}
                                        label="Gender (Required)"
                                        onChange={handleInputChange}
                                        options={employeeservice.getGenderOptions()}
                                        value={values?.gender}
                                        name="gender"
                                    />
                                </div>
                                <div className={style.column}>
                                    <Select
                                        error={errors.civilstatus}
                                        label="Civil Status (Required)"
                                        onChange={handleInputChange}
                                        options={employeeservice.getCivilStatusOptions()}
                                        value={values?.civilstatus}
                                        name="civilstatus"
                                    />
                                </div>
                            </div>

                            <div className={style.gridrow}>
                                <div className={style.column}>
                                    <Select
                                        error={errors.role}
                                        label="Role (Required)"
                                        onChange={handleInputChange}
                                        options={employeeservice.getRoleOptions()}
                                        value={values?.role}
                                        name="role"
                                    />
                                </div>
                                <div className={style.column}>
                                    <TextField
                                        error={errors.phonenumber}
                                        label="Phone Number (Required)"
                                        onChange={handleInputChange}
                                        placeholder="Ex: 071 2686790"
                                        value={values?.phonenumber}
                                        name="phonenumber"
                                    />
                                </div>
                            </div>

                            <div className={style.row}>
                                <TextField
                                    error={errors.address}
                                    label="Address (Required)"
                                    onChange={handleInputChange}
                                    placeholder="Ex: Weekadawatta, Kansalagamuwa, Rambukkana"
                                    value={values?.address}
                                    name="address"
                                />
                            </div>

                            <div className={style.row}>
                                <TextField
                                    error={errors.email}
                                    label="Email (Required)"
                                    onChange={handleInputChange}
                                    placeholder="Ex: karunathilakeshakya@gmail.com"
                                    value={values?.email}
                                    name="email"
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
                            className={style.resetBtn}
                            onClick={resetForm}
                            size="medium"
                            variant="contained"
                        >
                            Reset
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
