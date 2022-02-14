import React from 'react';
import { Controller } from 'react-hook-form';

//Material UI Components
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import Divider from '@mui/material/Divider';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//SCSS Styling
import style from './StepTwo.module.scss';

export default function StepTwo(props) {

    const { action, formStep, handleClosePopUp, control, backFormStep, watch, completeFormStep } = props;

    return (
        <div className={style.two}>

            <div className={style.header}>

                <div className={style.title}>
                    <div>
                        Confirm Customer and Order Details
                    </div>
                    <div>
                        <HighlightOffIcon
                            className={style.icon}
                            onClick={handleClosePopUp}
                        />
                    </div>
                </div>

                {
                    action === "Create" && formStep === 1 &&
                    <div className={style.step}>
                        Step 2 of 5
                    </div>
                }

                {
                    action === "Edit" && formStep === 0 &&
                    <div className={style.step}>
                        Step 1 of 4
                    </div>
                }

                {
                    action === "View" && formStep === 0 &&
                    <div className={style.step}>
                        Step 1 of 3
                    </div>
                }

            </div>

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
                        Order Placed at
                    </div>
                    <div className={style.customerData}>
                        <Controller
                            name={"orderplacedat"}
                            control={control}
                            render={({ field: { value } }) => (
                                <Typography className={style.input}>
                                    {/* {value.split("T")[0]} {value.substring(value.indexOf('T') + 1)} */}
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
                        Sales Representative
                    </div>
                    <div className={style.customerData}>
                        <Controller
                            name={"ordercreatedby"}
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


                {
                    watch('customertype') === "Registered Customer" &&
                    <div className={style.row}>
                        <div className={style.boldText}>
                            Maximum Credit Amount allowed
                        </div>
                        <div className={style.customerData}>
                            <Controller
                                name={"maximumcreditamount"}
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

            </div>


            <div className={style.footer}>

                <div className={style.backBtn}>
                    {
                        action === "Create" &&
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
                        onClick={completeFormStep}
                        variant="contained"
                    >
                        {action === "Create" && "Confirm & Next"}
                        {action === "Edit" && "Next"}
                        {action === "View" && "Next"}
                    </Button>
                </div>

            </div>

        </div>
    )
}
