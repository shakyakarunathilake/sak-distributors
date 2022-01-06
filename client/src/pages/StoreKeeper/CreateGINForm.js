import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import formData from 'form-data';

//SCSS styles
import style from './CreateGINForm.module.scss';

//Form Step
import GINStepOne from './GINStepOne';
import GINStepTwo from './GINStepTwo';

export default function GINForm(props) {

    const { GINRecords, handleClosePopUp, addOrEdit, action, orderRecords, inChargeOptions } = props;

    const firstname = JSON.parse(sessionStorage.getItem("Auth")).firstname;
    const lastname = JSON.parse(sessionStorage.getItem("Auth")).lastname;
    const employeeid = JSON.parse(sessionStorage.getItem("Auth")).employeeid;

    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    const ginTime = today.getFullYear() + '' + (today.getMonth() + 1) + '' + today.getDate() + '' + today.getHours() + '' + today.getMinutes() + '' + today.getSeconds();

    const { formState: { isValid, errors }, control, watch, getValues, trigger, setValue, handleSubmit } = useForm({
        mode: "onChange",
        defaultValues: {
            ginnumber: GINRecords ? GINRecords.ginnumber : `GIN-${ginTime}`,
            createdat: GINRecords ? GINRecords.createdat : dateTime,
            createdby: GINRecords ? GINRecords.createdby : `${firstname} ${lastname} (${employeeid})`,
            route: GINRecords ? GINRecords.route : '',
            incharge: GINRecords ? GINRecords.incharge : '',
            vehicle: GINRecords ? GINRecords.vehicle : '',
            total: GINRecords ? GINRecords.total : ''
        }
    });

    const [data, setData] = useState([]);
    const [formStep, setFormStep] = useState(0);
    const [confirmation, setConfirmation] = useState(false);
    const [orderFormData, setOrderFormData] = useState({});
    const [orderNumbers, setOrderNumbers] = useState([]);

    const completeFormStep = () => {
        setFormStep(x => x + 1);
    }

    const backFormStep = () => {
        setFormStep(x => x - 1);
    }

    const onSubmit = () => {
        if (confirmation === true) {

            const ginFormData = new formData();

            if (action === "Create") {
                ginFormData.append('ginnumber', orderFormData.ginnumber);
                ginFormData.append('createdat', orderFormData.createdat);
                ginFormData.append('createdby', orderFormData.createdby);
                ginFormData.append('route', orderFormData.route);
                ginFormData.append('vehicle', orderFormData.vehicle);
                ginFormData.append('incharge', orderFormData.incharge);
                ginFormData.append('ordernumbers', JSON.stringify(orderNumbers));
                ginFormData.append('items', JSON.stringify(data));
                ginFormData.append('total', orderFormData.total);
                ginFormData.append('status', 'Processing');
            } else {
                ginFormData.append('vehicle', orderFormData.vehicle);
                ginFormData.append('incharge', orderFormData.incharge);
            }

            addOrEdit(ginFormData, orderFormData.ginnumber);
        }
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
                        setConfirmation={setConfirmation}
                        setOrderFormData={setOrderFormData}
                        handleClosePopUp={handleClosePopUp}
                        completeFormStep={completeFormStep}
                        GINRecords={GINRecords}
                        inChargeOptions={inChargeOptions}
                        orderRecords={orderRecords}
                        orderNumbers={orderNumbers}
                        setOrderNumbers={setOrderNumbers}
                        control={control}
                        watch={watch}
                        getValues={getValues}
                        trigger={trigger}
                        isValid={isValid}
                        errors={errors}
                        setValue={setValue}
                        action={action}
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
                        orderFormData={orderFormData}
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
