import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

//Form Step
import StepTwo from './GRNStepTwo';

export default function ViewGRNForm(props) {

    const { GRNRecords, handleClosePopUp, action } = props;

    const [data, setData] = useState([]);

    const {
        handleSubmit,
        control,
        getValues,
    } = useForm({
        mode: "all",
        defaultValues: {
            ponumber: GRNRecords.ponumber,
            grnnumber: GRNRecords.grnnumber,
            supplier: GRNRecords.supplier,
            total: GRNRecords.total,
            createdat: GRNRecords.createdat,
            createdby: GRNRecords.createdby,
            givenid: GRNRecords.givenid,
            customername: "S.A.K Distributors",
            customeraddress: "No.233, Kiriwallapitiya, Rambukkana, Srilanka",
            contactnumber: "0352264009",
            status: GRNRecords.status,
            grntotal: GRNRecords.grntotal,
            damagedmissingitems: GRNRecords.damagedmissingitems
        }
    });

    useEffect(() => {
        setData(GRNRecords.items);
    }, [GRNRecords, setData])

    const onSubmit = () => {
        handleClosePopUp()
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
        >

            <StepTwo
                data={data}
                handleClosePopUp={handleClosePopUp}
                control={control}
                getValues={getValues}
                action={action}
            />

        </form >

    )
}
