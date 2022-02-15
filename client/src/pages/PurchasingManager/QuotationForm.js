import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import formData from 'form-data';

import style from './QuotationForm.module.scss';

//Form Step
import StepOne from './QuotationFormStepOne';
import StepTwo from './QuotationFormStepTwo';

export default function QuotationForm(props) {

    const { addOrEdit, handleClosePopUp, action } = props;

    const { handleSubmit, getValues } = useForm({
        mode: "all",
        defaultValues: {

        }
    });

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
                        handleClosePopUp={handleClosePopUp}
                        completeFormStep={completeFormStep}
                        action={action}
                    />

                </section>

            }

            {
                formStep >= 1 &&
                <section className={formStep === 1 ? style.visible : style.hidden}>

                    <StepTwo
                        backFormStep={backFormStep}
                        action={action}
                        handleClosePopUp={handleClosePopUp}
                    />

                </section>

            }

        </form >
    )
}
