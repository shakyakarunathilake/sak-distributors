import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import formData from 'form-data';

//SCSS styles
import style from './CreatePurchaseOrder.module.scss';

//Form Step
import StepOne from './PurchaseOrderStepOne';
import StepTwo from './PurchaseOrderStepTwo';

export default function CreatePurchaseOrder(props) {

    const { productOptions, supplierOptions, addOrEdit, handleClosePopUp, poRecords, action } = props;

    const today = new Date();

    const date = today.getFullYear() + '-' +
        (today.getMonth() > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`) + '-' +
        (today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`);

    const time = (today.getHours() > 9 ? today.getHours() + 1 : `0${today.getHours() + 1}`) + ":" +
        (today.getMinutes() > 9 ? today.getMinutes() + 1 : `0${today.getMinutes() + 1}`) + ":" +
        (today.getSeconds() > 9 ? today.getSeconds() + 1 : `0${today.getSeconds() + 1}`);

    const dateTime = date + ' ' + time;

    const podate = today.getFullYear().toString().substr(-2) + (today.getMonth() + 1) + today.getDate() + (today.getHours() + 1) + (today.getMinutes() + 1);

    const firstname = JSON.parse(sessionStorage.getItem("Auth")).firstname;
    const lastname = JSON.parse(sessionStorage.getItem("Auth")).lastname;
    const employeeid = JSON.parse(sessionStorage.getItem("Auth")).employeeid;

    const { handleSubmit, getValues, setValue, trigger, watch, control, formState: { errors } } = useForm({
        mode: "all",
        defaultValues: {
            ponumber: poRecords ? poRecords.ponumber : '',
            supplier: poRecords ? poRecords.supplier : '',
            grosstotal: poRecords ? poRecords.grosstotal : 0.00,
            receiveddiscounts: poRecords ? parseInt(poRecords.receiveddiscounts).toFixed(2) : 0.00,
            damagedmissingitems: poRecords ? parseInt(poRecords.damagedmissingitems).toFixed(2) : 0.00,
            total: poRecords ? poRecords.total : 0.00,
            givenid: poRecords ? poRecords.givenid : '',
            customername: poRecords ? poRecords.customername : "S.A.K Distributors",
            customeraddress: poRecords ? poRecords.customeraddress : "No.233, Kiriwallapitiya, Rambukkana, Sri Lanka",
            contactnumber: poRecords ? poRecords.contactnumber : "0352264009",
            status: poRecords ? poRecords.status : '',
            createdby: poRecords ? poRecords.createdby : `${firstname} ${lastname} (${employeeid})`,
            createdat: poRecords ? poRecords.createdat : '',
            approvedby: `${firstname} ${lastname} (${employeeid})`,
            approvedat: dateTime,
            deliveredat: poRecords ? poRecords.deliveredat : '',
        }
    });

    const [data, setData] = useState([]);
    const [formStep, setFormStep] = useState(0);

    useEffect(() => {
        if (poRecords != null) {
            setData([...poRecords.items])
        }
    }, [setData, poRecords])

    useEffect(() => {
        if (data != null) {
            let grosstotal = 0;

            for (let i = 0; i < data.length; i++) {
                grosstotal = grosstotal + data[i].value;
            }

            setValue("grosstotal", grosstotal.toFixed(2));
        }
    }, [data, setValue])

    const completeFormStep = () => {
        setFormStep(x => x + 1);
    }

    const backFormStep = () => {
        setFormStep(x => x - 1);
    }

    const onSubmit = () => {

        const purchaseOrderFormData = new formData();

        if (action === 'Create') {
            purchaseOrderFormData.append('ponumber', getValues('ponumber'));
            purchaseOrderFormData.append('supplier', getValues('supplier'));
            purchaseOrderFormData.append('givenid', getValues('givenid'));
            purchaseOrderFormData.append('customername', getValues('customername'));
            purchaseOrderFormData.append('customeraddress', getValues('customeraddress'));
            purchaseOrderFormData.append('contactnumber', getValues('contactnumber'));
            purchaseOrderFormData.append('createdat', getValues('createdat'));
            purchaseOrderFormData.append('createdby', getValues('createdby'));
            purchaseOrderFormData.append('status', getValues('status'));
            purchaseOrderFormData.append('items', JSON.stringify(data));
            purchaseOrderFormData.append('grosstotal', getValues('grosstotal'));
            purchaseOrderFormData.append('receiveddiscounts', getValues('receiveddiscounts'));
            purchaseOrderFormData.append('damagedmissingitems', getValues('damagedmissingitems'));
            purchaseOrderFormData.append('total', getValues('total'));
            purchaseOrderFormData.append('deliveredat', getValues('deliveredat'));
        }

        if (action === 'Edit') {
            purchaseOrderFormData.append('items', JSON.stringify(data));
            purchaseOrderFormData.append('grosstotal', getValues('grosstotal'));
            purchaseOrderFormData.append('total', getValues('total'));
            purchaseOrderFormData.append('receiveddiscounts', getValues('receiveddiscounts'));
        }

        if (action === 'Approve') {
            purchaseOrderFormData.append('items', JSON.stringify(data));
            purchaseOrderFormData.append('grosstotal', getValues('grosstotal'));
            purchaseOrderFormData.append('total', getValues('total'));
            purchaseOrderFormData.append('receiveddiscounts', getValues('receiveddiscounts'));
            purchaseOrderFormData.append('approvedat', getValues('approvedat'));
            purchaseOrderFormData.append('approvedby', getValues('approvedby'));
            purchaseOrderFormData.append('status', getValues('status'));
        }

        addOrEdit(purchaseOrderFormData, getValues('ponumber'));
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
                        data={data}
                        setData={setData}
                        handleClosePopUp={handleClosePopUp}
                        completeFormStep={completeFormStep}
                        supplierOptions={supplierOptions}
                        productOptions={productOptions}
                        getValues={getValues}
                        setValue={setValue}
                        trigger={trigger}
                        control={control}
                        errors={errors}
                        podate={podate}
                        watch={watch}
                        dateTime={dateTime}
                        action={action}
                    />

                </section>

            }

            {
                formStep >= 1 &&
                <section className={formStep === 1 ? style.visible : style.hidden}>

                    <StepTwo
                        backFormStep={backFormStep}
                        data={data}
                        action={action}
                        handleClosePopUp={handleClosePopUp}
                        control={control}
                        getValues={getValues}
                    />

                </section>

            }

        </form >

    );
}
