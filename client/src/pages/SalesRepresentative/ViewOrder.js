import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';


//Form Steps
import StepTwo from './StepTwo';
import StepFour from './StepFour';

//Styles
import style from './ViewOrder.module.scss';

export default function ViewOrder(props) {

    const { action, handleClosePopUp, orderRecords } = props;
    const { control, getValues, setValue, handleSubmit } = useForm({ mode: "all" });

    const [data, setData] = useState();
    const [formStep, setFormStep] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {

        if (orderRecords != null) {
            setValue("customertype", orderRecords.customertype);
            setValue("orderno", orderRecords.orderno);
            setValue("orderplacedat", orderRecords.orderplacedat);
            setValue("deliverydate", orderRecords.deliverydate);
            setValue("ordercreatedby", orderRecords.ordercreatedby);
            setValue("storename", orderRecords.storename);
            setValue("customerid", orderRecords.customerid);
            setValue("shippingaddress", orderRecords.shippingaddress);
            setValue("contactnumber", orderRecords.contactnumber);
            setValue("route", orderRecords.route);
            setData(orderRecords.items);
            setTotal(orderRecords.total);
        }

    }, [setData, setTotal, setValue, orderRecords])

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
        <div>

            <form
                className={style.form}
                onSubmit={handleSubmit(onSubmit)}
            >
                {
                    formStep >= 0 &&
                    <section className={formStep === 0 ? style.visible : style.hidden}>
                        <StepTwo
                            handleClosePopUp={handleClosePopUp}
                            control={control}
                            backFormStep={backFormStep}
                            completeFormStep={completeFormStep}
                            action={action}
                            formStep={formStep}
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
                            onSubmit={onSubmit}
                            total={total}
                            action={action}
                            formStep={formStep}
                        />
                    </section>
                }

            </form >

        </div>
    )
}
