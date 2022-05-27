import React from 'react';
import { Controller } from 'react-hook-form';

//Material UI Components
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import Divider from '@mui/material/Divider';

//Shared functions 
import NumberWithCommas from '../NumberWithCommas';

//SCSS Styling
import style from './ViewOrderDetailsTabletStepOne.module.scss';

export default function ViewOrderDetailsTabletStepOne(props) {

    const { control, watch, completeFormStep } = props;

    return (

        <div className={style.container}>

            <div className={style.body}>

                <div className={style.row}>
                    <div className={style.boldText}>
                        Order No.
                    </div>
                    <div className={style.customerData}>
                        <Controller
                            name={"orderno"}
                            control={control}
                            render={({ field: { value } }) => (
                                <Typography className={style.input}>
                                    {value}
                                </Typography>
                            )}
                        />
                    </div>
                </div>

                {
                    watch('customertype') === "Registered Customer" &&
                    <div className={style.row}>
                        <div className={style.boldText}>
                            Customer ID
                        </div>
                        <div className={style.customerData}>
                            <Controller
                                name={"customerid"}
                                control={control}
                                render={({ field: { value } }) => (
                                    <Typography className={style.input}>
                                        {value}
                                    </Typography>
                                )}
                            />
                        </div>
                    </div>

                }

                <div className={style.row}>
                    <div className={style.boldText}>
                        Store Name
                    </div>
                    <div className={style.customerData}>
                        <Controller
                            name={"storename"}
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
                        Contact No.
                    </div>
                    <div className={style.customerData}>
                        <Controller
                            name={"contactnumber"}
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
                        Shipping Address
                    </div>
                    <div className={style.customerData}>
                        <Controller
                            name={"shippingaddress"}
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
                        Route
                    </div>
                    <div className={style.customerData}>
                        <Controller
                            name={"route"}
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
                        Delivery Date
                    </div>
                    <div className={style.customerData}>
                        <Controller
                            name={"deliverydate"}
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
                        Status
                    </div>
                    <div className={style.customerData}>
                        <Controller
                            name={"status"}
                            control={control}
                            render={({ field: { value } }) => (
                                value === 'Pending' ?
                                    <Typography style={{ color: "#745590", fontWeight: "600" }}>
                                        {value}
                                    </Typography>
                                    : value === 'Processing' ?
                                        <Typography style={{ color: "#2196F3", fontWeight: "600" }}>
                                            {value}
                                        </Typography>
                                        : value === 'Shipping' ?
                                            <Typography style={{ color: "#EED202", fontWeight: "600" }}>
                                                {value}
                                            </Typography>
                                            : value === 'Delivered' ?
                                                <Typography style={{ color: "#FF8400", fontWeight: "600" }}>
                                                    {value}
                                                </Typography>
                                                : <Typography style={{ color: "#4CAF50", fontWeight: "600" }}>
                                                    {value}
                                                </Typography>
                            )}
                        />
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.boldText}>
                        Order Placed by/at
                    </div>
                    <div className={style.customerData}>
                        <Controller
                            name={"ordercreatedbyat"}
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
                        Delivered by / at
                    </div>
                    <div className={style.customerData}>
                        <Controller
                            name={"deliveredbyat"}
                            control={control}
                            render={({ field: { value } }) => (
                                <Typography className={style.input}>
                                    {value}
                                </Typography>
                            )}
                        />
                    </div>
                </div>

                {
                    watch('customertype') === "Registered Customer" &&
                    <div className={style.dividerDiv}>
                        <Divider variant="middle" />
                    </div>
                }

                {
                    watch('customertype') === "Registered Customer" &&
                    <div className={style.row}>
                        <div className={style.boldText}>
                            Loyalty Points
                        </div>
                        <div className={style.customerData}>
                            <Controller
                                name={"loyaltypoints"}
                                control={control}
                                render={({ field: { value } }) => (
                                    <Typography className={style.input}>
                                        {value}
                                    </Typography>
                                )}
                            />
                        </div>
                    </div>
                }

                {
                    watch('customertype') === "Registered Customer" &&
                    <div className={style.row}>
                        <div className={style.boldText}>
                            Loyalty points as credits
                        </div>
                        <div className={style.customerData}>
                            <Controller
                                name={"loyaltypointsincash"}
                                control={control}
                                render={({ field: { value } }) => (
                                    <Typography className={style.input}>
                                        Rs {NumberWithCommas(value)}
                                    </Typography>
                                )}
                            />
                        </div>
                    </div>

                }

                {
                    watch('customertype') === "Registered Customer" &&
                    <div className={style.row}>
                        <div className={style.boldText}>
                            Credit amount to settle
                        </div>
                        <div className={style.customerData}>
                            <Controller
                                name={"creditamounttosettle"}
                                control={control}
                                render={({ field: { value } }) => (
                                    <Typography className={style.input}>
                                        Rs {value}
                                    </Typography>
                                )}
                            />
                        </div>
                    </div>
                }

                {
                    watch('customertype') === "Registered Customer" &&
                    <div className={style.row}>
                        <div className={style.boldText}>
                            Eligibility to Credit
                        </div>
                        <div className={style.customerData}>
                            <Controller
                                name={"eligibilityforcredit"}
                                control={control}
                                render={({ field: { value } }) => (
                                    <Typography className={style.input}>
                                        {value === true ? 'Yes' : 'No'}
                                    </Typography>
                                )}
                            />
                        </div>
                    </div>
                }

            </div>


            <div className={style.footer}>

                <Button
                    onClick={completeFormStep}
                    variant="contained"
                >
                    Next
                </Button>

            </div>

        </div>
    )
}
