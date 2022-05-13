import React, { useEffect } from 'react';

//Shared Components
import TabletPageTwo from '../../shared/PageTwo/TabletPageTwo';
import TabletProfile from '../../shared/PageTwo/TabletProfile';
import Promotions from '../DashboardPaper/Promotions';

//SCSS Styles
import style from './SalesRepresentativeDashboard.module.scss';

//Connecting to Backend
import axios from 'axios';

export default function SalesRepresentativeDashboard() {

    if (JSON.parse(sessionStorage.getItem("Auth")).firsttimelogin) {
        window.location.replace("http://localhost:3000/change-password");
    }

    useEffect(() => {
        axios
            .get(`http://localhost:8080/dashboard/promotions`, {
                headers: {
                    'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                }
            })
            .then(res => {
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <TabletPageTwo>
            <div className={style.container}>

                <div className={style.rowA}>
                    <TabletProfile />
                </div>

                <div className={style.rowB}>
                    <Promotions />
                </div>
            </div>
        </TabletPageTwo>
    )
}
