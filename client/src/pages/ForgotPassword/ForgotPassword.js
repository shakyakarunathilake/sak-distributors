import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import style from './ForgotPassword.module.scss';

//Shared Components
import TextField from '../../shared/TextField/TextField';

//Logo
import logo from '../../images/logo.svg';

//Material UI Exports
import Button from '@material-ui/core/Button';
import { InputAdornment } from '@material-ui/core';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

//Material UI Icons
import EmailIcon from '@material-ui/icons/Email';

//Connecting to Backend
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {

    const { handleSubmit, formState: { errors }, control, reset } = useForm({
        defaultValues: {
            email: "",
        }
    });

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


    const onSubmit = (values) => {
        axios
            .post("http://localhost:8080/password/forgot-password/", {
                "email": values.email,
            })
            .then(res => {
                sessionStorage.setItem("Response", JSON.stringify(res.data));
                setAlert(res.data.message);
                setType(res.data.type);
                handleAlert();
            })
            .catch(error => {
                console.log(error)
            })
            ;
        reset({
            email: "",
        });
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
                            <span>Forgot Password?</span>
                        </div>
                        <div className={style.description}>
                            <p>
                                Enter the email address you used when you joined
                                and we’ll send you instructions to reset your password.

                                <br />
                                <br />

                                For security reasons, we do NOT store your password.
                                So rest assured that we will never send your password via email.
                            </p>
                        </div>
                        <div className={style.textfield}>
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
                                        value={value}
                                        label="Email"
                                        type="text"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <EmailIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                            />
                        </div>
                        <div className={style.div}>
                            <div>
                                <Button
                                    className={style.button}
                                    color="primary"
                                    type="submit"
                                    variant="contained">
                                    Send Reset Instruction
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className={style.copyright}>
                        © 2021 SAK Distributors.All rights reserved.
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
        </div >
    )
}
