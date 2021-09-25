import React from 'react';

//Material UI Components
import isWeekend from 'date-fns/isWeekend';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';

// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import CalendarPicker from '@mui/lab/CalendarPicker';

import Button from '@mui/material/Button';

//Shared Components
import Page from '../../shared/Page/Page';

//images
import user from '../../images/user.svg';

//SCSS style
import style from './Dashboard.module.scss';

const minDate = new Date('2020-01-01T00:00:00.000');
const maxDate = new Date('2034-01-01T00:00:00.000');

export default function Dashboard() {

    const firsttimelogin = JSON.parse(sessionStorage.getItem("Auth")).firsttimelogin;
    const employeeimage = JSON.parse(sessionStorage.getItem("Auth")).employeeimage;
    const role = JSON.parse(sessionStorage.getItem("Auth")).role;
    const firstname = JSON.parse(sessionStorage.getItem("Auth")).firstname;
    const lastname = JSON.parse(sessionStorage.getItem("Auth")).lastname;
    const email = JSON.parse(sessionStorage.getItem("Auth")).email;
    const employeeid = JSON.parse(sessionStorage.getItem("Auth")).employeeid;
    const employeestatus = JSON.parse(sessionStorage.getItem("Auth")).employeestatus;

    if (firsttimelogin) {
        window.location.replace("http://localhost:3000/change-password");
    }

    const [value, setValue] = React.useState(new Date());
    // const [date, setDate] = React.useState(new Date());

    return (
        <Page title="Dashboard">
            <div className={style.container}>
                <div className={style.columnDivider}>
                    <div className={style.userInfo}>
                        <div className={style.welcomeMsg}>
                            Welcome {firstname}
                        </div>
                        <div className={style.imageRow}>
                            <img src={employeeimage.value ? employeeimage : user} alt="" />
                        </div>
                        <div className={style.infoRow}>
                            <div className={style.textDiv}>
                                <div className={style.text}>
                                    <div className={style.boldtext}>
                                        Employee ID:
                                    </div>
                                    <div className={style.regulartext}>
                                        {employeeid}
                                    </div>
                                </div>
                                <div className={style.text}>
                                    <div className={style.boldtext}>
                                        Name:
                                    </div>
                                    <div className={style.regulartext}>
                                        {firstname} {lastname}
                                    </div>
                                </div>
                                <div className={style.text}>
                                    <div className={style.boldtext}>
                                        Email:
                                    </div>
                                    <div className={style.regulartext}>
                                        {email}
                                    </div>
                                </div>
                                <div className={style.text}>
                                    <div className={style.boldtext}>
                                        Role:
                                    </div>
                                    <div className={style.regulartext}>
                                        {role}
                                    </div>
                                </div>
                                <div className={style.text}>
                                    <div className={style.boldtext}>
                                        Status:
                                    </div>
                                    <div className={style.regulartext}>
                                        {employeestatus}
                                    </div>
                                </div>
                            </div>
                            <div className={style.btnDiv}>
                                <Button variant="contained"> Change Password</Button>
                            </div>
                        </div>
                    </div>
                    <div className={style.calendar}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <StaticDatePicker
                                orientation="portrait"
                                openTo="day"
                                value={value}
                                shouldDisableDate={isWeekend}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </div>
                </div>
            </div>
        </Page>
    )
};
