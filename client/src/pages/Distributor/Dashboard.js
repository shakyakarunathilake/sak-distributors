import React from 'react';

//Shared Components
import Page from '../../shared/Page/Page';

// import style from './Dashboard.module.scss';

export default function Dashboard() {

    const firsttimelogin = JSON.parse(localStorage.getItem("Auth")).firsttimelogin;
    if (firsttimelogin) {
        window.alert("Please change your password");
        window.location.replace("http://localhost:3000/change-password");
    }

    return (
        <Page
            title="Dashboard">

        </Page>
    )
};
