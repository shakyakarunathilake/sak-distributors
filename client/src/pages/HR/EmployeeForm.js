import React, { useState, useEffect } from 'react';

import { useForm, Controller } from 'react-hook-form';
import formData from 'form-data';

//Development Stage
import * as employeeservice from "../../services/employeeService";

//Shared Components
import TextField from '../../shared/TextField/TextField';
import Select from '../../shared/Select/Select';
import DatePicker from '../../shared/DatePicker/DatePicker';

//Material UI Components
import Button from '@material-ui/core/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//Images and SVGS
import user from '../../images/user.svg';

//SCSS Styles
import style from './EmployeeForm.module.scss';

export default function EmployeesForm(props) {

    const { setOpenPopup, addOrEdit, employeeRecords, nextEmpId } = props;

    const { handleSubmit, formState: { errors }, control, reset, setValue, getValues, clearErrors } = useForm({ mode: "all" });

    const [file, setFile] = useState("");
    const [limitedAccess, setLimitedAccess] = useState(false);

    useEffect(() => {
        if (employeeRecords != null) {
            setFile(`http://${employeeRecords.employeeimage}`);

            setValue("employeeimage", employeeRecords.employeeimage);
            setValue("employeeid", employeeRecords.employeeid);
            setValue("analyticprivileges", employeeRecords.analyticprivileges);
            setValue("fullname", employeeRecords.fullname);
            setValue("title", employeeRecords.title);
            setValue("firstname", employeeRecords.firstname);
            setValue("lastname", employeeRecords.lastname);
            setValue("email", employeeRecords.email);
            setValue("dob", employeeRecords.dob);
            setValue("hireddate", employeeRecords.hireddate);
            setValue("address", employeeRecords.address);
            setValue("nic", employeeRecords.nic);
            setValue("gender", employeeRecords.gender);
            setValue("contactnumber", employeeRecords.contactnumber);
            setValue("designation", employeeRecords.designation);
            setValue("civilstatus", employeeRecords.civilstatus);
            setValue("employeestatus", employeeRecords.employeestatus);
        } else {
            setValue("employeeid", nextEmpId);
        };
    }, [employeeRecords, nextEmpId, setValue])


    const handleDesignationChange = e => {
        if ((e === "Driver") || (e === "Product Handler") || (e === "Warehouse Worker")) {
            setLimitedAccess(true);
            setValue("employeestatus", "Limited Access");
            clearErrors("employeestatus");
        }
        else {
            setLimitedAccess(false);
            setValue("employeestatus", "");
        }
    }

    const resetForm = () => {
        reset({
            employeeid: getValues("employeeid"),
            employeeimage: '',
            fullname: '',
            title: '',
            analyticprivileges: false,
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
        setLimitedAccess("");
    }

    // Handle Image Upload
    const handleChange = e => {
        setFile(URL.createObjectURL(e.target.files[0]));
    }



    const onSubmit = (values) => {

        const firstname = JSON.parse(sessionStorage.getItem("Auth")).firstname;
        const lastname = JSON.parse(sessionStorage.getItem("Auth")).lastname;
        const employeeid = JSON.parse(sessionStorage.getItem("Auth")).employeeid;

        const employeeFormData = new formData();

        employeeFormData.append('employeeid', values.employeeid);
        employeeFormData.append('employeeimage', values.employeeimage);
        employeeFormData.append('analyticprivileges', values.analyticprivileges ? values.analyticprivileges : false);
        employeeFormData.append('adminprivileges', false);
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
        employeeFormData.append("hiredby", `${firstname} ${lastname} (${employeeid})`);

        addOrEdit(employeeFormData, getValues("employeeid"));
    };

    return (
        <div className={style.container}>

            <div className={style.header}>
                <div>{employeeRecords ? "Edit Employee" : "Add New Employee"}</div>
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
                                            rules={{ required: { value: true, message: "Required *" } }}
                                            render={({ field: { onChange } }) => (
                                                <input
                                                    type="file"
                                                    id="employee-image"
                                                    hidden
                                                    onChange={(e) => {
                                                        onChange(e.target.files[0]);
                                                        handleChange(e);
                                                    }}
                                                // value={value}
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
                            {limitedAccess ? '' :
                                <div className={style.analyticsPrivileges}>
                                    <Controller
                                        defaultValue=''
                                        name={"analyticprivileges"}
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            sx={{
                                                                color: "#20369f",
                                                                '&.Mui-checked': {
                                                                    color: "#20369f",
                                                                },
                                                            }}
                                                            onChange={onChange}
                                                            checked={value}
                                                        />
                                                    }
                                                    label="View Analytics" />
                                            </FormGroup>
                                        )}
                                    />
                                </div>
                            }
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
                                        required: { value: true, message: "Required *" },
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <TextField
                                            fullWidth={true}
                                            className={style.field}
                                            helperText={errors.fullname && errors.fullname.message}
                                            placeholder="Ex: Abesinghe Mudiyanselage Shakya Madara Karunathilake"
                                            error={errors.fullname ? true : false}
                                            onChange={onChange}
                                            value={value}
                                            label="Full Name *"
                                            size="small"
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
                                            required: { value: true, message: "Required *" },
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
                                                size="small"
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
                                            required: { value: true, message: "Required *" },
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <TextField
                                                fullWidth={true}
                                                className={style.field}
                                                helperText={errors.firstname && errors.firstname.message}
                                                placeholder="Ex: Shakya"
                                                error={errors.firstname ? true : false}
                                                onChange={onChange}
                                                value={value}
                                                label="First Name *"
                                                size="small"
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
                                            required: { value: true, message: "Required *" },
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <TextField
                                                fullWidth={true}
                                                className={style.field}
                                                helperText={errors.lastname && errors.lastname.message}
                                                placeholder="Ex: Karunathilake"
                                                error={errors.lastname ? true : false}
                                                onChange={onChange}
                                                value={value}
                                                label="Last Name *"
                                                size="small"
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
                                            required: { value: true, message: "Required *" },
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <TextField
                                                fullWidth={true}
                                                className={style.field}
                                                helperText={errors.nic && errors.nic.message}
                                                placeholder="Ex: 199950910239"
                                                error={errors.nic ? true : false}
                                                onChange={onChange}
                                                value={value}
                                                label="NIC *"
                                                size="small"
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
                                            required: { value: true, message: "Required *" },
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <DatePicker
                                                className={style.field}
                                                helperText={errors.dob && errors.dob.message}
                                                error={errors.dob ? true : false}
                                                onChange={onChange}
                                                value={value}
                                                label="Date of Birth *"
                                                size="small"
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
                                            required: { value: true, message: "Required *" },
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
                                                size="small"
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
                                            required: { value: true, message: "Required *" },
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
                                                size="small"
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
                                            required: { value: true, message: "Required *" },
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <Select
                                                className={style.field}
                                                helperText={errors.designation && errors.designation.message}
                                                error={errors.designation ? true : false}
                                                onChange={(e) => {
                                                    onChange(e.target.value)
                                                    handleDesignationChange(e.target.value)
                                                }}
                                                options={employeeservice.getDesignationOptions()}
                                                value={value}
                                                label="Designation *"
                                                size="small"
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
                                            required: { value: true, message: "Required *" },
                                            pattern: { value: /^[0-9]{10}$/, message: "Invalid" }
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <TextField
                                                fullWidth={true}
                                                className={style.field}
                                                helperText={errors.contactnumber && errors.contactnumber.message}
                                                error={errors.contactnumber ? true : false}
                                                onChange={onChange}
                                                placeholder="Ex: 071 2686790"
                                                value={value}
                                                label="Contact Number *"
                                                size="small"
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
                                        required: { value: true, message: "Required *" },
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <TextField
                                            fullWidth={true}
                                            className={style.field}
                                            helperText={errors.address && errors.address.message}
                                            error={errors.address ? true : false}
                                            onChange={onChange}
                                            placeholder="Ex: Weekadawatta, Kansalagamuwa, Rambukkana"
                                            value={value}
                                            label="Address *"
                                            size="small"
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
                                        required: { value: true, message: "Required *" },
                                        pattern: {
                                            value: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message: "Invalid"
                                        }
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <TextField
                                            fullWidth={true}
                                            className={style.field}
                                            helperText={errors.email && errors.email.message}
                                            error={errors.email ? true : false}
                                            onChange={onChange}
                                            placeholder="Ex: karunathilakeshakya@gmail.com"
                                            value={value}
                                            label="Email *"
                                            size="small"
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
                                            required: { value: true, message: "Required *" },
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <Select
                                                className={style.field}
                                                helperText={errors.employeestatus && errors.employeestatus.message}
                                                error={errors.employeestatus ? true : false}
                                                onChange={onChange}
                                                options={employeeservice.getEmployeeStatusOptions()}
                                                value={limitedAccess ? "Limited Access" : value}
                                                label="Employee Status *"
                                                size="small"
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
                                            required: { value: true, message: "Required *" },
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <DatePicker
                                                className={style.field}
                                                helperText={errors.hireddate && errors.hireddate.message}
                                                error={errors.hireddate ? true : false}
                                                onChange={onChange}
                                                value={value}
                                                label="Hired Date *"
                                                size="small"
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

    );
};
