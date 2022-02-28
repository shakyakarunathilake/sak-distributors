import React from 'react';
import { useForm } from 'react-hook-form';
import formData from 'form-data';

//Material UI 
import { Button } from '@material-ui/core';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//SCSS Style
import style from './DeliveredPaidForm.module.scss';

export default function DeliveredPaidForm(props) {

    const { handleClosePopUp, addOrEdit, action, orderRecords } = props;

    const today = new Date();

    const date = today.getFullYear() + '-' +
        (today.getMonth() > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`) + '-' +
        (today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`);

    const time = (today.getHours() > 9 ? today.getHours() : `0${today.getHours()}`) + ":" +
        (today.getMinutes() > 9 ? today.getMinutes() : `0${today.getMinutes()}`) + ":" +
        (today.getSeconds() > 9 ? today.getSeconds() : `0${today.getSeconds()}`);

    const dateTime = date + ' ' + time;

    const firstname = JSON.parse(sessionStorage.getItem("Auth")).firstname;
    const lastname = JSON.parse(sessionStorage.getItem("Auth")).lastname;
    const employeeid = JSON.parse(sessionStorage.getItem("Auth")).employeeid;

    const { handleSubmit, getValues } = useForm({
        mode: 'all',
        defaultValues: {
            orderno: orderRecords.orderno,
            deliveredat: dateTime,
            deliveredby: `${firstname} ${lastname} (${employeeid})`,
            completedat: dateTime,
            completedby: `${firstname} ${lastname} (${employeeid})`,
        }
    })

    const onSubmit = () => {

        const ginFormData = new formData();

        if (action === 'Delivered') {
            ginFormData.append('deliveredat', getValues('deliveredat'));
            ginFormData.append('deliveredby', getValues('deliveredby'));
            ginFormData.append('status', 'Delivered');
        } else {
            ginFormData.append('completedat', getValues('completedat'));
            ginFormData.append('completedby', getValues('completedby'));
            ginFormData.append('status', 'Paid');
        }


        addOrEdit(ginFormData, getValues('orderno'));

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

                <span className={style.blue}>Order Number: {getValues('orderno')} </span> <br />
                {
                    action === "Delivered" ?
                        <p>The above order has been delivered. </p>
                        : <p>The above order has been fully paid. </p>
                }
                Once you approve status changes cannot be undone.

            </div>


            <div className={style.footer}>

                <Button
                    color="primary"
                    variant="contained"
                    onClick={onSubmit}
                >
                    {action === "Delivered" ? "Approve Delivery" : "Approve Payment"}
                </Button>

            </div>

        </form >
    )
}
