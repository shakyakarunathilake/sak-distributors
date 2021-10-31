import React from 'react';

import { useForm, Controller } from 'react-hook-form';
import formData from 'form-data';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//SCSS Styles
import style from './AdminForm.module.scss';

export default function AdminForm(props) {

    const { setOpenPopup, employeeRecords } = props;

    const { handleSubmit, formState: { errors }, control, reset, setValue, getValues, clearErrors } = useForm();

    const onSubmit = () => {

    }
    
    return (
        <div className={style.container}>

            <div className={style.header}>
                <div>{employeeRecords ? "Edit Employee" : "Add New Employee"}</div>
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
                    <div className={style.minicolumn}>
                        <div>

                        </div>
                        <div>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
