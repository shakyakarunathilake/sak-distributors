import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import formData from 'form-data';

//SCSS styles
import style from './CreateGRNForm.module.scss';

//Form Step
import StepOne from './GRNStepOne';
import StepTwo from './GRNStepTwo';

export default function GRNForm(props) {

    const { GRNRecords, handleClosePopUp, updateGRN, action } = props;

    const [data, setData] = useState([]);
    const [formStep, setFormStep] = useState(0);

    const firstname = JSON.parse(sessionStorage.getItem("Auth")).firstname;
    const lastname = JSON.parse(sessionStorage.getItem("Auth")).lastname;
    const employeeid = JSON.parse(sessionStorage.getItem("Auth")).employeeid;

    const today = new Date();

    const date = today.getFullYear() + '-' +
        (today.getMonth() > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`) + '-' +
        (today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`);

    const time = (today.getHours() > 9 ? today.getHours() : `0${today.getHours()}`) + ":" +
        (today.getMinutes() > 9 ? today.getMinutes() : `0${today.getMinutes()}`) + ":" +
        (today.getSeconds() > 9 ? today.getSeconds() : `0${today.getSeconds()}`);

    const dateTime = date + ' ' + time;

    const { handleSubmit, control, getValues, setValue } = useForm({
        mode: "all",
        defaultValues: {
            ponumber: GRNRecords.ponumber,
            grnnumber: GRNRecords.grnnumber,
            supplier: GRNRecords.supplier,
            pototal: GRNRecords.pototal,
            status: "Delivered",
            givenid: GRNRecords.givenid,
            createdat: dateTime,
            createdby: `${firstname} ${lastname} (${employeeid})`,
            damagedmissingitems: 0,
            previousdamagedmissingitems: GRNRecords.previousdamagedmissingitems,
            grntotal: 0,
            customername: "S.A.K Distributors",
            customeraddress: "No.233, Kiriwallapitiya, Rambukkana, Srilanka",
            contactnumber: "0352264009",

        }
    });

    useEffect(() => {
        setData(GRNRecords.items);
    }, [GRNRecords, setData])

    useEffect(() => {
        if (data != null) {
            let total = 0;
            let previousdamagedmissingitems = getValues('previousdamagedmissingitems');

            for (let i = 0; i < data.length; i++) {
                total = total + (isNaN(data[i].grnvalue) ? 0 : data[i].grnvalue);
            }

            let grntotal = total - parseInt(previousdamagedmissingitems);
            setValue("grntotal", grntotal.toFixed(2));
        }
    }, [data, setValue])

    const completeFormStep = () => {
        setFormStep(x => x + 1);
    }

    const backFormStep = () => {
        setFormStep(x => x - 1);
    }

    const onSubmit = () => {

        const grnFormData = new formData();

        grnFormData.append('createdat', getValues('createdat'));
        grnFormData.append('createdby', getValues('createdby'));
        grnFormData.append('status', getValues('status'));
        grnFormData.append('items', JSON.stringify(data));
        grnFormData.append('grntotal', getValues('grntotal'));
        grnFormData.append('damagedmissingitems', getValues('damagedmissingitems'));

        updateGRN(grnFormData, getValues('grnnumber'));
    };

    return (
        <form
            className={style.container}
            onSubmit={handleSubmit(onSubmit)}
        >

            {
                formStep >= 0 &&
                <section className={formStep === 0 ? style.visible : style.hidden}>

                    <StepOne
                        data={data}
                        setData={setData}
                        handleClosePopUp={handleClosePopUp}
                        completeFormStep={completeFormStep}
                        control={control}
                        getValues={getValues}
                        setValue={setValue}
                        action={action}
                    />

                </section>
            }

            {
                formStep >= 1 &&
                <section className={formStep === 1 ? style.visible : style.hidden}>

                    <StepTwo
                        data={data}
                        handleClosePopUp={handleClosePopUp}
                        control={control}
                        getValues={getValues}
                        backFormStep={backFormStep}
                        action={action}
                    />

                </section >
            }

        </form >
    )
}
