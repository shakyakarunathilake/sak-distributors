import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import formData from 'form-data';

//SCSS Styles
import style from './CustomerForm.module.scss';

//Steps
import StepOne from './CustomerFormStepOne';
import StepTwo from './CustomerFormStepTwo';

export default function CustomerForm(props) {

    const { setOpenPopup, addOrEdit, customerRecords, routeOptions, nextCusId, action } = props;

    const firstname = JSON.parse(sessionStorage.getItem("Auth")).firstname;
    const lastname = JSON.parse(sessionStorage.getItem("Auth")).lastname;
    const employeeid = JSON.parse(sessionStorage.getItem("Auth")).employeeid;

    const today = new Date();

    const date = today.getFullYear() + '-' +
        (today.getMonth() > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`) + '-' +
        (today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`);

    const { handleSubmit, formState: { errors, isValid }, control, reset, trigger, getValues } = useForm({
        mode: "all",
        defaultValues: {
            customerid: customerRecords ? customerRecords.customerid : nextCusId,
            brn: customerRecords ? customerRecords.brn : '',
            storename: customerRecords ? customerRecords.storename : '',
            fullname: customerRecords ? customerRecords.fullname : '',
            title: customerRecords ? customerRecords.title : '',
            firstname: customerRecords ? customerRecords.firstname : '',
            lastname: customerRecords ? customerRecords.lastname : '',
            route: customerRecords ? customerRecords.route : '',
            addeddate: customerRecords ? customerRecords.addeddate : date,
            shippingaddress: customerRecords ? customerRecords.shippingaddress : '',
            billingaddress: customerRecords ? customerRecords.billingaddress : '',
            customercontactnumber: customerRecords ? customerRecords.customercontactnumber : '',
            storecontactnumber: customerRecords ? customerRecords.storecontactnumber : '',
            email: customerRecords ? customerRecords.email : '',
            registeredby: customerRecords ? customerRecords.registeredby : `${firstname} ${lastname} (${employeeid})`,
        }
    });

    const [formStep, setFormStep] = useState(0);

    const completeFormStep = () => {
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
        reset();
    }

    const onSubmit = () => {
        const customerFormData = new formData();

        customerFormData.append('customerid', getValues('customerid'));
        customerFormData.append("brn", getValues('brn'));
        customerFormData.append('storename', getValues('storename'));
        customerFormData.append('fullname', getValues('fullname'));
        customerFormData.append('title', getValues('title'));
        customerFormData.append('firstname', getValues('firstname'));
        customerFormData.append('lastname', getValues('lastname'));
        customerFormData.append("route", getValues('route'));
        customerFormData.append('addeddate', getValues('addeddate'));
        customerFormData.append('email', getValues('email'));
        customerFormData.append("shippingaddress", getValues('shippingaddress'));
        customerFormData.append("billingaddress", getValues('billingaddress'));
        customerFormData.append("customercontactnumber", getValues('customercontactnumber'));
        customerFormData.append("storecontactnumber", getValues('storecontactnumber'));
        customerFormData.append("registeredby", getValues('registeredby'));

        addOrEdit(customerFormData, getValues("customerid"));
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
                        errors={errors}
                        control={control}
                        setOpenPopup={setOpenPopup}
                        action={action}
                        completeFormStep={completeFormStep}
                        resetForm={resetForm}
                        routeOptions={routeOptions}
                    />

                </section>
            }

            {
                formStep >= 1 &&
                <section className={formStep === 1 ? style.visible : style.hidden}>

                    <StepTwo
                        control={control}
                        setOpenPopup={setOpenPopup}
                        onSubmit={onSubmit}
                        backFormStep={backFormStep}
                        action={action}
                    />

                </section >
            }

        </form >

    )
}
