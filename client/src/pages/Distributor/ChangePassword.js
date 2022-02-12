import React, { useState } from 'react';
import style from './ChangePassword.module.scss';

//Shared Components
import Page from '../../shared/Page/Page';
import { useForm, Controller } from 'react-hook-form';
import TextField from '../../shared/TextField/TextField';

//Logo
import logo from '../../images/logo.svg';

//Material UI Exports
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { InputAdornment } from '@material-ui/core';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

//Material UI Icons
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

//Connecting to Backend
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ChangePassword() {

    const employeeid = JSON.parse(sessionStorage.getItem("Auth")).employeeid;
    const firsttimelogin = JSON.parse(sessionStorage.getItem("Auth")).firsttimelogin;

    const { handleSubmit, formState: { errors }, control, reset } = useForm({
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

    const handleFirstTimeLogin = () => {
        if (firsttimelogin) {
            setAlert("Warning: Please change your password");
            setType('warning');
            handleAlert();
        }
    };

    const onSubmit = (values) => {
        if (values.newpassword !== values.confirmpassword) {
            setType('error');
            setAlert("New Password and Confirm Password doesn't match");
            handleAlert();
        } else {
            axios
                .put(`http://localhost:8080/password/change-password/`, {
                    "employeeid": employeeid,
                    "currentpassword": values.currentpassword,
                    "newpassword": values.newpassword,
                    "firsttimelogin": false
                }, {
                    headers: {
                        'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                    }
                })
                .then(res => {
                    setAlert(res.data.message);
                    setType(res.data.type);
                    handleAlert();
                })
                .catch(err => {
                    console.log(err);
                });
            ;
            reset({
                currentpassword: '',
                newpassword: '',
                confirmpassword: '',
            });
        }
    }

    return (
        <Page title="Change Password">
            <div className={style.container} onLoad={handleFirstTimeLogin}>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className={style.blurDiv}>

                        <div className={style.paper}>

                            <div className={style.logo}>
                                <img src={logo} alt="" />
                            </div>

                            <div className={style.heading}>
                                <span>Emp. ID: {employeeid}</span>
                            </div>

                            <div className={style.textfield}>
                                <Controller
                                    name={"currentpassword"}
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { onChange, value } }) => (
                                        <TextField
                                            className={style.field}
                                            helperText="Current Password is required"
                                            error={errors.currentpassword ? true : false}
                                            onChange={onChange}
                                            value={value}
                                            fullWidth={true}
                                            label="Current Password"
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

                            <div className={style.textfield}>
                                <Controller
                                    name={"newpassword"}
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { onChange, value } }) => (
                                        <TextField
                                            className={style.field}
                                            helperText="New Password is required"
                                            error={errors.newpassword ? true : false}
                                            onChange={onChange}
                                            value={value}
                                            label="New Password"
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

                            <div className={style.textfield}>
                                <Controller
                                    name={"confirmpassword"}
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { onChange, value } }) => (
                                        <TextField
                                            className={style.field}
                                            helperText="Confirm Password is required"
                                            error={errors.confirmpassword ? true : false}
                                            onChange={onChange}
                                            value={value}
                                            label="Confirm Password"
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

                            <div className={style.div}>
                                <Button
                                    className={style.button}
                                    color="primary"
                                    type="submit"
                                    variant="contained"
                                >
                                    Submit
                                </Button>
                            </div>

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

            </div>
        </Page>
    )
};
