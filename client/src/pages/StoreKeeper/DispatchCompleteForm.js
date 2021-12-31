import React from 'react';
import { useForm } from 'react-hook-form';
import formData from 'form-data';

//Material UI 
import { Button } from '@material-ui/core';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//SCSS Style
import style from './DispatchCompleteForm.module.scss';

export default function DispatchCompleteForm(props) {

    const { handleClosePopUp, action, addOrEdit, GINRecords } = props;

    const { handleSubmit } = useForm()

    const onSubmit = () => {

        const ginFormData = new formData();

        ginFormData.append('ginnumber', GINRecords.ginnumber);
        ginFormData.append('status', action === 'Dispatch' ? 'Dispatched' : 'Complete');

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
                The above GIN has been {action === 'Dispatch' ? 'dispatched' : 'completed'}. <br />
                Once you approve {action === 'Dispatch' ? 'dispatch' : 'complete'}, changes cannot be undone.
            </div>


            <div className={style.footer}>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={onSubmit}
                >
                    {action === 'Dispatch' ? 'Approve Dispatch' : 'Approve Complete'}
                </Button>
            </div>

        </form >
    )
}
