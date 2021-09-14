import React from 'react';
import style from './ForgotPassword.module.scss';

//Shared Components
import useForm from '../../components/useForm';
import TextField from '../../shared/TextField/TextField';

//Logo
import logo from '../../images/logo.svg';

//Material UI Exports
import Button from '@material-ui/core/Button';
import { InputAdornment } from '@material-ui/core';

//Material UI Icons
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';

//Connecting to Backend
// import axios from 'axios';

export default function Login() {

    const postData = () => {
        window.location.replace("http://localhost:3000/dashboard");
    }

    const initialFieldValues = {
        username: '',
        email: '',
    }

    const {
        values,
        handleInputChange,
    } = useForm({ initialFieldValues })

    return (
        <div className={style.container}>

            <div className={style.login}>
                <div className={style.top}>
                    <div className={style.logo}>
                        <img src={logo} alt="" />
                    </div>
                    <div className={style.heading}>
                        <span>Forgot Password</span>
                    </div>
                    <div className={style.textfield}>
                        <TextField
                            className={style.field}
                            label="Username"
                            onChange={handleInputChange}
                            value={values.username}
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
                            label="Email"
                            name="email"
                            onChange={handleInputChange}
                            value={values.email}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <EmailIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <div className={style.div}>
                        <div>
                            <Button
                                className={style.submitbutton}
                                color="primary"
                                onClick={postData}
                                variant="contained">
                                Submit
                            </Button>
                        </div>
                        {/* <div
                            className={style.cancelbutton}
                            onClick={() => { window.location.replace("http://localhost:3000/login") }}
                        >
                            Back
                        </div> */}
                    </div>
                </div>
                <div className={style.copyright}>
                    © 2021 SAK Distributors. All rights reserved.
                </div>
            </div>
        </div >
    )
}
