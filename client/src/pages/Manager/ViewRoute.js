import React from 'react';
import { useForm } from 'react-hook-form';

//Steps
import StepTwo from './RouteFormStepTwo';

export default function ViewRoute(props) {

    const { handleClosePopUp, routeRecords, action } = props;

    const { handleSubmit, control } = useForm({
        mode: "all",
        defaultValues: {
            routeid: routeRecords.routeid,
            from: routeRecords.from,
            to: routeRecords.to,
            title: routeRecords.title,
            status: routeRecords.status,
            addedby: routeRecords.addedby,
            addeddate: routeRecords.addeddate
        }
    });

    const onSubmit = () => {
        handleClosePopUp(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <StepTwo
                control={control}
                onSubmit={onSubmit}
                action={action}
                handleClosePopUp={handleClosePopUp}
            />

        </form >
    )
}
