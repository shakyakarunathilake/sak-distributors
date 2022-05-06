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
import style from './SupplierFormStepOne.module.scss';

export default function SupplierFormStepOne(props) {

    const {
        errors,
        control,
        completeFormStep,
        action,
        setOpenPopup,
        resetForm
    } = props;

    return (

        <div className={style.container}>

            <div className={style.header}>

                <div className={style.title}>

                    <div>
                        {action === "Create" && "Add New Supplier"}
                        {action === "Edit" && "Edit Supplier"}
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

                <div className={classnames(style.row, style.gridrow)}>

                    <Controller
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth={true}
                                placeholder="Ex: S000234"
                                label="Supplier ID *"
                                size="small"
                                disabled={true}
                            />
                        )}
                        control={control}
                        name={"supplierid"}
                        rules={{
                            required: { value: true, message: "Required *" },
                        }}
                    />

                    <div className={style.twocolumns}>

                        <Controller
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth={true}
                                    error={errors.abbreviation ? true : false}
                                    helperText={errors.abbreviation && errors.abbreviation.message}
                                    placeholder="Ex: SIWPLC"
                                    size="small"
                                    label="Abbreviation *"
                                />
                            )}
                            control={control}
                            name={"abbreviation"}
                            rules={{
                                required: { value: true, message: "Required *" },
                            }}
                        />


                        <Controller
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth={true}
                                    error={errors.givenid ? true : false}
                                    helperText={errors.givenid && errors.givenid.message}
                                    size="small"
                                    label="Given ID *"
                                />
                            )}
                            control={control}
                            name={"givenid"}
                        />

                    </div>

                </div>

                <div className={style.row}>

                    <Controller
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth={true}
                                error={errors.name ? true : false}
                                helperText={errors.name && errors.name.message}
                                placeholder="Ex: Swadeshi Industrial Works PLC"
                                size="small"
                                label="Supplier *"
                            />
                        )}
                        control={control}
                        name={"name"}
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
                    Contact Details
                </div>

                <div className={style.reversegridrow}>

                    <div className={style.twocolumns}>

                        <Controller
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth={true}
                                    error={errors.contactnumber ? true : false}
                                    helperText={errors.contactnumber && errors.contactnumber.message}
                                    placeholder="Ex:  011 2236244"
                                    size="small"
                                    label="Contact Number"
                                    className={style.field}
                                />
                            )}
                            control={control}
                            name={"contactnumber"}
                            rules={{
                                required: { value: true, message: "Required *" },
                                pattern: { value: /^[0-9]{10}$/, message: "Invalid" }
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
                                />
                            )}
                            control={control}
                            name={"contactperson"}
                            rules={{
                                required: { value: true, message: "Required *" },
                            }}
                        />

                    </div>

                    <div>

                        <Controller
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={employeeservice.getTitleOptions()}
                                    error={errors.title ? true : false}
                                    helperText={errors.title && errors.title.message}
                                    size="small"
                                    label="Title *"
                                />
                            )}
                            control={control}
                            name={"title"}
                            rules={{
                                required: { value: true, message: "Required *" },
                            }}
                        />

                    </div>


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
                                label="Address*"
                                className={style.field}
                            />
                        )}
                        control={control}
                        name={"address"}
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
                                error={errors.email ? true : false}
                                helperText={errors.email && errors.email.message}
                                placeholder="Ex: swadeshi@sltnet.lk"
                                size="small"
                                label="Email"
                                className={style.field}
                            />
                        )}
                        control={control}
                        name={"email"}
                        rules={{
                            required: { value: true, message: "Required *" },
                            pattern: { value: /\S+@\S+\.\S+/, message: "Invalid" }
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
