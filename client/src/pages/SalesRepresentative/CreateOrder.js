import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import formData from 'form-data';

//Styles
import style from './CreateOrder.module.scss';

//Form Steps
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import StepFive from './StepFive';

export default function CreateOrder(props) {

    const {
        action,
        addOrEdit,
        nextOrderNo,
        productOptions,
        customerOptions,
        handleClosePopUp,
        orderRecords
    } = props;

    const [data, setData] = useState([]);
    const [formStep, setFormStep] = useState(0);

    const today = new Date();

    const date = today.getFullYear() + '-' +
        (today.getMonth() > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`) + '-' +
        (today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`);

    const time = (today.getHours() > 9 ? today.getHours() : `0${today.getHours()}`) + ":" +
        (today.getMinutes() > 9 ? today.getMinutes() : `0${today.getMinutes()}`) + ":" +
        (today.getSeconds() > 9 ? today.getSeconds() : `0${today.getSeconds()}`);

    const dateTime = date + 'T' + time;

    today.setDate(today.getDate() + 3);

    const deliveryDate = today.getFullYear() + '-' +
        (today.getMonth() > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`) + '-' +
        (today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`);

    const { watch, reset, trigger, control, setValue, getValues, clearErrors, handleSubmit, formState: { isValid, errors } } = useForm({
        mode: "all",
        defaultValues: {
            orderno: `${JSON.parse(sessionStorage.getItem("Auth")).employeeid}${nextOrderNo}`,
            contactnumber: '',
            customertype: 'Registered Customer',
            customerid: '',
            storename: '',
            deliverydate: deliveryDate,
            orderplacedat: dateTime,
            deliveredat: '',
            deliveredby: '',
            route: '',
            ordercreatedby: `${JSON.parse(sessionStorage.getItem("Auth")).firstname} ${JSON.parse(sessionStorage.getItem("Auth")).lastname} (${JSON.parse(sessionStorage.getItem("Auth")).employeeid})`,
            shippingaddress: '',
            total: 0.00,
            status: '',
            loyaltypoints: 0.00,
            minimumpayment: 0.00,
            advancepayment: 0.00,
            creditamounttosettle: 0.00,
            eligibilityforcredit: 'No',
            maximumcreditamount: 0.00,
            currentinvoicecreditamount: 0.00,
            invoicesettlementvalue: 0.00
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

            setValue('advancepayment', advancepayment.toFixed(2));
            setValue('total', total.toFixed(2));
        }
    }, [data, setValue])

    const completeFormStep = () => {
        setFormStep(x => x + 1);
    }

    const backFormStep = () => {
        setFormStep(x => x - 1);
    }

    const resetForm = () => {
        reset();
    }

    const handleCustomerChange = (event, option) => {
        if (option) {
            setValue("customer", option.title);
            setValue("customerid", option.id);
            setValue("storename", option.storename);
            setValue("shippingaddress", option.shippingaddress);
            setValue("route", option.route);
            setValue("contactnumber", option.contactnumber);
            setValue("creditamounttosettle", option.creditamounttosettle);
            setValue("loyaltypoints", option.loyaltypoints);
            setValue("eligibilityforcredit", option.eligibilityforcredit);
            setValue("maximumcreditamount", option.maximumcreditamount);
            clearErrors();
        }
    }

    const onSubmit = () => {

        const customerOrderFormData = new formData();

        customerOrderFormData.append('contactnumber', getValues('contactnumber'));
        customerOrderFormData.append('customertype', getValues('customertype'));
        customerOrderFormData.append('customerid', getValues('customerid'));
        customerOrderFormData.append('storename', getValues('storename'));
        customerOrderFormData.append('deliverydate', getValues('deliverydate'));
        customerOrderFormData.append('orderno', getValues('orderno'));
        customerOrderFormData.append('orderplacedat', getValues('orderplacedat'));
        customerOrderFormData.append('route', getValues('route'));
        customerOrderFormData.append('ordercreatedby', getValues('ordercreatedby'));
        customerOrderFormData.append('shippingaddress', getValues('shippingaddress'));
        customerOrderFormData.append('items', JSON.stringify(data));
        customerOrderFormData.append('total', getValues('total'));
        customerOrderFormData.append('advancepayment', getValues('advancepayment'));
        customerOrderFormData.append('minimumpayment', getValues('minimumpayment'));
        customerOrderFormData.append('invoicesettlementvalue', getValues('invoicesettlementvalue'));

        if (watch('customertype') === "Registered Customer") {
            customerOrderFormData.append('creditamounttosettle', getValues('creditamounttosettle'));
            customerOrderFormData.append('loyaltypoints', getValues('loyaltypoints'));
            customerOrderFormData.append('eligibilityforcredit', getValues('eligibilityforcredit'));
            customerOrderFormData.append('maximumcreditamount', getValues('maximumcreditamount'));
            customerOrderFormData.append('currentinvoicecreditamount', getValues('currentinvoicecreditamount'));
        }

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

                    <StepOne
                        data={data}
                        resetForm={resetForm}
                        errors={errors}
                        isValid={isValid}
                        control={control}
                        trigger={trigger}
                        watch={watch}
                        customerOptions={customerOptions}
                        handleClosePopUp={handleClosePopUp}
                        completeFormStep={completeFormStep}
                        handleCustomerChange={handleCustomerChange}
                        action={action}
                    />

                </section>
            }

            {
                formStep >= 1 &&
                <section className={formStep === 1 ? style.visible : style.hidden}>
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
                formStep >= 2 &&
                <section className={formStep === 2 ? style.visible : style.hidden}>
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
                formStep >= 3 &&
                <section className={formStep === 3 ? style.visible : style.hidden}>
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
                formStep >= 4 &&
                <section className={formStep === 4 ? style.visible : style.hidden}>
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
