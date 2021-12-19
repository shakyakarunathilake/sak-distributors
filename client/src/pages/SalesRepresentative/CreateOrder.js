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

export default function CreateOrder(props) {

    const { addOrEdit, setOpenPopup, customerOptions, productOptions, orderRecords, nextOrderNo } = props;

    const { formState: { isDirty, isValid, errors }, control, setValue, getValues, reset, clearErrors, trigger, handleSubmit } = useForm({ mode: "all" });

    const [data, setData] = useState([]);
    const [total, setTotal] = useState();
    const [formStep, setFormStep] = useState(0);
    const [customerType, setCustomerType] = useState('');
    const [orderFormData, setOrderFormData] = useState({});

    const completeFormStep = () => {
        setFormStep(x => x + 1);
    }

    const backFormStep = () => {
        setFormStep(x => x - 1);
    }

    const onSubmit = () => {

        const customerOrderFormData = new formData();

        if (orderRecords !== null) {
            customerOrderFormData.append('contactnumber', orderFormData.contactnumber);
            customerOrderFormData.append('customertype', orderFormData.customertype);
            customerOrderFormData.append('customerid', orderFormData.customerid);
            customerOrderFormData.append('storename', orderFormData.storename);
            customerOrderFormData.append('deliverydate', orderFormData.deliverydate);
            customerOrderFormData.append('orderno', orderFormData.orderno);
            customerOrderFormData.append('orderplacedat', orderFormData.orderplacedat);
            customerOrderFormData.append('route', orderFormData.route);
            customerOrderFormData.append('ordercreatedby', orderFormData.ordercreatedby);
            customerOrderFormData.append('shippingaddress', orderFormData.shippingaddress);
            customerOrderFormData.append('items', JSON.stringify(data));
            customerOrderFormData.append('total', total);
        } else {
            customerOrderFormData.append('items', JSON.stringify(data));
            customerOrderFormData.append('total', total);
        }

        addOrEdit(customerOrderFormData, orderFormData.orderno);
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
                        customerOptions={customerOptions}
                        customerType={customerType}
                        setCustomerType={setCustomerType}
                        completeFormStep={completeFormStep}
                        setOrderFormData={setOrderFormData}
                        setOpenPopup={setOpenPopup}
                        orderRecords={orderRecords}
                        isDirty={isDirty}
                        isValid={isValid}
                        errors={errors}
                        control={control}
                        setValue={setValue}
                        getValues={getValues}
                        reset={reset}
                        clearErrors={clearErrors}
                        trigger={trigger}
                        nextOrderNo={nextOrderNo}
                    />
                </section>
            }

            {
                formStep >= 1 &&
                <section className={formStep === 1 ? style.visible : style.hidden}>
                    <StepTwo
                        customerType={customerType}
                        orderFormData={orderFormData}
                        setOpenPopup={setOpenPopup}
                        backFormStep={backFormStep}
                        completeFormStep={completeFormStep}
                    />
                </section>
            }

            {
                formStep >= 2 &&
                <section className={formStep === 2 ? style.visible : style.hidden}>
                    <StepThree
                        data={data}
                        orderRecords={orderRecords}
                        setData={setData}
                        setOpenPopup={setOpenPopup}
                        productOptions={productOptions}
                        completeFormStep={completeFormStep}
                        setTotal={setTotal}
                    />
                </section>
            }

            {
                formStep >= 3 &&
                <section className={formStep === 3 ? style.visible : style.hidden}>
                    <StepFour
                        data={data}
                        setOpenPopup={setOpenPopup}
                        backFormStep={backFormStep}
                        onSubmit={onSubmit}
                        total={total}
                    />
                </section>
            }

        </form >

    )
}
