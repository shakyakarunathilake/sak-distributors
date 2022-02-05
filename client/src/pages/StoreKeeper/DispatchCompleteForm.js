import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import formData from 'form-data';

//Material UI 
import {
    Button,
    TextField as MuiTextField
} from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';
import Tooltip from '@mui/material/Tooltip';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import InfoIcon from '@mui/icons-material/Info';

//Shared Components
import TextField from '../../shared/TextField/TextField';

//Style
import style from './DispatchCompleteForm.module.scss';
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createTheme({
    overrides: {
        MuiFormLabel: {
            root: {
                fontSize: '0.8571428571428571rem',
            }
        },
        MuiInputBase: {
            root: {
                fontSize: '0.9em',
                fontFamily: 'Roboto, Poppins, sans-serif',
            }
        },
        MuiFormHelperText: {
            root: {
                fontSize: '0.64em',
                fontFamily: 'Roboto, Poppins, sans-serif',
            }
        },
        MuiOutlinedInput: {
            inputMarginDense: {
                paddingTop: "10px",
                paddingBottom: "10px"
            }
        },
        MuiAutocomplete: {
            inputRoot: {
                '&&[class*="MuiOutlinedInput-root"] $input': {
                    padding: 1
                }
            }
        },
    }
});

export default function DispatchCompleteForm(props) {

    const { handleClosePopUp, action, addOrEdit, GINRecords, inChargeOptions } = props;

    const { formState: { isValid, errors }, getValues, control, handleSubmit, setValue } = useForm({ mode: "all" });

    const handleInChargeChange = (event, option) => {
        if (option) {
            setValue("incharge", option.title);
        }
    }

    const onSubmit = () => {

        const ginFormData = new formData();

        ginFormData.append('ginnumber', GINRecords.ginnumber);
        ginFormData.append('vehicle', getValues('vehicle'));
        ginFormData.append('incharge', getValues('incharge'));
        ginFormData.append('status', action === 'Dispatch' ? 'Dispatched' : 'Complete');

        addOrEdit(ginFormData, GINRecords.ginnumber);

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
                <span className={style.blue}>GIN Number: {GINRecords.ginnumber} </span> <br />
                The above GIN {action === 'Dispatch' ? 'is ready to be dispatched' : 'is completed'}. <br />

                <div className={style.fields}>
                    <ThemeProvider theme={theme}>
                        <Controller
                            render={() => (
                                <Autocomplete
                                    options={inChargeOptions || []}
                                    getOptionLabel={(option) => option.title}
                                    onChange={handleInChargeChange}
                                    renderInput={(params) => (
                                        <MuiTextField
                                            {...params}
                                            helperText={errors.incharge && errors.incharge.message}
                                            error={errors.incharge ? true : false}
                                            variant="outlined"
                                            margin="dense"
                                            placeholder="Ex: Buddhika Bandara (E00006)"
                                            label="In Charge *"
                                        />
                                    )}
                                />
                            )}
                            control={control}
                            name={"incharge"}
                            rules={{
                                required: { value: true, message: "Required *" },
                            }}
                        />
                    </ThemeProvider>

                    <Controller
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth={true}
                                error={errors.vehicle ? true : false}
                                helperText={errors.vehicle && errors.vehicle.message}
                                placeholder="Ex: Van (PND 8430)"
                                margin="dense"
                                label="Vehicle *"
                            />
                        )}
                        control={control}
                        name={"vehicle"}
                        rules={{
                            required: { value: true, message: "Required *" },
                        }}
                    />
                </div>

                Once you approve, changes cannot be undone.
            </div>


            <div className={style.footer}>
                <Tooltip
                    arrow
                    placement="top"
                    title="Please fill the required * fields to proceed"
                >
                    <InfoIcon style={{ fontSize: '1.3em', verticalAlign: 'middle', marginRight: '10px' }} />
                </Tooltip>
                <Button
                    color="primary"
                    variant="contained"
                    disabled={!isValid}
                    onClick={onSubmit}
                >
                    {action === 'Dispatch' ? 'Approve Dispatch' : 'Approve Complete'}
                </Button>
            </div>

        </form >
    )
}
