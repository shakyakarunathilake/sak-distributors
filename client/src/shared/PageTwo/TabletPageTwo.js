import React from 'react';
import { NavLink } from 'react-router-dom';

import * as drawerListItems from '../../services/drawerListItems';

//Material UI Components
import Avatar from '@material-ui/core/Avatar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@mui/material/Tooltip';

//Material UI Icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import LockIcon from '@material-ui/icons/Lock';

//SCSS Styles
import style from './TabletPageTwo.module.scss';

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
        borderTop: '0.1px solid #c2c2c2'
    },

    footerDiv: {
        display: "flex",
        boxSizing: "border-box",
        borderRadius: "18px",
        color: "white",
        fontSize: 16,
        margin: "8px 10px",
        width: 280,
        padding: "8px 16px",

        '&:hover': {
            background: "#4255AA",
            fontSize: 17,
            transitionDuration: "0.3s",
        },
    },
    footerIcon: {
        marginRight: "15px",
    },
});

export default function TabletPageTwo(props) {

    const classes = useStyles();

    const employeedetails = JSON.parse(sessionStorage.getItem("Auth"));

    if (employeedetails.firsttimelogin) {
        window.location.replace("http://localhost:3000/change-password");
    }

    //Drawer List Items
    const list = () => (
        <div className={classes.list}>
            <List>
                {
                    drawerListItems.drawerListItems(employeedetails.designation).map((listItem) => (
                        <ListItem
                            button
                            className={classes.listItem}
                            activeClassName={classes.active}
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
                variant="permanent"
                classes={{ paper: classes.paper }}
            >

                <div className={classes.userInfo}>

                    <Avatar alt={employeedetails.firstname} className={classes.avatar} src={`http://${employeedetails.employeeimage}`} />
                    <div className={classes.designation}>{employeedetails.designation}</div>
                    <div className={classes.name}>{employeedetails.firstname} {employeedetails.lastname}</div>
                    <div className={classes.email}>{employeedetails.email}</div>

                </div>

                {list()}

                <div className={classes.drawerFooter}>

                    <div
                        className={classes.footerDiv}
                        onClick={() => { window.location.replace("http://localhost:3000/change-password") }}
                    >
                        <div className={classes.footerIconDiv}>
                            <LockIcon className={classes.footerIcon} />
                        </div>
                        Change Password
                    </div>

                    <div
                        className={classes.footerDiv}
                        onClick={() => { window.location.replace("http://localhost:3000/") }}
                    >
                        <div className={classes.footerIconDiv}>
                            <ExitToAppIcon className={classes.footerIcon} />
                        </div>
                        Log Out
                    </div>

                </div>

            </Drawer>

            <div className={style.page}>

                <div className={style.pageHeader}>

                    <div className={style.title}>
                        Dashboard
                    </div>

                    <div className={style.iconDiv}>
                        <Tooltip title="Notifications" arrow>
                            <NotificationsNoneIcon className={style.icon} />
                        </Tooltip>
                    </div>

                    <div className={style.avatarDiv}>
                        <Avatar alt={employeedetails.firstname} className={style.avatar} src={`http://${employeedetails.employeeimage}`} />
                    </div>

                </div>

                <div className={style.pageContent}>

                    {props.children}

                </div>

            </div>

        </div>
    )
};
