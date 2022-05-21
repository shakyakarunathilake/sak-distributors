//React 
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

//Shared
import * as drawerListItems from '../../services/drawerListItems';
import BasicMenu from '../Menu/BasicMenu';

//Material UI 
import Avatar from '@material-ui/core/Avatar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

//Material UI Icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import LockIcon from '@material-ui/icons/Lock';

//SCSS Styles
import style from './Page.module.scss';

const useStyles = makeStyles({
    paper: {
        background: "#20369F",
    },
    avatar: {
        height: 70,
        width: 70,
        margin: "30px auto 10px auto",
    },
    userInfo: {
        color: "white",
        fontSize: 13,
        paddingBottom: 15,
        textAlign: "center",
    },
    designation: {
        fontSize: 14,
        letterSpacing: 1,
    },
    name: {
        letterSpacing: 1,
    },
    email: {
        fontSize: 12,
        letterSpacing: 0.8,
        marginTop: '3px',
    },
    list: {
        border: 0,
        color: "white",
        marginTop: 10,
        width: 300,
    },
    listItem: {
        borderRadius: "18px",
        fontSize: 16,
        margin: "15px 10px",
        width: 280,

        '&:hover': {
            background: "#4255AA",
            fontSize: 16.5,
            transitionDuration: "0.3s",
        },
    },
    active: {
        background: "#4255AA",
        fontSize: 16.5,
    },
    listTitle: {
        marginLeft: "15px"
    },
    drawerFooter: {
        bottom: "0",
        position: "absolute",
        borderTop: '0.1px solid #c2c2c2',
        color: "white"
    },
});


export default function Page(props) {

    const classes = useStyles();

    const [state, setState] = useState();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const employeedetails = JSON.parse(sessionStorage.getItem("Auth"));
    const notifications = JSON.parse(sessionStorage.getItem("Notification"));

    //Toggle Drawer Function
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState(open);
    };

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    //Drawer List Items
    const list = () => (
        <div onClick={toggleDrawer(false)} className={classes.list}>
            <List>
                {
                    drawerListItems.drawerListItems(employeedetails.designation).map((listItem) => (
                        <ListItem
                            button
                            className={classes.listItem}
                            component={NavLink} exact to={listItem.path}
                            key={listItem.id}
                        >
                            {listItem.icon}
                            <span className={classes.listTitle}>{listItem.title}</span>
                        </ListItem>
                    ))
                }
            </List>
        </div>
    );

    return (

        <div className={style.container}>

            <Drawer
                anchor={'left'}
                classes={{ paper: classes.paper }}
                onClose={toggleDrawer(false)}
                open={state}
            >

                <div className={classes.userInfo}>

                    <Avatar alt={employeedetails.firstname} className={classes.avatar} src={`http://${employeedetails.employeeimage}`} />
                    <div className={classes.designation}>{employeedetails.designation}</div>
                    <div className={classes.name}>{employeedetails.firstname} {employeedetails.lastname}</div>
                    <div className={classes.email}>{employeedetails.email}</div>

                </div>

                {list()}

                <div className={classes.drawerFooter}>

                    <ListItem
                        button
                        className={classes.listItem}
                        activeClassName={classes.active}
                        component={NavLink} exact to={"/change-password"}
                    >
                        <LockIcon />
                        <span className={classes.listTitle}>
                            Change Password
                        </span>
                    </ListItem>

                    <ListItem
                        button
                        className={classes.listItem}
                        activeClassName={classes.active}
                        component={NavLink} exact to={"/"}
                    >
                        <ExitToAppIcon />
                        <span className={classes.listTitle}>
                            Log Out
                        </span>
                    </ListItem>

                </div>

            </Drawer>

            <div className={style.pageHeader}>

                <div className={style.iconDiv}>
                    <Tooltip title="Menu" arrow>
                        <MenuIcon
                            className={style.icon}
                            onClick={toggleDrawer(true)}
                        />
                    </Tooltip>
                </div>

                <div className={style.title}>
                    {props.title}
                </div>

                <div className={style.iconDiv}>
                    <IconButton
                        id="basic-button"
                        onClick={handleClick}
                    >
                        <Badge badgeContent={notifications.length} color="error">
                            <NotificationsNoneIcon className={style.icon} />
                        </Badge>
                    </IconButton>
                    <BasicMenu
                        anchorEl={anchorEl}
                        open={open}
                        handleClose={handleClose}
                        notifications={notifications}
                        designation={employeedetails.designation}
                    />
                </div>

                <div className={style.avatarDiv}>
                    <Avatar alt={employeedetails.firstname} className={style.avatar} src={`http://${employeedetails.employeeimage}`} />
                </div>

            </div>

            <div className={style.pageContent}>
                {props.children}
            </div>

        </div>
    );
}

