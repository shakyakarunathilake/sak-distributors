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
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;

    const { handleSubmit, control, getValues, setValue } = useForm({
        mode: "all",
        defaultValues: {
            ponumber: GRNRecords.ponumber,
            grnnumber: GRNRecords.grnnumber,
            supplier: GRNRecords.supplier,
            total: GRNRecords.total,
            createdat: dateTime,
            createdby: `${firstname} ${lastname} (${employeeid})`,
            givenid: GRNRecords.givenid,
            customername: "S.A.K Distributors",
            customeraddress: "No.233, Kiriwallapitiya, Rambukkana, Srilanka",
            contactnumber: "0352264009",
            status: "Delivered",
            grntotal: 0,
            damagedmissingitems: 0
        }
    });

    useEffect(() => {
        setData(GRNRecords.items);
    }, [GRNRecords, setData])

    useEffect(() => {
        if (data != null) {
            let total = 0;

            for (let i = 0; i < data.length; i++) {
                total = total + (isNaN(data[i].grnvalue) ? 0 : data[i].grnvalue);
            }

            setValue("grntotal", total.toFixed(2));
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
