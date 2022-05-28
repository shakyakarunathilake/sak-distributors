import React from 'react';

//Material UI Components
import { Button } from '@material-ui/core';
import Divider from '@mui/material/Divider';

//Shared functions 
import NumberWithCommas from '../NumberWithCommas';

//SCSS Styling
import style from './ViewOrderDetailsTabletStepThree.module.scss';

export default function ViewOrderDetailsTabletStepThree(props) {

    const { getValues, watch, backFormStep, handleClose } = props;

    return (

        <div className={style.container}>

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
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleClose}
                    >
                        Done
                    </Button>
                </div>

            </div>

        </div>
    )
}
