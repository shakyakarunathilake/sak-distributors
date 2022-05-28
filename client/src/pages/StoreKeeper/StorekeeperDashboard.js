import React, { useEffect, useState } from 'react';

//Shared Components
import PageTwo from '../../shared/PageTwo/PageTwo';
import Profile from '../../shared/PageTwo/Profile';
import CustomerOrders from '../DashboardPaper/CustomerOrders';
import AwaitingGRN from '../DashboardPaper/AwaitingGRN';
import ProcessingGIN from '../DashboardPaper/ProcessingGIN';
import MissingProducts from '../DashboardPaper/MissingProducts';

//SCSS Styles
import style from './StorekeeperDashboard.module.scss';

//Connecting to backend
import axios from 'axios';

export default function StorekeeperDashboard() {

    if (JSON.parse(sessionStorage.getItem("Auth")).firsttimelogin) {
        window.location.replace("http://localhost:3000/change-password");
    }

    const employeedetails = JSON.parse(sessionStorage.getItem("Auth"));

    let endpoints = [
        "http://localhost:8080/metadata/grn-meta-data",
        "http://localhost:8080/metadata/pending-customer-orders-meta-data",
        "http://localhost:8080/metadata/processing-gin-meta-data",
        "http://localhost:8080/store/get-all-missing-product-details"
    ]

    const [customerOrders, setCustomerOrders] = useState([]);
    const [grn, setGrn] = useState([]);
    const [gin, setGin] = useState([]);
    const [missingProducts, setMissingProducts] = useState([]);

    useEffect(() => {
        axios
            .all(endpoints.map((endpoint) => axios.get(endpoint, { headers: { 'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken } })))
            .then(
                axios.spread((...responses) => {
                    setGrn(responses[0].data.grnMetaData)
                    setCustomerOrders(responses[1].data.customerOrdersMetaData)
                    setGin(responses[2].data.ginMetaData)
                    setMissingProducts(responses[3].data.missingProducts);
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

                    {
                        missingProducts.length > 0 &&
                        <MissingProducts
                            missingProducts={missingProducts}
                        />
                    }

                </div>

                <div className={style.columnB}>

                    {
                        grn.length !== 0 &&
                        <AwaitingGRN
                            grn={grn}
                        />
                    }

                    {
                        customerOrders.length !== 0 &&
                        <CustomerOrders
                            customerOrders={customerOrders}
                            employeedetails={employeedetails}
                        />
                    }

                    {
                        gin.length !== 0 &&
                        <ProcessingGIN
                            gin={gin}
                        />
                    }

                </div>

            </div>
        </PageTwo>
    )
};
