import React, { useEffect } from 'react';

import { useForm, Controller } from 'react-hook-form';

//Material UI Components
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//SCSS Styles
import style from './ViewSupplier.module.scss';

export default function ViewSupplier(props) {

    const { setOpenPopup, setAction, supplierRecords } = props;

    const { handleSubmit, control, setValue } = useForm();

    useEffect(() => {
        setValue("supplierid", supplierRecords.supplierid);
        setValue("name", supplierRecords.name);
        setValue("abbreviation", supplierRecords.abbreviation);
        setValue("address", supplierRecords.address);
        setValue("contactperson", supplierRecords.title + ' ' + supplierRecords.contactperson);
        setValue("addedby", supplierRecords.addedby);
        setValue("addeddate", supplierRecords.addeddate);
        setValue("contactnumber", supplierRecords.contactnumber);
        setValue("email", supplierRecords.email);
    }, [supplierRecords, setValue])

    const onSubmit = () => {
        setOpenPopup(false);
        setAction('');
    };

    return (
        <div className={style.container}>

            <div className={style.header}>
                <div>View Supplier</div>
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
                                Sup. ID
                            </div>
                            <div>
                                <Controller
                                    name={"supplierid"}
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
                                Name
                            </div>
                            <div>
                                <Controller
                                    name={"name"}
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
                                Abbreviation
                            </div>
                            <div>
                                <Controller
                                    name={"abbreviation"}
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
                                Contact Person
                            </div>
                            <div>
                                <Controller
                                    name={"contactperson"}
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
                            <div>
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
                                Email
                            </div>
                            <div>
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
                                Address
                            </div>
                            <div>
                                <Controller
                                    name={"address"}
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
                                Added By
                            </div>
                            <div>
                                <Controller
                                    name={"addedby"}
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
                                Added Date
                            </div>
                            <div>
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

                        <div>
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
    )
}
