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

//Images and SVGS
import user from '../../images/user.svg';

//SCSS Style
import style from './CustomersForm.module.scss';

const initialFieldValues = {
    customerid: '',
    ctitle: '',
    cfirstname: '',
    clastname: '',
    brn: '',
    storename: '',
    route: '',
    addeddate: '',
    phonenumber: Number,
    mobilenumber: Number,
    address: '',
    email: '',
};

export default function CustomersForm() {

    const validate = (fieldValues = values) => {

        let temp = { ...errors }
        if ('customerid' in fieldValues) {
            temp.customerid = fieldValues.customerid ? "" : "This field is required";
        }

        if ('ctitle' in fieldValues) {
            temp.ctitle = fieldValues.ctitle ? "" : "This field is required";
        }

        if ('cfirstname' in fieldValues) {
            temp.cfirstname = fieldValues.cfirstname ? "" : "This field is required";
        }

        if ('clastname' in fieldValues) {
            temp.clastname = fieldValues.clastname ? "" : "This field is required";
        }

        if ('brn' in fieldValues) {
            temp.brn = fieldValues.brn ? "" : "This field is required";
            temp.brn = fieldValues.brn.length > 9 ? "" : "BRN is not valid";
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

        if ('phonenumber' in fieldValues) {
            temp.phonenumber = fieldValues.phonenumber ? "" : "This field is required";
            temp.phonenumber = fieldValues.phonenumber.length > 9 ? "" : "Phone number is not valid";
        }

        if ('mobilenumber' in fieldValues) {
            temp.mobilenumber = fieldValues.mobilenumber ? "" : "This field is required";
            temp.mobilenumber = fieldValues.mobilenumber.length > 9 ? "" : "Mobile number is not valid";
        }

        if ('address' in fieldValues) {
            temp.address = fieldValues.address ? "" : "This field is required";
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
                    "ctitle": values.ctitle,
                    "cfirstname": values.cfirstname,
                    "clastname": values.clastname,
                    "brn": values.brn,
                    "storename": values.storename,
                    "route": values.route,
                    "addeddate": values.addeddate,
                    "phonenumber": values.phonenumber,
                    "mobilenumber": values.mobilenumber,
                    "address": values.address,
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
                            label="C000234 (Autogenerated)"
                            value={values?.brn}
                            disabled={true}
                        />
                        <TextField
                            name="brn"
                            label="BR Number *"
                            value={values?.brn}
                            onChange={handleInputChange}
                            placeholder="Ex: 3069002"
                            errors={errors.ebrn}
                        />
                        <TextField
                            name="storename"
                            label="Name of the Store *"
                            value={values?.storename}
                            onChange={handleInputChange}
                            placeholder="Ex: Champika Supermarket"
                            errors={errors.estorename}
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
                    <div className={style.gridrow}>
                        <div>
                            <Select
                                error={errors.ctitle}
                                label="Title *"
                                onChange={handleInputChange}
                                options={employeeservice.getTitleOptions()}
                                value={values?.ctitle}
                                name="ctitle"
                            />
                        </div>

                        <div className={style.twocolumns}>
                            <TextField
                                name="cfirstname"
                                label="First Name *"
                                value={values?.cfirstname}
                                onChange={handleInputChange}
                                placeholder="Ex: Hashan"
                                errors={errors.cfirstname}
                            />
                            <TextField
                                name="clastname"
                                label="Last Name *"
                                value={values?.clastname}
                                onChange={handleInputChange}
                                placeholder="Ex: Karunathilake"
                                errors={errors.clastname}
                            />
                        </div>
                    </div>
                    <div className={classnames(style.row, style.twocolumns)}>
                        <TextField
                            error={errors.phonenumber}
                            label="Phone Number *"
                            onChange={handleInputChange}
                            placeholder="Ex: 035 2266327"
                            value={values?.phonenumber}
                            name="phonenumber"
                        />
                        <TextField
                            error={errors.mobilenumber}
                            label="Mobile Number *"
                            onChange={handleInputChange}
                            placeholder="Ex: 071 2686790"
                            value={values?.mobilenumber}
                            name="mobilenumber"
                        />
                    </div>

                    <div className={style.row}>
                        <TextField
                            error={errors.address}
                            label="Address *"
                            onChange={handleInputChange}
                            placeholder="Ex: Weekadawatta, Kansalagamuwa, Rambukkana"
                            value={values?.address}
                            name="address"
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
