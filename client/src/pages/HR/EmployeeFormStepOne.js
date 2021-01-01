import React from 'react';
import { Controller } from 'react-hook-form';

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
import style from './EmployeeFormStepOne.module.scss';

export default function EmployeeFormStepOne(props) {

    const {
        errors,
        control,
        file,
        completeFormStep,
        watch,
        resetForm,
        action,
        setOpenPopup,
        handleImageChange,
        handleDesignationChange
    } = props;

    return (
        <div className={style.container}>

            <div className={style.header}>

                <div className={style.title}>
                    <div>
                        {action === "Create" && "Create Employee"}
                        {action === "Edit" && "Edit Employee"}
                        {action === "View" && "View Employee"}
                    </div>
                    <div>
                        <HighlightOffIcon
                            className={style.icon}
                            onClick={() => { setOpenPopup(false) }}
                        />
                    </div>
                </div>

                <div className={style.step}>
                    Step 1 of 2
                </div>

            </div>

            <div className={style.body}>

                <div className={style.columnA}>

                    <div className={style.image}>

                        <div className={style.imgWrapper}>

                            <img src={file ? file : user} alt="" />

                            <div className={style.uploadWrapper}>

                                <Controller
                                    render={({ field }) => (
                                        <input
                                            type="file"
                                            id="employee-image"
                                            hidden
                                            onChange={(e) => {
                                                field.onChange(e.target.files[0]);
                                                handleImageChange(e);
                                            }}
                                        />
                                    )}
                                    control={control}
                                    name={"employeeimage"}
                                    rules={{ required: { value: true, message: "Required *" } }}
                                />

                                <label
                                    className={style.label}
                                    htmlFor="employee-image"
                                >
                                    Upload *
                                </label>

                            </div>

                        </div>

                        <div className={style.partialCircle}>
                        </div>

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

                    {
                        watch('employeestatus') !== "Limited Access" &&

                        <div className={style.analyticsPrivileges}>

                            <Controller
                                render={({ field }) => (
                                    <FormGroup>
                                        <FormControlLabel
                                            {...field}
                                            control={
                                                <Checkbox
                                                    onChange={(e) => field.onChange(e.target.checked)}
                                                    checked={field.value}
                                                    sx={{
                                                        color: "#20369f",
                                                        '&.Mui-checked': {
                                                            color: "#20369f",
                                                        },
                                                        '&.MuiTypography-root': {
                                                            marginLeft: 10
                                                        }
                                                    }}
                                                />
                                            }
                                            label="View Analytics"
                                        />
                                    </FormGroup>
                                )}
                                control={control}
                                name={"analyticprivileges"}
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
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth={true}
                                    error={errors.fullname ? true : false}
                                    helperText={errors.fullname && errors.fullname.message}
                                    placeholder="Ex: Abesinghe Mudiyanselage Shakya Madara Karunathilake"
                                    //size="small"
                                    label="Full Name *"
                                    className={style.field}
                                />
                            )}
                            control={control}
                            name={"fullname"}
                            rules={{
                                required: { value: true, message: "Required *" },
                            }}
                        />
                    </div>

                    <div className={style.rowminicolumns}>
                        <div>
                            <Controller
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={employeeservice.getTitleOptions()}
                                        error={errors.title ? true : false}
                                        helperText={errors.title && errors.title.message}
                                        //size="small"
                                        label="Title *"
                                        className={style.field}
                                    />
                                )}
                                control={control}
                                name={"title"}
                                rules={{
                                    required: { value: true, message: "Required *" },
                                }}
                            />
                        </div>
                        <div>
                            <Controller
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth={true}
                                        error={errors.firstname ? true : false}
                                        helperText={errors.firstname && errors.firstname.message}
                                        placeholder="Ex: Shakya"
                                        //size="small"
                                        label="First Name *"
                                        className={style.field}
                                    />
                                )}
                                control={control}
                                name={"firstname"}
                                rules={{
                                    required: { value: true, message: "Required *" },
                                }}
                            />
                        </div>
                        <div>
                            <Controller
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth={true}
                                        error={errors.lastname ? true : false}
                                        helperText={errors.lastname && errors.lastname.message}
                                        placeholder="Ex: Karunathilake"
                                        //size="small"
                                        label="Last Name *"
                                        className={style.field}
                                    />
                                )}
                                control={control}
                                name={"lastname"}
                                rules={{
                                    required: { value: true, message: "Required *" },
                                }}
                            />
                        </div>
                    </div>

                    <div className={style.gridrow}>
                        <div>
                            <Controller
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth={true}
                                        error={errors.nic ? true : false}
                                        helperText={errors.nic && errors.nic.message}
                                        placeholder="Ex: 199950910239"
                                        //size="small"
                                        label="NIC *"
                                        className={style.field}
                                    />
                                )}
                                control={control}
                                name={"nic"}
                                rules={{
                                    required: { value: true, message: "Required *" },
                                    pattern: { value: /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/, message: "Invalid" }
                                }}
                            />
                        </div>
                        <div>
                            <Controller
                                render={({ field }) => (
                                    <DatePicker
                                        {...field}
                                        error={errors.dob ? true : false}
                                        helperText={errors.dob && errors.dob.message}
                                        //size="small"
                                        label="Date of Birth *"
                                        className={style.field}
                                    />
                                )}
                                control={control}
                                name={"dob"}
                                rules={{
                                    required: { value: true, message: "Required *" },
                                }}
                            />
                        </div>

                    </div>

                    <div className={style.gridrow}>
                        <div>
                            <Controller
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={employeeservice.getGenderOptions()}
                                        error={errors.gender ? true : false}
                                        helperText={errors.gender && errors.gender.message}
                                        //size="small"
                                        label="Gender *"
                                        className={style.field}
                                    />
                                )}
                                control={control}
                                name={"gender"}
                                rules={{
                                    required: { value: true, message: "Required *" },
                                }}
                            />
                        </div>

                        <div>
                            <Controller
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={employeeservice.getCivilStatusOptions()}
                                        error={errors.civilstatus ? true : false}
                                        helperText={errors.civilstatus && errors.civilstatus.message}
                                        //size="small"
                                        label="Civil Status *"
                                        className={style.field}
                                    />
                                )}
                                control={control}
                                name={"civilstatus"}
                                rules={{
                                    required: { value: true, message: "Required *" },
                                }}
                            />
                        </div>

                    </div>

                    <div className={style.gridrow}>
                        <div>
                            <Controller
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        onChange={(e) => {
                                            field.onChange(e.target.value)
                                            handleDesignationChange(e.target.value)
                                        }}
                                        options={employeeservice.getDesignationOptions()}
                                        error={errors.designation ? true : false}
                                        helperText={errors.designation && errors.designation.message}
                                        //size="small"
                                        label="Designation *"
                                        className={style.field}
                                    />
                                )}
                                control={control}
                                name={"designation"}
                                rules={{
                                    required: { value: true, message: "Required *" },
                                }}
                            />
                        </div>

                        <div>
                            <Controller
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth={true}
                                        error={errors.contactnumber ? true : false}
                                        helperText={errors.contactnumber && errors.contactnumber.message}
                                        placeholder="Ex: 071 2686790"
                                        //size="small"
                                        label="Contact Number *"
                                        className={style.field}
                                    />
                                )}
                                control={control}
                                name={"contactnumber"}
                                rules={{
                                    required: { value: true, message: "Required *" },
                                    pattern: { value: /^[0-9]{10}$/, message: "Invalid" }
                                }}
                            />
                        </div>
                    </div>

                    <div className={style.row}>
                        <Controller
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth={true}
                                    error={errors.address ? true : false}
                                    helperText={errors.address && errors.address.message}
                                    placeholder="Ex: Weekadawatta, Kansalagamuwa, Rambukkana"
                                    //size="small"
                                    label="Address *"
                                    className={style.field}
                                />
                            )}
                            control={control}
                            name={"address"}
                            rules={{
                                required: { value: true, message: "Required *" },
                            }}
                        />
                    </div>

                    <div className={style.row}>
                        <Controller
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth={true}
                                    error={errors.email ? true : false}
                                    helperText={errors.email && errors.email.message}
                                    placeholder="Ex: karunathilakeshakya@gmail.com"
                                    //size="small"
                                    label="Email *"
                                    className={style.field}
                                />
                            )}
                            control={control}
                            name={"email"}
                            rules={{
                                required: { value: true, message: "Required *" },
                                pattern: {
                                    value: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: "Invalid"
                                }
                            }}
                        />
                    </div>

                    <div className={style.gridrow}>
                        <div>
                            <Controller
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={employeeservice.getEmployeeStatusOptions()}
                                        error={errors.employeestatus ? true : false}
                                        helperText={errors.employeestatus && errors.employeestatus.message}
                                        // value={limitedAccess ? "Limited Access" : value}
                                        //size="small"
                                        label="Employee Status *"
                                        className={style.field}
                                    />
                                )}
                                control={control}
                                name={"employeestatus"}
                                rules={{
                                    required: { value: true, message: "Required *" },
                                }}
                            />
                        </div>
                        <div>
                            <Controller
                                render={({ field }) => (
                                    <DatePicker
                                        {...field}
                                        error={errors.hireddate ? true : false}
                                        helperText={errors.hireddate && errors.hireddate.message}
                                        //size="small"
                                        label="Hired Date *"
                                        className={style.field}
                                    />
                                )}
                                control={control}
                                name={"hireddate"}
                                rules={{
                                    required: { value: true, message: "Required *" },
                                }}
                            />
                        </div>
                    </div>

                </div>

            </div>

            <div className={style.footer}>

                <div className={style.backBtn}>
                    {
                        action === "Create" &&
                        <Button
                            onClick={resetForm}
                            variant="contained"
                        >
                            Reset
                        </Button>
                    }
                </div>

                <div className={style.doneBtn}>
                    <Button
                        onClick={completeFormStep}
                        variant="contained"
                    >
                        Next
                    </Button>
                </div>

            </div>
        </div>
    )
}
