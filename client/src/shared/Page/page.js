//React 
import React, { useState } from 'react';

//Development Stage Imports
import Photo from './Photo.jpg';

//Material UI 
import Avatar from '@material-ui/core/Avatar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';

//Material UI Icons
import AssignmentIcon from '@material-ui/icons/Assignment';
import BusinessIcon from '@material-ui/icons/Business';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import DashboardIcon from '@material-ui/icons/Dashboard';
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
    role: {
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
            background: "#2A40A3",
            fontSize: 17,
            transitionDuration: "0.3s",
        },
    },
    listIcon: {
        marginRight: "15px"
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
            background: "#2A40A3",
            fontSize: 17,
            transitionDuration: "0.3s",
        },
    },
    footerIcon: {
        marginRight: "15px",
    },

});

export default function Page(props) {

    const classes = useStyles();
    const [state, setState] = useState();

    //Toggle Drawer Function
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState(open);
    };

    //Drawer List Items
    const list = () => (
        <div onClick={toggleDrawer(false)} className={classes.list}>
            <List>
                <ListItem
                    button
                    className={classes.listItem}
                    onClick={() => { window.location.replace("http://localhost:3000/dashboard") }}
                >
                    <DashboardIcon className={classes.listIcon} />
                    Dashboard
                </ListItem>
                <ListItem
                    button
                    className={classes.listItem}
                    onClick={() => { window.location.replace("http://localhost:3000/manage-employee") }}
                >
                    <PeopleIcon className={classes.listIcon} />
                    Manage Employees
                </ListItem>
                <ListItem
                    button
                    className={classes.listItem}
                    onClick={() => { window.location.replace("http://localhost:3000/manage-customer") }}
                >
                    <PersonIcon className={classes.listIcon} />
                    Manage Customers
                </ListItem>
                <ListItem
                    button
                    className={classes.listItem}
                    onClick={() => { window.location.replace("http://localhost:3000/manage-supplier") }}
                >
                    <BusinessIcon className={classes.listIcon} />
                    Manage Suppliers
                </ListItem>
                <ListItem
                    button
                    className={classes.listItem}
                    onClick={() => { window.location.replace("http://localhost:3000/order-history") }}
                >
                    <AssignmentIcon className={classes.listIcon} />
                    Order History
                </ListItem>
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
                    <Avatar alt="Khione" className={classes.avatar} src={Photo} />
                    <div className={classes.role}>Admin</div>
                    <div className={classes.name}>Shakya Karunathilake</div>
                    <div className={classes.email}>karunathilakeshakya@gmail.com</div>
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
                        onClick={() => { window.location.replace("https://www.google.com/") }}
                    >
                        <div className={classes.footerIconDiv}>
                            <ExitToAppIcon className={classes.footerIcon} />
                        </div>
                        Log Out
                    </div>
                </div>
            </Drawer>
            <div className={style.pageHeader}>
                <div className={style.iconDiv}>
                    <MenuIcon
                        className={style.icon}
                        onClick={toggleDrawer(true)}
                    />
                </div>
                <div className={style.title}>
                    {props.title}
                </div>
                <div className={style.iconDiv}>
                    <NotificationsNoneIcon className={style.icon} />
                </div>
                <div className={style.avatarDiv}>
                    <Avatar alt="Khione" className={style.avatar} src={Photo} />
                </div>
            </div>
            <div className={style.pagecontent}>
                {props.children}
            </div>
        </div>
    );
}

