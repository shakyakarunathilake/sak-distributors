import React, { useEffect, useState } from 'react';

//Shared Components
import PageTwo from '../../shared/PageTwo/PageTwo';
import Profile from '../../shared/PageTwo/Profile';
import CustomerOrders from '../DashboardPaper/CustomerOrders';

//SCSS Styles
import style from './ManagerDashboard.module.scss';

//Connecting to backend
import axios from 'axios';

export default function ManagerDashboard() {

    if (JSON.parse(sessionStorage.getItem("Auth")).firsttimelogin) {
        window.location.replace("http://localhost:3000/change-password");
    }

    const employeedetails = JSON.parse(sessionStorage.getItem("Auth"));

    let endpoints = [
        "http://localhost:8080/metadata/delivered-customer-orders-meta-data",
    ]

    const [customerOrders, setCustomerOrders] = useState([]);

    useEffect(() => {
        axios
            .all(endpoints.map((endpoint) => axios.get(endpoint, { headers: { 'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken } })))
            .then(
                axios.spread((...responses) => {
                    setCustomerOrders(responses[0].data.customerOrdersMetaData)
                })
            )
            .catch(error => {
                console.log(error)
            })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <PageTwo title="Dashboard">
            <div className={style.container}>

                <div className={style.columnA}>
                    <Profile />
                </div>

                <div className={style.columnB}>

                    {
                        customerOrders.length !== 0 &&
                        <CustomerOrders
                            customerOrders={customerOrders}
                            employeedetails={employeedetails}
                        />
                    }

                </div>
            </div>
        </PageTwo>
    )
};
