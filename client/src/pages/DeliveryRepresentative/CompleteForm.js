import React from 'react';
import { useForm } from 'react-hook-form';
import formData from 'form-data';

//Material UI 
import { Button } from '@material-ui/core';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//SCSS Style
import style from './CompleteForm.module.scss';

export default function DispatchForm(props) {

    const { handleClosePopUp, addOrEdit, orderRecords } = props;

    const { handleSubmit } = useForm()

    const onSubmit = () => {

        const ginFormData = new formData();

        ginFormData.append('orderno', orderRecords.orderno);
        ginFormData.append('status', 'Complete');

        addOrEdit(ginFormData, orderRecords.orderno);

    }

    return (
        <form
            className={style.container}
            onSubmit={handleSubmit(onSubmit)}
        >

            <div className={style.header}>
                <div>
                    Confirm Order Status
                </div>
                <div>
                    <HighlightOffIcon
                        className={style.icon}
                        onClick={() => { handleClosePopUp() }}
                    />
                </div>
            </div>

            <div className={style.body}>
                <span className={style.blue}>Order Number: {orderRecords.orderno} </span> <br />
                The above order has been delivered. <br />
                Once you approve dispatch changes cannot be undone.
            </div>


            <div className={style.footer}>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={onSubmit}
                >
                    Approve Delivery
                </Button>
            </div>

        </form >
    )
}
