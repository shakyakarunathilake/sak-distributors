import React from 'react';

//Material UI Components
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//SCSS Styling
import style from './StepTwo.module.scss';

export default function StepTwo(props) {

    const { customerType, setOpenPopup, orderFormData, backFormStep, completeFormStep } = props;

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
                            onClick={() => { setOpenPopup(false) }}
                        />
                    </div>
                </div>

                <div className={style.step}>
                    Step 2 of 4
                </div>

            </div>

            <div className={style.body}>

                <div className={style.row}>
                    <div className={style.boldText}>
                        Order No.
                    </div>
                    <div className={style.customerData}>
                        <Typography className={style.input}>
                            {orderFormData.orderno}
                        </Typography>
                    </div>
                </div>

                {
                    customerType === "Registered Customer" &&
                    <div className={style.row}>
                        <div className={style.boldText}>
                            Customer ID
                        </div>
                        <div className={style.customerData}>
                            <Typography className={style.input}>
                                {orderFormData.customerid}
                            </Typography>
                        </div>
                    </div>

                }

                <div className={style.row}>
                    <div className={style.boldText}>
                        Customer Name
                    </div>
                    <div className={style.customerData}>
                        <Typography className={style.input}>
                            {orderFormData.storename}
                        </Typography>
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.boldText}>
                        Contact No.
                    </div>
                    <div className={style.customerData}>
                        <Typography className={style.input}>
                            {orderFormData.contactnumber}
                        </Typography>
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.boldText}>
                        Shipping Address
                    </div>
                    <div className={style.customerData}>
                        <Typography className={style.input}>
                            {orderFormData.shippingaddress}
                        </Typography>
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.boldText}>
                        Route
                    </div>
                    <div className={style.customerData}>
                        <Typography className={style.input}>
                            {orderFormData.route}
                        </Typography>
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.boldText}>
                        Order Placed at
                    </div>
                    <div className={style.customerData}>
                        <Typography className={style.input}>
                            {orderFormData.orderplacedat}
                        </Typography>
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.boldText}>
                        Delivery Date
                    </div>
                    <div className={style.customerData}>
                        <Typography className={style.input}>
                            {orderFormData.deliverydate}
                        </Typography>
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.boldText}>
                        Sales Representative
                    </div>
                    <div className={style.customerData}>
                        <Typography className={style.input}>
                            {orderFormData.ordercreatedby}
                        </Typography>
                    </div>
                </div>

            </div>

            <div className={style.footer}>

                <div className={style.backBtn}>
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
                        Confirm
                    </Button>
                </div>

            </div>

        </div>
    )
}
