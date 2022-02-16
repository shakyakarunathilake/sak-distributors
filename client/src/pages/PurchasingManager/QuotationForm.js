import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import formData from 'form-data';

import style from './QuotationForm.module.scss';

//Form Step
import StepOne from './QuotationFormStepOne';
import StepTwo from './QuotationFormStepTwo';

export default function QuotationForm(props) {

    const { addOrEdit, setOpenPopup, action } = props;

    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`) + '-' + (today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`);

    const { formState: { errors }, handleSubmit, getValues, control } = useForm({
        mode: "all",
        defaultValues: {
            supplier: '',
            validityperiod: '',
            issuingdate: date,
            enddate: ''
        }
    });

    const [file, setFile] = useState();
    const [formStep, setFormStep] = useState(0);

    const completeFormStep = () => {
        setFormStep(x => x + 1);
    }

    const backFormStep = () => {
        setFormStep(x => x - 1);
    }

    const onSubmit = () => {

        const quotationFormData = new formData();

        addOrEdit(quotationFormData, getValues('ponumber'));

    }

    return (
        <form className={style.container} onSubmit={handleSubmit(onSubmit)} >

            {
                formStep >= 0 &&
                <section className={formStep === 0 ? style.visible : style.hidden}>

                    <StepOne
                        setOpenPopup={setOpenPopup}
                        completeFormStep={completeFormStep}
                        action={action}
                        control={control}
                        errors={errors}
                    />

                </section>

            }

            {
                formStep >= 1 &&
                <section className={formStep === 1 ? style.visible : style.hidden}>

                    <StepTwo
                        backFormStep={backFormStep}
                        action={action}
                        setOpenPopup={setOpenPopup}
                        control={control}
                    />

                </section>

            }

        </form >
    )
}
