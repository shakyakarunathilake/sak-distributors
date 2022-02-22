import React from 'react';
import { Controller } from 'react-hook-form';
import classnames from 'classnames';

//Material UI Components
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import Divider from '@mui/material/Divider';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//Shared functions 
import NumberWithCommas from '../NumberWithCommas';

//SCSS Styles
import style from './CompletePaymentFormStepOne.module.scss';

export default function CompletePaymentFormStepOne(props) {

    const {
        action,
        handleClosePopUp,
        control,
        backFormStep,
        completeFormStep,
        onSubmit
    } = props;

    return (

        <div className={style.container}>

            <div className={style.header}>

                <div className={style.title}>

                    <div>
                        {action === 'Complete Payment' && 'Complete Payment'}
                        {action === 'View Complete Payment' && 'View Payment'}
                    </div>

                    <div>
                        <HighlightOffIcon
                            className={style.icon}
                            onClick={() => handleClosePopUp()}
                        />
                    </div>

                </div>

                {
                    action === 'Complete Payment' &&
                    <div className={style.step}>
                        Step 1 of 2
                    </div>
                }

            </div>

            <div className={style.body}>

                <div className={style.columns}>

                    <div className={style.details}>

                        <div className={style.row}>
                            <div className={style.boldText}>
                                PO Number
                            </div>
                            <div className={style.customerData}>
                                <Controller
                                    name={"ponumber"}
                                    control={control}
                                    render={({ field: { value } }) => (
                                        <Typography
                                            className={
                                                classnames(
                                                    style.blue,
                                                    style.input,
                                                )
                                            }
                                        >
                                            {value}
                                        </Typography>
                                    )}
                                />
                            </div>
                        </div>

                        <div className={style.row}>
                            <div className={style.boldText}>
                                Supplier
                            </div>
                            <div className={style.customerData}>
                                <Controller
                                    name={"supplier"}
                                    control={control}
                                    render={({ field: { value } }) => (
                                        <Typography className={style.input}>
                                            {value}
                                        </Typography>
                                    )}
                                />
                            </div>
                        </div>

                        <div className={style.row}>
                            <div className={style.boldText}>
                                Paid at
                            </div>
                            <div className={style.customerData}>
                                <Controller
                                    name={"advancepaymentpaidat"}
                                    control={control}
                                    render={({ field: { value } }) => (
                                        <Typography className={style.input}>
                                            {value}
                                        </Typography>
                                    )}
                                />
                            </div>
                        </div>

                        <div className={style.row}>
                            <div className={style.boldText}>
                                Paid by
                            </div>
                            <div className={style.customerData}>
                                <Controller
                                    name={"advancepaymentpaidby"}
                                    control={control}
                                    render={({ field: { value } }) => (
                                        <Typography className={style.input}>
                                            {value}
                                        </Typography>
                                    )}
                                />
                            </div>
                        </div>

                    </div>

                    <div className={style.details}>

                        <div className={style.row}>
                            <div className={style.boldText}>
                                GRN Number
                            </div>
                            <div className={style.customerData}>
                                <Controller
                                    name={"grnnumber"}
                                    control={control}
                                    render={({ field: { value } }) => (
                                        <Typography
                                            className={
                                                classnames(
                                                    style.blue,
                                                    style.input,
                                                )
                                            }
                                        >
                                            {value}
                                        </Typography>
                                    )}
                                />
                            </div>
                        </div>

                        <div className={style.row}>
                            <div className={style.boldText}>
                                Status
                            </div>
                            <div className={style.customerData}>
                                <Controller
                                    name={"status"}
                                    control={control}
                                    render={({ field: { value } }) => (
                                        <Typography
                                            className={
                                                classnames(
                                                    style.input,
                                                    value === 'Advance Payment To Be Paid' && style.yellow,
                                                    value === 'Advance Payment Paid' && style.orange,
                                                    value === 'Complete Payment' && style.green,
                                                )
                                            }
                                        >
                                            {value}
                                        </Typography>
                                    )}
                                />
                            </div>
                        </div>

                        <div className={style.row}>
                            <div className={style.boldText}>
                                Completed at
                            </div>
                            <div className={style.customerData}>
                                <Controller
                                    name={"paymentcompletedat"}
                                    control={control}
                                    render={({ field: { value } }) => (
                                        <Typography className={style.input}>
                                            {value}
                                        </Typography>
                                    )}
                                />
                            </div>
                        </div>

                        <div className={style.row}>
                            <div className={style.boldText}>
                                Completed by
                            </div>
                            <div className={style.customerData}>
                                <Controller
                                    name={"paymentcompletedby"}
                                    control={control}
                                    render={({ field: { value } }) => (
                                        <Typography className={style.input}>
                                            {value}
                                        </Typography>
                                    )}
                                />
                            </div>
                        </div>

                    </div>

                </div>

                <div className={style.box}>

                    <div className={style.row}>
                        <div className={style.boldText}>
                            PO Gross Total
                        </div>
                        <div className={style.customerData}>
                            <Controller
                                name={"pogrosstotal"}
                                control={control}
                                render={({ field: { value } }) => (
                                    <Typography className={style.rightInput}>
                                        Rs. {NumberWithCommas(value)}
                                    </Typography>
                                )}
                            />
                        </div>
                    </div>

                    <div className={style.row}>
                        <div className={style.boldText}>
                            Received Discounts
                        </div>
                        <div className={style.customerData}>
                            <Controller
                                name={"receiveddiscounts"}
                                control={control}
                                render={({ field: { value } }) => (
                                    <Typography className={style.rightInput}>
                                        Rs. {NumberWithCommas(value)}
                                    </Typography>
                                )}
                            />
                        </div>
                    </div>

                    <div className={style.row}>
                        <div className={style.boldText}>
                            Previous GRN Damaged/Missing items
                        </div>
                        <div className={style.customerData}>
                            <Controller
                                name={"podamagedmissingitems"}
                                control={control}
                                render={({ field: { value } }) => (
                                    <Typography className={style.rightInput}>
                                        Rs. {NumberWithCommas(value)}
                                    </Typography>
                                )}
                            />
                        </div>
                    </div>

                    <div className={style.row}>
                        <div className={style.boldText}>
                            PO Total
                        </div>
                        <div className={style.customerData}>
                            <Controller
                                name={"pototal"}
                                control={control}
                                render={({ field: { value } }) => (
                                    <Typography className={style.rightInput}>
                                        Rs. {NumberWithCommas(value)}
                                    </Typography>
                                )}
                            />
                        </div>
                    </div>

                    <div className={style.dividerDiv}>
                        <Divider variant="middle" />
                    </div>

                    <div className={style.row}>
                        <div className={style.boldText}>
                            Advance Payment
                        </div>
                        <div className={style.customerData}>
                            <Controller
                                name={"advancepayment"}
                                control={control}
                                render={({ field: { value } }) => (
                                    <Typography className={style.rightInput}>
                                        Rs. {NumberWithCommas(value)}
                                    </Typography>
                                )}
                            />
                        </div>
                    </div>

                </div>

                <div className={style.box}>

                    <div className={style.row}>
                        <div className={style.boldText}>
                            GRN Gross Total
                        </div>
                        <div className={style.customerData}>
                            <Controller
                                name={"grngrosstotal"}
                                control={control}
                                render={({ field: { value } }) => (
                                    <Typography className={style.rightInput}>
                                        Rs. {NumberWithCommas(value)}
                                    </Typography>
                                )}
                            />
                        </div>
                    </div>

                    <div className={style.row}>
                        <div className={style.boldText}>
                            Damaged & Missing Items
                        </div>
                        <div className={style.customerData}>
                            <Controller
                                name={"grndamagedmissingitems"}
                                control={control}
                                render={({ field: { value } }) => (
                                    <Typography className={style.rightInput}>
                                        Rs. {NumberWithCommas(value)}
                                    </Typography>
                                )}
                            />
                        </div>
                    </div>

                    <div className={style.row}>
                        <div className={style.boldText}>
                            GRN Total
                        </div>
                        <div className={style.customerData}>
                            <Controller
                                name={"grntotal"}
                                control={control}
                                render={({ field: { value } }) => (
                                    <Typography className={style.rightInput}>
                                        Rs. {NumberWithCommas(value)}
                                    </Typography>
                                )}
                            />
                        </div>
                    </div>

                </div>

                <div className={style.row}>
                    <div className={style.boldText}>
                        Paid Amount
                    </div>
                    <div className={style.customerData}>
                        <Controller
                            name={"paidamount"}
                            control={control}
                            render={({ field: { value } }) => (
                                <Typography className={style.rightInput}>
                                    Rs. {NumberWithCommas(value)}
                                </Typography>
                            )}
                        />
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.boldText}>
                        Amount to Settle
                    </div>
                    <div className={style.customerData}>
                        <Controller
                            name={"debt"}
                            control={control}
                            render={({ field: { value } }) => (
                                <Typography className={style.rightInput}>
                                    Rs. {NumberWithCommas(value)}
                                </Typography>
                            )}
                        />
                    </div>
                </div>

            </div >

            <div className={style.footer}>

                <div className={style.backBtn}>
                    {
                        action !== 'View Complete Payment' &&
                        <Button
                            onClick={backFormStep}
                            variant="contained"
                        >
                            Back
                        </Button>
                    }
                </div>

                <div className={style.doneBtn}>
                    <Button
                        onClick={action === 'View Complete Payment' ? onSubmit : completeFormStep}
                        variant="contained"
                    >
                        {action === 'View Complete Payment' ? "Done" : " Next"}
                    </Button>
                </div>

            </div>

        </div >

    )
}
