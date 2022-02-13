import React from 'react';
import { useForm } from 'react-hook-form';

//Steps 
import StepTwo from './VariantFormStepTwo';

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

    const onSubmit = () => {
        handleClosePopUp();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <StepTwo
                action={action}
                handleClosePopUp={handleClosePopUp}
                control={control}
                onSubmit={onSubmit}
                watch={watch}
            />

        </form >
    )
}
