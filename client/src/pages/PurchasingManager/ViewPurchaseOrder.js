import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

//Form Step
import StepTwo from './PurchaseOrderStepTwo';

export default function ViewPurchaseOrder(props) {

    const { handleClosePopUp, poRecords, action } = props;

    const [data, setData] = useState([]);

    useEffect(() => {
        if (poRecords !== null) {
            setData([...poRecords.items])
        }
    }, [poRecords]);

    const {
        handleSubmit,
        getValues,
        control,
    } = useForm({
        defaultValues: {
            ponumber: poRecords.ponumber,
            supplier: poRecords.supplier,
            grosstotal: poRecords.grosstotal,
            receiveddiscounts: parseInt(poRecords.receiveddiscounts).toFixed(2),
            damagedmissingitems: parseInt(poRecords.damagedmissingitems).toFixed(2),
            total: poRecords.total,
            givenid: poRecords.givenid,
            customername: poRecords.customername,
            customeraddress: poRecords.customeraddress,
            contactnumber: poRecords.contactnumber,
            status: poRecords.status,
            createdby: poRecords.createdby,
            createdat: poRecords.createdat,
            approvedby: poRecords.approvedby,
            approvedat: poRecords.approvedat,
            deliveredat: poRecords.deliveredat,
        }
    });

    const designation = JSON.parse(sessionStorage.getItem("Auth")).designation;

    const onSubmit = () => {
        handleClosePopUp()
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            <StepTwo
                data={data}
                action={action}
                handleClosePopUp={handleClosePopUp}
                designation={designation}
                control={control}
                getValues={getValues}
            />

        </form >
    )
}
