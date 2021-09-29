import React from 'react';

//Material UI Components
import { Dialog, DialogContent } from '@material-ui/core';

//Material UI Styling
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    content: {
        "&:first-child": {
            paddingTop: "12px"
        }
    }
});

export default function PopUp(props) {

    const { children, openPopup } = props;
    const classes = useStyles();

    return (
        <Dialog open={openPopup} maxWidth="lg">
            <DialogContent className={classes.content}>
                {children}
            </DialogContent>
        </Dialog>
    )
}