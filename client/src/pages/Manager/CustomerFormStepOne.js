import React from 'react';
import classnames from 'classnames';

import { Controller } from 'react-hook-form';

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
import style from './CustomerFormStepOne.module.scss';

export default function CustomerFormStepOne(props) {

    const {
        errors,
        control,
        action,
        setOpenPopup,
        resetForm,
        completeFormStep
    } = props;

    return (
        <div className={style.container}>

            <div className={style.header}>

                <div className={style.title}>

                    <div>
                        {action === "Create" && "Create Customer"}
                        {action === "Edit" && "Edit Customer"}
                    </div>

                    <div>
                        <HighlightOffIcon
                            className={style.icon}
                            onClick={() => { setOpenPopup(false) }}
                        />
                    </div>

                </div>

                <div className={style.step}>
                    Step 1 of 2
                </div>

            </div>
            <div className={style.body}>

                <div className={style.redFont}>
                    The fields with "*" are required
                </div>

                <div className={classnames(style.row, style.threecolumns)}>

                    <Controller
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth={true}
                                placeholder="Ex: C000234"
                                size="small"
                                label="Customer ID *"
                                disabled={true}
                            />
                        )}
                        name={"customerid"}
                        control={control}
                        rules={{
                            required: { value: true, message: "Required *" }
                        }}
                    />

                    <Controller
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth={true}
                                error={errors.brn ? true : false}
                                helperText={errors.brn && errors.brn.message}
                                placeholder="Ex: 3069002"
                                size="small"
                                label="BRN *"
                            />
                        )}
                        name={"brn"}
                        control={control}
                        rules={{
                            required: { value: true, message: "Required *" },
                            pattern: { value: /^\d{7}(?:\d{2})?$/, message: "Invalid" }
                        }}
                    />

                    <Controller
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth={true}
                                helperText={errors.storename && errors.storename.message}
                                error={errors.storename ? true : false}
                                placeholder="Ex: Champika Super Center and Pharmacy"
                                size="small"
                                label="Name of the Store *"
                            />
                        )}
                        name={"storename"}
                        control={control}
                        rules={{
                            required: { value: true, message: "Required *" }
                        }}
                    />

                </div>

                <div className={classnames(style.row, style.twocolumns)}>

                    <Controller
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={employeeservice.getRouteOptions()}
                                helperText={errors.route && errors.route.message}
                                error={errors.route ? true : false}
                                size="small"
                                label="Route *"
                            />
                        )}
                        name={"route"}
                        control={control}
                        rules={{
                            required: { value: true, message: "Required *" }
                        }}
                    />

                    <Controller
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                helperText={errors.addeddate && errors.addeddate.message}
                                error={errors.addeddate ? true : false}
                                size="small"
                                label="Adding Date *"
                            />
                        )}
                        name={"addeddate"}
                        control={control}
                        rules={{
                            required: { value: true, message: "Required *" }
                        }}
                    />

                </div>

                <div className={style.row}>

                    <Controller
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth={true}
                                helperText={errors.fullname && errors.fullname.message}
                                error={errors.fullname ? true : false}
                                placeholder="Ex: Adikari Deepal Lasitha Abeynayaka"
                                size="small"
                                label="Full Name *"
                            />
                        )}
                        name={"fullname"}
                        control={control}
                        rules={{
                            required: { value: true, message: "Required *" },
                        }}
                    />

                </div>

                <div className={style.gridrow}>

                    <div>

                        <Controller
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={employeeservice.getTitleOptions()}
                                    helperText={errors.title && errors.title.message}
                                    error={errors.title ? true : false}
                                    size="small"
                                    label="Title *"
                                />
                            )}
                            name={"title"}
                            control={control}
                            rules={{
                                required: { value: true, message: "Required *" }
                            }}
                        />

                    </div>

                    <div className={style.twocolumns}>

                        <Controller
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth={true}
                                    helperText={errors.firstname && errors.firstname.message}
                                    error={errors.firstname ? true : false}
                                    placeholder="Ex: Lasitha"
                                    size="small"
                                    label="First Name *"
                                />
                            )}
                            name={"firstname"}
                            control={control}
                            rules={{
                                required: { value: true, message: "Required *" },
                            }}
                        />

                        <Controller
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth={true}
                                    helperText={errors.lastname && errors.lastname.message}
                                    error={errors.lastname ? true : false}
                                    placeholder="Ex: Abeynayaka"
                                    label="Last Name *"
                                    size="small"
                                />
                            )}
                            name={"lastname"}
                            control={control}
                            rules={{
                                required: { value: true, message: "Required *" },
                            }}
                        />

                    </div>

                </div>

                <div className={classnames(style.row, style.twocolumns)}>

                    <Controller
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth={true}
                                helperText={errors.storecontactnumber && errors.storecontactnumber.message}
                                error={errors.storecontactnumber ? true : false}
                                placeholder="Ex: 035 4727772"
                                size="small"
                                label="Store Contact Number *"
                            />
                        )}
                        name={"storecontactnumber"}
                        control={control}
                        rules={{
                            required: { value: true, message: "Store contact number is required" },
                            pattern: { value: /^[0-9]{10}$/, message: "Invalid" }
                        }}
                    />

                    <Controller
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth={true}
                                helperText={errors.customercontactnumber && errors.customercontactnumber.message}
                                error={errors.customercontactnumber ? true : false}
                                placeholder="Ex: 071 2686790"
                                size="small"
                                label="Customer Contact Number"
                            />
                        )}
                        name={"customercontactnumber"}
                        control={control}
                        rules={{
                            pattern: { value: /^[0-9]{10}$/, message: "Invalid" }
                        }}
                    />

                </div>

                <div className={style.row}>

                    <Controller
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth={true}
                                helperText={errors.billingaddress && errors.billingaddress.message}
                                error={errors.billingaddress ? true : false}
                                placeholder="Ex: Rambukkana-Katupitiya Rd, Rambukkana"
                                size="small"
                                label="Billing Address *"
                            />
                        )}
                        name={"billingaddress"}
                        control={control}
                        rules={{
                            required: { value: true, message: "Required *" },
                        }}
                    />

                </div>

                <div className={style.row}>

                    <Controller
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth={true}
                                helperText={errors.shippingaddress && errors.shippingaddress.message}
                                error={errors.shippingaddress ? true : false}
                                placeholder="Ex: Rambukkana-Katupitiya Rd, Rambukkana"
                                size="small"
                                label="Shipping Address *"
                            />
                        )}
                        name={"shippingaddress"}
                        control={control}
                        rules={{
                            required: { value: true, message: "Required *" },
                        }}
                    />

                </div>

                <div className={style.row}>

                    <Controller
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth={true}
                                helperText={errors.email && errors.email.message}
                                error={errors.email ? true : false}
                                placeholder="Ex: abeynayakalasitha@gmail.com"
                                size="small"
                                label="Email"
                            />
                        )}
                        name={"email"}
                        control={control}
                        rules={{
                            pattern: {
                                value: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: "Invalid"
                            }
                        }}
                    />

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
                        onClick={completeFormStep}
                        variant="contained"
                    >
                        Next
                    </Button>
                </div>

            </div>

        </div>
    )
}
