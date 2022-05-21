import * as React from 'react';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    MenuItem: {
        '&:hover': {
            backgroundColor: "white",
            cursor: "default"
        },
    },
})

export default function BasicMenu(props) {

    const classes = useStyles();

    const { anchorEl, handleClose, open, notifications, designation } = props;

    const getMenuListItems = () => {

        if (designation === "Distributor") {

            return (
                notifications.map((x, i) => (
                    <MenuItem onClick={handleClose} divider={true} className={classes.MenuItem}>
                        <p style={{ padding: "0", margin: "5px" }}>
                            <span style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>
                                {x.ponumber} &nbsp;
                            </span>
                            has to be approved
                        </p>
                    </MenuItem>
                ))
            );

        } else if (designation === "Human Resources") {

        } else if (designation === "Manager") {
            return (
                notifications.map((x, i) => (
                    <MenuItem onClick={handleClose} divider={true} style={{}}>
                        <p style={{ padding: "0", margin: "5px" }}>
                            <span style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>
                                {x.orderno} &nbsp;
                            </span>
                            has to approve payment
                        </p>
                    </MenuItem>
                ))
            );

        } else if (designation === "Purchasing Manager") {
            return (
                notifications.map((x, i) => (
                    <MenuItem onClick={handleClose} divider={true}>
                        <p style={{ padding: "0", margin: "5px" }}>
                            <span style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>
                                {x.ponumber} &nbsp;
                            </span>
                            {x.status.toLowerCase()}
                        </p>
                    </MenuItem>
                ))
            );

        } else if (designation === "Store Keeper") {
            return (
                notifications.map((x, i) => (
                    <MenuItem onClick={handleClose} divider={true}>
                        <p style={{ padding: "0", margin: "5px" }}>
                            <span style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>
                                {x.ponumber || x.ginnumber || x.orderno} &nbsp;
                            </span>
                            is {x.status.toLowerCase()}
                        </p>
                    </MenuItem>
                ))
            );

        } else if (designation === "Sales Representative") {

        } else if (designation === "Delivery Representative") {
            return (
                notifications.map((x, i) => (
                    <MenuItem onClick={handleClose} divider={true}>
                        <p style={{ padding: "0", margin: "5px" }}>
                            <span style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>
                                {x.ginnumber || x.orderno} &nbsp;
                            </span>
                            has been {x.status.toLowerCase()}
                        </p>
                    </MenuItem>
                ))
            );

        }

    }

    return (
        <div>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {
                    getMenuListItems()
                }
            </Menu>
        </div>
    );
}
