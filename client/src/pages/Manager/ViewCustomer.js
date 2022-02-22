import React from 'react';
import { useForm } from 'react-hook-form';

//Steps
import StepTwo from './CustomerFormStepTwo';

export default function ViewCustomer(props) {

    const { setOpenPopup, setAction, customerRecords, action } = props;

    const { handleSubmit, control } = useForm({
        defaultValues: {
            customerid: customerRecords.customerid,
            brn: customerRecords.brn,
            storename: customerRecords.storename,
            fullname: customerRecords.fullname,
            title: customerRecords.title,
            firstname: customerRecords.firstname,
            lastname: customerRecords.lastname,
            route: customerRecords.route,
            addeddate: customerRecords.addeddate,
            shippingaddress: customerRecords.shippingaddress,
            billingaddress: customerRecords.billingaddress,
            customercontactnumber: customerRecords.customercontactnumber,
            storecontactnumber: customerRecords.storecontactnumber,
            email: customerRecords.email,
            registeredby: customerRecords.registeredby,
        }
    });

    const onSubmit = () => {
        setOpenPopup(false);
        setAction('');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <StepTwo
                action={action}
                setOpenPopup={setOpenPopup}
                control={control}
                onSubmit={onSubmit}
            />

        </form >

    )
}
