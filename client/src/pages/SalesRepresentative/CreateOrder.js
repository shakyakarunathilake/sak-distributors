import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import formData from 'form-data';

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

//Styles
import style from './CreateOrder.module.scss';
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

//Form Steps
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';

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

export default function CreateOrder(props) {

    const { addOrEdit, handleClosePopUp, action, customerOptions, productOptions, orderRecords, nextOrderNo } = props;

    const { formState: { isValid, errors }, control, watch, setValue, getValues, reset, clearErrors, trigger, handleSubmit } = useForm({ mode: "all" });

    const [data, setData] = useState([]);
    const [total, setTotal] = useState();
    const [formStep, setFormStep] = useState(0);
    const [customerType, setCustomerType] = useState('');

    const today = new Date();
    const dateTime = today.getFullYear() + '-' + (today.getMonth() > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`) + '-' + (today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`) + 'T' + (today.getHours() > 9 ? today.getHours() : `0${today.getHours()}`) + ':' + (today.getMinutes() > 9 ? today.getMinutes() : `0${today.getMinutes()}`);

    today.setDate(today.getDate() + 3);
    const deliveryDate = today.getFullYear() + '-' + (today.getMonth() > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`) + '-' + (today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`);

    useEffect(() => {

        if (orderRecords !== null) {
            // setCustomerType(orderRecords.customerid ? 'Registered Customer' : 'Unregistered Customer');
            setValue("customertype", orderRecords.customerid ? 'Registered Customer' : 'Unregistered Customer');
            setValue("orderno", orderRecords.orderno);
            setValue("orderplacedat", orderRecords.orderplacedat);
            setValue("deliverydate", orderRecords.deliverydate);
            setValue("ordercreatedby", orderRecords.ordercreatedby);
            setValue("storename", orderRecords.storename);
            setValue("customerid", orderRecords.customerid);
            setValue("shippingaddress", orderRecords.shippingaddress);
            setValue("contactnumber", orderRecords.contactnumber);
            setValue("route", orderRecords.route);
        }
        // else {
        // setValue("customertype", '');
        // setValue("orderno", `${JSON.parse(sessionStorage.getItem("Auth")).employeeid}${nextOrderNo}`);
        // setValue("orderplacedat", dateTime);
        // setValue("deliverydate", deliveryDate);
        // setValue("ordercreatedby", `${JSON.parse(sessionStorage.getItem("Auth")).firstname} ${JSON.parse(sessionStorage.getItem("Auth")).lastname} (${JSON.parse(sessionStorage.getItem("Auth")).employeeid})`);
        // setValue("customer", '');
        // setValue("storename", '');
        // setValue("customerid", '');
        // setValue("shippingaddress", '');
        // setValue("contactnumber", '');
        // setValue("route", '');
        // }

    }, [setValue, nextOrderNo, orderRecords, deliveryDate, dateTime])

    const customerTypeWatch = watch('customertype');

    useEffect(() => {
        setCustomerType(customerTypeWatch);
    }, [customerTypeWatch, setValue])

    const handleCustomerChange = (event, option) => {
        if (option) {
            setValue("customer", option.title);
            setValue("customerid", option.id);
            setValue("storename", option.storename);
            setValue("shippingaddress", option.shippingaddress);
            setValue("route", option.route);
            setValue("contactnumber", option.contactnumber);
            clearErrors();
        }
    }

    const completeFormStep = () => {
        setFormStep(x => x + 1);

        console.log('FORM STEP: ', formStep);
        console.log('FORM DATA: ', getValues());
    }

    const backFormStep = () => {
        setFormStep(x => x - 1);

        console.log('FORM STEP: ', formStep);
        console.log('FORM DATA: ', getValues());
    }

    const handleFormValidation = () => {

        trigger();

        if (isValid) {
            completeFormStep();
        }
    }

    const getTotal = () => {
        let total = 0;
        for (let i = 0; i < data.length; i++) {
            total = total + parseInt(data[i].grossamount);
        }

        setTotal(total.toFixed(2))
        return total.toFixed(2);
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
    }

    const onSubmit = () => {

        const customerOrderFormData = new formData();

        customerOrderFormData.append('contactnumber', getValues('contactnumber'));
        customerOrderFormData.append('customertype', getValues('customertype'));
        customerOrderFormData.append('customerid', getValues('customerid'));
        customerOrderFormData.append('storename', getValues('storename'));
        customerOrderFormData.append('deliverydate', getValues('deliverydate'));
        customerOrderFormData.append('orderno', getValues('orderno'));
        customerOrderFormData.append('orderplacedat', getValues('orderplacedat'));
        customerOrderFormData.append('route', getValues('route'));
        customerOrderFormData.append('ordercreatedby', getValues('ordercreatedby'));
        customerOrderFormData.append('shippingaddress', getValues('shippingaddress'));
        customerOrderFormData.append('items', JSON.stringify(data));
        customerOrderFormData.append('total', total);

        addOrEdit(customerOrderFormData, getValues('orderno'));
    }

    return (

        <form
            className={style.form}
            onSubmit={handleSubmit(onSubmit)}
        >

            {
                formStep >= 0 &&
                <section className={formStep === 0 ? style.one : style.hidden}>

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
                            Step 1 of 4
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
                                disabled={data.length != 0}
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


                </section>
            }

            {
                formStep >= 1 &&
                <section className={formStep === 1 ? style.visible : style.hidden}>
                    <StepTwo
                        customerType={customerType}
                        control={control}
                        handleClosePopUp={handleClosePopUp}
                        backFormStep={backFormStep}
                        completeFormStep={completeFormStep}
                        action={action}
                        getValues={getValues}
                        formStep={formStep}
                    />
                </section>
            }

            {
                formStep >= 2 &&
                <section className={formStep === 2 ? style.visible : style.hidden}>
                    <StepThree
                        data={data}
                        orderRecords={orderRecords}
                        setData={setData}
                        handleClosePopUp={handleClosePopUp}
                        productOptions={productOptions}
                        completeFormStep={completeFormStep}
                        setTotal={setTotal}
                        action={action}
                        formStep={formStep}
                        backFormStep={backFormStep}
                        getTotal={getTotal}
                    />
                </section>
            }

            {
                formStep >= 3 &&
                <section className={formStep === 3 ? style.visible : style.hidden}>
                    <StepFour
                        data={data}
                        handleClosePopUp={handleClosePopUp}
                        backFormStep={backFormStep}
                        onSubmit={onSubmit}
                        total={total}
                        action={action}
                        formStep={formStep}
                    />
                </section>
            }

        </form >

    )
}
