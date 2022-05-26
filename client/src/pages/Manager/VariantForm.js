import React, { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import formData from 'form-data';

//Styles
import style from './VariantForm.module.scss';

//Steps 
import StepOne from './VariantFormStepOne';
import StepTwo from './VariantFormStepTwo';
import StepThree from './VariantFormStepThree';
import StepFour from './VariantFormStepFour';

export default function CreateVariantForm(props) {

    const {
        handleClosePopUp,
        addVariant,
        productOptions,
        action,
        employeeOptions,
        productRecords,
        productVariantOptions,
    } = props;

    const [file, setFile] = useState("");
    const [formStep, setFormStep] = useState(0);

    const today = new Date();

    const date = today.getFullYear() + '-' +
        (today.getMonth() > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`) + '-' +
        (today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`);

    const { handleSubmit, formState: { errors }, control, watch, reset, setValue, getValues, trigger, clearErrors } = useForm({
        mode: "all",
        defaultValues: {
            productid: productRecords ? productRecords.productid : '',
            name: productRecords ? {
                name: productRecords.name
            }
                : null,
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
            eligibleqty: productRecords ? (productRecords.variant.eligibleqty ? productRecords.variant.eligibleqty : '') : '',
            eligibleqtytype: productRecords ? (productRecords.variant.eligibleqtytype ? productRecords.variant.eligibleqtytype : '') : '',
            freeqty: productRecords ? (productRecords.variant.freeqty ? productRecords.variant.freeqty : '') : '',
            freeqtytype: productRecords ? (productRecords.variant.freeqtytype ? productRecords.variant.freeqtytype : '') : '',
            discount: productRecords ? (productRecords.variant.discount ? productRecords.variant.discount : '') : '',
            freeproductname: productRecords ? (
                productRecords.variant.freeproductname ?
                    productRecords.variant.freeproductname : null
            ) : null,
            offercaption: productRecords ? (productRecords.variant.offercaption ? productRecords.variant.offercaption : '') : '',
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

    const completeFormStep = async () => {
        let isValid = false;

        switch (formStep) {
            case 0:
                isValid = await trigger([
                    "productid",
                    "name",
                    "supplier",
                    "productimage",
                    "addeddate",
                    "addedby",
                    "variantid",
                    "productstatus",
                    "type"
                ]);
                break;

            case 2:
                switch (watch("type")) {
                    case "Promotion (Free Products)":
                        isValid = await trigger([
                            "piecespercase",
                            "bulkprice",
                            "mrp",
                            "sellingprice",
                            "purchaseprice",
                            "eligibleqty",
                            "eligibleqtytype",
                            "freeqty",
                            "freeqtytype",
                            "freeproductname",
                            "offercaption",
                            "variantstatus",
                            "variantaddeddate",
                            "variantaddedby"
                        ]);
                        break;
                    case "Promotion (Discounts)":
                        isValid = await trigger([
                            "piecespercase",
                            "bulkprice",
                            "mrp",
                            "sellingprice",
                            "purchaseprice",
                            "eligibleqty",
                            "eligibleqtytype",
                            "freeproductname",
                            "discount",
                            "offercaption",
                            "variantstatus",
                            "variantaddeddate",
                            "variantaddedby"
                        ])
                        break;
                    default:
                        isValid = await trigger([
                            "piecespercase",
                            "bulkprice",
                            "mrp",
                            "sellingprice",
                            "purchaseprice",
                            "variantstatus",
                            "variantaddeddate",
                            "variantaddedby",
                        ]);
                        break;
                }
                break;
            default:
                isValid = true;
                break;
        }

        if (isValid === true) {

            switch (true) {
                case (action === "Create" && formStep === 2):
                    if (getValues("type") === "Promotion (Free Products)") {
                        setValue(
                            "offercaption",
                            `Buy ${getValues("eligibleqty")} ${getValues("eligibleqtytype").toLowerCase()} and get ${getValues("freeqty")} ${getValues("freeqtytype").toLowerCase()} of ${getValues("freeproductname")}`
                        )
                    }

                    if (getValues("type") === "Promotion (Discounts)") {
                        setValue(
                            "offercaption",
                            `Buy ${getValues("eligibleqty")} ${getValues("eligibleqtytype").toLowerCase()} and get ${getValues("discount")}% off of ${getValues("freeproductname")}`
                        )
                    }
                    setFormStep(x => x + 1);
                    break;
                case (action === "Edit" && formStep === 0):
                    if (getValues("type") === "Promotion (Free Products)") {
                        setValue(
                            "offercaption",
                            `Buy ${getValues("eligibleqty")} ${getValues("eligibleqtytype").toLowerCase()} and get ${getValues("freeqty")} ${getValues("freeqtytype").toLowerCase()} of ${getValues("freeproductname")}`
                        )
                    }

                    if (getValues("type") === "Promotion (Discounts)") {
                        setValue(
                            "offercaption",
                            `Buy ${getValues("eligibleqty")} ${getValues("eligibleqtytype").toLowerCase()} and get ${getValues("discount")}% off of ${getValues("freeproductname")}`
                        )
                    }
                    setFormStep(x => x + 1);
                    break;
                default:
                    setFormStep(x => x + 1);
                    break;
            }

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
            // setValue("name", option.name);
            setValue("supplier", option.supplier);
            setValue("productimage", option.productimage);
            setValue("addeddate", option.addeddate);
            setValue("addedby", option.addedby);
            setValue("variantid", option.variantid);
            setValue("productstatus", option.status);
            clearErrors();
        }
    }

    const stepOneResetForm = () => {
        setFile("");
        reset({
            productid: "",
            name: null,
            supplier: "",
            productimage: "",
            addeddate: "",
            addedby: "",
            variantid: "",
            productstatus: "",
            type: "General"
        });
    }

    const stepThreeClearError = () => {
        clearErrors([
            "piecespercase",
            "bulkprice",
            "mrp",
            "sellingprice",
            "purchaseprice",
            "eligibleqty",
            "eligibleqtytype",
            "freeqty",
            "freeqtytype",
            "freeproductname",
            "discount",
            "offercaption",
            "variantstatus",
            "variantaddeddate",
            "variantaddedby"
        ]);
    }

    const onSubmit = () => {

        const productFormData = new formData();

        if (action === 'Create') {
            productFormData.append('productid', getValues('productid'));
            productFormData.append("variantid", getValues('variantid'));
            productFormData.append('type', getValues('type'));
            productFormData.append("piecespercase", getValues('piecespercase'));
            productFormData.append("bulkprice", getValues('bulkprice'));
            productFormData.append("mrp", getValues('mrp'));
            productFormData.append("sellingprice", getValues('sellingprice'));
            productFormData.append("purchaseprice", getValues('purchaseprice'));

            if (getValues("type") === "Promotion (Free Products)") {
                productFormData.append("eligibleqty", getValues('eligibleqty'));
                productFormData.append("eligibleqtytype", getValues('eligibleqtytype'));
                productFormData.append("freeqty", getValues('freeqty'));
                productFormData.append("freeqtytype", getValues('freeqtytype'));
                productFormData.append("freeproductname", getValues('freeproductname'));
                productFormData.append("offercaption", getValues('offercaption'));
            }

            if (getValues("type") === "Promotion (Discounts)") {
                productFormData.append("eligibleqty", getValues('eligibleqty'));
                productFormData.append("eligibleqtytype", getValues('eligibleqtytype'));
                productFormData.append("discount", getValues('discount'));
                productFormData.append("freeproductname", getValues('freeproductname'));
                productFormData.append("offercaption", getValues('offercaption'));
            }

            productFormData.append("variantstatus", getValues('variantstatus'));
            productFormData.append("variantaddeddate", getValues('variantaddeddate'));
            productFormData.append("variantaddedby", getValues('variantaddedby'));
        }

        if (action === 'Edit') {
            productFormData.append('type', getValues('type'));
            productFormData.append("piecespercase", getValues('piecespercase'));
            productFormData.append("bulkprice", getValues('bulkprice'));
            productFormData.append("mrp", getValues('mrp'));
            productFormData.append("sellingprice", getValues('sellingprice'));
            productFormData.append("purchaseprice", getValues('purchaseprice'));

            if (getValues("type") === "Promotion (Free Products)") {
                productFormData.append("eligibleqty", getValues('eligibleqty'));
                productFormData.append("eligibleqtytype", getValues('eligibleqtytype'));
                productFormData.append("freeqty", getValues('freeqty'));
                productFormData.append("freeqtytype", getValues('freeqtytype'));
                productFormData.append("freeproductname", getValues('freeproductname'));
                productFormData.append("offercaption", getValues('offercaption'));
            }

            if (getValues("type") === "Promotion (Discounts)") {
                productFormData.append("eligibleqty", getValues('eligibleqty'));
                productFormData.append("eligibleqtytype", getValues('eligibleqtytype'));
                productFormData.append("discount", getValues('discount'));
                productFormData.append("freeproductname", getValues('freeproductname'));
                productFormData.append("offercaption", getValues('offercaption'));
            }

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
                action === "Create" && formStep >= 0 &&
                <section className={formStep === 0 ? style.visible : style.hidden}>

                    <StepOne
                        errors={errors}
                        control={control}
                        file={file}
                        completeFormStep={completeFormStep}
                        handleClosePopUp={handleClosePopUp}
                        handleProductChange={handleProductChange}
                        productOptions={productOptions}
                        stepOneResetForm={stepOneResetForm}
                    />

                </section>
            }

            {
                action === "Create" && formStep >= 1 &&
                <section className={formStep === 1 ? style.visible : style.hidden}>

                    <StepTwo
                        control={control}
                        handleClosePopUp={handleClosePopUp}
                        action={action}
                        backFormStep={backFormStep}
                        completeFormStep={completeFormStep}
                        file={file}
                    />

                </section >
            }

            {
                action === "Create" && formStep >= 2 &&
                <section className={formStep === 2 ? style.visible : style.hidden}>

                    <StepThree
                        errors={errors}
                        control={control}
                        completeFormStep={completeFormStep}
                        backFormStep={backFormStep}
                        action={action}
                        handleClosePopUp={handleClosePopUp}
                        employeeOptions={employeeOptions}
                        productVariantOptions={productVariantOptions}
                        stepThreeClearError={stepThreeClearError}
                        watch={watch}

                    />

                </section >
            }

            {
                action === "Create" && formStep >= 3 &&
                <section className={formStep === 3 ? style.visible : style.hidden}>

                    <StepFour
                        control={control}
                        handleClosePopUp={handleClosePopUp}
                        action={action}
                        backFormStep={backFormStep}
                        onSubmit={onSubmit}
                        watch={watch}
                    />

                </section >
            }


            {
                action === "Edit" && formStep >= 0 &&
                <section className={formStep === 0 ? style.visible : style.hidden}>

                    <StepThree
                        errors={errors}
                        control={control}
                        completeFormStep={completeFormStep}
                        backFormStep={backFormStep}
                        action={action}
                        handleClosePopUp={handleClosePopUp}
                        employeeOptions={employeeOptions}
                        productVariantOptions={productVariantOptions}
                        stepThreeClearError={stepThreeClearError}
                        watch={watch}

                    />

                </section >
            }

            {
                action === "Edit" && formStep >= 1 &&
                <section className={formStep === 1 ? style.visible : style.hidden}>

                    <StepFour
                        control={control}
                        handleClosePopUp={handleClosePopUp}
                        action={action}
                        backFormStep={backFormStep}
                        onSubmit={onSubmit}
                        watch={watch}
                    />

                </section >
            }

        </form >

    );
};
