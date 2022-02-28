import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import formData from 'form-data';

//SCSS styles
import style from './CreateGINForm.module.scss';

//Form Step
import GINStepOne from './GINStepOne';
import GINStepTwo from './GINStepTwo';

export default function GINForm(props) {

    const { GINRecords, handleClosePopUp, addOrEdit, action, orderRecords } = props;

    const [data, setData] = useState([]);
    const [formStep, setFormStep] = useState(0);
    const [orderNumbers, setOrderNumbers] = useState([]);

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

    const ginTime = today.getFullYear() + '' + (today.getMonth() + 1) + '' + today.getDate() + '' + today.getHours() + '' + today.getMinutes();

    const { formState: { isValid, errors }, control, watch, getValues, trigger, setValue, handleSubmit } = useForm({
        mode: "onChange",
        defaultValues: {
            ginnumber: GINRecords ? GINRecords.ginnumber : `GIN-${ginTime}`,
            createdat: GINRecords ? GINRecords.createdat : dateTime,
            createdby: GINRecords ? GINRecords.createdby : `${firstname} ${lastname} (${employeeid})`,
            route: GINRecords ? GINRecords.route : '',
            total: GINRecords ? GINRecords.total : 0
        }
    });


    useEffect(() => {
        if (GINRecords !== null) {
            setData([...GINRecords.items]);
            setOrderNumbers([...GINRecords.ordernumbers]);
        }
    }, [setData, GINRecords, setValue, setOrderNumbers])

    useEffect(() => {
        if (data != null) {
            let total = 0;

            for (let i = 0; i < data.length; i++) {
                total = total + parseInt(data[i].grossamount);
            }

            setValue('total', total.toFixed(2));
        }
    }, [data, setValue])

    const completeFormStep = () => {
        setFormStep(x => x + 1);
    }

    const backFormStep = () => {
        setFormStep(x => x - 1);
    }

    const onSubmit = () => {
        const ginFormData = new formData();

        ginFormData.append('ginnumber', getValues('ginnumber'));
        ginFormData.append('createdat', getValues('createdat'));
        ginFormData.append('createdby', getValues('createdby'));
        ginFormData.append('route', getValues('route'));
        ginFormData.append('ordernumbers', JSON.stringify(orderNumbers));
        ginFormData.append('items', JSON.stringify(data));
        ginFormData.append('total', getValues('total'));
        ginFormData.append('status', 'Processing');

        addOrEdit(ginFormData, getValues('ginnumber'));
    };

    return (
        <form
            className={style.container}
            onSubmit={handleSubmit(onSubmit)}
        >

            {
                formStep >= 0 &&
                <section className={formStep === 0 ? style.visible : style.hidden}>

                    <GINStepOne
                        data={data}
                        setData={setData}
                        handleClosePopUp={handleClosePopUp}
                        completeFormStep={completeFormStep}
                        orderRecords={orderRecords}
                        GINRecords={GINRecords}
                        orderNumbers={orderNumbers}
                        setOrderNumbers={setOrderNumbers}
                        action={action}
                        control={control}
                        watch={watch}
                        getValues={getValues}
                        trigger={trigger}
                        isValid={isValid}
                        errors={errors}
                    />

                </section>
            }

            {
                formStep >= 1 &&
                <section className={formStep === 1 ? style.visible : style.hidden}>

                    <GINStepTwo
                        backFormStep={backFormStep}
                        onSubmit={onSubmit}
                        data={data}
                        handleClosePopUp={handleClosePopUp}
                        orderNumbers={orderNumbers}
                        control={control}
                        getValues={getValues}
                        action={action}
                    />

                </section>
            }

        </form>



    )
}
