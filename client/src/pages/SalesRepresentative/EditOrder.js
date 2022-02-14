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

    const [data, setData] = useState([]);
    const [formStep, setFormStep] = useState(0);

    const { watch, control, setValue, getValues, handleSubmit, formState: { isValid, errors } } = useForm({
        mode: "all",
        defaultValues: {
            orderno: orderRecords.orderno,
            contactnumber: orderRecords.contactnumber,
            customertype: orderRecords.customertype,
            customerid: orderRecords.customerid,
            storename: orderRecords.storename,
            deliveredat: orderRecords.deliveredat,
            deliveredby: orderRecords.deliveredby,
            status: orderRecords.status,
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
            invoicesettlementvalue: parseInt(orderRecords.invoicesettlementvalue)

        }
    });

    useEffect(() => {
        if (orderRecords != null) {
            setData(orderRecords.items);
        }
    }, [orderRecords])

    useEffect(() => {
        if (data != null) {
            let total = 0.00;
            let advancepayment = 0.00;

            for (let i = 0; i < data.length; i++) {
                total = total + parseInt(data[i].grossamount);
            }

            advancepayment = (total / 100) * 50;

            setValue('advancepayment', parseInt(advancepayment.toFixed(2)));
            setValue('total', parseInt(total.toFixed(2)));
        }
    }, [data, setValue])

    const completeFormStep = () => {
        setFormStep(x => x + 1);
    }

    const backFormStep = () => {
        setFormStep(x => x - 1);
    }

    const onSubmit = () => {

        const customerOrderFormData = new formData();

        customerOrderFormData.append('items', JSON.stringify(data));
        customerOrderFormData.append('total', getValues('total'));
        customerOrderFormData.append('advancepayment', getValues('advancepayment'));
        customerOrderFormData.append('minimumpayment', getValues('minimumpayment'));
        customerOrderFormData.append('currentinvoicecreditamount', getValues('currentinvoicecreditamount'));
        customerOrderFormData.append('invoicesettlementvalue', getValues('invoicesettlementvalue'));

        addOrEdit(customerOrderFormData, getValues('orderno'));
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
                    <StepThree
                        action={action}
                        formStep={formStep}
                        data={data}
                        setData={setData}
                        handleClosePopUp={handleClosePopUp}
                        productOptions={productOptions}
                        backFormStep={backFormStep}
                        completeFormStep={completeFormStep}
                        watch={watch}
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
                        completeFormStep={completeFormStep}
                        watch={watch}
                        action={action}
                        formStep={formStep}
                    />
                </section>
            }

            {
                formStep >= 3 &&
                <section className={formStep === 3 ? style.visible : style.hidden}>
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
                        setValue={setValue}
                    />
                </section>
            }

        </form >

    )
}
