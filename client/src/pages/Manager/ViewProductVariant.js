import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

//Steps 
import StepTwo from './VariantFormStepTwo';
import StepFour from './VariantFormStepFour';

//Styles
import style from './VariantForm.module.scss';

export default function ViewProductVariant(props) {

    const { handleClosePopUp, action, productRecords } = props;

    const { handleSubmit, control, watch } = useForm({
        defaultValues: {
            productid: productRecords.productid,
            name: productRecords.name,
            supplier: productRecords.supplier,
            productimage: productRecords.productimage,
            addeddate: productRecords.addeddate,
            addedby: productRecords.addedby,
            productstatus: productRecords.status,
            variantid: productRecords.variant.variantid,
            type: productRecords.variant.type,
            piecespercase: productRecords.variant.piecespercase,
            bulkprice: productRecords.variant.bulkprice,
            mrp: productRecords.variant.mrp,
            sellingprice: productRecords.variant.sellingprice,
            purchaseprice: productRecords.variant.purchaseprice,
            offercaption: productRecords.variant.offercaption,
            variantstatus: productRecords.variant.status,
            variantaddeddate: productRecords.variant.addeddate,
            variantaddedby: productRecords.variant.addedby,
        }
    });

    const [formStep, setFormStep] = useState(0);

    const completeFormStep = () => {
        setFormStep(x => x + 1);
    }

    const backFormStep = () => {
        setFormStep(x => x - 1);
    }

    const onSubmit = () => {
        handleClosePopUp();
    };

    return (
        <form
            className={style.container}
            onSubmit={handleSubmit(onSubmit)}
        >


            {
                formStep >= 0 &&
                <section className={formStep === 0 ? style.visible : style.hidden}>

                    <StepTwo
                        control={control}
                        handleClosePopUp={handleClosePopUp}
                        action={action}
                        backFormStep={backFormStep}
                        completeFormStep={completeFormStep}
                    />

                </section >
            }

            {
                formStep >= 1 &&
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
    )
}
