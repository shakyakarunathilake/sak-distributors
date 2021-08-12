//React 
import React, { useState } from 'react';

//Development Stage Imports
import Photo from './Photo.jpg';

//Images
import Logo from '../../images/Logo.svg';

//Material UI 
import Avatar from '@material-ui/core/Avatar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';

//Material UI Icons
import AssignmentIcon from '@material-ui/icons/Assignment';
import BusinessIcon from '@material-ui/icons/Business';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import StorageIcon from '@material-ui/icons/Storage';

//SCSS Styles
import style from './page.module.scss';
import shadows from '@material-ui/core/styles/shadows';

const useStyles = makeStyles(theme => ({
    paper: {
        background: "#323232",
    },
    list: {
        border: 0,
        color: "white",
        width: 300,
        paddingTop: "60px",
    },
    listItem: {
        borderRadius: "18px",
        margin: "15px 10px",
        width: 280,

        '&:hover': {
            background: "#20368f",
            fontSize: 16,
            transitionDuration: "0.3s",
        },
    },
    listIcon: {
        marginRight: "15px"
    }

}));

function Page(props) {

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
                    className={classes.listItem}
                    button>
                    <PeopleIcon className={classes.listIcon} />
                    Employees
                </ListItem>
                <ListItem
                    className={classes.listItem}
                    button>
                    <PersonIcon className={classes.listIcon} />
                    Customers
                </ListItem>
                <ListItem
                    className={classes.listItem}
                    button>
                    <BusinessIcon className={classes.listIcon} />
                    Suppliers
                </ListItem>
                <ListItem
                    className={classes.listItem}
                    button>
                    <AssignmentIcon className={classes.listIcon} />
                    Orders
                </ListItem>
                <ListItem
                    className={classes.listItem}
                    button>
                    <StorageIcon className={classes.listIcon} />
                    Products
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
                {list()}
            </Drawer>
            <div className={style.pageHeader}>
                <div className={style.iconDiv}>
                    <MenuIcon
                        className={style.icon}
                        onClick={toggleDrawer(true)}
                    />
                </div>
                <div className={style.title}>
                    {/* {props.title} */}
                    Page Header
                </div>
                <div>
                    <Avatar alt="Khione" className={style.avatar} src={Photo} />
                </div>
            </div>
            <div className="pageContent">
                {props.children}
            </div>
        </div>
    );
}

export default Page;