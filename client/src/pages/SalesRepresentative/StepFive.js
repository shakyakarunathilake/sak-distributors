import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

//Material UI Components
import { Button } from '@material-ui/core';
import { InputAdornment } from '@material-ui/core';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Divider from '@mui/material/Divider';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import InfoIcon from '@mui/icons-material/Info';
import CalculateIcon from '@mui/icons-material/Calculate';

//Shared Components
import TextField from '../../shared/TextField/TextField';

//Shared functions 
import NumberWithCommas from '../NumberWithCommas';

//SCSS Styling
import style from './StepFive.module.scss';

export default function StepFive(props) {

    const {
        watch,
        action,
        formStep,
        handleClosePopUp,
        onSubmit,
        setValue,
        errors,
        control,
        getValues,
        backFormStep,
    } = props;

    useEffect(() => {
        if (action !== "View") {
            calculatePayments();
        }
    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    const [open, setOpen] = useState(false);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

    const calculatePayments = () => {

        let creditamounttosettle = 0;
        let currentinvoicecreditamount = 0;
        let advancepayment = getValues('advancepayment');
        let total = getValues('total');
        let loyaltypointsincash = getValues("loyaltypointsincash");

        if (watch('customertype') === "Registered Customer") {

            if (advancepayment / 2 < loyaltypointsincash) {
                setValue("maximumcreditamount", parseInt(advancepayment / 2).toFixed(2))

            } else if (advancepayment / 2 >= loyaltypointsincash) {
                setValue("maximumcreditamount", parseInt(loyaltypointsincash).toFixed(2))

            } else {
                setValue("maximumcreditamount", "0.00")

            }
        }

        if (watch('customertype') === "Registered Customer") {
            creditamounttosettle = getValues('creditamounttosettle');
            currentinvoicecreditamount = getValues('currentinvoicecreditamount');
        }

        if (parseInt(creditamounttosettle) === 0 && parseInt(currentinvoicecreditamount) === 0) {
            setValue('minimumpayment', advancepayment);
            setValue('invoicesettlementvalue', total);
        }

        if (parseInt(creditamounttosettle) !== 0 && parseInt(currentinvoicecreditamount) === 0) {
            let minimumpayment = (parseInt(advancepayment) + parseInt(creditamounttosettle)).toFixed(2);
            let invoicesettlementvalue = (parseInt(total) + parseInt(creditamounttosettle)).toFixed(2);

            setValue('minimumpayment', minimumpayment);
            setValue('invoicesettlementvalue', invoicesettlementvalue);
        };

        if (parseInt(creditamounttosettle) === 0 && parseInt(currentinvoicecreditamount) !== 0) {
            let minimumpayment = (parseInt(advancepayment) - parseInt(currentinvoicecreditamount)).toFixed(2);

            setValue('minimumpayment', minimumpayment);
            setValue('invoicesettlementvalue', total);
        };
    }

    return (
        <div className={style.five}>

            <div className={style.header}>

                <div className={style.title}>
                    <div>
                        Order Payment Details
                    </div>
                    <div>
                        <HighlightOffIcon
                            className={style.icon}
                            onClick={handleClosePopUp}
                        />
                    </div>
                </div>

                {
                    action === "Create" && formStep === 4 &&
                    <div className={style.step}>
                        Step 5 of 5
                    </div>
                }

                {
                    action === "Edit" && formStep === 3 &&
                    <div className={style.step}>
                        Step 4 of 4
                    </div>
                }

                {
                    action === "View" && formStep === 2 &&
                    <div className={style.step}>
                        Step 3 of 3
                    </div>
                }

            </div>

            <div className={style.body}>

                {
                    watch('customertype') === "Registered Customer" &&

                    <div className={style.cardRow}>

                        <div className={style.card}>
                            <div className={style.title}>
                                Loyalty Points
                            </div>
                            <div className={style.data}>
                                {getValues('loyaltypoints')}
                            </div>
                        </div>

                        <div className={style.card}>
                            <div className={style.title}>
                                Maximum credit allowed
                            </div>
                            <div className={style.data}>
                                Rs {NumberWithCommas(getValues('maximumcreditamount'))}
                            </div>
                        </div>

                    </div>

                }

                <div className={style.detailRow}>

                    {
                        watch('customertype') === "Registered Customer" &&
                        <div className={style.row}>
                            <div className={style.boldText}>
                                Previous credit amount to settle
                            </div>
                            <div className={style.customerData}>
                                Rs. {NumberWithCommas(getValues('creditamounttosettle'))}
                            </div>
                        </div>
                    }

                    <div className={style.row}>
                        <div className={style.boldText}>
                            Current Invoice Total
                        </div>
                        <div className={style.customerData}>
                            Rs. {NumberWithCommas(watch('total'))}
                        </div>
                    </div>

                    <div className={style.row}>
                        <div className={style.boldText}>
                            Current Invoice Advance Payment
                        </div>
                        <div className={style.customerData}>
                            Rs. {NumberWithCommas(watch('advancepayment'))}
                        </div>
                    </div>

                    {
                        action === "View" &&
                        watch('customertype') === "Registered Customer" &&
                        <div className={style.row}>
                            <div className={style.boldText}>
                                Current Invoice Credit Amount
                            </div>
                            <div className={style.customerData}>
                                Rs. {NumberWithCommas(watch('currentinvoicecreditamount'))}
                            </div>
                        </div>

                    }


                    {
                        action !== "View" &&
                        watch('customertype') === "Registered Customer" &&
                        <div className={style.rowtwo}>
                            <div className={style.boldText}>
                                Current Invoice Credit Amount  <span className={style.redFont}>*</span>
                            </div>
                            <div
                                className={style.customerData}
                            // dir="rtl"
                            >
                                <CalculateIcon
                                    className={style.icon}
                                    onClick={() => calculatePayments()}
                                    disabled={getValues('maximumcreditamount') === 0}
                                />
                                <Controller
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            focused={getValues('maximumcreditamount') !== '0.00'}
                                            disabled={getValues('maximumcreditamount') === '0.00'}
                                            type="number"
                                            fullWidth={true}
                                            error={errors.currentinvoicecreditamount ? true : false}
                                            helperText={errors.currentinvoicecreditamount && errors.currentinvoicecreditamount.message}
                                            placeholder="999.99"
                                            margin="dense"
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
                                    name={"currentinvoicecreditamount"}
                                    rules={{
                                        required: { value: true, message: "Required *" },
                                        pattern: { value: /^[0-9]+\.[0-9]{2}$/, message: "Invalid" },
                                        max: { value: parseInt(getValues("maximumcreditamount")), message: "Should be or below maximum credit allowed" }
                                    }}
                                />
                            </div>
                        </div>
                    }

                    <div className={style.dividerDiv}>
                        <Divider variant="middle" />
                    </div>

                    <div className={style.row}>
                        <div className={style.boldText}>
                            Minimum Payment
                        </div>
                        <div className={style.customerData}>
                            Rs. {NumberWithCommas(watch('minimumpayment'))}
                        </div>
                    </div>

                    <div className={style.row}>
                        <div className={style.boldText}>
                            Invoice Settlement Value
                        </div>
                        <div className={style.customerData}>
                            Rs. {NumberWithCommas(watch('invoicesettlementvalue'))}
                        </div>
                    </div>

                    <div className={style.dividerDiv}>
                        <Divider variant="middle" />
                    </div>

                </div>

            </div>

            <div className={style.footer}>

                <div className={style.backBtn}>
                    <Button
                        onClick={backFormStep}
                        variant="contained"
                    >
                        Back
                    </Button>
                </div>

                <div className={style.doneBtn}>

                    {
                        action !== "View" &&
                        <ClickAwayListener onClickAway={handleTooltipClose}>
                            <Tooltip
                                PopperProps={{
                                    disablePortal: true,
                                }}
                                onClose={handleTooltipClose}
                                open={open}
                                disableFocusListener
                                disableHoverListener
                                disableTouchListener
                                title="Please fill the required * fields to proceed. If Maximum Credit Allowed is Rs 0.00 field will be disabled."
                                arrow
                            >
                                < InfoIcon onClick={handleTooltipOpen} style={{ fontSize: '1.3em', verticalAlign: 'middle', marginRight: '10px' }} />
                            </Tooltip>
                        </ClickAwayListener>
                    }

                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => onSubmit()}
                    >
                        {action === "View" ? 'Done' : 'Submit'}
                    </Button>

                </div>

            </div>

        </div>
    )
}
