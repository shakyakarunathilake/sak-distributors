import React from 'react';
import { useForm } from 'react-hook-form';
import formData from 'form-data';

//Material UI 
import { Button } from '@material-ui/core';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//SCSS Style
import style from './DeliveryForm.module.scss';

export default function DeliveryForm(props) {

    const { handleClosePopUp, addOrEdit, GINRecords } = props;

    const { handleSubmit } = useForm()

    const onSubmit = () => {

        const ginFormData = new formData();

        ginFormData.append('ginnumber', GINRecords.ginnumber);
        ginFormData.append('status', 'Delivery');

        addOrEdit(ginFormData, GINRecords.ginnumber);

    }

    return (
        <form
            className={style.container}
            onSubmit={handleSubmit(onSubmit)}
        >

            <div className={style.header}>
                <div>
                    GIN ready to be delivered
                </div>
                <div>
                    <HighlightOffIcon
                        className={style.icon}
                        onClick={() => { handleClosePopUp() }}
                    />
                </div>
            </div>

            <div className={style.body}>
            </div>


            <div className={style.footer}>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={onSubmit}
                >
                    Approve
                </Button>
            </div>

        </form>
    )
}
