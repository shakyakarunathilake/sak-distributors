import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import formData from 'form-data';

//Shared Components
import Select from '../../shared/Select/Select';

//Material UI 
import { Button } from '@material-ui/core';
import Tooltip from '@mui/material/Tooltip';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import InfoIcon from '@mui/icons-material/Info';

//Style
import style from './DispatchCompleteForm.module.scss';

export default function DispatchCompleteForm(props) {

    const {
        handleClosePopUp,
        action,
        addOrEdit,
        GINRecords,
        inChargeOptions,
        vehicleOptions
    } = props;

    const { formState: { isValid, errors }, getValues, control, handleSubmit, trigger } = useForm({
        mode: 'all',
        defaultValues: {
            ginnumber: GINRecords.ginnumber,
            incharge: '',
            vehicle: ''
        }
    });

    const onSubmit = () => {

        if (isValid) {
            
            const ginFormData = new formData();

            if (action === 'Dispatch') {
                ginFormData.append('vehicle', getValues('vehicle'));
                ginFormData.append('incharge', getValues('incharge'));
                ginFormData.append('status', 'Dispatched');
            }

            if (action === 'Complete') {
                ginFormData.append('status', 'Complete');
            }

            addOrEdit(ginFormData, getValues('ginnumber'));

        } else {
            trigger();
        }
    }

    return (
        <form
            className={style.container}
            onSubmit={handleSubmit(onSubmit)}
        >

            <div className={style.header}>

                <div>
                    Confirm GIN Status
                </div>

                <div>
                    <HighlightOffIcon
                        className={style.icon}
                        onClick={() => { handleClosePopUp() }}
                    />
                </div>

            </div>

            <div className={style.body}>

                <span className={style.blue}>GIN Number: {getValues('ginnumber')} </span> <br />

                The above GIN {action === 'Dispatch' ? 'is ready to be dispatched' : 'is completed'}. <br />

                {
                    action === 'Dispatch' &&

                    <div className={style.fields}>

                        <Controller
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    fullWidth={true}
                                    options={inChargeOptions || []}
                                    helperText={errors.incharge && errors.incharge.message}
                                    error={errors.incharge ? true : false}
                                    size="small"
                                    label="In Charge *"

                                />
                            )}
                            name={"incharge"}
                            control={control}
                            rules={{
                                required: { value: true, message: "Required *" },
                            }}
                        />

                        <Controller
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    fullWidth={true}
                                    options={vehicleOptions || []}
                                    helperText={errors.vehicle && errors.vehicle.message}
                                    error={errors.vehicle ? true : false}
                                    size="small"
                                    label="Vehicle *"

                                />
                            )}
                            name={"vehicle"}
                            control={control}
                            rules={{
                                required: { value: true, message: "Required *" },
                            }}
                        />

                    </div>

                }

                Once you approve, changes cannot be undone.

            </div>


            <div className={style.footer}>

                {
                    action === 'Dispatch' &&
                    < Tooltip
                        arrow
                        placement="top"
                        title="Please fill the required * fields to proceed"
                    >
                        <InfoIcon style={{ fontSize: '1.3em', verticalAlign: 'middle', marginRight: '10px' }} />
                    </Tooltip>
                }

                <Button
                    color="primary"
                    variant="contained"
                    onClick={onSubmit}
                >
                    {action === 'Dispatch' && 'Approve Dispatch'}
                    {action === 'Complete' && 'Approve Complete'}
                </Button>

            </div>

        </form >
    )
}
