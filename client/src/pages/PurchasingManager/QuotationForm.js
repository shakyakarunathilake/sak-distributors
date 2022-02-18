import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import formData from 'form-data';
import { ExcelRenderer } from 'react-excel-renderer';

//Styles
import style from './QuotationForm.module.scss';

//Form Step 
import StepOne from './QuotationFormStepOne';
import StepTwo from './QuotationFormStepTwo';

export default function QuotationForm(props) {

    const { addOrEdit, setOpenPopup, action, nextQuotationId } = props;

    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`) + '-' + (today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`);

    const { formState: { errors, isValid }, handleSubmit, getValues, trigger, reset, control } = useForm({
        mode: "all",
        defaultValues: {
            quotationid: nextQuotationId,
            supplier: '',
            validityperiod: '',
            issuingdate: date,
            enddate: '',
            quotationfile: '',
        }
    });

    const [formStep, setFormStep] = useState(0);
    const [rows, setRows] = useState(null);
    const [cols, setCols] = useState(null);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];

        ExcelRenderer(file, (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                setCols(resp.cols);
                setRows(resp.rows);
            }
        });

    }

    const completeFormStep = () => {
        console.log(getValues());

        if (isValid) {
            setFormStep(x => x + 1);
        } else {
            trigger();
        }
    }

    const backFormStep = () => {
        setFormStep(x => x - 1);
    }

    const resetForm = () => {
        document.getElementById("quotationfileinput").value = "";
        setRows(null);
        setCols(null);
        reset();
    }

    const onSubmit = () => {

        const quotationFormData = new formData();

        quotationFormData.append("quotationid", getValues('quotationid'));
        quotationFormData.append("supplier", getValues('supplier'));
        quotationFormData.append("validityperiod", getValues('validityperiod'));
        quotationFormData.append("issuingdate", getValues('issuingdate'));
        quotationFormData.append("enddate", getValues('enddate'));
        quotationFormData.append("quotationfile", getValues('quotationfile'));

        addOrEdit(quotationFormData, getValues('quotationid'));

    }

    return (
        <form className={style.container} onSubmit={handleSubmit(onSubmit)} >

            {
                formStep >= 0 &&
                <section className={formStep === 0 ? style.visible : style.hidden}>

                    <StepOne
                        errors={errors}
                        control={control}
                        setOpenPopup={setOpenPopup}
                        resetForm={resetForm}
                        completeFormStep={completeFormStep}
                        rows={rows}
                        cols={cols}
                        handleFileChange={handleFileChange}
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
                        onSubmit={onSubmit}
                        rows={rows}
                        cols={cols}
                    />

                </section>

            }

        </form >
    )
}
