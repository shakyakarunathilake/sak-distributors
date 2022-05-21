import React, { useEffect, useState } from 'react';

//Shared Components
import PageTwo from '../../shared/PageTwo/PageTwo';
import Profile from '../../shared/PageTwo/Profile';
import SupplierPayments from '../DashboardPaper/SupplierPayments';

//SCSS Styles
import style from './PurchasingManagerDashboard.module.scss';

//Axios
import axios from 'axios';

export default function PurchasingManagerDashboard(props) {

    if (JSON.parse(sessionStorage.getItem("Auth")).firsttimelogin) {
        window.location.replace("http://localhost:3000/change-password");
    }

    const employeedetails = JSON.parse(sessionStorage.getItem("Auth"));

    let endpoints = [
        "http://localhost:8080/metadata/supplier-payments-meta-data",
        `http://localhost:8080/metadata/notifications/${employeedetails.designation.replace(/\s+/g, '-').toLowerCase()}/${employeedetails.employeeid}`
    ]

    const [supplierPayments, setSupplierPayments] = useState([]);

    useEffect(() => {
        axios
            .all(endpoints.map((endpoint) => axios.get(endpoint, { headers: { 'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken } })))
            .then(
                axios.spread((...responses) => {
                    setSupplierPayments(responses[0].data.supplierPaymentsMetaData)
                    sessionStorage.setItem("Notification", JSON.stringify(responses[1].data.notifications))
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
                        supplierPayments.length !== 0 &&
                        <SupplierPayments
                            supplierPayments={supplierPayments}
                        />
                    }

                </div>
            </div>
        </PageTwo>
    )
};
