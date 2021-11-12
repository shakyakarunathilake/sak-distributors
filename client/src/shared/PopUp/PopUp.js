import React from 'react';
import Draggable from 'react-draggable';

//Material UI Components
import Paper from '@mui/material/Paper';
import { Dialog, DialogContent } from '@material-ui/core';

//Material UI Styling
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    // root: {
    //     ".MuiDialogContent-root": {
    //         padding: "0px 24px 8px 24px !important"
    //     },
    //     "& .MuiDialog-paperWidthLg": {
    //         maxWidth: "none !important"
    //     },
    //     "& .MuiDialog-paper": {
    //         margin: 0
    //     },
    //     "& .MuiDialogTitle-root": {
    //         padding: "4px !important"
    //     }
    // },
    content: {
        "&:first-child": {
            paddingTop: "12px"
        }
    }
});

function PaperComponent(props) {
    return (
        <Paper {...props} style={{ margin: 0, maxHeight: '100%' }} />
    );
}


export default function PopUp(props) {

    const { children, openPopup, setOpenPopup, disableEnforceFocus, hideBackdrop, style, disableBackdropClick } = props;
    const classes = useStyles();

    const handleClose = () => {
        setOpenPopup(false);
    };

    return (
        <Draggable
            handle={'[class*="MuiDialog-root"]'}
            cancel={'[class*="MuiDialogContent-root"]'}>

            <Dialog
                onClose={handleClose}
                open={openPopup}
                maxWidth="lg"

                disableEnforceFocus={disableEnforceFocus}
                hideBackdrop={hideBackdrop}
                disableBackdropClick={disableBackdropClick}
                PaperComponent={PaperComponent}
                style={style ? {
                    top: '236px',
                    left: 'calc(calc(100vw - 40px) - calc(40% - 40px)',
                    height: 'calc(100vh - 336px)',
                    width: 'calc(40% - 40px)',
                } : ''}
            >

                <DialogContent className={classes.content}>
                    {children}
                </DialogContent>

            </Dialog>

        </Draggable >
    )
}
