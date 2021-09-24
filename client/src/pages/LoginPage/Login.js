import React, { useState } from 'react';
import classnames from 'classnames';
import style from './Login.module.scss';

//Shared Components
import { useForm, Controller } from 'react-hook-form';
import TextField from '../../shared/TextField/TextField';

//Logo
import logo from '../../images/logo.svg';

//Material UI Exports
// import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { InputAdornment } from '@material-ui/core';

//Material UI Icons
import AccountCircle from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

//Connecting to Backend
import axios from 'axios';

export default function Login() {

    const { handleSubmit, formState: { errors }, control } = useForm({
        defaultValues: {
            username: "",
            password: "",
        }
    });
    // const [passwordShown, setPasswordShown] = useState(false);

    // const togglePasswordVisiblity = () => {
    //     setPasswordShown(passwordShown ? false : true);
    // };

    // const onSubmit = (data) => {
    //     console.log(data);
    // axios
    //     .post("http://localhost:8080/auth/signin", data,
    //     // {
    //     //     headers: {
    //     //         authorisation: JSON.parse(localStorage.getItem("Auth")).accesstoken
    //     //     }
    //     // }
    // )
    //     .then(res => {
    //         // console.log(res.data);
    //         localStorage.setItem("Auth", JSON.stringify(res.data));
    //         const role = JSON.parse(localStorage.getItem("Auth")).role;
    //         console.log(role);

    //         switch (role) {
    //             case "Distributor": window.location.replace("http://localhost:3000/distributor/dashboard");
    //                 break;
    //             case "Human Resources": window.location.replace("http://localhost:3000/human-resources/dashboard");
    //                 break;
    //             case "Manager": window.location.replace("http://localhost:3000/manager/dashboard");
    //                 break;
    //             case "Purchasing Manager": window.location.replace("http://localhost:3000/purchasing-manager/dashboard");
    //                 break;
    //             case "Store Keeper": window.location.replace("http://localhost:3000/store-keeper/dashboard");
    //                 break;
    //             case "Sales Representative": window.location.replace("http://localhost:3000/sales-representative/dashboard");
    //                 break;
    //             default: window.location.replace("http://localhost:3000/");
    //         }
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })
    // }

    const onSubmit = (data, e) => console.log(data, e);
    // const onError = (errors, e) => console.log(errors, e);

    // const initialFieldValues = {
    //     username: String,
    //     password: String,
    //     showPassword: false,
    // }

    // const {
    //     values,
    //     handleInputChange,
    //     handleClickShowPassword,
    //     handleMouseDownPassword
    // } = useForm({ initialFieldValues })

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
                                        // fullWidth
                                        // variant="outlined"
                                        className={style.field}
                                        helperText="Username is required"
                                        error={errors.username ? true : false}
                                        onChange={onChange}
                                        value={value}
                                        label="Username"
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

                        </div>
                        <div className={style.div}>
                            <div className={style.forgotPassword}>
                                <a href="http://localhost:3000/forgot-password">Forgot Password?</a>
                            </div>
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
                    <div className={style.copyright}>
                        © 2021 SAK Distributors.All rights reserved.
                    </div>
                </div>
            </form>
        </div>
    )
}
