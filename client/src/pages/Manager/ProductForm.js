import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import formData from 'form-data';

//SCSS Styles
import style from './ProductForm.module.scss';

//Steps
import StepOne from './ProductFormStepOne';
import StepTwo from './ProductFormStepTwo';

export default function ProductsForm(props) {

    const { handleClosePopUp, addOrEdit, productRecords, nextId, employeeOptions, action } = props;

    const today = new Date();

    const date = today.getFullYear() + '-' +
        (today.getMonth() > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`) + '-' +
        (today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`);

    const { handleSubmit, formState: { errors, isValid }, control, reset, trigger, getValues } = useForm({
        mode: "all",
        defaultValues: {
            addedby: productRecords ? productRecords.addedby : '',
            addeddate: productRecords ? productRecords.addeddate : date,
            name: productRecords ? productRecords.name : '',
            productid: productRecords ? productRecords.productid : nextId,
            productimage: productRecords ? productRecords.productimage : '',
            status: productRecords ? productRecords.status : '',
            supplier: productRecords ? productRecords.supplier : '',
        }
    });

    const [file, setFile] = useState("");
    const [formStep, setFormStep] = useState(0);

    useEffect(() => {
        if (productRecords != null) {
            setFile(`http://${productRecords.productimage}`);
        }
    }, [productRecords])

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
        setFile("");
    }

    // Handle Image Upload
    const handleImageChange = e => {
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    const onSubmit = () => {

        const productFormData = new formData();

        if (action === 'Create') {
            productFormData.append('productid', getValues('productid'));
            productFormData.append('productimage', getValues('productimage'));
            productFormData.append('name', getValues('name'));
            productFormData.append('supplier', getValues('supplier'));
            productFormData.append('addeddate', getValues('addeddate'));
            productFormData.append("addedby", getValues('addedby'));
            productFormData.append("status", getValues('status'));
        }

        if (action === 'Edit') {
            productFormData.append('productimage', getValues('productimage'));
            productFormData.append('name', getValues('name'));
            productFormData.append('supplier', getValues('supplier'));
            productFormData.append("status", getValues('status'));
        }

        addOrEdit(productFormData, getValues('productid'));
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
                        handleClosePopUp={handleClosePopUp}
                        action={action}
                        file={file}
                        completeFormStep={completeFormStep}
                        handleImageChange={handleImageChange}
                        resetForm={resetForm}
                        employeeOptions={employeeOptions}
                    />

                </section>
            }

            {
                formStep >= 1 &&
                <section className={formStep === 1 ? style.visible : style.hidden}>

                    <StepTwo
                        action={action}
                        handleClosePopUp={handleClosePopUp}
                        control={control}
                        backFormStep={backFormStep}
                        onSubmit={onSubmit}
                        file={file}
                    />

                </section >
            }

        </form >

    );
};
