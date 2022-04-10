import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//Style
import style from './ViewOrderDetails.module.scss';

//Rows
import RegisteredCustomerRowOne from './RegisteredCustomerRowOne';
import RegisteredCustomerRowTwo from './RegisteredCustomerRowTwo';
import UnregisteredCustomerRowOne from './UnregisteredCustomerRowOne';
import UnregisteredCustomerRowTwo from './UnregisteredCustomerRowTwo';

export default function ViewOrderDetails() {

    const { ordernumber } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem(ordernumber)) != null) {
            setData(JSON.parse(localStorage.getItem(ordernumber)).items);
        }
    }, [])

    const { control, watch } = useForm({
        defaultValues: {
            orderno: JSON.parse(localStorage.getItem(ordernumber)).orderno,
            contactnumber: JSON.parse(localStorage.getItem(ordernumber)).contactnumber,
            customertype: JSON.parse(localStorage.getItem(ordernumber)).customertype,
            customerid: JSON.parse(localStorage.getItem(ordernumber)).customerid,
            storename: JSON.parse(localStorage.getItem(ordernumber)).storename,
            deliveredat: JSON.parse(localStorage.getItem(ordernumber)).deliveredat,
            deliveredby: JSON.parse(localStorage.getItem(ordernumber)).deliveredby,
            status: JSON.parse(localStorage.getItem(ordernumber)).status,
            deliverydate: JSON.parse(localStorage.getItem(ordernumber)).deliverydate,
            orderplacedat: JSON.parse(localStorage.getItem(ordernumber)).orderplacedat,
            route: JSON.parse(localStorage.getItem(ordernumber)).route,
            ordercreatedby: JSON.parse(localStorage.getItem(ordernumber)).ordercreatedby,
            shippingaddress: JSON.parse(localStorage.getItem(ordernumber)).shippingaddress,
            total: JSON.parse(localStorage.getItem(ordernumber)).total,
            loyaltypoints: JSON.parse(localStorage.getItem(ordernumber)).loyaltypoints,
            minimumpayment: JSON.parse(localStorage.getItem(ordernumber)).minimumpayment,
            advancepayment: JSON.parse(localStorage.getItem(ordernumber)).advancepayment,
            creditamounttosettle: JSON.parse(localStorage.getItem(ordernumber)).creditamounttosettle === '0' ? parseInt(JSON.parse(localStorage.getItem(ordernumber)).creditamounttosettle).toFixed(2) : JSON.parse(localStorage.getItem(ordernumber)).creditamounttosettle,
            eligibilityforcredit: JSON.parse(localStorage.getItem(ordernumber)).eligibilityforcredit ? JSON.parse(localStorage.getItem(ordernumber)).eligibilityforcredit : 'No',
            maximumcreditamount: JSON.parse(localStorage.getItem(ordernumber)).maximumcreditamount ? parseInt(JSON.parse(localStorage.getItem(ordernumber)).maximumcreditamount).toFixed(2) : '0.00',
            currentinvoicecreditamount: JSON.parse(localStorage.getItem(ordernumber)).currentinvoicecreditamount,
            invoicesettlementvalue: JSON.parse(localStorage.getItem(ordernumber)).invoicesettlementvalue
        }
    });

    const handleClose = () => {
        window.localStorage.removeItem(ordernumber);
        window.close();
    }

    return (
        <div className={style.one}>

            <div className={style.header}>

                <div>
                    Order Number: <span className={style.blue}>{ordernumber}</span>
                </div>
                <div>
                    <HighlightOffIcon
                        className={style.icon}
                        onClick={() => { handleClose() }}
                    />
                </div>

            </div>

            <div className={style.body}>

                <div className={style.rowOne}>

                    {
                        watch("customertype") === "Registered Customer" &&
                        <RegisteredCustomerRowOne
                            control={control}
                        />
                    }

                    {
                        watch("customertype") === "Unregistered Customer" &&
                        <UnregisteredCustomerRowOne
                            control={control}
                        />
                    }

                </div>

                <div className={style.rowTwo}>

                    {
                        watch("customertype") === "Registered Customer" &&
                        <RegisteredCustomerRowTwo
                            data={data}
                            watch={watch}
                        />
                    }

                    {
                        watch("customertype") === "Unregistered Customer" &&
                        <UnregisteredCustomerRowTwo
                            watch={watch}
                            data={data}
                        />
                    }

                </div>

            </div >

        </div >
    )
}
