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
import style from './CompletePaymentFormStepTwo.module.scss';

export default function CompletePaymentFormStepTwo(props) {

    const {
        handleClosePopUp,
        control,
        backFormStep,
        onSubmit,
        setValue,
        getValues
    } = props;

    const handleSubmit = () => {
        setValue('paidamount', getValues('grntotal'));
        setValue('debt', '0.00');

        onSubmit();
    }

    return (
        <div className={style.container}>

            <div className={style.header}>

                <div className={style.title}>

                    <div>
                        Complete Payment
                    </div>

                    <div>
                        <HighlightOffIcon
                            className={style.icon}
                            onClick={() => handleClosePopUp()}
                        />
                    </div>

                </div>

                <div className={style.step}>
                    Step 2 of 2
                </div>

            </div>

            <div className={style.body}>

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
                        onClick={handleSubmit}
                        variant="contained"
                    >
                        Confirm & Submit
                    </Button>
                </div>

            </div>

        </div >
    )
}
