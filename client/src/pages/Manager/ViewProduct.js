import React from 'react';
import { useForm } from 'react-hook-form';

//Steps 
import StepTwo from './ProductFormStepTwo';

export default function ViewProduct(props) {

    const {
        handleClosePopUp,
        productRecords,
        action,
    } = props;

    const { handleSubmit, control } = useForm({
        mode: "all",
        defaultValues: {
            productid: productRecords.productid,
            name: productRecords.name,
            supplier: productRecords.supplier,
            productimage: productRecords.productimage,
            addeddate: productRecords.addeddate,
            addedby: productRecords.addedby,
            status: productRecords.status,
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
            />

        </form >
    )
}
