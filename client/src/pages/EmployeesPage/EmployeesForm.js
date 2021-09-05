import React, { useEffect } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import formData from 'form-data';

//Development Stage
import * as employeeservice from "../../services/employeeService";

//Shared Components
import useForm from '../../components/useForm';
import TextField from '../../shared/TextField/TextField';
import Select from '../../shared/Select/Select';
import DatePicker from '../../shared/DatePicker/DatePicker';

//Material UI Components
import Button from '@material-ui/core/Button';

//Images and SVGS
import user from '../../images/user.svg';

//SCSS Style
import style from './EmployeesForm.module.scss';

const initialFieldValues = {
    employeeid: '',
    // employeeimage: '',
    fullname: '',
    title: '',
    firstname: '',
    lastname: '',
    email: '',
    dob: '',
    hireddate: '',
    address: '',
    nic: '',
    gender: '',
    contactnumber: Number,
    designation: '',
    civilstatus: '',
    employeestatus: '',
};

export default function EmployeesForm(props) {

    const {
        // addOrEdit,
        // recordForEdit,
        setOpenPopup
    } = props;

    const validate = (fieldValues = values) => {

        let temp = { ...errors }

        if ('employeeid' in fieldValues) {
            temp.employeeid = fieldValues.employeeid ? "" : "This field is required";
        }

        if ('fullname' in fieldValues) {
            temp.fullname = fieldValues.fullname ? "" : "This field is required";
        }

        if ('firstname' in fieldValues) {
            temp.firstname = fieldValues.firstname ? "" : "This field is required";
        }

        if ('lastname' in fieldValues) {
            temp.lastname = fieldValues.lastname ? "" : "This field is required";
        }

        if ('title' in fieldValues) {
            temp.title = fieldValues.title ? "" : "This field is required";
        }

        if ('email' in fieldValues) {
            temp.email = fieldValues.email ? "" : "This field is required";
            temp.email = (/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g).test(fieldValues.email) ? "" : "Email is not valid";
        }

        if ('dob' in fieldValues) {
            temp.dob = fieldValues.dob ? "" : "This field is required";
        }

        if ('hireddate' in fieldValues) {
            temp.hireddate = fieldValues.hireddate ? "" : "This field is required";
        }

        if ('address' in fieldValues) {
            temp.address = fieldValues.address ? "" : "This field is required";
        }

        if ('nic' in fieldValues) {
            temp.nic = fieldValues.nic ? "" : "This field is required";
            temp.nic = fieldValues.nic.length > 9 ? "" : "NIC is not valid";
        }

        if ('gender' in fieldValues) {
            temp.gender = fieldValues.gender ? "" : "This field is required";
        }

        if ('contactnumber' in fieldValues) {
            temp.contactnumber = fieldValues.contactnumber ? "" : "This field is required";
            temp.contactnumber = fieldValues.contactnumber.length > 9 ? "" : "Contact number is not valid";
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

        console.log(values); //Development Stage

        if (validate()) {
            // addOrEdit(values, resetForm);

            // const employeeFormData = new formData();
            // employeeFormData.append('employeeid', values.employeeid);
            // // employeeFormData.append('employeeimage', values.employeeimage);
            // employeeFormData.append('title', values.title);
            // employeeFormData.append('fullname', values.fullname);
            // employeeFormData.append('firstname', values.firstname);
            // employeeFormData.append('lastname', values.lastname);
            // employeeFormData.append('email', values.email);
            // employeeFormData.append('dob', values.dob);
            // employeeFormData.append('hireddate', values.hireddate);
            // employeeFormData.append("address", values.address);
            // employeeFormData.append("nic", values.nic);
            // employeeFormData.append("gender", values.gender);
            // employeeFormData.append("contactnumber", values.contactnumber);
            // employeeFormData.append("designation", values.designation);
            // employeeFormData.append("civilstatus", values.civilstatus);
            // employeeFormData.append("employeestatus", values.employeestatus);

            // console.log(employeeFormData);

            axios
                .post("http://localhost:8080/employees/create-employee", {
                    // employeeFormData})
                    "employeeid": values.employeeid,
                    //employeeimage: '',
                    "title": values.title,
                    "fullname": values.fullname,
                    "firstname": values.firstname,
                    "lastname": values.lastname,
                    "email": values.email,
                    "dob": values.dob,
                    "hireddate": values.hireddate,
                    "address": values.address,
                    "nic": values.nic,
                    "gender": values.gender,
                    "contactnumber": values.contactnumber,
                    "designation": values.designation,
                    "civilstatus": values.civilstatus,
                    "employeestatus": values.employeestatus,
                })
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                })

            resetForm();
            setOpenPopup(false);
        }
    }

    // useEffect(() => {
    //     if (recordForEdit != null)
    //         setValues({
    //             ...recordForEdit
    //         })
    // }, [recordForEdit])

    const {
        errors,
        values,
        setValues,
        setErrors,
        resetForm,
        handleInputChange
    } = useForm(initialFieldValues, true, validate);

    return (
        <div className={style.container}>

            {/* <div className={style.header}>
                New Employee
            </div> */}

            <div className={style.body}>
                <form
                    className={style.form}
                    onSubmit={handleSubmit}
                >
                    <div className={style.formFields}>

                        <div className={style.columnA}>

                            <div className={style.image}>
                                <div className={style.imgWrapper}>
                                    <img src={user} alt="" />
                                    <div className={style.uploadWrapper}>
                                        Upload
                                    </div>
                                </div>
                                {/* <div className={style.partialCircle}></div> */}
                            </div>

                            <div className={style.employeeId}>
                                {/* For Development Stage */}
                                <TextField
                                    error={errors.employeeid}
                                    label="Employee ID *"
                                    onChange={handleInputChange}
                                    placeholder="Ex: E00001"
                                    value={values?.employeeid}
                                    name="employeeid"
                                />

                                {/* ID: E00016 */}
                            </div>

                        </div>

                        <div className={style.columnB}>

                            <div className={style.redFont}>
                                The fields with "*" are required
                            </div>

                            <div className={style.row}>
                                <TextField
                                    error={errors.fullname}
                                    label="Full Name *"
                                    onChange={handleInputChange}
                                    placeholder="Ex: Abesinghe Mudiyanselage Shakya Madara Karunathilake"
                                    value={values?.fullname}
                                    name="fullname"
                                />
                            </div>

                            <div className={style.rowminicolumns}>
                                <div>
                                    <Select
                                        error={errors.title}
                                        label="Title *"
                                        onChange={handleInputChange}
                                        options={employeeservice.getTitleOptions()}
                                        value={values?.title}
                                        name="title"
                                    />
                                </div>
                                <div>
                                    <TextField
                                        error={errors.firstname}
                                        label="First Name *"
                                        onChange={handleInputChange}
                                        placeholder="Ex: Shakya"
                                        value={values?.firstname}
                                        name="firstname"
                                    />
                                </div>
                                <div>
                                    <TextField
                                        error={errors.lastname}
                                        label="Last Name *"
                                        onChange={handleInputChange}
                                        placeholder="Ex: Last Name"
                                        value={values?.lastname}
                                        name="lastname"
                                    />
                                </div>
                            </div>

                            <div className={style.gridrow}>
                                <div>
                                    <TextField
                                        error={errors.nic}
                                        label="NIC *"
                                        onChange={handleInputChange}
                                        placeholder="Ex: 199950910239"
                                        value={values?.nic}
                                        name="nic"
                                    />
                                </div>
                                <div>
                                    <DatePicker
                                        error={errors.dob}
                                        label="Date of Birth *"
                                        onChange={handleInputChange}
                                        value={values?.dob}
                                        name="dob"
                                    />
                                </div>

                            </div>

                            <div className={style.gridrow}>
                                <div>
                                    <Select
                                        error={errors.gender}
                                        label="Gender *"
                                        onChange={handleInputChange}
                                        options={employeeservice.getGenderOptions()}
                                        value={values?.gender}
                                        name="gender"
                                    />
                                </div>

                                <div>
                                    <Select
                                        error={errors.civilstatus}
                                        label="Civil Status *"
                                        onChange={handleInputChange}
                                        options={employeeservice.getCivilStatusOptions()}
                                        value={values?.civilstatus}
                                        name="civilstatus"
                                    />
                                </div>

                            </div>

                            <div className={style.gridrow}>
                                <div>
                                    <Select
                                        error={errors.designation}
                                        label="Designation *"
                                        onChange={handleInputChange}
                                        options={employeeservice.getDesignationOptions()}
                                        value={values?.designation}
                                        name="designation"
                                    />
                                </div>

                                <div>
                                    <TextField
                                        error={errors.contactnumber}
                                        label="Contact Number *"
                                        onChange={handleInputChange}
                                        placeholder="Ex: 071 2686790"
                                        value={values?.contactnumber}
                                        name="contactnumber"
                                    />
                                </div>
                            </div>



                            <div className={style.row}>
                                <TextField
                                    error={errors.address}
                                    label="Address *"
                                    onChange={handleInputChange}
                                    placeholder="Ex: Weekadawatta, Kansalagamuwa, Rambukkana"
                                    value={values?.address}
                                    name="address"
                                />
                            </div>

                            <div className={style.row}>
                                <TextField
                                    error={errors.email}
                                    label="Email *"
                                    onChange={handleInputChange}
                                    placeholder="Ex: karunathilakeshakya@gmail.com"
                                    value={values?.email}
                                    name="email"
                                />
                            </div>


                            <div className={style.gridrow}>
                                <div>
                                    <Select
                                        error={errors.employeestatus}
                                        label="Employee Status *"
                                        onChange={handleInputChange}
                                        options={employeeservice.getEmployeeStatusOptions()}
                                        value={values?.employeestatus}
                                        name="employeestatus"
                                    />
                                </div>
                                <div>
                                    <DatePicker
                                        error={errors.hireddate}
                                        label="Hired Date *"
                                        onChange={handleInputChange}
                                        value={values?.hireddate}
                                        name="hireddate"
                                    />
                                </div>
                            </div>

                            <div className={style.buttonRow}>
                                <div className={style.resetBtnDiv}>
                                    <Button
                                        className={style.resetBtn}
                                        onClick={resetForm}
                                        variant="outlined"
                                    >
                                        Reset
                                    </Button>
                                </div>
                                <div className={style.submitBtnDiv}>
                                    <Button
                                        className={style.submitBtn}
                                        onClick={handleSubmit}
                                        variant="contained"
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        </div>


                    </div>
                </form>
            </div>

        </div >
    );
};
