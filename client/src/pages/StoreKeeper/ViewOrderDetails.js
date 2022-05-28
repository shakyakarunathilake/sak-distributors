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
import ViewOrderDetailsTabletStepOne from '../DeliveryRepresentative/ViewOrderDetailsTabletStepOne';
import ViewOrderDetailsTabletStepTwo from '../DeliveryRepresentative/ViewOrderDetailsTabletStepTwo';
import ViewOrderDetailsTabletStepThree from '../DeliveryRepresentative/ViewOrderDetailsTabletStepThree';


export default function ViewOrderDetails() {

    const { ordernumber } = useParams();
    const [data, setData] = useState([]);
    const [formStep, setFormStep] = useState(0);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem(ordernumber)) != null) {
            setData(JSON.parse(localStorage.getItem(ordernumber)).items);
        }
    }, [ordernumber])

    const employeedetails = JSON.parse(sessionStorage.getItem("Auth"));

    const { control, watch, getValues } = useForm({
        defaultValues: {
            orderno: JSON.parse(localStorage.getItem(ordernumber)).orderno,
            contactnumber: JSON.parse(localStorage.getItem(ordernumber)).contactnumber,
            customertype: JSON.parse(localStorage.getItem(ordernumber)).customertype,
            customerid: JSON.parse(localStorage.getItem(ordernumber)).customerid,
            storename: JSON.parse(localStorage.getItem(ordernumber)).storename,
            deliveredbyat: `${JSON.parse(localStorage.getItem(ordernumber)).deliveredby} : ${JSON.parse(localStorage.getItem(ordernumber)).deliveredat}`,
            status: JSON.parse(localStorage.getItem(ordernumber)).status,
            deliverydate: JSON.parse(localStorage.getItem(ordernumber)).deliverydate,
            route: JSON.parse(localStorage.getItem(ordernumber)).route,
            ordercreatedbyat: `${JSON.parse(localStorage.getItem(ordernumber)).ordercreatedby} : ${JSON.parse(localStorage.getItem(ordernumber)).orderplacedat}`,
            shippingaddress: JSON.parse(localStorage.getItem(ordernumber)).shippingaddress,
            total: JSON.parse(localStorage.getItem(ordernumber)).total,
            loyaltypoints: JSON.parse(localStorage.getItem(ordernumber)).loyaltypoints,
            minimumpayment: JSON.parse(localStorage.getItem(ordernumber)).minimumpayment,
            advancepayment: JSON.parse(localStorage.getItem(ordernumber)).advancepayment,
            creditamounttosettle: JSON.parse(localStorage.getItem(ordernumber)).creditamounttosettle === '0' ? parseInt(JSON.parse(localStorage.getItem(ordernumber)).creditamounttosettle).toFixed(2) : JSON.parse(localStorage.getItem(ordernumber)).creditamounttosettle,
            eligibilityforcredit: JSON.parse(localStorage.getItem(ordernumber)).eligibilityforcredit ? JSON.parse(localStorage.getItem(ordernumber)).eligibilityforcredit : 'No',
            maximumcreditamount: JSON.parse(localStorage.getItem(ordernumber)).maximumcreditamount ? parseInt(JSON.parse(localStorage.getItem(ordernumber)).maximumcreditamount).toFixed(2) : '0.00',
            currentinvoicecreditamount: JSON.parse(localStorage.getItem(ordernumber)).currentinvoicecreditamount,
            invoicesettlementvalue: JSON.parse(localStorage.getItem(ordernumber)).invoicesettlementvalue,
            loyaltypointsincash: JSON.parse(localStorage.getItem(ordernumber)).loyaltypointsincash ? JSON.parse(localStorage.getItem(ordernumber)).loyaltypointsincash : '0.00',
        }
    });

    const completeFormStep = () => {
        setFormStep(x => x + 1);
    }

    const backFormStep = () => {
        setFormStep(x => x - 1);
    }

    const handleClose = () => {
        window.localStorage.removeItem(ordernumber);
        window.close();
    }

    return (
        <div className={style.container}>

            <div className={style.header}>

                <div className={style.title}>
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

                {
                    employeedetails.designation === "Delivery Representative" &&
                    <div className={style.step}>
                        Step {formStep + 1} of 3
                    </div>
                }

            </div>

            {
                employeedetails.designation !== "Delivery Representative" &&

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
            }

            {
                employeedetails.designation === "Delivery Representative" &&

                <div className={style.body}>

                    {
                        formStep >= 0 &&
                        <section className={formStep === 0 ? style.visible : style.hidden}>

                            <ViewOrderDetailsTabletStepOne
                                control={control}
                                watch={watch}
                                completeFormStep={completeFormStep}
                            />

                        </section>
                    }

                    {
                        formStep >= 1 &&
                        <section className={formStep === 1 ? style.visible : style.hidden}>

                            <ViewOrderDetailsTabletStepTwo
                                data={data}
                                watch={watch}
                                backFormStep={backFormStep}
                                completeFormStep={completeFormStep}
                            />


                        </section>
                    }

                    {
                        formStep >= 2 &&
                        <section className={formStep === 2 ? style.visible : style.hidden}>

                            <ViewOrderDetailsTabletStepThree
                                getValues={getValues}
                                watch={watch}
                                backFormStep={backFormStep}
                                handleClose={handleClose}
                            />

                        </section>
                    }

                </div >

            }

        </div >
    )
}
