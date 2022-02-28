import React from 'react';

//Material UI Components
import Button from '@material-ui/core/Button';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//SCSS Styles
import style from './CompletePaymentFormStepTwo.module.scss';

export default function CompletePaymentFormStepTwo(props) {

    const {
        handleClosePopUp,
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

                <div className={style.details}>
                    <div className={style.title}>
                        PO Number
                    </div>
                    <div className={style.info}>
                        {getValues('ponumber')}
                    </div>
                </div>

                <div className={style.details}>
                    <div className={style.title}>
                        GRN Number
                    </div>
                    <div className={style.info}>
                        {getValues('grnnumber')}
                    </div>
                </div>

                <p>
                    The above purchase order is going to be fully paid.
                    <br />
                    Once you approve, changes cannot be undone.
                </p>

                <p>
                    Please confirm payment.
                </p>

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
