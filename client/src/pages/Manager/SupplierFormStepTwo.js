import React from 'react';
import { Controller } from 'react-hook-form';

//Material UI Components
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//SCSS Styles
import style from './SupplierFormStepTwo.module.scss';

export default function SupplierFormStepTwo(props) {

    const {
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
                        {action === "Create" && "Create Supplier"}
                        {action === "Edit" && "Edit Supplier"}
                        {action === "View" && "View Supplier"}

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
                        Sup. ID
                    </div>

                    <div>
                        <Controller
                            render={({ field: { value } }) => (
                                <Typography className={style.input}>
                                    {value}
                                </Typography>
                            )}
                            control={control}
                            name={"supplierid"}
                        />
                    </div>

                </div>

                <div className={style.row}>

                    <div className={style.boldText}>
                        Name
                    </div>

                    <div>
                        <Controller
                            render={({ field: { value } }) => (
                                <Typography className={style.input}>
                                    {value}
                                </Typography>
                            )}
                            control={control}
                            name={"name"}
                        />
                    </div>

                </div>

                <div className={style.row}>

                    <div className={style.boldText}>
                        Abbreviation
                    </div>

                    <div>
                        <Controller
                            render={({ field: { value } }) => (
                                <Typography className={style.input}>
                                    {value}
                                </Typography>
                            )}
                            control={control}
                            name={"abbreviation"}
                        />
                    </div>

                </div>

                <div className={style.row}>

                    <div className={style.boldText}>
                        Given ID
                    </div>

                    <div>
                        <Controller
                            render={({ field: { value } }) => (
                                <Typography className={style.input}>
                                    {value}
                                </Typography>
                            )}
                            control={control}
                            name={"givenid"}
                        />
                    </div>

                </div>

                <div className={style.row}>

                    <div className={style.boldText}>
                        Debt
                    </div>

                    <div>
                        <Controller
                            render={({ field: { value } }) => (
                                <Typography className={style.input}>
                                    Rs. {value}
                                </Typography>
                            )}
                            control={control}
                            name={"damagedmissingitems"}
                        />
                    </div>

                </div>

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
                            name={"contactperson"}
                        />
                    </div>

                </div>

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

                <div className={style.row}>

                    <div className={style.boldText}>
                        Email
                    </div>

                    <div>
                        <Controller
                            render={({ field: { value } }) => (
                                <Typography className={style.input}>
                                    {value}
                                </Typography>
                            )}
                            control={control}
                            name={"email"}
                        />
                    </div>

                </div>

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
