import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

import { useForm, Controller } from 'react-hook-form';
import formData from 'form-data';

//Development Stage
import * as employeeservice from "../../services/employeeService";

//Shared Components
import TextField from '../../shared/TextField/TextField';
import Select from '../../shared/Select/Select';
import DatePicker from '../../shared/DatePicker/DatePicker';

//Material UI Components
import Button from '@material-ui/core/Button';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//SCSS Styles
import style from './CustomerForm.module.scss';

export default function CustomerForm(props) {

    const { setOpenPopup, addOrEdit, customerRecords, nextCusId } = props;

    const { handleSubmit, formState: { errors }, control, reset, setValue, getValues } = useForm();

    useEffect(() => {
        if (customerRecords != null) {

            setValue("customerid", customerRecords.customerid);
            setValue("brn", customerRecords.brn);
            setValue("storename", customerRecords.storename);
            setValue("fullname", customerRecords.fullname);
            setValue("title", customerRecords.title);
            setValue("firstname", customerRecords.firstname);
            setValue("lastname", customerRecords.lastname);
            setValue("route", customerRecords.route);
            setValue("addeddate", customerRecords.addeddate);
            setValue("shippingaddress", customerRecords.shippingaddress);
            setValue("billingaddress", customerRecords.billingaddress);
            setValue("customercontactnumber", customerRecords.customercontactnumber);
            setValue("storecontactnumber", customerRecords.storecontactnumber);
            setValue("email", customerRecords.email);

        } else {
            setValue("customerid", nextCusId);
        };
    }, [customerRecords, nextCusId])

    const resetForm = () => {
        reset({
            customerid: getValues("customerid"),
            brn: '',
            storename: '',
            fullname: '',
            title: '',
            firstname: '',
            lastname: '',
            route: '',
            addeddate: '',
            shippingaddress: '',
            billingaddress: '',
            customercontactnumber: '',
            storecontactnumber: '',
            email: '',
        });
    }

    const onSubmit = (values) => {

        const customerFormData = new formData();

        customerFormData.append('customerid', values.customerid);
        customerFormData.append("brn", values.brn);
        customerFormData.append('storename', values.storename);
        customerFormData.append('fullname', values.fullname);
        customerFormData.append('title', values.title);
        customerFormData.append('firstname', values.firstname);
        customerFormData.append('lastname', values.lastname);
        customerFormData.append("route", values.route);
        customerFormData.append('addeddate', values.addeddate);
        customerFormData.append('email', values.email);
        customerFormData.append("shippingaddress", values.shippingaddress);
        customerFormData.append("billingaddress", values.billingaddress);
        customerFormData.append("customercontactnumber", values.customercontactnumber);
        customerFormData.append("storecontactnumber", values.storecontactnumber);

        addOrEdit(customerFormData, getValues("customerid"));
    };

    return (
        <div className={style.container}>

            <div className={style.header}>
                <div>{customerRecords ? "Edit Customer" : "Add New Customer"}</div>
                <div>
                    <HighlightOffIcon
                        className={style.icon}
                        onClick={() => { setOpenPopup(false) }}
                    />
                </div>
            </div>

            <div className={style.body}>
                <form
                    className={style.form}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className={classnames(style.row, style.redFont)}>
                        The fields with "*" are required
                    </div>
                    <div className={classnames(style.row, style.threecolumns)}>
                        <Controller
                            name={"customerid"}
                            control={control}
                            defaultValue=""
                            rules={{ required: true }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    label="Customer ID *"
                                    value={value}
                                    onChange={onChange}
                                    placeholder="Ex: C000234"
                                    disabled={true}
                                />
                            )}
                        />
                        <Controller
                            name={"brn"}
                            control={control}
                            defaultValue=""
                            rules={{ required: { value: true, message: "BRN is required" } }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    label="BRN *"
                                    value={value}
                                    onChange={onChange}
                                    placeholder="Ex: 3069002"
                                    error={errors.brn ? true : false}
                                    helperText={errors.brn && errors.brn.message}
                                />
                            )}
                        />
                        <Controller
                            name={"storename"}
                            control={control}
                            defaultValue=""
                            rules={{ required: { value: true, message: "Store name is required" } }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    label="Name of the Store *"
                                    value={value}
                                    onChange={onChange}
                                    placeholder="Ex: Champika Super Center & Pharmacy"
                                    error={errors.storename ? true : false}
                                    helperText={errors.storename && errors.storename.message}
                                />
                            )}
                        />

                    </div>
                    <div className={classnames(style.row, style.twocolumns)}>
                        <Controller
                            name={"route"}
                            control={control}
                            defaultValue=""
                            rules={{ required: { value: true, message: "Route is required" } }}
                            render={({ field: { onChange, value } }) => (
                                <Select
                                    label="Route *"
                                    value={value}
                                    onChange={onChange}
                                    options={employeeservice.getRouteOptions()}
                                    error={errors.route ? true : false}
                                    helperText={errors.route && errors.route.message}
                                />
                            )}
                        />
                        <Controller
                            name={"addeddate"}
                            control={control}
                            defaultValue=""
                            rules={{ required: { value: true, message: "Adding date is required" } }}
                            render={({ field: { onChange, value } }) => (
                                <DatePicker
                                    label="Adding Date *"
                                    value={value}
                                    onChange={onChange}
                                    error={errors.addeddate ? true : false}
                                    helperText={errors.addeddate && errors.addeddate.message}
                                />
                            )}
                        />

                    </div>
                    <div className={style.row}>
                        <Controller
                            defaultValue=''
                            name={"fullname"}
                            control={control}
                            rules={{
                                required: { value: true, message: "Full name is required" },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    className={style.field}
                                    helperText={errors.fullname && errors.fullname.message}
                                    placeholder="Ex: Adikari Deepal Lasitha Abeynayaka"
                                    error={errors.fullname ? true : false}
                                    onChange={onChange}
                                    value={value}
                                    label="Full Name *"
                                />
                            )}
                        />
                    </div>
                    <div className={style.gridrow}>
                        <div>
                            <Controller
                                name={"title"}
                                control={control}
                                defaultValue=""
                                rules={{ required: { value: true, message: "Title is required" } }}
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        label="Title *"
                                        value={value}
                                        onChange={onChange}
                                        options={employeeservice.getTitleOptions()}
                                        error={errors.title ? true : false}
                                        helperText={errors.title && errors.title.message}
                                    />
                                )}
                            />
                        </div>

                        <div className={style.twocolumns}>
                            <Controller
                                defaultValue=''
                                name={"firstname"}
                                control={control}
                                rules={{
                                    required: { value: true, message: "First name is required" },
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <TextField
                                        className={style.field}
                                        helperText={errors.firstname && errors.firstname.message}
                                        placeholder="Ex: Lasitha"
                                        error={errors.firstname ? true : false}
                                        onChange={onChange}
                                        value={value}
                                        label="First Name *"
                                    />
                                )}
                            />
                            <Controller
                                defaultValue=''
                                name={"lastname"}
                                control={control}
                                rules={{
                                    required: { value: true, message: "Last name is required" },
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <TextField
                                        className={style.field}
                                        helperText={errors.lastname && errors.lastname.message}
                                        placeholder="Ex: Abeynayaka"
                                        error={errors.lastname ? true : false}
                                        onChange={onChange}
                                        value={value}
                                        label="Last Name *"
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className={classnames(style.row, style.twocolumns)}>
                        <Controller
                            defaultValue=''
                            name={"storecontactnumber"}
                            control={control}
                            rules={{
                                required: { value: true, message: "Store contact number is required" },
                                pattern: { value: /^[0-9]{10}$/, message: "Store contact Number is invalid" }
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    className={style.field}
                                    helperText={errors.storecontactnumber && errors.storecontactnumber.message}
                                    placeholder="Ex: 035 4727772"
                                    error={errors.storecontactnumber ? true : false}
                                    onChange={onChange}
                                    value={value}
                                    label="Store Contact Number *"
                                />
                            )}
                        />
                        <Controller
                            defaultValue=''
                            name={"customercontactnumber"}
                            control={control}
                            rules={{
                                required: { value: true, message: "Customer contact number is required" },
                                pattern: { value: /^[0-9]{10}$/, message: "Customer contact Number is invalid" }
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    className={style.field}
                                    helperText={errors.customercontactnumber && errors.customercontactnumber.message}
                                    placeholder="Ex: 071 2686790"
                                    error={errors.customercontactnumber ? true : false}
                                    onChange={onChange}
                                    value={value}
                                    label="Customer Contact Number "
                                />
                            )}
                        />
                    </div>
                    <div className={style.row}>
                        <Controller
                            defaultValue=''
                            name={"billingaddress"}
                            control={control}
                            rules={{
                                required: { value: true, message: "Billing address is required" },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    className={style.field}
                                    helperText={errors.billingaddress && errors.billingaddress.message}
                                    placeholder="Ex: Rambukkana-Katupitiya Rd, Rambukkana"
                                    error={errors.billingaddress ? true : false}
                                    onChange={onChange}
                                    value={value}
                                    label="Billing Address *"
                                />
                            )}
                        />
                    </div>
                    <div className={style.row}>
                        <Controller
                            defaultValue=''
                            name={"shippingaddress"}
                            control={control}
                            rules={{
                                required: { value: true, message: "Shipping address is required" },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    className={style.field}
                                    helperText={errors.shippingaddress && errors.shippingaddress.message}
                                    placeholder="Ex: Rambukkana-Katupitiya Rd, Rambukkana"
                                    error={errors.shippingaddress ? true : false}
                                    onChange={onChange}
                                    value={value}
                                    label="Shipping Address *"
                                />
                            )}
                        />
                    </div>

                    <div className={style.row}>
                        <Controller
                            defaultValue=''
                            name={"email"}
                            control={control}
                            rules={{
                                required: { value: true, message: "Email is required" },
                                pattern: { value: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: "Email is invalid" }
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    className={style.field}
                                    helperText={errors.email && errors.email.message}
                                    error={errors.email ? true : false}
                                    onChange={onChange}
                                    placeholder="Ex: abeynayakalasitha@gmail.com"
                                    value={value}
                                    label="Email *"
                                />
                            )}
                        />
                    </div>
                    <div className={style.buttonRow}>
                        <div className={style.resetBtnDiv}>
                            <Button
                                className={style.resetBtn}
                                onClick={resetForm}
                                variant="outlined"
                            >
                                Reset
                            </Button>
                        </div>
                        <div className={style.submitBtnDiv}>
                            <Button
                                className={style.submitBtn}
                                type="submit"
                                variant="contained"
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </form>
            </div>

        </div >
    )
}