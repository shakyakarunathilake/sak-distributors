import React, { useEffect, useState } from 'react';

//Shared Components
import PageTwo from '../../shared/PageTwo/PageTwo';
import Profile from '../../shared/PageTwo/Profile';
import CustomerOrders from '../DashboardPaper/CustomerOrders';
import AwaitingGRN from '../DashboardPaper/AwaitingGRN';

//SCSS Styles
import style from './StorekeeperDashboard.module.scss';

//Connecting to backend
import axios from 'axios';

export default function StorekeeperDashboard() {

    if (JSON.parse(sessionStorage.getItem("Auth")).firsttimelogin) {
        window.location.replace("http://localhost:3000/change-password");
    }

    let endpoints = [
        "http://localhost:8080/metadata/awaiting-grn",
        "http://localhost:8080/metadata/no-of-customer-orders",
    ]

    const [customerOrders, setCustomerOrders] = useState([]);
    const [grn, setGrn] = useState([]);

    useEffect(() => {
        axios
            .all(endpoints.map((endpoint) => axios.get(endpoint, { headers: { 'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken } })))
            .then(
                axios.spread((...responses) => {
                    setGrn(responses[0].data.noofawaitinggrn)
                    setCustomerOrders(responses[1].data.noofcustomerorders)
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

                    <AwaitingGRN
                        grn={grn}
                    />

                    <CustomerOrders
                        customerOrders={customerOrders}
                    />

                </div>

            </div>
        </PageTwo>
    )
};
