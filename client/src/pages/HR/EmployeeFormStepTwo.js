import React from 'react';

import { Controller } from 'react-hook-form';

//Material UI Components
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//Default Image
import user from '../../images/user.svg';

//SCSS Styles
import style from './EmployeeFormStepTwo.module.scss';

export default function EmployeeFormStepTwo(props) {

    const { control, backFormStep, setOpenPopup, file, action, onSubmit } = props;

    return (
        <div className={style.container}>

            <div className={style.header}>

                <div className={style.title}>
                    <div>
                        {action === "Create" && "Create Employee"}
                        {action === "Edit" && "Edit Employee"}
                        {action === "View" && "View Employee"}
                    </div>
                    <div>
                        <HighlightOffIcon
                            className={style.icon}
                            onClick={() => { setOpenPopup(false) }}
                        />
                    </div>
                </div>

                {
                    action !== "View" &&
                    <div className={style.step}>
                        Step 2 of 2
                    </div>
                }

            </div>


            <div className={style.body}>

                <div className={style.columnA}>

                    <div className={style.image}>
                        <div className={style.imgWrapper}>
                            <Controller
                                render={({ field: { value } }) => (
                                    action === "Create" ?
                                        <img src={value ? file : user} alt="" />
                                        : <img src={value ? `http://${value}` : user} alt="" />
                                )}
                                name={"employeeimage"}
                                control={control}
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
                                name={"title"}
                                control={control}
                                render={({ field: { value } }) => (
                                    <Typography className={style.input}>
                                        {value}
                                    </Typography>
                                )}
                            />
                            &nbsp;
                            <Controller
                                name={"firstname"}
                                control={control}
                                render={({ field: { value } }) => (
                                    <Typography className={style.input}>
                                        {value}
                                    </Typography>
                                )}
                            />
                            &nbsp;
                            <Controller
                                name={"lastname"}
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
                            Admin Privileges
                        </div>
                        <div className={style.employeeData}>
                            <Controller
                                name={"analyticprivileges"}
                                control={control}
                                render={({ field: { value } }) => (
                                    <Typography className={style.input}>
                                        {value ? "Given" : "Not Given"}
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


                </div>

            </div>

            <div className={style.footer}>
                <div className={style.backBtn}>
                    {
                        action !== "View" &&
                        <Button
                            onClick={backFormStep}
                            variant="contained"
                        >
                            Back
                        </Button>
                    }
                </div>

                <div className={style.doneBtn}>
                    <Button
                        onClick={onSubmit}
                        variant="contained"
                    >
                        {action === "Create" && "Confirm & Submit"}
                        {action === "Edit" && "Confirm & Submit"}
                        {action === "View" && "Done"}
                    </Button>
                </div>
            </div>

        </div>
    )
}
