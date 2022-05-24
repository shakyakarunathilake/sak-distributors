import React, { useEffect, useState } from 'react';

//Shared Components
import TabletPageTwo from '../../shared/PageTwo/TabletPageTwo';
import TabletProfile from '../../shared/PageTwo/TabletProfile';
import DispatchedGIN from '../DashboardPaper/DispatchedGIN';
import CustomerOrders from '../DashboardPaper/CustomerOrders';

//SCSS Styles
import style from './DeliveryRepresentativeDashboard.module.scss';

//Connecting to Backend
import axios from 'axios';

export default function DeliveryRepresentativeDashboard() {

    if (JSON.parse(sessionStorage.getItem("Auth")).firsttimelogin) {
        window.location.replace("http://localhost:3000/change-password");
    }

    const employeedetails = JSON.parse(sessionStorage.getItem("Auth"));

    let endpoints = [
        `http://localhost:8080/metadata/dispatched-gin-meta-data/${employeedetails.employeeid}`,
        `http://localhost:8080/metadata/dispatched-customer-orders-meta-data/${employeedetails.employeeid}`,
    ]

    const [gin, setGin] = useState([]);
    const [customerOrders, setCustomerOrders] = useState([]);

    useEffect(() => {
        axios
            .all(endpoints.map((endpoint) => axios.get(endpoint, { headers: { 'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken } })))
            .then(
                axios.spread((...responses) => {
                    setGin(responses[0].data.ginMetaData)
                    setCustomerOrders(responses[1].data.customerOrdersMetaData)
                })
            )
            .catch(error => {
                console.log(error)
            })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <TabletPageTwo>
            <div className={style.container}>

                <div className={style.rowA}>
                    <TabletProfile />
                </div>

                <div className={style.rowB}>

                    {
                        gin.length !== 0 &&
                        <DispatchedGIN
                            gin={gin}
                        />
                    }

                    {
                        customerOrders.length !== 0 &&
                        <CustomerOrders
                            customerOrders={customerOrders}
                            employeedetails={employeedetails}
                        />
                    }

                </div>
            </div>
        </TabletPageTwo>
    )
}
