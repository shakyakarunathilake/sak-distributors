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

            setData(orderRecords.items);
            setCustomerType(orderRecords.customertype);
        }

    }, [setData, setValue, orderRecords])

    const completeFormStep = () => {
        setFormStep(x => x + 1);

        console.log('FORM STEP: ', formStep);
        console.log('DATA: ', data);
    }

    const backFormStep = () => {
        setFormStep(x => x - 1);

        console.log('FORM STEP: ', formStep);
        console.log('DATA: ', data);
    }

    const getTotal = () => {
        let total = 0;
        let advancepayment = 0;

        for (let i = 0; i < data.length; i++) {
            total = total + parseInt(data[i].grossamount);
        }

        advancepayment = (total / 100) * 50;

        setAdvancePayment(advancepayment.toFixed(2));
        setTotal(total.toFixed(2));

        return total.toFixed(2);
    }

    const onSubmit = () => {

        const customerOrderFormData = new formData();

        customerOrderFormData.append('items', JSON.stringify(data));
        customerOrderFormData.append('total', total);
        customerOrderFormData.append('currentinvoicecreditamount', getValues('currentinvoicecreditamount'));

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
                        customerType={customerType}
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
                        customerType={customerType}
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
                       total={total}
                       action={action}
                       formStep={formStep}
                    />
                </section>
            }

            {
                formStep >= 3 &&
                <section className={formStep === 3 ? style.visible : style.hidden}>
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
