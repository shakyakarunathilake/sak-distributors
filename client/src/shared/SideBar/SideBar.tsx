import React, { FC } from 'react'
import style from './SideBar.module.scss'

//Material Icons
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

//Images
import Logo from '../../img/logo.png'

const SideBar: FC = () => {
    return (
        <div className={style.container}>
            <div className={style.logo}>
                <img src={Logo} alt="Logo" />
            </div>
            <div className={style.heading}>
                Menu
            </div>
            <div className={style.menuItem}>
                <div className={style.icon}><PowerSettingsNewIcon /></div>
                <div className={style.text}>Employees</div>
            </div>
            <div className={style.menuItem}>
                <div className={style.icon}><PowerSettingsNewIcon /></div>
                <div className={style.text}>Employees</div>
            </div>
            <div className={style.menuItem}>
                <div className={style.icon}><PowerSettingsNewIcon /></div>
                <div className={style.text}>Employees</div>
            </div>
            <div className={style.menuItem}>
                <div className={style.icon}><PowerSettingsNewIcon /></div>
                <div className={style.text}>Employees</div>
            </div>
            <div className={style.menuItem}>
                <div className={style.icon}><PowerSettingsNewIcon /></div>
                <div className={style.text}>Employees</div>
            </div>
        </div>
    )
}

export default SideBar;