import React from 'react';

//Material UI Components
import { Dialog, DialogContent } from '@material-ui/core';

//Material UI Styling
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        ".MuiDialogContent-root": {
            padding: "0px 24px 8px 24px !important"
        },
        "& .MuiDialog-paperWidthLg": {
            maxWidth: "none !important"
        },
        "& .MuiDialog-paper": {
            margin: 0
        },
        "& .MuiDialogTitle-root": {
            padding: "4px !important"
        },
        "& .MuiDialog-paperScrollPaper": {
            maxHeight: "100%"
        }
    },
    content: {
        "&:first-child": {
            paddingTop: "12px"
        }
    }
});



export default function PopUp(props) {

    const { children, openPopup, setOpenPopup, fullScreen } = props;
    const classes = useStyles();

    const handleClose = () => {
        setOpenPopup(false);
    };

    return (

        <Dialog
            className={classes.root}
            onClose={handleClose}
            open={openPopup}
            maxWidth="lg"
            fullScreen={fullScreen}
        >

            <DialogContent className={classes.content}>
                {children}
            </DialogContent>

        </Dialog>

    )
}
