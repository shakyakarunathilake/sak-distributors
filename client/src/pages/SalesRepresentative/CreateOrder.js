import React, { useState } from 'react';
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
        handleClosePopUp
    } = props;

    const {
        watch,
        reset,
        trigger,
        control,
        setValue,
        getValues,
        clearErrors,
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

    const completeFormStep = () => {
        setFormStep(x => x + 1);
    }

    const backFormStep = () => {
        setFormStep(x => x - 1);
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
        customerOrderFormData.append('total', total);

        if (customerType === "Registered Customer") {
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
                        reset={reset}
                        nextOrderNo={nextOrderNo}
                        setCustomerType={setCustomerType}
                        customerType={customerType}
                        errors={errors}
                        handleClosePopUp={handleClosePopUp}
                        customerOptions={customerOptions}
                        data={data}
                        control={control}
                        trigger={trigger}
                        isValid={isValid}
                        completeFormStep={completeFormStep}
                        setValue={setValue}
                        clearErrors={clearErrors}
                        watch={watch}
                    />

                </section>
            }

            {
                formStep >= 1 &&
                <section className={formStep === 1 ? style.visible : style.hidden}>
                    <StepTwo
                        customerType={customerType}
                        control={control}
                        handleClosePopUp={handleClosePopUp}
                        backFormStep={backFormStep}
                        completeFormStep={completeFormStep}
                        action={action}
                        formStep={formStep}
                    />
                </section>
            }

            {
                formStep >= 2 &&
                <section className={formStep === 2 ? style.visible : style.hidden}>
                    <StepThree
                        data={data}
                        setData={setData}
                        handleClosePopUp={handleClosePopUp}
                        productOptions={productOptions}
                        completeFormStep={completeFormStep}
                        setTotal={setTotal}
                        action={action}
                        formStep={formStep}
                        backFormStep={backFormStep}
                        getTotal={getTotal}
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
