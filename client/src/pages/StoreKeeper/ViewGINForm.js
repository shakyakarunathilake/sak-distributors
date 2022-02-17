import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

//Form Step
import GINStepTwo from './GINStepTwo';

export default function ViewGIN(props) {

    const { action, GINRecords, handleClosePopUp } = props;

    const [data, setData] = useState([]);
    const [orderNumbers, setOrderNumbers] = useState([]);

    const { control, getValues, handleSubmit } = useForm({
        mode: "onChange",
        defaultValues: {
            ginnumber: GINRecords.ginnumber,
            createdat: GINRecords.createdat,
            createdby: GINRecords.createdby,
            route: GINRecords.route,
            total: GINRecords.total,
            vehicle: GINRecords.vehicle ? GINRecords.vehicle : '',
            incharge: GINRecords.incharge ? GINRecords.incharge : '',
        }
    });

    useEffect(() => {
        if (GINRecords != null) {
            setData([...GINRecords.items]);
            setOrderNumbers([...GINRecords.ordernumbers]);
        }
    }, [setData, setOrderNumbers, GINRecords])

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
                handleClosePopUp={handleClosePopUp}
                orderNumbers={orderNumbers}
                control={control}
                getValues={getValues}
                action={action}
            />

        </form>
    )
}
