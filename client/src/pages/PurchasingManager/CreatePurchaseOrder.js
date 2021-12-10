import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import formData from 'form-data';

//SCSS styles
import style from './CreatePurchaseOrder.module.scss';

//Form Step
import StepOne from './StepOne';
import StepTwo from './StepTwo';

export default function CreatePurchaseOrder(props) {

    const { setOpenPopup, productOptions, supplierOptions, addOrder, openPopup, handleClosePopUp } = props;

    const { handleSubmit } = useForm({ mode: "all" });

    const [data, setData] = useState([]);
    const [formStep, setFormStep] = useState(0);
    const [formData, setFormData] = useState({});
    const [resetFormOpenPopup, setResetFormOpenPopup] = useState(false);

    const completeFormStep = () => {
        setFormStep(x => x + 1);
    }

    const backFormStep = () => {
        setFormStep(x => x - 1);
    }

    const handleResetFormClosePopUp = () => {
        setResetFormOpenPopup(false)
    }

    const onSubmit = (values) => {

        const firstname = JSON.parse(sessionStorage.getItem("Auth")).firstname;
        const lastname = JSON.parse(sessionStorage.getItem("Auth")).lastname;
        const employeeid = JSON.parse(sessionStorage.getItem("Auth")).employeeid;

        const purchaseOrderFormData = new formData();

        purchaseOrderFormData.append('ponumber', values.ponumber);
        purchaseOrderFormData.append('supplier', values.supplier);
        purchaseOrderFormData.append('createdat', values.createdat);
        purchaseOrderFormData.append('createdby', `${firstname} ${lastname} (${employeeid})`);
        purchaseOrderFormData.append('approvedby', '');
        purchaseOrderFormData.append('items', JSON.stringify(data));
        purchaseOrderFormData.append('grosstotal', values.total);
        purchaseOrderFormData.append('receiveddiscounts', values.receiveddiscounts);
        purchaseOrderFormData.append('damagedexpireditems', values.damagedexpireditems);
        purchaseOrderFormData.append('total', values.total);

        addOrder(purchaseOrderFormData);
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
                        openPopup={openPopup}
                        setFormData={setFormData}
                        setOpenPopup={setOpenPopup}
                        handleClosePopUp={handleClosePopUp}
                        resetFormOpenPopup={resetFormOpenPopup}
                        setResetFormOpenPopup={setResetFormOpenPopup}
                        handleResetFormClosePopUp={handleResetFormClosePopUp}
                        completeFormStep={completeFormStep}
                        supplierOptions={supplierOptions}
                        productOptions={productOptions}
                    />

                </section>

            }

            {
                formStep >= 1 &&
                <section className={formStep === 1 ? style.visible : style.hidden}>

                    <StepTwo
                        // getTotal={getTotal}
                        formData={formData}
                        handleClosePopUp={handleClosePopUp}
                        data={data}
                        backFormStep={backFormStep}
                    />

                </section>

            }

        </form>

    );
}
