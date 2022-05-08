import React from 'react';

//Shared Components
import PageTwo from '../../shared/PageTwo/PageTwo';
import Profile from '../../shared/PageTwo/Profile';

//SCSS Styles
import style from './ManagerDashboard.module.scss';

export default function ManagerDashboard(props) {

    if (JSON.parse(sessionStorage.getItem("Auth")).firsttimelogin) {
        window.location.replace("http://localhost:3000/change-password");
    }

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
