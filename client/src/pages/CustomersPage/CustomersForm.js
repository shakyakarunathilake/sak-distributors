import React from 'react';
import axios from 'axios';
import classnames from 'classnames';

//Development Stage
import * as employeeservice from "../../services/employeeService";

//Shared Components
import useForm from '../../components/useForm';
import TextField from '../../shared/TextField/TextField';
import Select from '../../shared/Select/Select';
import DatePicker from '../../shared/DatePicker/DatePicker';

//Material UI Components
import Button from '@material-ui/core/Button';

//SCSS Style
import style from './CustomersForm.module.scss';

const initialFieldValues = {
    customerid: '',
    fullname: '',
    title: '',
    firstname: '',
    lastname: '',
    brn: '',
    storename: '',
    route: '',
    addeddate: '',
    storecontactnumber: Number,
    customercontactnumber: Number,
    billingaddress: '',
    shippingaddress: '',
    email: '',
};

export default function CustomersForm() {

    const validate = (fieldValues = values) => {

        let temp = { ...errors }
        if ('customerid' in fieldValues) {
            temp.customerid = fieldValues.customerid ? "" : "This field is required";
        }


        if ('fullname' in fieldValues) {
            temp.fullname = fieldValues.fullname ? "" : "This field is required";
        }

        if ('title' in fieldValues) {
            temp.title = fieldValues.title ? "" : "This field is required";
        }

        if ('firstname' in fieldValues) {
            temp.firstname = fieldValues.firstname ? "" : "This field is required";
        }

        if ('lastname' in fieldValues) {
            temp.lastname = fieldValues.lastname ? "" : "This field is required";
        }

        if ('brn' in fieldValues) {
            temp.brn = fieldValues.brn ? "" : "This field is required";
            temp.brn = fieldValues.brn.length > 6 ? "" : "BRN is not valid";
        }

        if ('route' in fieldValues) {
            temp.route = fieldValues.route ? "" : "This field is required";
        }

        if ('storename' in fieldValues) {
            temp.storename = fieldValues.storename ? "" : "This field is required";
        }

        if ('addeddate' in fieldValues) {
            temp.addeddate = fieldValues.addeddate ? "" : "This field is required";
        }

        if ('storecontactnumber' in fieldValues) {
            temp.storecontactnumber = fieldValues.storecontactnumber ? "" : "This field is required";
            temp.storecontactnumber = fieldValues.storecontactnumber.length > 9 ? "" : "Store contact number is not valid";
        }

        if ('customercontactnumber' in fieldValues) {
            temp.customercontactnumber = fieldValues.customercontactnumber ? "" : "This field is required";
            temp.customercontactnumber = fieldValues.customercontactnumber.length > 9 ? "" : "Customer contact number is not valid";
        }

        if ('shippingaddress' in fieldValues) {
            temp.shippingaddress = fieldValues.shippingaddress ? "" : "This field is required";
        }

        if ('billingaddress' in fieldValues) {
            temp.billingaddress = fieldValues.billingaddress ? "" : "This field is required";
        }


        if ('email' in fieldValues) {
            temp.email = fieldValues.email ? "" : "This field is required";
            temp.email = (/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g).test(fieldValues.email) ? "" : "Email is not valid";
        }

        setErrors({
            ...temp
        })

        if (fieldValues === values) {
            return Object.values(temp).every(x => x === "");
        }

    }

    const handleSubmit = e => {
        e.preventDefault()

        if (validate()) {
            axios
                .post("http://localhost:8080/customers/create-customer", {
                    "customerid": values.customerid,
                    "fullname": values.fullname,
                    "title": values.title,
                    "firstname": values.firstname,
                    "lastname": values.lastname,
                    "brn": values.brn,
                    "storename": values.storename,
                    "route": values.route,
                    "addeddate": values.addeddate,
                    "storecontactnumber": values.storecontactnumber,
                    "customercontactnumber": values.customercontactnumber,
                    "shippingaddress": values.shippingaddress,
                    "billingaddress": values.billingaddress,
                    "email": values.email,
                })
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    const {
        errors,
        values,
        setErrors,
        resetForm,
        handleInputChange
    } = useForm(initialFieldValues, true, validate);


    return (
        <div className={style.container}>

            <div className={style.header}>
                New Customer
            </div>

            <div className={style.body}>
                <form
                    className={style.form}
                    onSubmit={handleSubmit}
                >
                    <div className={classnames(style.row, style.redFont)}>
                        The fields with "*" are required
                    </div>
                    <div className={classnames(style.row, style.threecolumns)}>
                        <TextField
                            name="customerid"
                            label="Customer ID"
                            value={values?.customerid}
                            onChange={handleInputChange}
                            placeholder="Ex: C000234"
                            error={errors.customerid}
                        // disabled={true}
                        />
                        <TextField
                            name="brn"
                            label="BRN*"
                            value={values?.brn}
                            onChange={handleInputChange}
                            placeholder="Ex: 3069002"
                            error={errors.brn}
                        />
                        <TextField
                            name="storename"
                            label="Name of the Store *"
                            value={values?.storename}
                            onChange={handleInputChange}
                            placeholder="Ex: Champika Super Center & Pharmacy"
                            error={errors.storename}
                        />

                    </div>
                    <div className={classnames(style.row, style.twocolumns)}>
                        <Select
                            error={errors.route}
                            label="Route *"
                            onChange={handleInputChange}
                            options={employeeservice.getRouteOptions()}
                            value={values?.route}
                            name="route"
                        />
                        <DatePicker
                            error={errors.addeddate}
                            label="Current Date *"
                            onChange={handleInputChange}
                            value={values?.addeddate}
                            name="addeddate"
                        />
                    </div>
                    <div className={style.row}>
                        <TextField
                            error={errors.fullname}
                            label="Customer Full Name *"
                            onChange={handleInputChange}
                            placeholder="Ex: Adikari Deepal Lasitha Abeynayaka"
                            value={values?.fullname}
                            name="fullname"
                        />
                    </div>
                    <div className={style.gridrow}>
                        <div>
                            <Select
                                error={errors.title}
                                label="Title *"
                                onChange={handleInputChange}
                                options={employeeservice.getTitleOptions()}
                                value={values?.title}
                                name="title"
                            />
                        </div>

                        <div className={style.twocolumns}>
                            <TextField
                                name="firstname"
                                label="Customer First Name *"
                                value={values?.firstname}
                                onChange={handleInputChange}
                                placeholder="Ex: Lasitha"
                                error={errors.firstname}
                            />
                            <TextField
                                name="lastname"
                                label="Customer Last Name *"
                                value={values?.lastname}
                                onChange={handleInputChange}
                                placeholder="Ex: Abeynayaka"
                                error={errors.lastname}
                            />
                        </div>
                    </div>
                    <div className={classnames(style.row, style.twocolumns)}>
                        <TextField
                            error={errors.storecontactnumber}
                            label="Store Contact Number *"
                            onChange={handleInputChange}
                            placeholder="Ex: 035 4727772"
                            value={values?.storecontactnumber}
                            name="storecontactnumber"
                        />
                        <TextField
                            error={errors.customercontactnumber}
                            label="Customer Contact Number "
                            onChange={handleInputChange}
                            placeholder="Ex: 071 2686790"
                            value={values?.customercontactnumber}
                            name="customercontactnumber"
                        />
                    </div>
                    <div className={style.row}>
                        <TextField
                            error={errors.billingaddress}
                            label="Billing Address *"
                            onChange={handleInputChange}
                            placeholder="Ex: Rambukkana-Katupitiya Rd, Rambukkana"
                            value={values?.billingaddress}
                            name="billingaddress"
                        />
                    </div>
                    <div className={style.row}>
                        <TextField
                            error={errors.shippingaddress}
                            label="Shipping Address *"
                            onChange={handleInputChange}
                            placeholder="Ex: Rambukkana-Katupitiya Rd, Rambukkana"
                            value={values?.shippingaddress}
                            name="shippingaddress"
                        />
                    </div>

                    <div className={style.row}>
                        <TextField
                            error={errors.email}
                            label="Email *"
                            onChange={handleInputChange}
                            placeholder="Ex: karunathilakeshakya@gmail.com"
                            value={values?.email}
                            name="email"
                        />
                    </div>
                    <div className={style.buttonRow}>
                        <div className={style.resetBtnDiv}>
                            <Button
                                className={style.resetBtn}
                                onClick={resetForm}
                                size="medium"
                                variant="outlined"
                            >
                                Reset
                            </Button>
                        </div>
                        <div className={style.submitBtnDiv}>
                            <Button
                                className={style.submitBtn}
                                onClick={handleSubmit}
                                size="medium"
                                variant="contained"
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </form>
            </div>

        </div >
    );
};
