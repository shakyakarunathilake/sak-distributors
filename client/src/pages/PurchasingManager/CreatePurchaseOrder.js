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

    const { handleSubmit, setValue, reset } = useForm({ mode: "all" });

    const [formStep, setFormStep] = useState(1);
    const [data, setData] = useState([]);

    const [selectedProductOptions, setSelectedProductOptions] = useState([]);

    const completeFormStep = () => {
        setFormStep(x => x + 1);
    }

    const backFormStep = () => {
        setFormStep(x => x - 1);
    }

    const getTotal = () => {
        let total = 0;
        for (let i = 0; i < data.length; i++) {
            total = total + data[i].value;
        }
        setValue("total", total);
        setValue("receiveddiscounts", 0);
        setValue("damagedexpireditems", 0);
        return total;
    }

    // const getProductItemList = useMemo(() => {
    //     const selectedDescriptions = data.map(x => x.description);
    //     console.log("SELECTED DESCRIPTIONS: ", selectedDescriptions);

    //     const supplierProducts = productOptions.filter(x => x.supplier === getValues('supplier'));
    //     console.log("SUPPLIER PRODUCTS: ", supplierProducts);

    //     const productItemList = supplierProducts.filter(x => selectedDescriptions.indexOf(x.name) === -1);
    //     console.log("PRODUCT ITEM LIST: ", productItemList);

    //     return productItemList;
    // }, [data, getValues('supplier')]);


    const resetForm = () => {
        handleClosePopUp();
        reset({
            ponumber: '',
            createddat: '',
            supplier: '',
            grosstotal: '',
            receiveddiscounts: '',
            damagedexpireditems: '',
            total: ''
        });
        setData([]);
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
                        supplierOptions={supplierOptions}
                        setSelectedProductOptions={setSelectedProductOptions}
                        productOptions={productOptions}
                        data={data}
                        setData={setData}
                        completeFormStep={completeFormStep}
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                        selectedProductOptions={selectedProductOptions}
                        handleClosePopUp={handleClosePopUp}
                        resetForm={resetForm}
                    />

                </section>

            }

            {
                formStep >= 1 &&
                <section className={formStep === 1 ? style.visible : style.hidden}>

                    <StepTwo
                        getTotal={getTotal}
                        data={data}
                        backFormStep={backFormStep}
                    />

                </section>

            }

        </form>

    );
}
