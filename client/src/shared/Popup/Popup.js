import React from 'react';

//Material UI Components
import { Dialog, DialogContent } from '@material-ui/core';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//Material UI Styling
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    close: {
        position: "absolute",
        top: "11px",
        right: "11px",
        color: "red"
    },
    // title: {
    //     padding: "8px 24px 0 26px",
    // },
    // titleStyle: {
    //     fontSize: "1.6em",
    //     fontWeight: "600"
    // },
    content: {
        "&:first-child": {
            paddingTop: "12px"
        }
    }
});

export default function PopUp(props) {

    const { children, openPopup, setOpenPopup } = props;
    const classes = useStyles();

    return (
        <Dialog open={openPopup} maxWidth="lg">
            <HighlightOffIcon
                className={classes.close}
                onClick={() => setOpenPopup(false)}
            />
            {/* <DialogTitle className={classes.title}>
                <Typography className={classes.titleStyle}>
                    {title}
                </Typography>
            </DialogTitle> */}
            <DialogContent className={classes.content}>
                {children}
            </DialogContent>
        </Dialog>
    )
}
