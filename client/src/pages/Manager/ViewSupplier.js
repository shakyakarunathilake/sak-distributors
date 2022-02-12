import React from 'react';
import { useForm } from 'react-hook-form';

//Steps
import StepTwo from './SupplierFormStepTwo';

export default function ViewSupplier(props) {

    const { setOpenPopup, setAction, supplierRecords, action } = props;

    const { handleSubmit, control } = useForm({
        mode: "all",
        defaultValues: {
            supplierid: supplierRecords.supplierid,
            name: supplierRecords.name,
            abbreviation: supplierRecords.abbreviation,
            address: supplierRecords.address,
            title: supplierRecords.title,
            contactperson: supplierRecords.contactperson,
            addedby: supplierRecords.addedby,
            addeddate: supplierRecords.addeddate,
            contactnumber: supplierRecords.contactnumber,
            email: supplierRecords.email,

        }
    });

    const onSubmit = () => {
        setOpenPopup(false);
        setAction('');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <StepTwo
                control={control}
                onSubmit={onSubmit}
                action={action}
                setOpenPopup={setOpenPopup}
            />

        </form >
    )
}
