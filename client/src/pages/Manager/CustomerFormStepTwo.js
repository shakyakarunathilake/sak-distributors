import React from 'react';
import classnames from 'classnames';
import { Controller } from 'react-hook-form';

//Material UI Components
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//SCSS Styles
import style from './CustomerFormStepTwo.module.scss';

export default function CustomerFormStepTwo(props) {

    const {
        control,
        setOpenPopup,
        onSubmit,
        backFormStep,
        action
    } = props;

    return (
        <div className={style.container}>

            <div className={style.header}>

                <div className={style.title}>
                    <div>
                        {action === "Create" && "Create Customer"}
                        {action === "Edit" && "Edit Customer"}
                        {action === "View" && "View Customer"}
                    </div>
                    <div>
                        <HighlightOffIcon
                            className={style.icon}
                            onClick={() => { setOpenPopup(false) }}
                        />
                    </div>
                </div>

                {
                    action !== "View" &&
                    <div className={style.step}>
                        Step 2 of 2
                    </div>
                }

            </div>

            <div className={style.body} >

                <div className={style.row}>
                    <div className={style.boldText}>
                        Cus. ID
                    </div>
                    <div className={style.customerData}>
                        <Controller
                            render={({ field: { value } }) => (
                                <Typography className={classnames(style.input, style.blue)}>
                                    {value}
                                </Typography>
                            )}
                            name={"customerid"}
                            control={control}
                        />
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.boldText}>
                        BRN
                    </div>
                    <div className={style.customerData}>
                        <Controller
                            render={({ field: { value } }) => (
                                <Typography className={style.input}>
                                    {value}
                                </Typography>
                            )}
                            name={"brn"}
                            control={control}
                        />
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.boldText}>
                        Name of the Store
                    </div>
                    <div className={style.customerData}>
                        <Controller
                            render={({ field: { value } }) => (
                                <Typography className={style.input}>
                                    {value}
                                </Typography>
                            )}
                            name={"storename"}
                            control={control}
                        />
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.boldText}>
                        Full Name
                    </div>
                    <div className={style.customerData}>
                        <Controller
                            render={({ field: { value } }) => (
                                <Typography className={style.input}>
                                    {value}
                                </Typography>
                            )}
                            name={"fullname"}
                            control={control}
                        />
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.boldText}>
                        Calling Name
                    </div>
                    <div className={style.customerData}>
                        <Controller
                            render={({ field: { value } }) => (
                                <Typography className={style.input}>
                                    {value}
                                </Typography>
                            )}
                            name={"title"}
                            control={control}
                        />
                        &nbsp;
                        <Controller
                            render={({ field: { value } }) => (
                                <Typography className={style.input}>
                                    {value}
                                </Typography>
                            )}
                            name={"firstname"}
                            control={control}
                        />
                        &nbsp;
                        <Controller
                            render={({ field: { value } }) => (
                                <Typography className={style.input}>
                                    {value}
                                </Typography>
                            )}
                            name={"lastname"}
                            control={control}
                        />
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.boldText}>
                        Route
                    </div>
                    <div className={style.customerData}>
                        <Controller
                            render={({ field: { value } }) => (
                                <Typography className={style.input}>
                                    {value}
                                </Typography>
                            )}
                            name={"route"}
                            control={control}
                        />
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.boldText}>
                        Shipping Address
                    </div>
                    <div className={style.customerData}>
                        <Controller
                            render={({ field: { value } }) => (
                                <Typography className={style.input}>
                                    {value}
                                </Typography>
                            )}
                            name={"shippingaddress"}
                            control={control}
                        />
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.boldText}>
                        Billing Address
                    </div>
                    <div className={style.customerData}>
                        <Controller
                            render={({ field: { value } }) => (
                                <Typography className={style.input}>
                                    {value}
                                </Typography>
                            )}
                            name={"billingaddress"}
                            control={control}
                        />
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.boldText}>
                        Store Contact Number
                    </div>
                    <div className={style.customerData}>
                        <Controller
                            render={({ field: { value } }) => (
                                <Typography className={style.input}>
                                    {value ? value : "Not Given"}
                                </Typography>
                            )}
                            name={"storecontactnumber"}
                            control={control}
                        />
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.boldText}>
                        Customer Contact Number
                    </div>
                    <div className={style.customerData}>
                        <Controller
                            render={({ field: { value } }) => (
                                <Typography className={style.input}>
                                    {value ? value : "Not Given"}
                                </Typography>
                            )}
                            name={"customercontactnumber"}
                            control={control}
                        />
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.boldText}>
                        Email
                    </div>
                    <div className={style.customerData}>
                        <Controller
                            render={({ field: { value } }) => (
                                <Typography className={style.input}>
                                    {value ? value : "Not Given"}
                                </Typography>
                            )}
                            name={"email"}
                            control={control}
                        />
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.boldText}>
                        Registered by
                    </div>
                    <div className={style.customerData}>
                        <Controller
                            render={({ field: { value } }) => (
                                <Typography className={style.input}>
                                    {value}
                                </Typography>
                            )}
                            name={"registeredby"}
                            control={control}
                        />

                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.boldText}>
                        Registered Date
                    </div>
                    <div className={style.customerData}>
                        <Controller
                            render={({ field: { value } }) => (
                                <Typography className={style.input}>
                                    {value}
                                </Typography>
                            )}
                            name={"addeddate"}
                            control={control}
                        />

                    </div>
                </div>

                {
                    action === "View" &&
                    <div className={style.row}>
                        <div className={style.boldText}>
                            Loyalty Points
                        </div>
                        <div className={style.customerData}>
                            <Controller
                                render={({ field: { value } }) => (
                                    <Typography className={classnames(style.input, style.green)}>
                                        {value}
                                    </Typography>
                                )}
                                name={"loyaltypoints"}
                                control={control}
                            />
                        </div>
                    </div>
                }

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

                <div className={style.doneBtn}>
                    <Button
                        onClick={onSubmit}
                        variant="contained"
                    >
                        {action === "Create" && "Confirm & Submit"}
                        {action === "Edit" && "Confirm & Submit"}
                        {action === "View" && "Done"}
                    </Button>
                </div>

            </div>

        </div >
    )
}
