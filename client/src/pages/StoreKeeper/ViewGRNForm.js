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
            pototal: GRNRecords.pototal,
            status: GRNRecords.status,
            givenid: GRNRecords.givenid,
            createdat: GRNRecords.createdat,
            createdby: GRNRecords.createdby,
            damagedmissingitems: GRNRecords.damagedmissingitems,
            previousdamagedmissingitems: GRNRecords.previousdamagedmissingitems,
            grntotal: GRNRecords.grntotal,
            customername: "S.A.K Distributors",
            customeraddress: "No.233, Kiriwallapitiya, Rambukkana, Srilanka",
            contactnumber: "0352264009",
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
