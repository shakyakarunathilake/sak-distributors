import React from 'react';
import { Controller } from 'react-hook-form';

//Material UI Components
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//SCSS Styles
import style from './RouteFormStepTwo.module.scss';

export default function RouteFormStepTwo(props) {

    const {
        control,
        action,
        handleClosePopUp,
        onSubmit,
        backFormStep
    } = props;

    return (
        <div className={style.container}>

            <div className={style.header}>

                <div className={style.title}>

                    <div>
                        {action === "Create" && "Add New Route"}
                        {action === "Edit" && "Edit Route"}
                        {action === "View" && "View Route"}

                    </div>

                    <div>
                        <HighlightOffIcon
                            className={style.icon}
                            onClick={handleClosePopUp}
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
                        Route ID
                    </div>

                    <div>
                        <Controller
                            render={({ field: { value } }) => (
                                <Typography className={style.input}>
                                    {value}
                                </Typography>
                            )}
                            control={control}
                            name={"routeid"}
                        />
                    </div>

                </div>

                <div className={style.row}>

                    <div className={style.boldText}>
                        Route
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
