import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

//Form Step
import GINStepTwo from './GINStepTwo';

export default function ViewGIN(props) {

    const { action, GINRecords, handleClosePopUp } = props;

    const { control, getValues, setValue, handleSubmit } = useForm();

    const [data, setData] = useState([]);
    const [orderNumbers, setOrderNumbers] = useState([]);

    useEffect(() => {
        if (GINRecords != null) {
            setValue('ginnumber', GINRecords.ginnumber);
            setValue('createdat', GINRecords.createdat);
            setValue('createdby', GINRecords.createdby);
            setValue('route', GINRecords.route);
            setValue('incharge', GINRecords.incharge);
            setValue('vehicle', GINRecords.vehicle);
            setValue('total', GINRecords.total);
            setData([...GINRecords.items]);
            setOrderNumbers([...GINRecords.ordernumbers]);
        }
    }, [setValue, setData, setOrderNumbers, GINRecords])

    const onSubmit = () => {
        handleClosePopUp()
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
        >

            <GINStepTwo
                onSubmit={onSubmit}
                data={data}
                action={action}
                handleClosePopUp={handleClosePopUp}
                orderNumbers={orderNumbers}
                control={control}
                getValues={getValues}
            />

        </form>
    )
}
