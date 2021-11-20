import React from 'react';

//Material UI Components
import Button from '@material-ui/core/Button';
import { Typography } from '@mui/material';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//SCSS Styles
import style from './ResetForm.module.scss';

export default function ResetForm(props) {

    const { handleClosePopUp, resetForm } = props;

    const onSubmit = () => {
        resetForm();
    }

    return (

        <div className={style.container}>

            <form
                className={style.form}
                onSubmit={onSubmit}
            >
                <div className={style.header}>
                    <div> Confirm Reset </div>
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
                            Once you confirm all data you entered will be lost. <br />
                            Are you sure you want to reset form?
                        </Typography>

                    </div>

                    <div className={style.buttonRow}>
                        <Button
                            className={style.submitBtn}
                            type="submit"
                            variant="contained"
                        >
                            Confirm
                        </Button>
                    </div>

                </div>

            </form>

        </div>

    )
}
