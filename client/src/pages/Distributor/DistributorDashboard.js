import React, { useEffect, useState } from 'react';

//Shared Components
import PageTwo from '../../shared/PageTwo/PageTwo';
import Profile from '../../shared/PageTwo/Profile';
import PurchaseOrdersToBeApproved from '../DashboardPaper/PurchaseOrdersToBeApproved';

//SCSS Styles
import style from './DistributorDashboard.module.scss';

//Connecting to backend
import axios from 'axios';

export default function DistributorDashboard() {

    if (JSON.parse(sessionStorage.getItem("Auth")).firsttimelogin) {
        window.location.replace("http://localhost:3000/change-password");
    }

    let endpoints = [
        "http://localhost:8080/metadata/purchase-orders-meta-data",
    ]

    const [purchaseOrders, setPurchaseOrders] = useState([]);

    useEffect(() => {
        axios
            .all(endpoints.map((endpoint) => axios.get(endpoint, { headers: { 'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken } })))
            .then(
                axios.spread((...responses) => {
                    setPurchaseOrders(responses[0].data.purchaseOrdersMetaData)
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

                    {
                        purchaseOrders.length !== 0 &&
                        < PurchaseOrdersToBeApproved
                            purchaseOrders={purchaseOrders}
                        />
                    }

                </div>
            </div>
        </PageTwo>
    )
};
