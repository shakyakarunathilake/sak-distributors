import React, { useState } from 'react';
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
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    const podate = today.getFullYear().toString().substr(-2) + (today.getMonth() + 1) + today.getDate() + today.getHours() + today.getMinutes();

    const firstname = JSON.parse(sessionStorage.getItem("Auth")).firstname;
    const lastname = JSON.parse(sessionStorage.getItem("Auth")).lastname;
    const employeeid = JSON.parse(sessionStorage.getItem("Auth")).employeeid;

    const {
        handleSubmit,
        getValues,
        setValue,
        trigger,
        control,
        formState: { errors }
    } = useForm({
        mode: "all",
        defaultValues: {
            ponumber: poRecords ? poRecords.ponumber : '',
            supplier: poRecords ? poRecords.supplier : '',
            grosstotal: poRecords ? poRecords.grosstotal : 0.00,
            receiveddiscounts: poRecords ? parseInt(poRecords.receiveddiscounts).toFixed(2) : 0.00,
            damagedmissingitems: poRecords ? parseInt(poRecords.damagedmissingitems).toFixed(2) : 0.00,
            total: poRecords ? poRecords.total : 0.00,
            // customerid: poRecords ? poRecords.customerid : '',
            customername: poRecords ? poRecords.customername : "S.A.K Distributors",
            customeraddress: poRecords ? poRecords.customeraddress : "No.233, Kiriwallapitiya, Rambukkana, Sri Lanka",
            contactnumber: poRecords ? poRecords.contactnumber : "0352264009",
            status: poRecords ? poRecords.status : '',
            createdby: poRecords ? poRecords.createdby : `${firstname} ${lastname} (${employeeid})`,
            createdat: poRecords ? poRecords.createdat : '',
            approvedby: poRecords ? poRecords.approvedby : '',
            approvedat: poRecords ? poRecords.approvedat : '',
            deliveredat: poRecords ? poRecords.deliveredat : '',
        }
    });

    const [data, setData] = useState([]);
    const [formStep, setFormStep] = useState(0);
    const [confirmation, setConfirmation] = useState(false);
    const [orderFormData, setOrderFormData] = useState({});

    const completeFormStep = () => {
        setFormStep(x => x + 1);
    }

    const backFormStep = () => {
        setFormStep(x => x - 1);
    }

    const onSubmit = () => {

        const purchaseOrderFormData = new formData();

        if (confirmation === true && poRecords === null) {
            purchaseOrderFormData.append('ponumber', orderFormData.ponumber);
            purchaseOrderFormData.append('supplier', orderFormData.supplier);
            purchaseOrderFormData.append('customername', orderFormData.customername);
            purchaseOrderFormData.append('customeraddress', orderFormData.customeraddress);
            purchaseOrderFormData.append('contactnumber', orderFormData.contactnumber);
            purchaseOrderFormData.append('createdat', orderFormData.createdat);
            purchaseOrderFormData.append('createdby', orderFormData.createdby);
            purchaseOrderFormData.append('status', orderFormData.status);
            purchaseOrderFormData.append('items', JSON.stringify(data));
            purchaseOrderFormData.append('grosstotal', orderFormData.grosstotal);
            purchaseOrderFormData.append('receiveddiscounts', orderFormData.receiveddiscounts);
            purchaseOrderFormData.append('damagedmissingitems', orderFormData.damagedmissingitems);
            purchaseOrderFormData.append('total', orderFormData.total);
        }

        if (confirmation === true && poRecords != null) {
            purchaseOrderFormData.append('items', JSON.stringify(data));
            purchaseOrderFormData.append('approvedat', orderFormData.approvedat);
            purchaseOrderFormData.append('approvedby', orderFormData.approvedby);
            purchaseOrderFormData.append('status', orderFormData.status);
        }

        addOrEdit(purchaseOrderFormData, orderFormData.ponumber);
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
                        setConfirmation={setConfirmation}
                        setOrderFormData={setOrderFormData}
                        handleClosePopUp={handleClosePopUp}
                        completeFormStep={completeFormStep}
                        supplierOptions={supplierOptions}
                        productOptions={productOptions}
                        poRecords={poRecords}
                        getValues={getValues}
                        setValue={setValue}
                        trigger={trigger}
                        control={control}
                        errors={errors}
                        podate={podate}
                        dateTime={dateTime}
                        firstname={firstname}
                        lastname={lastname}
                        employeeid={employeeid}
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
