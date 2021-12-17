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

    const { addOrEdit, setOpenPopup, customerOptions, productOptions, nextOrderNo, total, setTotal } = props;

    const { handleSubmit } = useForm({ mode: "all" });

    const [data, setData] = useState([]);
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

        customerOrderFormData.append('contactnumber', orderFormData.contactnumber);
        customerOrderFormData.append('customer', orderFormData.customer);
        customerOrderFormData.append('customerid', orderFormData.customerid);
        customerOrderFormData.append('deliverydate', orderFormData.deliverydate);
        customerOrderFormData.append('orderno', orderFormData.orderno);
        customerOrderFormData.append('orderplacedat', orderFormData.orderplacedat);
        customerOrderFormData.append('route', orderFormData.route);
        customerOrderFormData.append('ordercreatedby', orderFormData.ordercreatedby);
        customerOrderFormData.append('shippingaddress', orderFormData.shippingaddress);
        customerOrderFormData.append('storename', orderFormData.storename);
        customerOrderFormData.append('items', JSON.stringify(data));

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
                        nextOrderNo={nextOrderNo}
                        customerType={customerType}
                        setCustomerType={setCustomerType}
                        completeFormStep={completeFormStep}
                        setOrderFormData={setOrderFormData}
                        data={data}
                        setOpenPopup={setOpenPopup}
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
                        setData={setData}
                        setOpenPopup={setOpenPopup}
                        productOptions={productOptions}
                        backFormStep={backFormStep}
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
