import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import formData from 'form-data';
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

    const { handleSubmit, formState: { errors }, control, reset, setValue, getValues } = useForm();

    const [file, setFile] = useState("");

    useEffect(() => {
        if (recordForEdit != null) {
            setFile(`http://${recordForEdit.employeeimage}`);

            setValue("employeeimage", recordForEdit.employeeimage);
            setValue("employeeid", recordForEdit.employeeid);
            setValue("fullname", recordForEdit.fullname);
            setValue("title", recordForEdit.title);
            setValue("firstname", recordForEdit.firstname);
            setValue("lastname", recordForEdit.lastname);
            setValue("email", recordForEdit.email);
            setValue("dob", recordForEdit.dob);
            setValue("hireddate", recordForEdit.hireddate);
            setValue("address", recordForEdit.address);
            setValue("nic", recordForEdit.nic);
            setValue("gender", recordForEdit.gender);
            setValue("contactnumber", recordForEdit.contactnumber);
            setValue("designation", recordForEdit.designation);
            setValue("civilstatus", recordForEdit.civilstatus);
            setValue("employeestatus", recordForEdit.employeestatus);
        } else {
            setValue("employeeid", nextEmpId);
        };
    }, [recordForEdit, nextEmpId])

    const resetForm = () => {
        reset({
            // employeeid: getValues("employeeid"),
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
        setFile("");
    }

    // Handle Image Upload
    const handleChange = e => {
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    const onSubmit = (values) => {

        const employeeFormData = new formData();

        employeeFormData.append('employeeid', values.employeeid);
        employeeFormData.append('employeeimage', values.employeimage);
        employeeFormData.append('fullname', values.fullname);
        employeeFormData.append('title', values.title);
        employeeFormData.append('firstname', values.firstname);
        employeeFormData.append('lastname', values.lastname);
        employeeFormData.append('email', values.email);
        employeeFormData.append('dob', values.dob);
        employeeFormData.append('hireddate', values.hireddate);
        employeeFormData.append("address", values.address);
        employeeFormData.append("nic", values.nic);
        employeeFormData.append("gender", values.gender);
        employeeFormData.append("contactnumber", values.contactnumber);
        employeeFormData.append("designation", values.designation);
        employeeFormData.append("civilstatus", values.civilstatus);
        employeeFormData.append("employeestatus", values.employeestatus);

        addOrEdit(employeeFormData, getValues("employeeid"));
    };

    return (
        <div>
            <div className={style.container}>

                <div className={style.header}>
                    <div>{recordForEdit ? "Edit Employee" : "Add New Employee"}</div>
                    <div>
                        <HighlightOffIcon
                            className={style.icon}
                            onClick={() => { setOpenPopup(false) }}
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
                                            <Controller
                                                name={"employeeimage"}
                                                control={control}
                                                defaultValue=""
                                                rules={{ required: { value: true, message: "Employee Image is required" } }}
                                                render={({ field: { onChange } }) => (
                                                    <input
                                                        type="file"
                                                        id="employee-image"
                                                        className={style.input}
                                                        onChange={onChange, handleChange}
                                                    />
                                                )}
                                            />
                                            <label
                                                className={style.label}
                                                htmlFor="employee-image"
                                            >
                                                Upload *
                                            </label>
                                        </div>
                                    </div>
                                    <div className={style.partialCircle}></div>
                                </div>
                                <div className={style.redFontCenter}>
                                    {
                                        errors.employeeimage && errors.employeeimage.message
                                    }
                                </div>

                                <div className={style.employeeId}>
                                    <Controller
                                        name={"employeeid"}
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { onChange, value } }) => (
                                            <input
                                                disabled
                                                type="text"
                                                className={style.input}
                                                onChange={onChange}
                                                value={`ID: ${value}`}
                                            />
                                        )}
                                    />
                                </div>

                            </div>

                            <div className={style.columnB}>

                                <div className={style.redFont}>
                                    The fields with "*" are required
                                </div>

                                <div className={style.row}>
                                    <Controller
                                        defaultValue=''
                                        name={"fullname"}
                                        control={control}
                                        rules={{
                                            required: { value: true, message: "Full name is required" },
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <TextField
                                                className={style.field}
                                                helperText={errors.fullname && errors.fullname.message}
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
                                            defaultValue=''
                                            name={"title"}
                                            control={control}
                                            rules={{
                                                required: { value: true, message: "Title is required" },
                                            }}
                                            render={({ field: { onChange, value } }) => (
                                                <Select
                                                    className={style.field}
                                                    helperText={errors.title && errors.title.message}
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
                                            defaultValue=''
                                            name={"firstname"}
                                            control={control}
                                            rules={{
                                                required: { value: true, message: "First name is required" },
                                            }}
                                            render={({ field: { onChange, value } }) => (
                                                <TextField
                                                    className={style.field}
                                                    helperText={errors.firstname && errors.firstname.message}
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
                                            defaultValue=''
                                            name={"lastname"}
                                            control={control}
                                            rules={{
                                                required: { value: true, message: "Last name is required" },
                                            }}
                                            render={({ field: { onChange, value } }) => (
                                                <TextField
                                                    className={style.field}
                                                    helperText={errors.lastname && errors.lastname.message}
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
                                            defaultValue=''
                                            name={"nic"}
                                            control={control}
                                            rules={{
                                                required: { value: true, message: "NIC is required" },
                                            }}
                                            render={({ field: { onChange, value } }) => (
                                                <TextField
                                                    className={style.field}
                                                    helperText={errors.nic && errors.nic.message}
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
                                            defaultValue=''
                                            name={"dob"}
                                            control={control}
                                            rules={{
                                                required: { value: true, message: "Date of birth is required" },
                                            }}
                                            render={({ field: { onChange, value } }) => (
                                                <DatePicker
                                                    className={style.field}
                                                    helperText={errors.dob && errors.dob.message}
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
                                            defaultValue=''
                                            name={"gender"}
                                            control={control}
                                            rules={{
                                                required: { value: true, message: "Gender is required" },
                                            }}
                                            render={({ field: { onChange, value } }) => (
                                                <Select
                                                    className={style.field}
                                                    helperText={errors.gender && errors.gender.message}
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
                                            defaultValue=''
                                            name={"civilstatus"}
                                            control={control}
                                            rules={{
                                                required: { value: true, message: "Civil Status is required" },
                                            }}
                                            render={({ field: { onChange, value } }) => (
                                                <Select
                                                    className={style.field}
                                                    helperText={errors.civilstatus && errors.civilstatus.message}
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
                                            defaultValue=''
                                            name={"designation"}
                                            control={control}
                                            rules={{
                                                required: { value: true, message: "Designation is required" },
                                            }}
                                            render={({ field: { onChange, value } }) => (
                                                <Select
                                                    className={style.field}
                                                    helperText={errors.designation && errors.designation.message}
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
                                            defaultValue=''
                                            name={"contactnumber"}
                                            control={control}
                                            rules={{
                                                required: { value: true, message: "Contact Number is required" },
                                                pattern: { value: /^[0-9]{10}$/, message: "Contact Number is invalid" }
                                            }}
                                            render={({ field: { onChange, value } }) => (
                                                <TextField
                                                    className={style.field}
                                                    helperText={errors.contactnumber && errors.contactnumber.message}
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
                                        defaultValue=''
                                        name={"address"}
                                        control={control}
                                        rules={{
                                            required: { value: true, message: "Address is required" },
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <TextField
                                                className={style.field}
                                                helperText={errors.address && errors.address.message}
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
                                        defaultValue=''
                                        name={"email"}
                                        control={control}
                                        rules={{
                                            required: { value: true, message: "Email is required" },
                                            pattern: { value: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: "Email is invalid" }
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <TextField
                                                className={style.field}
                                                helperText={errors.email && errors.email.message}
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
                                            defaultValue=''
                                            name={"employeestatus"}
                                            control={control}
                                            rules={{
                                                required: { value: true, message: "Employee Status is required" },
                                            }}
                                            render={({ field: { onChange, value } }) => (
                                                <Select
                                                    className={style.field}
                                                    helperText={errors.employeestatus && errors.employeestatus.message}
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
                                            defaultValue=''
                                            name={"hireddate"}
                                            control={control}
                                            rules={{
                                                required: { value: true, message: "Hired date is required" },
                                            }}
                                            render={({ field: { onChange, value } }) => (
                                                <DatePicker
                                                    className={style.field}
                                                    helperText={errors.hireddate && errors.hireddate.message}
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
