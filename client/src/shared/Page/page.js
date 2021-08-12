//React 
import React, { useState } from 'react';

//Development Stage Imports
import Photo from './Photo.jpg';

//Material UI 
import Avatar from '@material-ui/core/Avatar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

//Material UI Icons
import MenuIcon from '@material-ui/icons/Menu';

//SCSS Styles
import style from './page.module.scss';


function Page(props) {

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
        <div onClick={toggleDrawer(false)}>
            <List >
                <ListItem button className={style.drawer}> Employees </ListItem>
                <ListItem button className={style.drawer}> Orders </ListItem>
                <ListItem button className={style.drawer}> Products </ListItem>
                <ListItem button className={style.drawer}> Customers </ListItem>
                <ListItem button className={style.drawer}> Suppliers </ListItem>
            </List>
        </div>
    );

    return (
        <div className={style.container}>
            <Drawer
                anchor={'left'}
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