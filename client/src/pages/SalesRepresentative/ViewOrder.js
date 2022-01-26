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

    const {
        control,
        getValues,
        setValue,
        handleSubmit,
        formState: { isValid, errors }
    } = useForm({ mode: "all" });

    const [data, setData] = useState([]);
    const [total, setTotal] = useState();
    const [advancePayment, setAdvancePayment] = useState();
    const [formStep, setFormStep] = useState(0);
    const [customerType, setCustomerType] = useState('');
    const [minimumPayment, setMinimumPayment] = useState();
    const [invoiceSettlementValue, setInvoiceSettlementValue] = useState();

    useEffect(() => {
        if (orderRecords !== null) {
            setValue("contactnumber", orderRecords.contactnumber);
            setValue("customertype", orderRecords.customertype);
            setValue("customerid", orderRecords.customerid);
            setValue("storename", orderRecords.storename);
            setValue("deliverydate", orderRecords.deliverydate);
            setValue("orderno", orderRecords.orderno);
            setValue("orderplacedat", orderRecords.orderplacedat);
            setValue("route", orderRecords.route);
            setValue("ordercreatedby", orderRecords.ordercreatedby);
            setValue("shippingaddress", orderRecords.shippingaddress);
            setValue("total", orderRecords.total);
            setValue("loyaltypoints", orderRecords.loyaltypoints);
            setValue("creditamounttosettle", orderRecords.creditamounttosettle);
            setValue("eligibilityforcredit", orderRecords.eligibilityforcredit);
            setValue("maximumcreditamount", orderRecords.maximumcreditamount);
            setValue("currentinvoicecreditamount", orderRecords.currentinvoicecreditamount);

            setTotal(orderRecords.total);
            setAdvancePayment((total / 100) * 50);
            setData(orderRecords.items);
            setCustomerType(orderRecords.customertype);
        }
    }, [setData, setValue, orderRecords])

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
                        handleClosePopUp={handleClosePopUp}
                        control={control}
                        backFormStep={backFormStep}
                        completeFormStep={completeFormStep}
                        action={action}
                        formStep={formStep}
                        getValues={getValues}
                        customerType={customerType}
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
                        total={total}
                        action={action}
                        formStep={formStep}
                    />
                </section>
            }

            {
                formStep >= 2 &&
                <section className={formStep === 2 ? style.visible : style.hidden}>
                    <StepFive
                        customerType={customerType}
                        action={action}
                        formStep={formStep}
                        handleClosePopUp={handleClosePopUp}
                        onSubmit={onSubmit}
                        total={total}
                        errors={errors}
                        control={control}
                        getValues={getValues}
                        backFormStep={backFormStep}
                        advancePayment={advancePayment}
                        minimumPayment={minimumPayment}
                        setMinimumPayment={setMinimumPayment}
                        invoiceSettlementValue={invoiceSettlementValue}
                        setInvoiceSettlementValue={setInvoiceSettlementValue}
                        isValid={isValid}
                    />
                </section>
            }
        </form >

    )
}
