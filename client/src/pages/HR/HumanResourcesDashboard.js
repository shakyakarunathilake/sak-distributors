import React, { useEffect } from 'react';

//Shared Components
import PageTwo from '../../shared/PageTwo/PageTwo';
import Profile from '../../shared/PageTwo/Profile';

//SCSS Styles
import style from './HumanResourcesDashboard.module.scss';

//Connecting to Backend
import axios from 'axios';

export default function HumanResourcesDashboard(props) {

    if (JSON.parse(sessionStorage.getItem("Auth")).firsttimelogin) {
        window.location.replace("http://localhost:3000/change-password");
    }

    const employeedetails = JSON.parse(sessionStorage.getItem("Auth"));

    let endpoints = [
        `http://localhost:8080/metadata/notifications/${employeedetails.designation.replace(/\s+/g, '-').toLowerCase()}/${employeedetails.employeeid}`
    ]

    useEffect(() => {
        axios
            .all(endpoints.map((endpoint) => axios.get(endpoint, { headers: { 'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken } })))
            .then(
                axios.spread((...responses) => {
                    sessionStorage.setItem("Notification", JSON.stringify(responses[0].data.notifications))
                })
            )
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <PageTwo title="Dashboard">
            <div className={style.container}>

                <div className={style.columnA}>
                    <Profile />
                </div>

                <div className={style.columnB}>


                </div>
            </div>
        </PageTwo>
    )
};
