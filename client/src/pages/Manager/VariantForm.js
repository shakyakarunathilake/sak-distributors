import React, { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import formData from 'form-data';

//Styles
import style from './VariantForm.module.scss';

//Steps 
import StepOne from './VariantFormStepOne';
import StepTwo from './VariantFormStepTwo';

export default function VariantForm(props) {

    const {
        handleClosePopUp,
        addVariant,
        productOptions,
        action,
        employeeOptions,
        productRecords
    } = props;

    const [file, setFile] = useState("");
    const [formStep, setFormStep] = useState(0);

    const today = new Date();

    const date = today.getFullYear() + '-' +
        (today.getMonth() > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`) + '-' +
        (today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`);

    const { handleSubmit, formState: { errors, isValid }, control, watch, clearErrors, reset, setValue, getValues, trigger } = useForm({
        mode: "all",
        defaultValues: {
            productid: productRecords ? productRecords.productid : '',
            name: productRecords ? productRecords.name : undefined,
            supplier: productRecords ? productRecords.supplier : '',
            productimage: productRecords ? productRecords.productimage : '',
            addeddate: productRecords ? productRecords.addeddate : '',
            addedby: productRecords ? productRecords.addedby : '',
            productstatus: productRecords ? productRecords.status : '',
            variantid: productRecords ? productRecords.variant.variantid : '',
            type: productRecords ? productRecords.variant.type : '',
            piecespercase: productRecords ? productRecords.variant.piecespercase : 24,
            bulkprice: productRecords ? productRecords.variant.bulkprice : '',
            mrp: productRecords ? productRecords.variant.mrp : '',
            sellingprice: productRecords ? productRecords.variant.sellingprice : '',
            purchaseprice: productRecords ? productRecords.variant.purchaseprice : '',
            eligibleqty: productRecords ? productRecords.eligibleqty : '',
            eligibleqtytype: productRecords ? productRecords.eligibleqtytype : '',
            freeqty: productRecords ? productRecords.freeqty : '',
            freeqtytype: productRecords ? productRecords.freeqtytype : '',
            freeproduct: productRecords ? productRecords.freeproduct : '',
            offercaption: productRecords ? productRecords.variant.offercaption : '',
            variantstatus: productRecords ? productRecords.variant.status : '',
            variantaddeddate: productRecords ? productRecords.variant.addeddate : date,
            variantaddedby: productRecords ? productRecords.variant.addedby : '',
        }
    });

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

    const handleProductChange = (event, option) => {
        if (option) {
            setFile(`http://${option.productimage}`);
            setValue("productid", option.productid);
            setValue("name", option.name);
            setValue("supplier", option.supplier);
            setValue("productimage", option.productimage);
            setValue("addeddate", option.addeddate);
            setValue("addedby", option.addedby);
            setValue("variantid", option.variantid);
            setValue("productstatus", option.status);
            clearErrors();
        }
    }

    const resetForm = () => {
        setFile("");
        reset();
    }

    const onSubmit = () => {

        const productFormData = new formData();

        if (action === 'Create') {
            productFormData.append('productid', getValues('productid'));
            productFormData.append("variantid", getValues('variantid'));
            productFormData.append('type', getValues('type'));
            productFormData.append("offercaption", getValues('offercaption'));
            productFormData.append("piecespercase", getValues('piecespercase'));
            productFormData.append("bulkprice", getValues('bulkprice'));
            productFormData.append("purchaseprice", getValues('purchaseprice'));
            productFormData.append("sellingprice", getValues('sellingprice'));
            productFormData.append("mrp", getValues('mrp'));
            productFormData.append("variantaddedby", getValues('variantaddedby'));
            productFormData.append("variantaddeddate", getValues('variantaddeddate'));
            productFormData.append("variantstatus", getValues('variantstatus'));
        }

        if (action === 'Edit') {
            productFormData.append('type', getValues('type'));
            productFormData.append("offercaption", getValues('offercaption'));
            productFormData.append("piecespercase", getValues('piecespercase'));
            productFormData.append("bulkprice", getValues('bulkprice'));
            productFormData.append("purchaseprice", getValues('purchaseprice'));
            productFormData.append("sellingprice", getValues('sellingprice'));
            productFormData.append("mrp", getValues('mrp'));
            productFormData.append("variantstatus", getValues('variantstatus'));
        }

        addVariant(productFormData, getValues('productid'), getValues('variantid'));
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
                        file={file}
                        completeFormStep={completeFormStep}
                        action={action}
                        handleClosePopUp={handleClosePopUp}
                        employeeOptions={employeeOptions}
                        handleProductChange={handleProductChange}
                        productOptions={productOptions}
                        resetForm={resetForm}
                        watch={watch}
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
                        file={file}
                        onSubmit={onSubmit}
                        watch={watch}
                    />

                </section >
            }

        </form >

    );
};
