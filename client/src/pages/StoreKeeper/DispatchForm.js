import React from 'react';
import { useForm } from 'react-hook-form';
import formData from 'form-data';

//Material UI 
import { Button } from '@material-ui/core';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//SCSS Style
import style from './DispatchForm.module.scss';

export default function DispatchForm(props) {

    const { handleClosePopUp, addOrEdit, GINRecords } = props;

    const { handleSubmit } = useForm()

    const onSubmit = () => {

        const ginFormData = new formData();

        ginFormData.append('ginnumber', GINRecords.ginnumber);
        ginFormData.append('status', 'Dispatched');

        addOrEdit(ginFormData, GINRecords.ginnumber);

    }

    return (
        <form
            className={style.container}
            onSubmit={handleSubmit(onSubmit)}
        >

            <div className={style.header}>
                <div>
                    Confirm GIN Status
                </div>
                <div>
                    <HighlightOffIcon
                        className={style.icon}
                        onClick={() => { handleClosePopUp() }}
                    />
                </div>
            </div>

            <div className={style.body}>
                <span className={style.blue}>GIN Number: {GINRecords.ginnumber} </span> <br />
                The above GIN has been dispatched. <br />
                Once you approve dispatch changes cannot be undone.
            </div>


            <div className={style.footer}>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={onSubmit}
                >
                    Approve Dispatch
                </Button>
            </div>

        </form >
    )
}
