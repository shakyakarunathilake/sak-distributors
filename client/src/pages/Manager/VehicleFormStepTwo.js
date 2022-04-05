import React from 'react';
import { Controller } from 'react-hook-form';

//Material UI Components
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//SCSS Styles
import style from './VehicleFormStepTwo.module.scss';

export default function VehicleFormStepTwo(props) {

    const {
        watch,
        control,
        action,
        setOpenPopup,
        onSubmit,
        backFormStep
    } = props;

    return (
        <div className={style.container}>

            <div className={style.header}>

                <div className={style.title}>

                    <div>
                        {action === "Create" && "Add Vehicle"}
                        {action === "Edit" && "Edit Vehicle"}
                        {action === "View" && "View Vehicle"}

                    </div>

                    <div>
                        <HighlightOffIcon
                            className={style.icon}
                            onClick={() => { setOpenPopup(false) }}
                        />
                    </div>

                </div>

                {
                    action !== 'View' &&
                    <div className={style.step}>
                        Step 2 of 2
                    </div>
                }

            </div>

            <div className={style.body}>

                <div className={style.row}>

                    <div className={style.boldText}>
                        Licenses Plate No.
                    </div>

                    <div>
                        <Controller
                            render={({ field: { value } }) => (
                                <Typography className={style.input}>
                                    {value}
                                </Typography>
                            )}
                            control={control}
                            name={"licenseplatenumber"}
                        />
                    </div>

                </div>

                <div className={style.row}>

                    <div className={style.boldText}>
                        Vehicle
                    </div>

                    <div>
                        <Controller
                            render={({ field: { value } }) => (
                                <Typography className={style.input}>
                                    {value}
                                </Typography>
                            )}
                            control={control}
                            name={"vehicle"}
                        />
                    </div>

                </div>

                <div className={style.row}>

                    <div className={style.boldText}>
                        Status
                    </div>

                    <div>
                        <Controller
                            render={({ field: { value } }) => (
                                <Typography className={style.input}>
                                    {value}
                                </Typography>
                            )}
                            control={control}
                            name={"status"}
                        />
                    </div>

                </div>

                <div className={style.row}>

                    <div className={style.boldText}>
                        Ownership
                    </div>

                    <div>
                        <Controller
                            render={({ field: { value } }) => (
                                <Typography className={style.input}>
                                    {value}
                                </Typography>
                            )}
                            control={control}
                            name={"ownership"}
                        />
                    </div>

                </div>

                {
                    watch("ownership") !== "Company's" &&
                    <div className={style.row}>

                        <div className={style.boldText}>
                            Owner
                        </div>

                        <div>
                            <Controller
                                render={({ field: { value } }) => (
                                    <Typography className={style.input}>
                                        Rs. {value}
                                    </Typography>
                                )}
                                control={control}
                                name={"vehicleowner"}
                            />
                        </div>

                    </div>
                }

                {
                    watch("ownership") !== "Company's" &&
                    <div className={style.row}>

                        <div className={style.boldText}>
                            Rate
                        </div>

                        <div>
                            <Controller
                                render={({ field: { value } }) => (
                                    <Typography className={style.input}>
                                        Rs. {value} /
                                    </Typography>
                                )}
                                control={control}
                                name={"rate"}
                            />
                            &nbsp;
                            <Controller
                                render={({ field: { value } }) => (
                                    <Typography className={style.input}>
                                        {value}
                                    </Typography>
                                )}
                                control={control}
                                name={"per"}
                            />
                        </div>

                    </div>
                }

                {
                    watch("ownership") !== "Company's" &&
                    <div className={style.row}>

                        <div className={style.boldText}>
                            Contact Person
                        </div>

                        <div>
                            <Controller
                                render={({ field: { value } }) => (
                                    <Typography className={style.input}>
                                        {value}
                                    </Typography>
                                )}
                                control={control}
                                name={"title"}
                            />
                            &nbsp;
                            <Controller
                                render={({ field: { value } }) => (
                                    <Typography className={style.input}>
                                        {value}
                                    </Typography>
                                )}
                                control={control}
                                name={"contactperson"}
                            />
                        </div>

                    </div>
                }

                {
                    watch("ownership") !== "Company's" &&
                    <div className={style.row}>

                        <div className={style.boldText}>
                            Contact No.
                        </div>

                        <div>
                            <Controller
                                render={({ field: { value } }) => (
                                    <Typography className={style.input}>
                                        {value}
                                    </Typography>
                                )}
                                control={control}
                                name={"contactnumber"}
                            />
                        </div>

                    </div>
                }

                {
                    watch("ownership") !== "Company's" &&
                    <div className={style.row}>

                        <div className={style.boldText}>
                            Address
                        </div>

                        <div>
                            <Controller
                                render={({ field: { value } }) => (
                                    <Typography className={style.input}>
                                        {value}
                                    </Typography>
                                )}
                                control={control}
                                name={"address"}
                            />
                        </div>

                    </div>
                }

                <div className={style.row}>

                    <div className={style.boldText}>
                        Added By
                    </div>

                    <div>
                        <Controller
                            render={({ field: { value } }) => (
                                <Typography className={style.input}>
                                    {value}
                                </Typography>
                            )}
                            control={control}
                            name={"addedby"}
                        />
                    </div>

                </div>

                <div className={style.row}>

                    <div className={style.boldText}>
                        Added Date
                    </div>

                    <div>
                        <Controller
                            render={({ field: { value } }) => (
                                <Typography className={style.input}>
                                    {value}
                                </Typography>
                            )}
                            control={control}
                            name={"addeddate"}
                        />
                    </div>

                </div>

            </div>

            <div className={style.footer}>

                <div className={style.backBtn}>
                    {
                        action !== "View" &&
                        <Button
                            onClick={backFormStep}
                            variant="contained"
                        >
                            Back
                        </Button>
                    }
                </div>

                <div className={style.nextBtn}>
                    <Button
                        onClick={onSubmit}
                        variant="contained"
                    >
                        {action === "View" ? "Done" : " Confirm & Submit"}
                    </Button>
                </div>

            </div>

        </div >
    )
}
