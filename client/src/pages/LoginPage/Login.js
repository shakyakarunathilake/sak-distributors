import React from 'react';
import style from './Login.module.scss';

//Shared Components
import useForm from '../../components/useForm';
import TextField from '../../shared/TextField/TextField';

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

export default function Login() {

    const postData = () => {
        console.log({
            "username": values.username,
            "password": values.password
        });
        axios
            .post("http://localhost:8080/auth/signin", {
                "username": values.username,
                "password": values.password
            },
                // {
                //     headers: {
                //         authorisation: JSON.parse(localStorage.getItem("Auth")).accesstoken
                //     }
                // }
            )
            .then(res => {
                // console.log(res.data);
                localStorage.setItem("Auth", JSON.stringify(res.data));
                const role = JSON.parse(localStorage.getItem("Auth")).role;
                console.log(role);

                switch (role) {
                    case "Distributor": window.location.replace("http://localhost:3000/distributor/dashboard");
                        break;
                    case "Human Resources": window.location.replace("http://localhost:3000/human-resources/dashboard");
                        break;
                    case "Manager": window.location.replace("http://localhost:3000/manager/dashboard");
                        break;
                    case "Purchasing Manager": window.location.replace("http://localhost:3000/purchasing-manager/dashboard");
                        break;
                    case "Store Keeper": window.location.replace("http://localhost:3000/store-keeper/dashboard");
                        break;
                    case "Sales Representative": window.location.replace("http://localhost:3000/sales-representative/dashboard");
                        break;
                    default: window.location.replace("http://localhost:3000/");
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    const initialFieldValues = {
        username: '',
        password: '',
        showPassword: false,
    }

    const {
        values,
        handleInputChange,
        handleClickShowPassword,
        handleMouseDownPassword
    } = useForm({ initialFieldValues })

    return (
        <div className={style.container}>

            <div className={style.login}>
                <div className={style.top}>
                    <div className={style.logo}>
                        <img src={logo} alt="" />
                    </div>
                    <div className={style.heading}>
                        <span>Login</span>
                    </div>
                    <div className={style.textfield}>
                        <TextField
                            className={style.field}
                            label="Username"
                            onChange={handleInputChange}
                            value={values?.username || ''}
                            name="username"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <div className={style.textfield}>
                        <TextField
                            className={style.field}
                            label="Password"
                            name="password"
                            onChange={handleInputChange}
                            type={values.showPassword ? 'text' : 'password'}
                            value={values?.password || ''}
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
                        <div className={style.forgotPassword}>
                            <a href="http://localhost:3000/forgot-password">Forgot Password?</a>
                        </div>
                        <Button
                            className={style.button}
                            color="primary"
                            onClick={postData}
                            variant="contained">
                            Submit
                        </Button>
                    </div>
                </div>
                <div className={style.copyright}>
                    © 2021 SAK Distributors. All rights reserved.
                </div>
            </div>
        </div>
    )
}
