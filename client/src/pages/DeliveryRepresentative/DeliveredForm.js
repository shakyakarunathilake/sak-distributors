import React from 'react';
import { useForm } from 'react-hook-form';
import formData from 'form-data';

//Material UI 
import { Button } from '@material-ui/core';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//SCSS Style
import style from './DeliveredForm.module.scss';

export default function DispatchForm(props) {

    const { handleClosePopUp, addOrEdit, orderRecords } = props;

    const { handleSubmit } = useForm()

    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;

    const onSubmit = () => {

        const ginFormData = new formData();

        ginFormData.append('orderno', orderRecords.orderno);
        ginFormData.append('deliveredat', dateTime);
        ginFormData.append('status', 'Delivered');

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
                Once you approve delivered changes cannot be undone.
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