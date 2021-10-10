import React, { useEffect } from 'react';

import { useForm, Controller } from 'react-hook-form';

//Material UI Components
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//SCSS Styles
import style from './ViewCustomer.module.scss';

export default function ViewCustomer(props) {
    const { setOpenPopup, setAction, customerRecords } = props;

    const { handleSubmit, control, setValue } = useForm();

    useEffect(() => {
        setValue("customerid", customerRecords.customerid);
        setValue("brn", customerRecords.brn);
        setValue("storename", customerRecords.storename);
        setValue("fullname", customerRecords.fullname);
        setValue("customername", `${customerRecords.title} ${customerRecords.firstname} ${customerRecords.lastname}`);
        setValue("route", customerRecords.route);
        setValue("addeddate", customerRecords.addeddate);
        setValue("shippingaddress", customerRecords.shippingaddress);
        setValue("billingaddress", customerRecords.billingaddress);
        setValue("customercontactnumber", customerRecords.customercontactnumber);
        setValue("storecontactnumber", customerRecords.storecontactnumber ? customerRecords.storecontactnumber : "Not Given");
        setValue("email", customerRecords.email ? customerRecords.email : "Not Given");
        setValue("registeredby", customerRecords.registeredby);
    }, [customerRecords])


    const onSubmit = () => {
        setOpenPopup(false);
        setAction('');
    };

    return (
        <div>
            <div className={style.container}>

                <div className={style.header}>
                    <div>View Customer</div>
                    <div>
                        <HighlightOffIcon
                            className={style.icon}
                            onClick={() => { setOpenPopup(false) }}
                        />
                    </div>
                </div>

                <div className={style.body}>
                    <form
                        className={style.form}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className={style.formFields}>

                            <div className={style.row}>
                                <div className={style.boldText}>
                                    Cus. ID
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

                            <div className={style.row}>
                                <div className={style.boldText}>
                                    BRN
                                </div>
                                <div className={style.customerData}>
                                    <Controller
                                        name={"brn"}
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
                                    Name of the Store
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
                                    Full Name
                                </div>
                                <div className={style.customerData}>
                                    <Controller
                                        name={"fullname"}
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
                                    Calling Name
                                </div>
                                <div className={style.customerData}>
                                    <Controller
                                        name={"customername"}
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
                                    Billing Address
                                </div>
                                <div className={style.customerData}>
                                    <Controller
                                        name={"billingaddress"}
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
                                    Store Contact Number
                                </div>
                                <div className={style.customerData}>
                                    <Controller
                                        name={"storecontactnumber"}
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
                                    Customer Contact Number
                                </div>
                                <div className={style.customerData}>
                                    <Controller
                                        name={"customercontactnumber"}
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
                                    Email
                                </div>
                                <div className={style.customerData}>
                                    <Controller
                                        name={"email"}
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
                                    Registered by
                                </div>
                                <div className={style.customerData}>
                                    <Controller
                                        name={"registeredby"}
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
                                    Registered Date
                                </div>
                                <div className={style.customerData}>
                                    <Controller
                                        name={"addeddate"}
                                        control={control}
                                        render={({ field: { value } }) => (
                                            <Typography className={style.input}>
                                                {value}
                                            </Typography>
                                        )}
                                    />
                                    
                                </div>
                            </div>

                            <div >
                                <div className={style.buttonRow}>
                                    <Button
                                        className={style.doneBtn}
                                        type="submit"
                                        variant="contained"
                                    >
                                        Done
                                    </Button>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
            </div >

        </div >
    )
}
