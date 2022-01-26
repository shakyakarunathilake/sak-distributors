import React, { useEffect } from 'react';
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
        data,
        watch,
        reset,
        errors,
        isValid,
        control,
        trigger,
        setValue,
        clearErrors,
        nextOrderNo,
        customerType,
        setCustomerType,
        customerOptions,
        handleClosePopUp,
        completeFormStep
    } = props;

    const today = new Date();
    const dateTime = today.getFullYear() + '-' + (today.getMonth() > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`) + '-' + (today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`) + 'T' + (today.getHours() > 9 ? today.getHours() : `0${today.getHours()}`) + ':' + (today.getMinutes() > 9 ? today.getMinutes() : `0${today.getMinutes()}`);

    today.setDate(today.getDate() + 3);
    const deliveryDate = today.getFullYear() + '-' + (today.getMonth() > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`) + '-' + (today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`);

    const customerTypeWatch = watch('customertype');

    useEffect(() => {
        setCustomerType(customerTypeWatch);
    }, [customerTypeWatch, setCustomerType, setValue])

    const handleCustomerChange = (event, option) => {
        if (option) {
            setValue("customer", option.title);
            setValue("customerid", option.id);
            setValue("storename", option.storename);
            setValue("shippingaddress", option.shippingaddress);
            setValue("route", option.route);
            setValue("contactnumber", option.contactnumber);
            setValue("creditamounttosettle", option.creditamounttosettle);
            setValue("loyaltypoints", option.loyaltypoints);
            setValue("eligibilityforcredit", option.eligibilityforcredit);
            setValue("maximumcreditamount", option.maximumcreditamount);
            clearErrors();
        }
    }

    const handleReset = () => {
        reset({
            orderno: `${JSON.parse(sessionStorage.getItem("Auth")).employeeid}${nextOrderNo}`,
            orderplacedat: dateTime,
            deliverydate: deliveryDate,
            ordercreatedby: `${JSON.parse(sessionStorage.getItem("Auth")).firstname} ${JSON.parse(sessionStorage.getItem("Auth")).lastname} (${JSON.parse(sessionStorage.getItem("Auth")).employeeid})`,
            customertype: '',
            customer: '',
            storename: '',
            customerid: '',
            shippingaddress: '',
            contactnumber: '',
            route: '',
        });
        setCustomerType('');
    }

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
                                    placeholder="Ex: ON00006211126001"
                                    margin="dense"
                                />
                            )}
                            control={control}
                            name={"orderno"}
                            defaultValue={`${JSON.parse(sessionStorage.getItem("Auth")).employeeid}${nextOrderNo}`}
                            rules={{ required: { value: true, message: "Required *" } }}
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
                            defaultValue={dateTime}
                            name={"orderplacedat"}
                            rules={{ required: { value: true, message: "Required *" } }}
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
                            defaultValue={deliveryDate}
                            rules={{ required: { value: true, message: "Required *" } }}

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
                                    error={errors.ordercreatedby ? true : false}
                                    helperText={errors.ordercreatedby && errors.ordercreatedby.message}
                                    placeholder="Ex: Buddhika Bandara (E00006)"
                                    margin="dense"
                                />
                            )}
                            control={control}
                            name={"ordercreatedby"}
                            defaultValue={`${JSON.parse(sessionStorage.getItem("Auth")).firstname} ${JSON.parse(sessionStorage.getItem("Auth")).lastname} (${JSON.parse(sessionStorage.getItem("Auth")).employeeid})`}
                            rules={{ required: true, message: "Required *" }}
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
                                    error={errors.customertype ? true : false}
                                    helperText={errors.customertype && errors.customertype.message}
                                    size="small"
                                />
                            )}
                            control={control}
                            name={"customertype"}
                            defaultValue={''}
                            rules={{ required: { value: true, message: "Required *" } }}
                        />
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.label}>
                        Store Name <span className={style.redFont}>*</span>
                    </div>
                    <div className={style.textfield}>
                        {customerType === "Registered Customer" ?
                            <ThemeProvider theme={theme}>
                                <Controller
                                    render={({ field }) => (
                                        <Autocomplete
                                            options={customerOptions || []}
                                            fullWidth
                                            getOptionLabel={(option) => option.title}
                                            onChange={handleCustomerChange}
                                            renderInput={(params) => (
                                                <MuiTextField
                                                    {...params}
                                                    helperText={errors.customer && errors.customer.message}
                                                    error={errors.customer ? true : false}
                                                    variant="outlined"
                                                    margin="dense"
                                                    placeholder="Ex: Mini Co-op City (C00001)"
                                                />
                                            )}
                                        />
                                    )}
                                    control={control}
                                    name={"customer"}
                                    defaultValue={''}
                                    rules={{
                                        required: { value: true, message: "Required *" }
                                    }}
                                />
                            </ThemeProvider>
                            :
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
                            defaultValue={''}
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
                                    error={errors.contactnumber ? true : false}
                                    helperText={errors.contactnumber && errors.contactnumber.message}
                                    placeholder="Ex: 0763156983"
                                    margin="dense"
                                />
                            )}
                            control={control}
                            name={"contactnumber"}
                            defaultValue={''}
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
                                    options={employeeservice.getRouteOptions()}
                                    error={errors.route ? true : false}
                                    helperText={errors.route && errors.route.message}
                                    size="small"
                                />
                            )}
                            control={control}
                            name={"route"}
                            defaultValue={''}
                            rules={{ required: { value: true, message: "Required *" } }}
                        />
                    </div>
                </div>

            </div>

            <div className={style.footer}>

                <div className={style.resetBtn}>
                    <Button
                        disabled={data.length !== 0}
                        variant="contained"
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                </div>

                <div className={style.nextBtn}>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleFormValidation}
                    >
                        Next
                    </Button>
                </div>

            </div>

        </div>
    )
}
