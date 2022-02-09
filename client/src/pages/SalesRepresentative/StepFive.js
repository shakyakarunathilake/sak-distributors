import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

//Material UI Components
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';
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

//SCSS Styling
import style from './StepFive.module.scss';

export default function StepFive(props) {

    const {
        customerType,
        action,
        formStep,
        handleClosePopUp,
        onSubmit,
        total,
        advancePayment,
        errors,
        control,
        getValues,
        backFormStep,
        minimumPayment,
        setMinimumPayment,
        invoiceSettlementValue,
        setInvoiceSettlementValue,
    } = props;

    useEffect(() => {
        calculatePayments();
    }, [])

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

        if (customerType === "Registered Customer") {
            creditamounttosettle = getValues('creditamounttosettle');
            currentinvoicecreditamount = parseInt(getValues('currentinvoicecreditamount'));
        }

        let minimumpayment = 0.00;
        let invoicesettlementvalue = 0.00;

        if (creditamounttosettle === '0.00' && currentinvoicecreditamount === 0) {
            minimumpayment = parseInt(advancePayment);
            invoicesettlementvalue = parseInt(total);

            setMinimumPayment(minimumpayment.toFixed(2));
            setInvoiceSettlementValue(invoicesettlementvalue.toFixed(2));
        }

        if (creditamounttosettle !== '0.00' && currentinvoicecreditamount === 0) {
            minimumpayment = parseInt(advancePayment) + parseInt(creditamounttosettle);
            invoicesettlementvalue = parseInt(total) + parseInt(creditamounttosettle);

            setMinimumPayment(minimumpayment.toFixed(2));
            setInvoiceSettlementValue(invoicesettlementvalue.toFixed(2));
        };

        if (creditamounttosettle === '0.00' && currentinvoicecreditamount !== 0) {
            minimumpayment = parseInt(advancePayment) - parseInt(currentinvoicecreditamount);
            invoicesettlementvalue = parseInt(total);

            setMinimumPayment(minimumpayment.toFixed(2));
            setInvoiceSettlementValue(invoicesettlementvalue.toFixed(2));
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
                    customerType === "Registered Customer" &&

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
                                Rs {getValues('maximumcreditamount')}
                            </div>
                        </div>

                    </div>

                }

                <div className={style.detailRow}>


                    {
                        customerType === "Registered Customer" &&
                        <div className={style.row}>
                            <div className={style.boldText}>
                                Previous credit amount to settle
                            </div>
                            <div className={style.customerData}>
                                Rs. {getValues('creditamounttosettle')}
                            </div>
                        </div>
                    }

                    <div className={style.row}>
                        <div className={style.boldText}>
                            Current Invoice Total
                        </div>
                        <div className={style.customerData}>
                            Rs. {total}
                        </div>
                    </div>

                    <div className={style.row}>
                        <div className={style.boldText}>
                            Current Invoice Advance Payment
                        </div>
                        <div className={style.customerData}>
                            Rs. {advancePayment}
                        </div>
                    </div>

                    {
                        action === "View" &&
                        customerType === "Registered Customer" &&
                        <div className={style.row}>
                            <div className={style.boldText}>
                                Current Invoice Credit Amount
                            </div>
                            <div className={style.customerData}>
                                <Controller
                                    name={"currentinvoicecreditamount"}
                                    control={control}
                                    render={({ field: { value } }) => (
                                        <Typography className={style.input}>
                                            Rs. {value}
                                        </Typography>
                                    )}
                                />
                            </div>
                        </div>

                    }


                    {
                        action !== "View" &&
                        customerType === "Registered Customer" &&
                        <div className={style.row}>
                            <div className={style.boldText}>
                                Current Invoice Credit Amount  <span className={style.redFont}>*</span>
                            </div>
                            <div className={style.customerData} dir="rtl">
                                <Controller
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            focused={getValues('maximumcreditamount') !== '0.00'}
                                            disabled={getValues('maximumcreditamount') === '0.00'}
                                            type="number"
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
                                    defaultValue={0.00}
                                    rules={
                                        { required: { value: true, message: "Required *" } },
                                        { pattern: { value: /^[0-9]+\.[0-9]{2}$/, message: "Invalid" } }
                                    }
                                />
                                <CalculateIcon
                                    className={style.icon}
                                    onClick={() => calculatePayments()}
                                    disabled={getValues('maximumcreditamount') === '0.00'}
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
                            Rs. {minimumPayment}
                        </div>
                    </div>

                    <div className={style.row}>
                        <div className={style.boldText}>
                            Invoice Settlement Value
                        </div>
                        <div className={style.customerData}>
                            Rs. {invoiceSettlementValue}
                        </div>
                    </div>

                </div>

            </div>

            <div className={style.footer}>

                <div className={style.backBtn}>
                    <Button
                        variant="contained"
                        onClick={backFormStep}
                        style={{
                            backgroundColor: '#ACA9BB',
                            color: 'white'
                        }}
                    >
                        Back
                    </Button>
                </div>

                <div className={style.submitBtn}>

                    {
                        action !== "View" &&
                        getValues('maximumcreditamount') !== 0 &&
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
