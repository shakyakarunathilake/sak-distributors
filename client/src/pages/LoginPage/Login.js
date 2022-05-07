import React, { useState } from 'react';
import style from './Login.module.scss';

//Shared Components
import { useForm, Controller } from 'react-hook-form';
import TextField from '../../shared/TextField/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

//Logo
import logo from '../../images/logo.svg';

//Material UI Exports
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { InputAdornment } from '@material-ui/core';

//Material UI Icons
import AccountCircle from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

//Connecting to Backend
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})

export default function Login() {

    const { handleSubmit, formState: { errors }, control, reset } = useForm({
        defaultValues: {
            username: "",
            password: "",
        }
    });

    const [passwordShown, setPasswordShown] = useState(false);
    const [alert, setAlert] = React.useState();
    const [type, setType] = React.useState();
    const [open, setOpen] = React.useState(false);

    const handleAlert = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const onSubmit = (values) => {
        axios
            .post("http://localhost:8080/auth/signin", {
                "username": values.username,
                "password": values.password
            })
            .then(res => {
                sessionStorage.setItem("Auth", JSON.stringify(res.data));

                if (res.data.type === 'error') {
                    setType(res.data.type);
                    setAlert(res.data.message);
                    handleAlert();
                } else {
                    window.location.replace(`http://localhost:3000/${res.data.pathname}/dashboard`)
                }
            })
            .catch(error => {
                console.log(error)
            });

        reset();
    };

    return (
        <div className={style.container}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={style.login}>
                    <div className={style.top}>
                        <div className={style.logo}>
                            <img src={logo} alt="" />
                        </div>
                        <div className={style.heading}>
                            <span>Login</span>
                        </div>
                        <div className={style.textfield}>
                            <Controller
                                name={"username"}
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) => (
                                    <TextField
                                        className={style.field}
                                        helperText="Username is required"
                                        error={errors.username ? true : false}
                                        onChange={onChange}
                                        value={value}
                                        label="Username"
                                        fullWidth={true}
                                        type="text"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <AccountCircle />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                            />
                        </div>
                        <div className={style.textfield}>
                            <Controller
                                name={"password"}
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) => (
                                    <TextField
                                        className={style.field}
                                        helperText="Password is required"
                                        error={errors.password ? true : false}
                                        onChange={onChange}
                                        value={value}
                                        fullWidth={true}
                                        label="Password"
                                        type={passwordShown ? "text" : "password"}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        color="inherit"
                                                        onClick={togglePasswordVisiblity}
                                                        edge="end"
                                                    >
                                                        {passwordShown ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                            />
                        </div>
                        <div className={style.div}>
                            <div className={style.forgotPassword}>
                                <a href="http://localhost:3000/forgot-password">Forgot Password?</a>
                            </div>
                            <Button
                                className={style.button}
                                color="primary"
                                type="submit"
                                variant="contained">
                                Submit
                            </Button>
                        </div>
                    </div>
                    <div className={style.copyright}>
                        © 2021 SAK Distributors. All rights reserved.
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
                <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                    {alert}
                </Alert>
            </Snackbar>

        </div>
    )
}
