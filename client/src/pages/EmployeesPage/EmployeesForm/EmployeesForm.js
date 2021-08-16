import React, { useState } from 'react';

//Material UI Components
import TextField from '@material-ui/core/TextField';

//SCSS Style
import style from './EmployeesForm.module.scss';

const initialFieldValues = {
    employeeid: Number,
    fullname: '',
    callingname: '',
    email: '',
    dob: new Date(),
    age: Number,
    address: '',
    nic: '',
    gender: '',
    mobilenumber: Number,
    telephonenumber: Number,
    designation: '',
    civilstatus: '',
    employeestatus: '',
}

export default function EmployeesForm() {

    const [values, setValues] = useState(initialFieldValues);

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    return (
        <div className={style.container}>
            <div className={style.header}>
                New Employee
            </div>

            <div className={style.body}>
                <form className={style.form}>
                    <TextField
                        label="Full Name"
                        name="fullname"
                        onChange={handleInputChange}
                        value={values.fullname}
                        variant="outlined"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        onChange={handleInputChange}
                        value={values.email}
                        variant="outlined"
                    />
                </form>
            </div>
        </div>
    );
};
