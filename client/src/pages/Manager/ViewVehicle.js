import React from 'react';
import { useForm } from 'react-hook-form';

//Steps
import StepTwo from './VehicleFormStepTwo';

export default function ViewVehicle(props) {

    const { setOpenPopup, setAction, vehicleRecords, action } = props;

    const { handleSubmit, control, watch } = useForm({
        defaultValues: {
            licenseplatenumber: vehicleRecords.licenseplatenumber,
            vehicle: vehicleRecords.vehicle,
            ownership: vehicleRecords.ownership,
            status: vehicleRecords.status,
            addedby: vehicleRecords.addedby,
            addeddate: vehicleRecords.addeddate,
            vehicleowner: vehicleRecords.vehicleowner,
            address: vehicleRecords.address,
            title: vehicleRecords.title,
            contactperson: vehicleRecords.contactperson,
            contactnumber: vehicleRecords.contactnumber,
            rate: vehicleRecords.rate,
            per: vehicleRecords.per,
        }
    });

    const onSubmit = () => {
        setOpenPopup(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <StepTwo
                watch={watch}
                action={action}
                setOpenPopup={setOpenPopup}
                control={control}
                onSubmit={onSubmit}
            />

        </form >

    )
}
