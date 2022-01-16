import React from 'react';
import { Controller } from 'react-hook-form';

//Material UI Components
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { InputAdornment } from '@material-ui/core';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import InfoIcon from '@mui/icons-material/Info';

//Shared Components
import TextField from '../../shared/TextField/TextField';

//SCSS Styling
import style from './StepFive.module.scss';

export default function StepFive(props) {

    const {
        action,
        formStep,
        handleClosePopUp,
        onSubmit,
        total,
        errors,
        control,
        getValues
    } = props;

    const [open, setOpen] = React.useState(false);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

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

                <div className={style.row}>
                    <div className={style.boldText}>
                        Total
                    </div>
                    <div className={style.customerData}>
                        Rs. {total}
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.boldText}>
                        Advance Payment
                    </div>
                    <div className={style.customerData}>
                        Rs. 0.00
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.boldText}>
                        Previous credit amount to settle
                    </div>
                    <div className={style.customerData}>
                        Rs. 0.00
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.boldText}>
                        Loyalty Points
                    </div>
                    <div className={style.customerData}>
                        0
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.boldText}>
                        Maximum credit amount
                    </div>
                    <div className={style.customerData}>
                        Rs. 0.00
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.boldText}>
                        Credit amount for current invoice <span className={action === "View" ? style.hidden : style.redFont}>*</span>
                    </div>

                    {action === "View" ?
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
                        :
                        <div className={style.customerData} dir="rtl">
                            <Controller
                                name={"currentcreditamount"}
                                control={control}
                                rules={
                                    { required: true, message: "Required *" },
                                    { pattern: { value: /^[0-9]+\.[0-9]{2}$/, message: "Invalid" } }
                                }
                                render={({ field: { onChange, value } }) => (
                                    <TextField
                                        fullWidth={true}
                                        type="number"
                                        value={value || ''}
                                        error={errors.currentcreditamount ? true : false}
                                        helperText={errors.currentcreditamount && errors.currentcreditamount.message}
                                        onChange={onChange}
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
                            />
                        </div>
                    }
                </div>

            </div>

            <div className={style.footer}>

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
                        title="Please fill the required * fields to proceed"
                        arrow
                    >
                        < InfoIcon onClick={handleTooltipOpen} style={{ fontSize: '1.3em', verticalAlign: 'middle', marginRight: '10px' }} />
                    </Tooltip>
                </ClickAwayListener>

                <Button
                    disabled={getValues('currentcreditamount') == ''}
                    color="primary"
                    variant="contained"
                    onClick={() => onSubmit()}
                >
                    {action === "View" ? 'Done' : 'Submit'}
                </Button>

            </div>

        </div>
    )
}
