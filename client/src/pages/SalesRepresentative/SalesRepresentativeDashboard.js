import React, { useEffect, useState } from 'react';

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

    const [promotions, setPromotions] = useState([]);

    const employeedetails = JSON.parse(sessionStorage.getItem("Auth"));

    let endpoints = [
        "http://localhost:8080/metadata/promotions-meta-data",
        `http://localhost:8080/metadata/notifications/${employeedetails.designation.replace(/\s+/g, '-').toLowerCase()}/${employeedetails.employeeid}`
    ]

    useEffect(() => {
        axios
            .all(endpoints.map((endpoint) => axios.get(endpoint, { headers: { 'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken } })))
            .then(
                axios.spread((...responses) => {
                    setPromotions(responses[0].data.promotionsMetaData)
                    sessionStorage.setItem("Notification", JSON.stringify(responses[1].data.notifications))
                })
            )
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

                    {
                        promotions.length !== 0 &&
                        <Promotions
                            promotions={promotions}
                        />
                    }

                </div>
            </div>
        </TabletPageTwo>
    )
}
