import React, { useEffect, useState } from 'react';

//Shared Components
import PageTwo from '../../shared/PageTwo/PageTwo';
import Profile from '../../shared/PageTwo/Profile';
import SupplierPayments from '../DashboardPaper/SupplierPayments';
import MissingProducts from '../DashboardPaper/MissingProducts';

//SCSS Styles
import style from './PurchasingManagerDashboard.module.scss';

//Axios
import axios from 'axios';

export default function PurchasingManagerDashboard(props) {

    if (JSON.parse(sessionStorage.getItem("Auth")).firsttimelogin) {
        window.location.replace("http://localhost:3000/change-password");
    }

    let endpoints = [
        "http://localhost:8080/metadata/supplier-payments-meta-data",
        "http://localhost:8080/store/get-all-missing-product-details",
    ]

    const [supplierPayments, setSupplierPayments] = useState([]);
    const [missingProducts, setMissingProducts] = useState([]);

    useEffect(() => {
        axios
            .all(endpoints.map((endpoint) => axios.get(endpoint, { headers: { 'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken } })))
            .then(
                axios.spread((...responses) => {
                    setSupplierPayments(responses[0].data.supplierPaymentsMetaData)
                    setMissingProducts(responses[1].data.missingProducts);
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
