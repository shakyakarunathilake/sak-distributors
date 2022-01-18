import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import formData from 'form-data';

//Styles
import style from './CreateOrder.module.scss';

//Form Steps
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import StepFive from './StepFive';

export default function CreateOrder(props) {

    const { addOrEdit, handleClosePopUp, action, productOptions, orderRecords } = props;

    const { control, formState: { errors }, getValues, setValue, handleSubmit } = useForm({ mode: "all" });

    const [data, setData] = useState([]);
    const [total, setTotal] = useState();
    const [formStep, setFormStep] = useState(0);

    useEffect(() => {

        if (orderRecords !== null) {
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
            setValue("currentcreditamount", orderRecords.currentcreditamount);
        }

    }, [setValue, orderRecords])

    const completeFormStep = () => {
        setFormStep(x => x + 1);
    }

    const backFormStep = () => {
        setFormStep(x => x - 1);
    }

    const getTotal = () => {
        let total = 0;
        for (let i = 0; i < data.length; i++) {
            total = total + data[i].grossamount;
        }

        setTotal(total)
        return total;
    }

    const onSubmit = () => {

        const customerOrderFormData = new formData();

        customerOrderFormData.append('items', JSON.stringify(data));
        customerOrderFormData.append('total', total);
        customerOrderFormData.append('currentcreditamount', getValues('currentcreditamount'));
        
        addOrEdit(customerOrderFormData, orderRecords.orderno);
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
                    <StepThree
                        data={data}
                        orderRecords={orderRecords}
                        getTotal={getTotal}
                        setData={setData}
                        handleClosePopUp={handleClosePopUp}
                        productOptions={productOptions}
                        completeFormStep={completeFormStep}
                        action={action}
                        backFormStep={backFormStep}
                        formStep={formStep}
                    />
                </section>
            }

            {
                formStep >= 2 &&
                <section className={formStep === 2 ? style.visible : style.hidden}>
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

            {
                formStep >= 4 &&
                <section className={formStep === 4 ? style.visible : style.hidden}>
                    <StepFive
                        action={action}
                        formStep={formStep}
                        handleClosePopUp={handleClosePopUp}
                        total={total}
                        errors={errors}
                        control={control}
                        getValues={getValues}
                        onSubmit={onSubmit}
                    />
                </section>
            }

        </form >

    )
}
