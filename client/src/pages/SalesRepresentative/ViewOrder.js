import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

//Form Steps
import StepTwo from './StepTwo';
import StepFour from './StepFour';
import StepFive from './StepFive';

//Styles
import style from './ViewOrder.module.scss';

export default function ViewOrder(props) {

    const { action, handleClosePopUp, orderRecords } = props;

    const [data, setData] = useState([]);
    const [formStep, setFormStep] = useState(0);

    const { watch, control, getValues, handleSubmit, formState: { isValid, errors } } = useForm({
        mode: "all",
        defaultValues: {
            orderno: orderRecords.orderno,
            contactnumber: orderRecords.contactnumber,
            customertype: orderRecords.customertype,
            customerid: orderRecords.customerid,
            storename: orderRecords.storename,
            deliverydate: orderRecords.deliverydate,
            orderplacedat: orderRecords.orderplacedat,
            route: orderRecords.route,
            ordercreatedby: orderRecords.ordercreatedby,
            shippingaddress: orderRecords.shippingaddress,
            total: parseInt(orderRecords.total),
            loyaltypoints: parseInt(orderRecords.loyaltypoints),
            minimumpayment: parseInt(orderRecords.minimumpayment),
            advancepayment: parseInt(orderRecords.advancepayment),
            creditamounttosettle: parseInt(orderRecords.creditamounttosettle),
            eligibilityforcredit: orderRecords.eligibilityforcredit,
            maximumcreditamount: parseInt(orderRecords.maximumcreditamount),
            currentinvoicecreditamount: parseInt(orderRecords.currentinvoicecreditamount),
        }
    });

    useEffect(() => {
        if (orderRecords != null) {
            setData(orderRecords.items);
        }
    }, [orderRecords])

    const completeFormStep = () => {
        setFormStep(x => x + 1);
    }

    const backFormStep = () => {
        setFormStep(x => x - 1);
    }

    const onSubmit = () => {
        handleClosePopUp();
    }

    return (

        <form
            className={style.form}
            onSubmit={handleSubmit(onSubmit)}
        >
            {
                formStep >= 0 &&
                <section className={formStep === 0 ? style.visible : style.hidden}>
                    <StepTwo
                        control={control}
                        handleClosePopUp={handleClosePopUp}
                        backFormStep={backFormStep}
                        completeFormStep={completeFormStep}
                        action={action}
                        formStep={formStep}
                        watch={watch}
                        getValues={getValues}
                    />
                </section>
            }

            {
                formStep >= 1 &&
                <section className={formStep === 1 ? style.visible : style.hidden}>
                    <StepFour
                        data={data}
                        handleClosePopUp={handleClosePopUp}
                        backFormStep={backFormStep}
                        completeFormStep={completeFormStep}
                        watch={watch}
                        action={action}
                        formStep={formStep}
                    />
                </section>
            }

            {
                formStep >= 2 &&
                <section className={formStep === 2 ? style.visible : style.hidden}>
                    <StepFive
                        action={action}
                        formStep={formStep}
                        handleClosePopUp={handleClosePopUp}
                        onSubmit={onSubmit}
                        errors={errors}
                        control={control}
                        getValues={getValues}
                        backFormStep={backFormStep}
                        isValid={isValid}
                        watch={watch}
                    />
                </section>
            }
        </form >

    )
}
