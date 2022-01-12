import React, { useEffect } from 'react';
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

    const designation = JSON.parse(sessionStorage.getItem("Auth")).designation;

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
    }, [customerRecords, nextCusId, setValue])

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

        const firstname = JSON.parse(sessionStorage.getItem("Auth")).firstname;
        const lastname = JSON.parse(sessionStorage.getItem("Auth")).lastname;
        const employeeid = JSON.parse(sessionStorage.getItem("Auth")).employeeid;

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
        customerFormData.append("storecontactnumber", values.storecontactnumber ? values.storecontactnumber : "");
        customerFormData.append("registeredby", `${firstname} ${lastname} (${employeeid})`)
        addOrEdit(customerFormData, getValues("customerid"));
    };

    return (
        <div className={designation === "Manager" ? style.container1 : style.container2}>

            <div className={style.header}>

                <div className={style.mainheader}>
                    <div>{customerRecords ? "Edit Customer" : "Add New Customer"}</div>
                    <div>
                        <HighlightOffIcon
                            className={style.icon}
                            onClick={() => { setOpenPopup(false) }}
                        />
                    </div>
                </div>

                <div className={style.subheader}>
                    The fields with "*" are required
                </div>
            </div>

            <form
                className={style.body}
                onSubmit={handleSubmit(onSubmit)}
            >

                <div className={designation === "Manager" ? style.form1 : style.form2}>

                    <div className={classnames(style.row, style.threecolumns)}>
                        <Controller
                            name={"customerid"}
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    fullWidth={true}
                                    label="Customer ID *"
                                    value={value || ''}
                                    onChange={onChange}
                                    placeholder="Ex: C000234"
                                    disabled={true}
                                    size="small"
                                />
                            )}
                        />
                        <Controller
                            name={"brn"}
                            control={control}
                            rules={{
                                required: { value: true, message: "Required *" },
                                pattern: { value: /^\d{7}(?:\d{2})?$/, message: "Invalid" }
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    fullWidth={true}
                                    label="BRN *"
                                    value={value || ''}
                                    onChange={onChange}
                                    placeholder="Ex: 3069002"
                                    error={errors.brn ? true : false}
                                    helperText={errors.brn && errors.brn.message}
                                    size="small"
                                />
                            )}
                        />
                        <Controller
                            name={"storename"}
                            control={control}
                            rules={{ required: { value: true, message: "Required *" } }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    fullWidth={true}
                                    label="Name of the Store *"
                                    value={value || ''}
                                    onChange={onChange}
                                    placeholder="Ex: Champika Super Center and Pharmacy"
                                    error={errors.storename ? true : false}
                                    helperText={errors.storename && errors.storename.message}
                                    size="small"
                                />
                            )}
                        />

                    </div>
                    <div className={classnames(style.row, style.twocolumns)}>
                        <Controller
                            name={"route"}
                            control={control}
                            rules={{ required: { value: true, message: "Required *" } }}
                            render={({ field: { onChange, value } }) => (
                                <Select
                                    label="Route *"
                                    value={value || ''}
                                    onChange={onChange}
                                    options={employeeservice.getRouteOptions()}
                                    error={errors.route ? true : false}
                                    helperText={errors.route && errors.route.message}
                                    size="small"
                                />
                            )}
                        />
                        <Controller
                            name={"addeddate"}
                            control={control}
                            rules={{ required: { value: true, message: "Required *" } }}
                            render={({ field: { onChange, value } }) => (
                                <DatePicker
                                    label="Adding Date *"
                                    value={value || ''}
                                    onChange={onChange}
                                    error={errors.addeddate ? true : false}
                                    helperText={errors.addeddate && errors.addeddate.message}
                                    size="small"
                                />
                            )}
                        />

                    </div>
                    <div className={style.row}>
                        <Controller
                            name={"fullname"}
                            control={control}
                            rules={{
                                required: { value: true, message: "Required *" },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    fullWidth={true}
                                    className={style.field}
                                    helperText={errors.fullname && errors.fullname.message}
                                    placeholder="Ex: Adikari Deepal Lasitha Abeynayaka"
                                    error={errors.fullname ? true : false}
                                    onChange={onChange}
                                    value={value || ''}
                                    label="Full Name *"
                                    size="small"
                                />
                            )}
                        />
                    </div>
                    <div className={style.gridrow}>
                        <div>
                            <Controller
                                name={"title"}
                                control={control}
                                rules={{ required: { value: true, message: "Required *" } }}
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        label="Title *"
                                        value={value || ''}
                                        onChange={onChange}
                                        options={employeeservice.getTitleOptions()}
                                        error={errors.title ? true : false}
                                        helperText={errors.title && errors.title.message}
                                        size="small"
                                    />
                                )}
                            />
                        </div>

                        <div className={style.twocolumns}>
                            <Controller
                                name={"firstname"}
                                control={control}
                                rules={{
                                    required: { value: true, message: "Required *" },
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <TextField
                                        fullWidth={true}
                                        className={style.field}
                                        helperText={errors.firstname && errors.firstname.message}
                                        placeholder="Ex: Lasitha"
                                        error={errors.firstname ? true : false}
                                        onChange={onChange}
                                        value={value || ''}
                                        label="First Name *"
                                        size="small"
                                    />
                                )}
                            />
                            <Controller
                                name={"lastname"}
                                control={control}
                                rules={{
                                    required: { value: true, message: "Required *" },
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <TextField
                                        fullWidth={true}
                                        className={style.field}
                                        helperText={errors.lastname && errors.lastname.message}
                                        placeholder="Ex: Abeynayaka"
                                        error={errors.lastname ? true : false}
                                        onChange={onChange}
                                        value={value || ''}
                                        label="Last Name *"
                                        size="small"
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className={classnames(style.row, style.twocolumns)}>
                        <Controller
                            name={"storecontactnumber"}
                            control={control}
                            rules={{
                                // required: { value: true, message: "Store contact number is required" },
                                pattern: { value: /^[0-9]{10}$/, message: "Invalid" }
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    fullWidth={true}
                                    className={style.field}
                                    helperText={errors.storecontactnumber && errors.storecontactnumber.message}
                                    placeholder="Ex: 035 4727772"
                                    error={errors.storecontactnumber ? true : false}
                                    onChange={onChange}
                                    value={value || ''}
                                    label="Store Contact Number"
                                    size="small"
                                />
                            )}
                        />
                        <Controller
                            name={"customercontactnumber"}
                            control={control}
                            rules={{
                                required: { value: true, message: "Required *" },
                                pattern: { value: /^[0-9]{10}$/, message: "Invalid" }
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    fullWidth={true}
                                    className={style.field}
                                    helperText={errors.customercontactnumber && errors.customercontactnumber.message}
                                    placeholder="Ex: 071 2686790"
                                    error={errors.customercontactnumber ? true : false}
                                    onChange={onChange}
                                    value={value || ''}
                                    label="Customer Contact Number *"
                                    size="small"
                                />
                            )}
                        />
                    </div>
                    <div className={style.row}>
                        <Controller
                            name={"billingaddress"}
                            control={control}
                            rules={{
                                required: { value: true, message: "Required *" },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    fullWidth={true}
                                    className={style.field}
                                    helperText={errors.billingaddress && errors.billingaddress.message}
                                    placeholder="Ex: Rambukkana-Katupitiya Rd, Rambukkana"
                                    error={errors.billingaddress ? true : false}
                                    onChange={onChange}
                                    value={value || ''}
                                    label="Billing Address *"
                                    size="small"
                                />
                            )}
                        />
                    </div>
                    <div className={style.row}>
                        <Controller
                            name={"shippingaddress"}
                            control={control}
                            rules={{
                                required: { value: true, message: "Required *" },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    fullWidth={true}
                                    className={style.field}
                                    helperText={errors.shippingaddress && errors.shippingaddress.message}
                                    placeholder="Ex: Rambukkana-Katupitiya Rd, Rambukkana"
                                    error={errors.shippingaddress ? true : false}
                                    onChange={onChange}
                                    value={value || ''}
                                    label="Shipping Address *"
                                    size="small"
                                />
                            )}
                        />
                    </div>
                    <div className={style.row}>
                        <Controller
                            name={"email"}
                            control={control}
                            rules={{
                                // required: { value: true, message: "Email is required" },
                                pattern: {
                                    value: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: "Invalid"
                                }
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    fullWidth={true}
                                    className={style.field}
                                    helperText={errors.email && errors.email.message}
                                    error={errors.email ? true : false}
                                    onChange={onChange}
                                    placeholder="Ex: abeynayakalasitha@gmail.com"
                                    value={value || ''}
                                    label="Email"
                                    size="small"
                                />
                            )}
                        />
                    </div>

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

        </div >
    )
}
