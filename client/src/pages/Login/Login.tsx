import React from 'react'
import style from './Login.module.scss'

import useForm from '../../components/useForm';

import logo from '../../img/logo.png'

import Button from '@material-ui/core/Button'
//import FormHelperText from '@material-ui/core/FormHelperText'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'

import AccountCircle from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'


export default function Login() {

    const initialFValues = {
        companyid: '',
        password: '',
        showPassword: false,
    }


    const {
        // errors,
        // setErrors,
        values,
        // setValues,
        handleChange,
        handleClickShowPassword,
        handleMouseDownPassword
    } = useForm({ initialFValues })

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
                            label="Company ID"
                            onChange={handleChange("companyid")}
                            value={values.companyid}
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
                            onChange={handleChange('password')}
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
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

