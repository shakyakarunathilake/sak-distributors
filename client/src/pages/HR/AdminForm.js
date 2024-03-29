import React from 'react';

import { useForm, Controller } from 'react-hook-form';
import formData from 'form-data';

//Material UI Components
import Autocomplete from '@mui/material/Autocomplete';
import { TextField as MuiTextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Typography } from '@mui/material';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//SCSS Styles
import style from './AdminForm.module.scss';

export default function AdminForm(props) {

    const { handleClosePopUp, employeeOptions, addAdmin, action, employeeID, employeeName } = props;

    const { formState: { errors }, handleSubmit, control, setValue, clearErrors } = useForm({
        mode: "all",
        defaultValues: {
            employeeid: employeeID ? employeeID : '',
        }
    });

    const handleEmployeeChange = (event, option) => {
        if (option) {
            setValue('employeeid', option.employeeid);
            clearErrors('employeeid');
        }
    }

    const onSubmit = (values) => {

        const adminFormData = new formData();

        if (action === 'Add') {
            adminFormData.append("employeeid", values.employeeid);
            adminFormData.append("adminprivileges", true);
        }

        if (action === 'Remove') {
            adminFormData.append("employeeid", values.employeeid);
            adminFormData.append("adminprivileges", false);
        }

        addAdmin(adminFormData, values.employeeid);
        handleClosePopUp()
    }

    return (
        <>
            {
                action === 'Add' &&
                <div className={style.container}>

                    <form
                        className={style.form}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className={style.header}>

                            <div> Add New Admin </div>

                            <div>
                                <HighlightOffIcon
                                    className={style.icon}
                                    onClick={() => { handleClosePopUp() }}
                                />
                            </div>

                        </div>

                        <div className={style.body}>

                            <div className={style.row}>

                                <Controller
                                    render={() => (
                                        <Autocomplete
                                            options={employeeOptions || []}
                                            fullWidth
                                            getOptionLabel={(option) => option.title}
                                            onChange={handleEmployeeChange}
                                            renderInput={(params) => (
                                                <MuiTextField
                                                    {...params}
                                                    helperText={errors.employeeid && errors.employeeid.message}
                                                    error={errors.employeeid ? true : false}
                                                    variant="outlined"
                                                    label="Employee"
                                                />
                                            )}
                                        />
                                    )}
                                    control={control}
                                    name={"employeeid"}
                                    rules={{
                                        required: { value: true, message: "Required *" },
                                    }}
                                />

                            </div>

                            <div className={style.buttonRow}>

                                <Button
                                    className={style.submitBtn}
                                    type="submit"
                                    variant="contained"
                                >
                                    Submit
                                </Button>

                            </div>

                        </div>

                    </form>
                </div>
            }

            {
                action === 'Remove' &&
                <div className={style.container}>

                    <form
                        className={style.form}
                        onSubmit={handleSubmit(onSubmit)}
                    >

                        <div className={style.header}>

                            <div> Remove Admin </div>

                            <div>
                                <HighlightOffIcon
                                    className={style.icon}
                                    onClick={() => { handleClosePopUp() }}
                                />
                            </div>

                        </div>

                        <div className={style.body}>

                            <div className={style.row}>

                                <Typography>
                                    Are you sure you want to remove admin privileges for {employeeName} ({employeeID})?
                                </Typography>

                            </div>

                            <div className={style.buttonRow}>

                                <Button
                                    className={style.submitBtn}
                                    type="submit"
                                    variant="contained"
                                >
                                    Remove Privileges
                                </Button>

                            </div>

                        </div>

                    </form>

                </div>
            }
        </>
    )
}
