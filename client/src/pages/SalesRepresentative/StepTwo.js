import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

//Material UI Components
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import InfoSharpIcon from '@mui/icons-material/InfoSharp';

//SCSS Styling
import style from './StepTwo.module.scss';

export default function StepTwo(props) {

    const { action, formStep, handleClosePopUp, control, backFormStep, getValues, completeFormStep } = props;

    // const [open, setOpen] = useState({
    //     'eligibilityforcredit': false,
    //     'maximumcreditamount': false
    // });

    // const handleTooltipClose = (attribute) => {
    //     setOpen({
    //         ...open,
    //         [attribute]: false
    //     });
    // };

    // const handleTooltipOpen = (attribute) => {
    //     setOpen({
    //         ...open,
    //         [attribute]: true
    //     });
    // };

    const onSubmit = () => {
        completeFormStep();
    }

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
                    getValues('customerid') &&
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
                    getValues('customerid') &&
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
                    getValues('customerid') &&
                    <div className={style.row}>
                        <div className={style.boldText}>
                            Previous credit to settle
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
                    getValues('customerid') &&
                    <div className={style.row}>
                        <div className={style.boldText}>
                            Eligibile for credit
                        </div>
                        <div className={style.customerData}>
                            <Controller
                                name={"eligibilityforcredit"}
                                control={control}
                                render={({ field: { value } }) => (
                                    <Typography className={style.input}>
                                        {value === true ? 'Yes' : 'No'}
                                        {/* <ClickAwayListener onClickAway={handleTooltipClose("eligibilityforcredit")}>
                                        <Tooltip
                                            PopperProps={{
                                                disablePortal: true,
                                            }}
                                            onClose={handleTooltipClose("eligibilityforcredit")}
                                            open={open['eligibilityforcredit']}
                                            disableFocusListener
                                            disableHoverListener
                                            disableTouchListener
                                            title="If the customer has previous amount to settle, he/she won't be eligible for credit"
                                            arrow
                                            placement="right"
                                            className='eligibilityforcredit'
                                        >
                                            <InfoSharpIcon
                                                className={style.infoSharpIcon}
                                                onClick={handleTooltipOpen("eligibilityforcredit")}
                                            />
                                        </Tooltip>
                                    </ClickAwayListener> */}
                                    </Typography>
                                )}
                            />
                        </div>
                    </div>
                }

                {
                    getValues('customerid') && getValues('eligibilityforcredit') &&
                    <div className={style.row}>
                        <div className={style.boldText}>
                            Maximum credit amount allowed
                        </div>
                        <div className={style.customerData}>
                            <Controller
                                name={"maximumcreditamount"}
                                control={control}
                                render={({ field: { value } }) => (
                                    <Typography className={style.input}>
                                        Rs {value}
                                        {/* <ClickAwayListener onClickAway={handleTooltipClose('maximumcreditamount')}>
                                        <Tooltip
                                            PopperProps={{
                                                disablePortal: true,
                                            }}
                                            onClose={handleTooltipClose('maximumcreditamount')}
                                            open={open['maximumcreditamount']}
                                            disableFocusListener
                                            disableHoverListener
                                            disableTouchListener
                                            title="Maximum credit amount depends on number of loyalty point the customer has earned"
                                            arrow
                                            placement="right"
                                        >
                                            <InfoSharpIcon
                                                className={style.infoSharpIcon}
                                                onClick={handleTooltipOpen('maximumcreditamount')}
                                            />
                                        </Tooltip>
                                    </ClickAwayListener> */}
                                    </Typography>
                                )}
                            />
                        </div>
                    </div>
                }

            </div>

            <div className={style.footer}>

                <div className={action === "Create" ? style.backBtn : style.hideBackBtn}>
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

                <div className={style.confirmBtn}>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            onSubmit()
                        }}
                    >
                        {action === "Create" ? 'Confirm' : 'Next'}
                    </Button>
                </div>

            </div>

        </div >
    )
}
