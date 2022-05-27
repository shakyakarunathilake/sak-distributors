import React from 'react';
import { Controller } from 'react-hook-form';

//Material UI Components
import { Typography } from '@material-ui/core';

//Shared functions 
import NumberWithCommas from '../NumberWithCommas';

//Style
import style from './RegisteredCustomerRowOne.module.scss';

export default function RegisteredCustomerRowOne(props) {

    const { control } = props;

    return (
        <div className={style.container}>

            <div className={style.orderDetails}>

                <table className={style.details}>

                    <tbody>

                        <tr>
                            <th align="left"> Customer ID</th>
                            <td align="left">
                                <Controller
                                    name={"customerid"}
                                    control={control}
                                    render={({ field: { value } }) => (
                                        <Typography className={style.input}>
                                            ({value})
                                        </Typography>
                                    )}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th align="left"> Store Name</th>
                            <td align="left">
                                <Controller
                                    name={"storename"}
                                    control={control}
                                    render={({ field: { value } }) => (
                                        <Typography className={style.input}>
                                            {value}
                                        </Typography>
                                    )}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th align="left">
                                Contact No.
                            </th>
                            <td align="left">
                                <Controller
                                    name={"contactnumber"}
                                    control={control}
                                    render={({ field: { value } }) => (
                                        <Typography className={style.input}>
                                            {value}
                                        </Typography>
                                    )}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th align="left">
                                Shipping Address
                            </th>
                            <td align="left">
                                <Controller
                                    name={"shippingaddress"}
                                    control={control}
                                    render={({ field: { value } }) => (
                                        <Typography className={style.input}>
                                            {value}
                                        </Typography>
                                    )}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th align="left">
                                Route
                            </th>
                            <td align="left">
                                <Controller
                                    name={"route"}
                                    control={control}
                                    render={({ field: { value } }) => (
                                        <Typography className={style.input}>
                                            {value}
                                        </Typography>
                                    )}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th align="left">
                                Status
                            </th>
                            <td align="left">
                                <Controller
                                    name={"status"}
                                    control={control}
                                    render={({ field: { value } }) => (
                                        value === 'Pending' ?
                                            <Typography style={{ color: "#5E01AE", fontWeight: "600" }}>
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
                            </td>
                        </tr>

                    </tbody>

                </table>

                <table className={style.details}>

                    <tbody>

                        <tr>
                            <th align="left">
                                Delivery Date
                            </th>
                            <td align="left">
                                <Controller
                                    name={"deliverydate"}
                                    control={control}
                                    render={({ field: { value } }) => (
                                        <Typography className={style.input}>
                                            {value}
                                        </Typography>
                                    )}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th align="left">
                                Order Placed by/at
                            </th>
                            <td align="left">
                                <Controller
                                    name={"ordercreatedbyat"}
                                    control={control}
                                    render={({ field: { value } }) => (
                                        <Typography className={style.input}>
                                            {value}
                                        </Typography>
                                    )}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th align="left">
                                Delivered by / at
                            </th>
                            <td align="left">
                                <Controller
                                    name={"deliveredbyat"}
                                    control={control}
                                    render={({ field: { value } }) => (
                                        <Typography className={style.input}>
                                            {value}
                                        </Typography>
                                    )}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th align="left">
                                Loyalty Points
                            </th>
                            <td align="left">
                                <Controller
                                    name={"loyaltypoints"}
                                    control={control}
                                    render={({ field: { value } }) => (
                                        <Typography className={style.input}>
                                            {value}
                                        </Typography>
                                    )}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th align="left">
                                Eligibility to Credit
                            </th>
                            <td align="left">
                                <Controller
                                    name={"eligibilityforcredit"}
                                    control={control}
                                    render={({ field: { value } }) => (
                                        <Typography className={style.input}>
                                            {value === true ? 'Yes' : 'No'}
                                        </Typography>
                                    )}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th align="left">
                                Maximum Credit Amount allowed
                            </th>
                            <td align="left">
                                <Controller
                                    name={"maximumcreditamount"}
                                    control={control}
                                    render={({ field: { value } }) => (
                                        <Typography className={style.input}>
                                            Rs {NumberWithCommas(value)}
                                        </Typography>
                                    )}
                                />
                            </td>
                        </tr>

                    </tbody>

                </table>

            </div>

        </div>
    )
}
