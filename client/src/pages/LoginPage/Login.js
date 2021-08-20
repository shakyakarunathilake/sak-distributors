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
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormControl from '@material-ui/core/FormControl';

//Material UI Icons
import AccountCircle from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// import axios from 'axios'

export default function Login() {

    // const postData = () => {
    //     console.log({
    //         "username": values.username,
    //         "password": values.password
    //     });
    //     axios
    //         .post("http://localhost:8080/users/signin", {
    //             "username": values.username,
    //             "password": values.password
    //         })
    //         .then(response => {
    //             console.log(response.data)
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // }

    const initialFieldValues = {
        username: '',
        password: '',
        showPassword: false,
    }

    const {
        // errors,
        // setErrors,
        values,
        // setValues,
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
                            name="username"
                            onChange={handleInputChange}
                            value={values?.username}
                            variant="outlined"
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
                            value={values?.password}
                            variant="outlined"
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
                            // onClick={postData}
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

