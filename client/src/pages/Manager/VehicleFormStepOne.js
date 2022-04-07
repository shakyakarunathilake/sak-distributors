import React, { useEffect } from 'react';
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
import { InputAdornment } from '@material-ui/core';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//SCSS Styles
import style from './VehicleFormStepOne.module.scss';

export default function VehicleFormStepOne(props) {

    const {
        errors,
        control,
        completeFormStep,
        action,
        handleClosePopUp,
        watch,
        resetForm,
    } = props;

    return (

        <div className={style.container}>

            <div className={style.header}>

                <div className={style.title}>

                    <div>
                        {action === "Create" && "Add Vehicle"}
                        {action === "Edit" && "Edit Vehicle"}
                    </div>

                    <div>
                        <HighlightOffIcon
                            className={style.icon}
                            onClick={handleClosePopUp}
                        />
                    </div>

                </div>

                <div className={style.step}>
                    Step 1 of 2
                </div>

            </div>

            <div className={style.body}>

                <div className={style.redFont}>
                    The fields with "*" are required. The "Vehicle Owner Details" should be filled when the vehicle isn't owned by the company.
                </div>

                <div className={classnames(style.row, style.twocolumns)}>

                    <Controller
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth={true}
                                error={errors.licenseplatenumber ? true : false}
                                helperText={errors.licenseplatenumber && errors.licenseplatenumber.message}
                                placeholder="Ex: 6TRJ244 "
                                size="small"
                                label="Licenses Plate Number *"
                                disabled={action === "Edit"}
                            />
                        )}
                        control={control}
                        name={"licenseplatenumber"}
                        rules={{
                            required: { value: true, message: "Required *" },
                        }}
                    />

                    <Controller
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth={true}
                                error={errors.vehicle ? true : false}
                                helperText={errors.vehicle && errors.vehicle.message}
                                placeholder="Ex: Box Truck "
                                size="small"
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

                <div className={classnames(style.row, style.twocolumns)}>

                    <Controller
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={[
                                    { id: "s01", title: "Active" },
                                    { id: "s02", title: "Inactive" },
                                ]}
                                error={errors.status ? true : false}
                                helperText={errors.status && errors.status.message}
                                size="small"
                                label="Status *"
                                className={style.field}
                            />
                        )}
                        control={control}
                        name={"status"}
                        rules={{
                            required: { value: true, message: "Required *" },
                        }}
                    />

                    <Controller
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={[
                                    { id: "t01", title: "Company's" },
                                    { id: "t03", title: "Rent" },
                                ]}
                                error={errors.ownership ? true : false}
                                helperText={errors.ownership && errors.ownership.message}
                                size="small"
                                label="Ownership *"
                                className={style.field}
                            />
                        )}
                        control={control}
                        name={"ownership"}
                        rules={{
                            required: { value: true, message: "Required *" },
                        }}
                    />

                </div>

                <div className={classnames(style.row, style.twocolumns)}>

                    <Controller
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth={true}
                                error={errors.addedby ? true : false}
                                helperText={errors.addedby && errors.addedby.message}
                                placeholder="Ex: Upeksha Karunathilake (E00003)"
                                size="small"
                                label="Added By *"
                                disabled={action === "Edit"}
                            />
                        )}
                        control={control}
                        name={"addedby"}
                        rules={{
                            required: { value: true, message: "Required *" },
                        }}
                    />

                    <Controller
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                error={errors.addeddate ? true : false}
                                helperText={errors.addeddate && errors.addeddate.message}
                                size="small"
                                label="Adding Date *"
                                disabled={action === "Edit"}
                            />
                        )}
                        control={control}
                        name={"addeddate"}
                        rules={{
                            required: { value: true, message: "Required *" },
                        }}
                    />

                </div>

                <div className={style.dividerDiv}>
                    Vehicle Owner Details
                </div>

                <div className={style.row}>

                    <Controller
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth={true}
                                error={errors.vehicleowner ? true : false}
                                helperText={errors.vehicleowner && errors.vehicleowner.message}
                                placeholder="Ex: A H R Rent A Vehicle"
                                size="small"
                                label="Vehicle Owner *"
                                className={style.field}
                                disabled={watch("ownership") !== "Rent"}
                            />
                        )}
                        control={control}
                        name={"vehicleowner"}
                        rules={{
                            required: {
                                value: watch("ownership") !== "Rent" ? false : true,
                                message: "Required *"
                            }
                        }}
                    />

                </div>

                <div className={classnames(style.row, style.twocolumns)}>

                    <Controller
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth={true}
                                error={errors.rate ? true : false}
                                helperText={errors.rate && errors.rate.message}
                                placeholder="999.99"
                                size="small"
                                label="Rate *"
                                className={style.field}
                                disabled={watch("ownership") !== "Rent"}
                                type="number"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            Rs
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                        control={control}
                        name={"rate"}
                        rules={{
                            required: {
                                value: watch("ownership") !== "Rent" ? false : true,
                                message: "Required *"
                            },
                            pattern: { value: /^[0-9]+\.[0-9]{2}$/, message: "Invalid" }
                        }}
                    />

                    <Controller
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={employeeservice.getRatePerOptions()}
                                error={errors.per ? true : false}
                                helperText={errors.per && errors.per.message}
                                size="small"
                                label="Per *"
                                className={style.field}
                                disabled={watch("ownership") !== "Rent"}
                            />
                        )}
                        control={control}
                        name={"per"}
                        rules={{
                            required: {
                                value: watch("ownership") !== "Rent" ? false : true,
                                message: "Required *"
                            }
                        }}
                    />

                </div>

                <div className={classnames(style.row, style.threecolumns)}>

                    <Controller
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth={true}
                                error={errors.contactnumber ? true : false}
                                helperText={errors.contactnumber && errors.contactnumber.message}
                                placeholder="Ex:  025 2236244"
                                size="small"
                                label="Contact Number *"
                                className={style.field}
                                disabled={watch("ownership") !== "Rent"}
                            />
                        )}
                        control={control}
                        name={"contactnumber"}
                        rules={{
                            required: {
                                value: watch("ownership") !== "Rent" ? false : true,
                                message: "Required *"
                            },
                            pattern: { value: /^[0-9]{10}$/, message: "Invalid" }
                        }}
                    />

                    <Controller
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={employeeservice.getTitleOptions()}
                                error={errors.title ? true : false}
                                helperText={errors.title && errors.title.message}
                                size="small"
                                label="Title *"
                                disabled={watch("ownership") !== "Rent"}
                            />
                        )}
                        control={control}
                        name={"title"}
                        rules={{
                            required: {
                                value: watch("ownership") !== "Rent" ? false : true,
                                message: "Required *"
                            },
                        }}
                    />

                    <Controller
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth={true}
                                error={errors.contactperson ? true : false}
                                helperText={errors.contactperson && errors.contactperson.message}
                                placeholder="Ex: Lasitha Abeynayaka"
                                size="small"
                                label="Contact Person *"
                                className={style.field}
                                disabled={watch("ownership") !== "Rent"}
                            />
                        )}
                        control={control}
                        name={"contactperson"}
                        rules={{
                            required: {
                                value: watch("ownership") !== "Rent" ? false : true,
                                message: "Required *"
                            }
                        }}
                    />

                </div>

                <div className={style.row}>

                    <Controller
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth={true}
                                error={errors.address ? true : false}
                                helperText={errors.address && errors.address.message}
                                placeholder="Ex: 57 Colombo, Negombo Rd, Kandana 11320"
                                size="small"
                                label="Address *"
                                className={style.field}
                                disabled={watch("ownership") !== "Rent"}
                            />
                        )}
                        control={control}
                        name={"address"}
                        rules={{
                            required: {
                                value: watch("ownership") !== "Rent" ? false : true,
                                message: "Required *"
                            }
                        }}
                    />

                </div>



            </div >

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

        </div >

    )
}
