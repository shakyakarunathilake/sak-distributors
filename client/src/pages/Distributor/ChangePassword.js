import React, { useState, useEffect } from 'react';

//Shared Components
import PageTwo from '../../shared/PageTwo/PageTwo';
import { useForm, Controller } from 'react-hook-form';
import TextField from '../../shared/TextField/TextField';

//Material UI Exports
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { InputAdornment } from '@material-ui/core';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

//Material UI Icons
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

//SCSS Style
import style from './ChangePassword.module.scss';

//Connecting to Backend
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ChangePassword() {

    const employeedetails = JSON.parse(sessionStorage.getItem("Auth"));

    useEffect(() => {
        if (employeedetails.firsttimelogin) {
            setDisabled(true)
            setAlert("Warning: Please change your password");
            setType('warning');
            handleAlert();
        }
    }, [employeedetails.firsttimelogin])

    const { handleSubmit, formState: { errors, isValid }, getValues, trigger, control, reset, watch } = useForm({
        mode: "onSubmit",
        defaultValues: {
            currentpassword: '',
            newpassword: '',
            confirmpassword: '',
        }
    });

    const [currentPasswordShown, setCurrentPasswordShown] = useState(false);
    const [newPasswordShown, setNewPasswordShown] = useState(false);
    const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [alert, setAlert] = React.useState();
    const [type, setType] = React.useState();
    const [disabled, setDisabled] = React.useState(false);

    const toggleCurrentPasswordVisiblity = () => {
        setCurrentPasswordShown(currentPasswordShown ? false : true);
    };

    const toggleNewPasswordVisiblity = () => {
        setNewPasswordShown(newPasswordShown ? false : true);
    }

    const toggleConfirmPasswordVisiblity = () => {
        setConfirmPasswordShown(confirmPasswordShown ? false : true);
    }

    const handleAlert = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const onSubmit = () => {
        if (!isValid) {
            trigger();
        } else {
            console.log("EMPLOYEE DETAILS: ", employeedetails.employeeid);
            console.log("VALUES: ", getValues());

            axios
                .post(`http://localhost:8080/password/change-password/`, {
                    "employeeid": employeedetails.employeeid,
                    "currentpassword": getValues('currentpassword'),
                    "newpassword": getValues('newpassword'),
                    "firsttimelogin": false
                },
                    {
                        headers: {
                            'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                        }
                    }
                )
                .then(res => {

                    function update(value) {

                        let prevData = JSON.parse(sessionStorage.getItem('Auth'));

                        Object.keys(value).forEach(function (val, key) {
                            prevData[val] = value[val];
                        })

                        sessionStorage.setItem('Auth', JSON.stringify(prevData));
                    }

                    update({ firsttimelogin: false })

                    setDisabled(false);
                    setAlert(res.data.message);
                    setType(res.data.type);
                    handleAlert();
                    reset();
                })
                .catch(err => {
                    console.log(err);
                });
            ;

        }
    }

    return (
        <PageTwo title="Change Password" disabled={disabled}>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className={style.container}
            >

                <div className={style.redFont}>
                    The password should contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.
                    <br />
                    The fields with "*" are required.
                </div>

                <div className={style.body}>

                    <div className={style.row}>

                        <div className={style.textfield}>
                            <Controller
                                name={"currentpassword"}
                                control={control}
                                rules={{
                                    required: { value: true, message: "Required *" },
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        className={style.field}
                                        helperText={errors.currentpassword && errors.currentpassword.message}
                                        error={errors.currentpassword ? true : false}
                                        fullWidth={true}
                                        label="Current Password *"
                                        type={currentPasswordShown ? "text" : "password"}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        color="inherit"
                                                        onClick={toggleCurrentPasswordVisiblity}
                                                        edge="end"
                                                    >
                                                        {currentPasswordShown ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                            />
                        </div>

                    </div>

                    <div className={style.row}>

                        <div className={style.textfield}>
                            <Controller
                                name={"newpassword"}
                                control={control}
                                rules={{
                                    required: { value: true, message: "Required *" },
                                    pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: "Invalid" },
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        className={style.field}
                                        helperText={errors.newpassword && errors.newpassword.message}
                                        error={errors.newpassword ? true : false}
                                        label="New Password *"
                                        fullWidth={true}
                                        type={newPasswordShown ? "text" : "password"}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        color="inherit"
                                                        onClick={toggleNewPasswordVisiblity}
                                                        edge="end"
                                                    >
                                                        {newPasswordShown ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                            />
                        </div>

                    </div>

                    <div className={style.row}>

                        <div className={style.textfield}>
                            <Controller
                                name={"confirmpassword"}
                                control={control}
                                rules={{
                                    required: { value: true, message: "Required *" },
                                    validate: value => value === watch("newpassword") || "Password mismatch"
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        className={style.field}
                                        helperText={errors.confirmpassword && errors.confirmpassword.message}
                                        error={errors.confirmpassword ? true : false}
                                        label="Confirm Password *"
                                        fullWidth={true}
                                        type={confirmPasswordShown ? "text" : "password"}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        color="inherit"
                                                        onClick={toggleConfirmPasswordVisiblity}
                                                        edge="end"
                                                    >
                                                        {confirmPasswordShown ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                            />

                        </div>

                    </div>

                </div>

                <div className={style.footer}>

                    <div className={style.resetBtn}>
                        <Button
                            onClick={() => reset()}
                            variant="contained"
                        >
                            Reset
                        </Button>
                    </div>

                    <div className={style.submitBtn}>
                        <Button
                            onClick={onSubmit}
                            color="primary"
                            type="submit"
                            variant="contained"
                        >
                            Submit
                        </Button>
                    </div>

                </div>

            </form>

            <Snackbar
                open={open}
                autoHideDuration={2500}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Alert
                    onClose={handleClose}
                    severity={type}
                    sx={{ width: '100%' }}
                >
                    {alert}
                </Alert>
            </Snackbar>


        </PageTwo >
    )
};
