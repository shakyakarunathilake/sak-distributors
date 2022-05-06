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
import style from './RouteFormStepOne.module.scss';

export default function RouteFormStepOne(props) {

    const {
        errors,
        control,
        completeFormStep,
        action,
        handleClosePopUp,
        resetForm
    } = props;


    return (

        <div className={style.container}>

            <div className={style.header}>

                <div className={style.title}>

                    <div>
                        {action === "Create" && "Add New Route"}
                        {action === "Edit" && "Edit Route"}
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
                    The fields with "*" are required
                </div>

                <div className={classnames(style.row, style.twocolumns)}>

                    <Controller
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth={true}
                                error={errors.from ? true : false}
                                helperText={errors.from && errors.from.message}
                                placeholder="Ex: Rambukkana"
                                size="small"
                                label="From *"
                                disabled={action === "Edit"}
                            />
                        )}
                        control={control}
                        name={"from"}
                        rules={{
                            required: { value: true, message: "Required *" },
                        }}
                    />


                    <Controller
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth={true}
                                error={errors.to ? true : false}
                                helperText={errors.to && errors.to.message}
                                placeholder="Ex: Kegalle"
                                size="small"
                                label="To *"
                                disabled={action === "Edit"}
                            />
                        )}
                        control={control}
                        name={"to"}
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
                                options={employeeservice.getStatusOptions()}
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

                <div className={style.row}>

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
