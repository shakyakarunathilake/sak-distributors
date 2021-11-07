import React from 'react';

import { useForm } from 'react-hook-form';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//SCSS Styles
import style from './AdminForm.module.scss';

export default function AdminForm(props) {

    const { setOpenPopup, employeeRecords } = props;

    const { handleSubmit } = useForm();

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
