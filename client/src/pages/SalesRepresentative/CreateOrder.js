import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

//Styles
import style from './CreateOrder.module.scss';

//Form Steps
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';

export default function CreateOrder(props) {

    const { setOpenPopup, customerOptions, productOptions, nextOrderId } = props;

    const { handleSubmit } = useForm({ mode: "all" });

    const [data, setData] = useState([]);
    const [formStep, setFormStep] = useState(0);
    const [customerType, setCustomerType] = useState('Registered Customer');
    const [formData, setFormData] = useState({});

    const getFormData = (values, type) => {
        setCustomerType(type);
        setFormData(values);
        completeFormStep();
    }

    const completeFormStep = () => {
        setFormStep(x => x + 1);
    }

    const backFormStep = () => {
        setFormStep(x => x - 1);
    }

    const onSubmit = () => { }

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
                        nextOrderId={nextOrderId}
                        getFormData={getFormData}
                        customerType={customerType}
                        setCustomerType={setCustomerType}
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
                        formData={formData}
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
                        setOpenPop={setOpenPopup}
                        productOptions={productOptions}
                        completeFormStep={completeFormStep}
                    />
                </section>
            }

            {
                formStep >= 3 &&
                <section className={formStep === 3 ? style.visible : style.hidden}>
                    <StepFour
                        data={data}
                        setOpenPop={setOpenPopup}
                        backFormStep={backFormStep}
                        onSubmit={onSubmit}
                    />
                </section>
            }

        </form >

    )
}
