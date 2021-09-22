import React from 'react';

//Shared Components
import Page from '../../shared/Page/Page';

//SCSS style
import style from './Dashboard.module.scss';

export default function Dashboard() {

    const firsttimelogin = JSON.parse(sessionStorage.getItem("Auth")).firsttimelogin;
    if (firsttimelogin) {
        window.alert("Please change your password");
        window.location.replace("http://localhost:3000/change-password");
    }

    const [value, setValue] = React.useState(new Date());

    return (
        <Page title="Dashboard">
            <div className={style.container}>
                <div className={style.paper}>

                </div>
                <div className={style.paper}>

                </div>
            </div>
        </Page>
    )
};
