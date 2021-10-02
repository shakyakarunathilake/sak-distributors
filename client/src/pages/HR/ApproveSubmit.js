import React from 'react';
import { useForm } from 'react-hook-form';

//Material UI 
import Button from '@material-ui/core/Button';

//SCSS Style 
import style from './ApproveSubmit.module.scss';

export default function ApproveSubmit(props) {

    const { setOpenPopup, setApprove } = props;

    const { handleSubmit } = useForm();

    const onSubmit = () => {
        setOpenPopup(false);
        setApprove(true);
    };

    const onCancel = () => {
        setOpenPopup(false);
        setApprove(false);
    };

    return (
        <div className={style.container}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={style.description}>
                    Approve changes
                </div>
                <div className={style.buttonRow}>
                    <div className={style.cancelBtnDiv}>
                        <Button
                            className={style.cancelBtn}
                            onClick={onCancel}
                            variant="outlined"
                        >
                            Cancel
                        </Button>
                    </div>
                    <div className={style.submitBtnDiv}>
                        <Button
                            className={style.submitBtn}
                            type="submit"
                            variant="contained"
                        >
                            Approve
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
