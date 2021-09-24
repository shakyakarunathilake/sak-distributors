import React from 'react';

//Shared Components
import Page from '../../shared/Page/Page';
import useForm from '../../components/useForm';
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

//SCSS style
import style from './ChangePassword.module.scss';

//Connecting to Backend
import axios from 'axios';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function ChangePassword() {

    const employeeid = JSON.parse(sessionStorage.getItem("Auth")).employeeid;
    const firsttimelogin = JSON.parse(sessionStorage.getItem("Auth")).firsttimelogin;

    const [open, setOpen] = React.useState(false);
    const [alert, setAlert] = React.useState();
    const [type, setType] = React.useState();

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


    const handleSubmit = e => {
        e.preventDefault();

        if (values.newpassword !== values.confirmpassword) {
            setType(true);
            setAlert("New Password and Confirm Password doesn't match");
            handleAlert();
        } else {
            axios
                .put(`http://localhost:8080/password/change-password/${employeeid}`, {
                    "currentpassword": values.currentpassword,
                    "newpassword": values.newpassword,
                    "firsttimelogin": false
                })
                .then(res => {
                    sessionStorage.setItem("Response", JSON.stringify(res.data));
                    const type = JSON.parse(sessionStorage.getItem("Response")).type;
                    const message = JSON.parse(sessionStorage.getItem("Response")).message;
                    setAlert(message);
                    setType(type);
                    handleAlert();
                })
                .catch(err => {
                    console.log(err);
                });
            ;
            resetForm();
        }
    }

    const initialFieldValues = {
        currentpassword: '',
        newpassword: '',
        confirmpassword: '',
        showPassword: false
    }

    const {
        values,
        resetForm,
        handleInputChange,
        handleClickShowPassword,
        handleMouseDownPassword
    } = useForm({ initialFieldValues })

    return (
        <Page title="Change Password" className={style.page}>
            <div className={style.container} onLoad={handleFirstTimeLogin}>

                <div className={style.paper}>

                    <div className={style.logo}>
                        <img src={logo} alt="" />
                    </div>

                    <div className={style.heading}>
                        <span>Emp. ID: {employeeid}</span>
                    </div>

                    <div className={style.textfield}>
                        <TextField
                            className={style.field}
                            label="Current Password"
                            onChange={handleInputChange}
                            value={values?.currentpassword || ''}
                            name="currentpassword"
                            type={values.showPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            color="inherit"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>

                    <div className={style.textfield}>
                        <TextField
                            className={style.field}
                            label="New Password"
                            name="newpassword"
                            onChange={handleInputChange}
                            type={values.showPassword ? 'text' : 'password'}
                            value={values?.newpassword || ''}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            color="inherit"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>

                    <div className={style.textfield}>
                        <TextField
                            className={style.field}
                            label="Confirm Password"
                            name="confirmpassword"
                            onChange={handleInputChange}
                            type={values.showPassword ? 'text' : 'password'}
                            value={values?.confirmpassword || ''}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            color="inherit"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>

                    <div className={style.div}>
                        <Button
                            className={style.button}
                            color="primary"
                            onClick={handleSubmit}
                            variant="contained">
                            Submit
                        </Button>
                    </div>

                </div>

                <Snackbar
                    open={open}
                    autoHideDuration={2500}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
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
