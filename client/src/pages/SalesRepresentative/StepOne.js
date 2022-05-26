import React from 'react';
import { Controller } from 'react-hook-form';

//Material UI Components
import { Button } from '@material-ui/core';
import { TextField as MuiTextField } from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//Development Stage
import * as employeeservice from "../../services/employeeService";

//Shared Components
import TextField from '../../shared/TextField/TextField';
import Select from '../../shared/Select/Select';
import DatePicker from '../../shared/DatePicker/DatePicker';

//Style
import style from './StepOne.module.scss';
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createTheme({
    overrides: {
        MuiFormLabel: {
            root: {
                fontSize: '0.9em',
                fontFamily: 'Roboto, Poppins, sans-serif',
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

export default function StepOne(props) {

    const {
        resetForm,
        errors,
        isValid,
        control,
        trigger,
        watch,
        customerOptions,
        handleClosePopUp,
        completeFormStep,
        handleCustomerChange,
        action,
        routeOptions
    } = props;

    const handleFormValidation = () => {
        trigger();

        if (isValid) {
            completeFormStep();
        }
    }

    return (
        <div className={style.one}>

            <div className={style.header}>

                <div className={style.title}>
                    <div>
                        Customer and Order Details
                    </div>
                    <div>
                        <HighlightOffIcon
                            className={style.icon}
                            onClick={handleClosePopUp}
                        />
                    </div>
                </div>

                <div className={style.step}>
                    Step 1 of 5
                </div>

            </div>

            <div className={style.body}>

                <div className={style.row}>

                    <div className={style.label}>
                        Order No. <span className={style.redFont}>*</span>
                    </div>

                    <div className={style.textfield}>
                        <Controller
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth={true}
                                    error={errors.orderno ? true : false}
                                    helperText={errors.orderno && errors.orderno.message}
                                    placeholder="Ex: E0000620220522001"
                                    margin="dense"
                                />
                            )}
                            control={control}
                            name={"orderno"}
                            rules={{
                                required: { value: true, message: "Required *" }
                            }}
                        />
                    </div>

                </div>

                <div className={style.row}>

                    <div className={style.label}>
                        Order placed at <span className={style.redFont}>*</span>
                    </div>

                    <div className={style.textfield}>
                        <Controller
                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    error={errors.orderplacedat ? true : false}
                                    helperText={errors.orderplacedat && errors.orderplacedat.message}
                                    margin="dense"
                                    type="datetime-local"
                                />
                            )}
                            control={control}
                            name={"orderplacedat"}
                            rules={{
                                required: { value: true, message: "Required *" }
                            }}
                        />
                    </div>

                </div>

                <div className={style.row}>

                    <div className={style.label}>
                        Delivery Date <span className={style.redFont}>*</span>
                    </div>

                    <div className={style.textfield}>
                        <Controller
                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    error={errors.deliverydate ? true : false}
                                    helperText={errors.deliverydate && errors.deliverydate.message}
                                    margin="dense"
                                />
                            )}
                            control={control}
                            name={"deliverydate"}
                            rules={{
                                required: { value: true, message: "Required *" }
                            }}
                        />
                    </div>

                </div>

                <div className={style.row}>

                    <div className={style.label}>
                        Sales Representative <span className={style.redFont}>*</span>
                    </div>

                    <div className={style.textfield}>
                        <Controller
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth={true}
                                    helperText={errors.ordercreatedby && errors.ordercreatedby.message}
                                    error={errors.ordercreatedby ? true : false}
                                    placeholder="Ex: Buddhika Bandara (E00006)"
                                    margin="dense"
                                />
                            )}
                            control={control}
                            name={"ordercreatedby"}
                            rules={{
                                required: true, message: "Required *"
                            }}
                        />
                    </div>
                </div>


                <div className={style.row}>

                    <div className={style.label}>
                        Customer Type <span className={style.redFont}>*</span>
                    </div>

                    <div className={style.textfield}>
                        <Controller
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={employeeservice.getCustomerTypeOptions()}
                                    helperText={errors.customertype && errors.customertype.message}
                                    error={errors.customertype ? true : false}
                                    size="small"
                                />
                            )}
                            control={control}
                            name={"customertype"}
                            rules={{
                                required: { value: true, message: "Required *" }
                            }}
                        />
                    </div>

                </div>

                <div className={style.row}>

                    <div className={style.label}>
                        Store Name <span className={style.redFont}>*</span>
                    </div>

                    <div className={style.textfield}>

                        {
                            watch('customertype') === "Registered Customer" &&
                            <ThemeProvider theme={theme}>
                                <Controller
                                    render={({ field }) => (
                                        <Autocomplete
                                            {...field}
                                            fullWidth
                                            options={customerOptions}
                                            getOptionLabel={(option) => option.title}
                                            isOptionEqualToValue={(option, value) => option.title === value.title}
                                            renderInput={(params) => (
                                                <MuiTextField
                                                    {...params}
                                                    error={errors.customer ? true : false}
                                                    helperText={errors.customer && errors.customer.message}
                                                    placeholder="Ex: Mini Co-op City (C00001)"
                                                    variant="outlined"
                                                    margin="dense"
                                                />
                                            )}
                                            onChange={(e, option) => {
                                                handleCustomerChange(e, option)
                                                field.onChange(option)
                                            }}
                                        />
                                    )}
                                    name={"customer"}
                                    control={control}
                                    rules={{
                                        required: { value: true, message: "Required *" }
                                    }}
                                />
                            </ThemeProvider>
                        }

                        {
                            watch('customertype') === "Unregistered Customer" &&
                            <Controller
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth={true}
                                        error={errors.storename ? true : false}
                                        helperText={errors.storename && errors.storename.message}
                                        placeholder="Ex: Mini Co-op City"
                                        margin="dense"
                                    />
                                )}
                                control={control}
                                name={"storename"}
                                defaultValue={''}
                                rules={{ required: { value: true, message: "Required *" } }}
                            />

                        }

                    </div>

                </div>

                <div className={style.row}>

                    <div className={style.label}>
                        Shipping  Address <span className={style.redFont}>*</span>
                    </div>

                    <div className={style.textfield}>
                        <Controller
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth={true}
                                    error={errors.shippingaddress ? true : false}
                                    helperText={errors.shippingaddress && errors.shippingaddress.message}
                                    placeholder="Ex: 8CG3+XJF, Rambukkana"
                                    margin="dense"
                                />
                            )}
                            control={control}
                            name={"shippingaddress"}
                            rules={{ required: { value: true, message: "Required *" } }}
                        />
                    </div>

                </div>

                <div className={style.row}>

                    <div className={style.label}>
                        Contact No. <span className={style.redFont}>*</span>
                    </div>

                    <div className={style.textfield}>
                        <Controller
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth={true}
                                    helperText={errors.contactnumber && errors.contactnumber.message}
                                    error={errors.contactnumber ? true : false}
                                    placeholder="Ex: 0763156983"
                                    margin="dense"
                                />
                            )}
                            control={control}
                            name={"contactnumber"}
                            rules={{
                                required: { value: true, message: "Required *" },
                                pattern: { value: /^[0-9]{10}$/, message: "Invalid" }
                            }}
                        />
                    </div>

                </div>

                <div className={style.row}>

                    <div className={style.label}>
                        Route <span className={style.redFont}>*</span>
                    </div>

                    <div className={style.textfield}>
                        <Controller
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={routeOptions}
                                    helperText={errors.route && errors.route.message}
                                    error={errors.route ? true : false}
                                    size="small"
                                />
                            )}
                            control={control}
                            name={"route"}
                            rules={{
                                required: { value: true, message: "Required *" }
                            }}
                        />
                    </div>

                </div>

            </div>


            <div className={style.footer}>

                <div className={style.resetBtn}>
                    {
                        action === "Create" &&
                        <Button
                            onClick={resetForm}
                            variant="contained"
                        >
                            Reset
                        </Button>
                    }
                </div>

                <div className={style.nextBtn}>
                    <Button
                        onClick={handleFormValidation}
                        variant="contained"
                    >
                        Next
                    </Button>
                </div>

            </div>

        </div>
    )
}
