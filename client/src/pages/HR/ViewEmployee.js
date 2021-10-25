import React, { useEffect } from 'react';

import { useForm, Controller } from 'react-hook-form';

//Material UI Components
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//Default Image
import user from '../../images/user.svg';

//SCSS Styles
import style from './ViewEmployee.module.scss';

export default function ViewEmployee(props) {

    const { setOpenPopup, setAction, employeeRecords } = props;

    const { handleSubmit, control, setValue } = useForm();

    useEffect(() => {
        setValue("employeeimage", employeeRecords.employeeimage);
        setValue("employeeid", employeeRecords.employeeid);
        setValue("fullname", employeeRecords.fullname);
        setValue("callingname", `${employeeRecords.title} ${employeeRecords.firstname} ${employeeRecords.lastname}`);
        setValue("email", employeeRecords.email);
        setValue("dob", employeeRecords.dob);
        setValue("hireddate", employeeRecords.hireddate);
        setValue("address", employeeRecords.address);
        setValue("nic", employeeRecords.nic);
        setValue("gender", employeeRecords.gender);
        setValue("contactnumber", employeeRecords.contactnumber);
        setValue("designation", employeeRecords.designation);
        setValue("civilstatus", employeeRecords.civilstatus);
        setValue("employeestatus", employeeRecords.employeestatus);
        setValue("hiredby", employeeRecords.hiredby);

    }, [employeeRecords, setValue])


    const onSubmit = () => {
        setOpenPopup(false);
        setAction('');
    };

    return (
        <div>
            <div className={style.container}>

                <div className={style.header}>
                    <div>View Employee</div>
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

                            <div className={style.columnA}>

                                <div className={style.image}>
                                    <div className={style.imgWrapper}>
                                        <Controller
                                            name={"employeeimage"}
                                            control={control}
                                            render={({ field: { value } }) => (
                                                <img src={value ? `http://${value}` : user} alt="" />
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className={style.employeeId}>
                                    <Controller
                                        name={"employeeid"}
                                        control={control}
                                        render={({ field: { value } }) => (
                                            <Typography className={style.input}>
                                                ID: {value}
                                            </Typography>
                                        )}
                                    />
                                </div>

                            </div>

                            <div className={style.columnB}>

                                <div className={style.row}>
                                    <div className={style.boldText}>
                                        Full Name
                                    </div>
                                    <div className={style.employeeData}>
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
                                    <div className={style.employeeData}>
                                        <Controller
                                            name={"callingname"}
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
                                        NIC
                                    </div>
                                    <div className={style.employeeData}>
                                        <Controller
                                            name={"nic"}
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
                                        Date of Birth
                                    </div>
                                    <div className={style.employeeData}>
                                        <Controller
                                            name={"dob"}
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
                                        Gender
                                    </div>
                                    <div className={style.employeeData}>
                                        <Controller
                                            name={"gender"}
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
                                        Civil Status
                                    </div>
                                    <div className={style.employeeData}>
                                        <Controller
                                            name={"civilstatus"}
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
                                        Designation
                                    </div>
                                    <div className={style.employeeData}>
                                        <Controller
                                            name={"designation"}
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
                                        Contact Number
                                    </div>
                                    <div className={style.employeeData}>
                                        <Controller
                                            name={"contactnumber"}
                                            control={control}
                                            render={({ field: { value } }) => (
                                                <Typography className={style.input}>
                                                    0{value}
                                                </Typography>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className={style.row}>
                                    <div className={style.boldText}>
                                        Address
                                    </div>
                                    <div className={style.employeeData}>
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
                                        Email
                                    </div>
                                    <div className={style.employeeData}>
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
                                        Employee Status
                                    </div>
                                    <div className={style.employeeData}>
                                        <Controller
                                            name={"employeestatus"}
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
                                        Hired By
                                    </div>
                                    <div className={style.employeeData}>
                                        <Controller
                                            name={"hiredby"}
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
                                        Hired Date
                                    </div>
                                    <div className={style.employeeData}>
                                        <Controller
                                            name={"hireddate"}
                                            control={control}
                                            render={({ field: { value } }) => (
                                                <Typography className={style.input}>
                                                    {value}
                                                </Typography>
                                            )}
                                        />
                                    </div>
                                </div>

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
            </div>

        </div >
    )
}
