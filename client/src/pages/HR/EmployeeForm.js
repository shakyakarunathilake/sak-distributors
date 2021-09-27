import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
// import formData from 'form-data';
import style from './EmployeeForm.module.scss';

//Development Stage
import * as employeeservice from "../../services/employeeService";

//Shared Components
import TextField from '../../shared/TextField/TextField';
import Select from '../../shared/Select/Select';
import DatePicker from '../../shared/DatePicker/DatePicker';

//Material UI Components
import Button from '@material-ui/core/Button';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//Images and SVGS
import user from '../../images/user.svg';

export default function EmployeesForm(props) {

    const { setOpenPopup, addOrEdit, recordForEdit, nextEmpId } = props;

    const { handleSubmit, formState: { errors }, control, reset } = useForm({
        defaultValues: {
            employeeid: '',
            employeeimage: '',
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
            contactnumber: '',
            designation: '',
            civilstatus: '',
            employeestatus: '',
        }
    });

    const resetForm = () => {
        reset({
            employeeid: '',
            employeeimage: '',
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
            contactnumber: '',
            designation: '',
            civilstatus: '',
            employeestatus: '',
        });
    }

    // Handle Image Upload
    var [file, setFile] = useState("");

    if (file) {
        file = URL.createObjectURL(file)
    } else {
        file = user
    }

    const handleChange = e => {
        setFile(e.target.files[0]);
    }

    const onSubmit = (values) => {

        const employee = {
            "employeeid": nextEmpId,
            "employeeimage": file,
            "fullname": values.fullname,
            "title": values.title,
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
        }

        console.log(employee);

        addOrEdit(employee)

        reset({
            employeeid: '',
            employeeimage: '',
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
            contactnumber: '',
            designation: '',
            civilstatus: '',
            employeestatus: '',
        });

    };

    return (
        <div>
            <div className={style.container}>

                <div className={style.header}>
                    <div>Add New Employee</div>
                    <div>
                        <HighlightOffIcon
                            className={style.icon}
                            onClick={() => setOpenPopup(false)}
                        />
                    </div>
                </div>

                <div className={style.body}>
                    <form
                        className={style.form}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className={style.formFields}>

                            <div className={style.columnA}>

                                <div className={style.image}>
                                    <div className={style.imgWrapper}>
                                        <img src={file ? file : user} alt="" />
                                        <div className={style.uploadWrapper}>
                                            {/* <Controller
                                                name={"fullname"}
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { onChange, value } }) => (
                                                    <input
                                                        type="file"
                                                        id="employee-image"
                                                        className={style.input}
                                                        onChange={onChange}
                                                        value={value}
                                                        defaultValue=""
                                                    />
                                                )}
                                            /> */}
                                            <label
                                                className={style.label}
                                                htmlFor="employee-image"
                                            >
                                                Upload
                                            </label>
                                            <input
                                                type="file"
                                                id="employee-image"
                                                className={style.input}
                                                onChange={handleChange}
                                                defaultValue=""
                                            />
                                        </div>
                                    </div>
                                    <div className={style.partialCircle}></div>
                                </div>

                                <div className={style.employeeId}>
                                    ID: {nextEmpId}
                                </div>

                            </div>

                            <div className={style.columnB}>

                                <div className={style.redFont}>
                                    The fields with "*" are required
                                </div>

                                <div className={style.row}>
                                    <Controller
                                        name={"fullname"}
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { onChange, value } }) => (
                                            <TextField
                                                className={style.field}
                                                helperText="Full name is required"
                                                placeholder="Ex: Abesinghe Mudiyanselage Shakya Madara Karunathilake"
                                                error={errors.fullname ? true : false}
                                                onChange={onChange}
                                                value={value}
                                                label="Full Name *"
                                            />
                                        )}
                                    />
                                </div>

                                <div className={style.rowminicolumns}>
                                    <div>
                                        <Controller
                                            name={"title"}
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { onChange, value } }) => (
                                                <Select
                                                    className={style.field}
                                                    helperText="Title is required"
                                                    error={errors.title ? true : false}
                                                    onChange={onChange}
                                                    value={value}
                                                    options={employeeservice.getTitleOptions()}
                                                    label="Title *"
                                                />
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <Controller
                                            name={"firstname"}
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { onChange, value } }) => (
                                                <TextField
                                                    className={style.field}
                                                    helperText="First name is required"
                                                    placeholder="Ex: Shakya"
                                                    error={errors.firstname ? true : false}
                                                    onChange={onChange}
                                                    value={value}
                                                    label="First Name *"
                                                />
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <Controller
                                            name={"lastname"}
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { onChange, value } }) => (
                                                <TextField
                                                    className={style.field}
                                                    helperText="Last name is required"
                                                    placeholder="Ex: Karunathilake"
                                                    error={errors.lastname ? true : false}
                                                    onChange={onChange}
                                                    value={value}
                                                    label="Last Name *"
                                                />
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className={style.gridrow}>
                                    <div>
                                        <Controller
                                            name={"nic"}
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { onChange, value } }) => (
                                                <TextField
                                                    className={style.field}
                                                    helperText="NIC is required"
                                                    placeholder="Ex: 199950910239"
                                                    error={errors.nic ? true : false}
                                                    onChange={onChange}
                                                    value={value}
                                                    label="NIC *"
                                                />
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <Controller
                                            name={"dob"}
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { onChange, value } }) => (
                                                <DatePicker
                                                    className={style.field}
                                                    helperText="Date of birth is required"
                                                    error={errors.dob ? true : false}
                                                    onChange={onChange}
                                                    value={value}
                                                    label="Date of Birth *"
                                                />
                                            )}
                                        />
                                    </div>

                                </div>

                                <div className={style.gridrow}>
                                    <div>
                                        <Controller
                                            name={"gender"}
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { onChange, value } }) => (
                                                <Select
                                                    className={style.field}
                                                    helperText="Gender is required"
                                                    error={errors.gender ? true : false}
                                                    options={employeeservice.getGenderOptions()}
                                                    onChange={onChange}
                                                    value={value}
                                                    label="Gender *"
                                                />
                                            )}
                                        />
                                    </div>

                                    <div>
                                        <Controller
                                            name={"civilstatus"}
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { onChange, value } }) => (
                                                <Select
                                                    className={style.field}
                                                    helperText="Civil Status is required"
                                                    error={errors.civilstatus ? true : false}
                                                    onChange={onChange}
                                                    options={employeeservice.getCivilStatusOptions()}
                                                    value={value}
                                                    label="Civil Status *"
                                                />
                                            )}
                                        />
                                    </div>

                                </div>

                                <div className={style.gridrow}>
                                    <div>
                                        <Controller
                                            name={"designation"}
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { onChange, value } }) => (
                                                <Select
                                                    className={style.field}
                                                    helperText="Designation is required"
                                                    error={errors.designation ? true : false}
                                                    onChange={onChange}
                                                    options={employeeservice.getDesignationOptions()}
                                                    value={value}
                                                    label="Designation *"
                                                />
                                            )}
                                        />
                                    </div>

                                    <div>
                                        <Controller
                                            name={"contactnumber"}
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { onChange, value } }) => (
                                                <TextField
                                                    className={style.field}
                                                    helperText="Contact Number is required"
                                                    error={errors.contactnumber ? true : false}
                                                    onChange={onChange}
                                                    placeholder="Ex: 071 2686790"
                                                    value={value}
                                                    label="Contact Number *"
                                                />
                                            )}
                                        />
                                    </div>
                                </div>



                                <div className={style.row}>
                                    <Controller
                                        name={"address"}
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { onChange, value } }) => (
                                            <TextField
                                                className={style.field}
                                                helperText="Address is required"
                                                error={errors.address ? true : false}
                                                onChange={onChange}
                                                placeholder="Ex: Weekadawatta, Kansalagamuwa, Rambukkana"
                                                value={value}
                                                label="Address *"
                                            />
                                        )}
                                    />
                                </div>

                                <div className={style.row}>
                                    <Controller
                                        name={"email"}
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { onChange, value } }) => (
                                            <TextField
                                                className={style.field}
                                                helperText="Email is required"
                                                error={errors.email ? true : false}
                                                onChange={onChange}
                                                placeholder="Ex: karunathilakeshakya@gmail.com"
                                                value={value}
                                                label="Email *"
                                            />
                                        )}
                                    />
                                </div>


                                <div className={style.gridrow}>
                                    <div>
                                        <Controller
                                            name={"employeestatus"}
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { onChange, value } }) => (
                                                <Select
                                                    className={style.field}
                                                    helperText="Employee Status is required"
                                                    error={errors.employeestatus ? true : false}
                                                    onChange={onChange}
                                                    options={employeeservice.getEmployeeStatusOptions()}
                                                    value={value}
                                                    label="Employee Status *"
                                                />
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <Controller
                                            name={"hireddate"}
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { onChange, value } }) => (
                                                <DatePicker
                                                    className={style.field}
                                                    helperText="Hired date is required"
                                                    error={errors.hireddate ? true : false}
                                                    onChange={onChange}
                                                    value={value}
                                                    label="Hired Date *"
                                                />
                                            )}
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
                                            type="submit"
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
            </div>

        </div >
    );
};
