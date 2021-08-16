import React, { useState } from 'react';

//Development Stage
import * as employeeservice from "../../../services/employeeService";

//Shared Components
import { useForm, Form } from '../../../components/useForm';
import TextField from '../../../shared/TextField/TextField';
import Select from '../../../shared/Select/Select';

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
    dob: new Date(),
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

    const {
        values,
        setValues,
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
                    // onSubmit={handleSubmit}
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
                                    variant="outlined"
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
                                    variant="outlined"
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
                                        variant="outlined"
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
                                        variant="outlined"
                                    />
                                </div>
                            </div>

                            <div className={style.gridrow}>
                                <div className={style.column}>
                                    <TextField
                                        //error={checkError("dob")}
                                        fullWidth
                                        //helperText={getError("dob")}
                                        label="Date of Birth"
                                        onChange={handleInputChange}
                                        type="date"
                                        value={values?.dob}
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
                                        onChange={handleInputChange}
                                        placeholder="22"
                                        value={values?.age}
                                        variant="outlined"
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
                                        variant="outlined"
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
                                        variant="outlined"
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
                                    variant="outlined"
                                />
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
                            // onClick={handleSubmit}
                            variant="contained"
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </div>

        </div>
    );
};
