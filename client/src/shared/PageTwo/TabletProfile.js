import React from 'react'

//images
import user from '../../images/user.svg';

//SCSS Styles
import style from './TabletProfile.module.scss';

export default function TabletProfile() {
    
    const employeedetails = JSON.parse(sessionStorage.getItem("Auth"));

    return (
        <div className={style.container}>

            <div className={style.imgCol}>
                <img src={employeedetails.employeeimage ? `http://${employeedetails.employeeimage}` : user} alt="" />
            </div>

            <div className={style.infoCol}>
                <div className={style.textDiv}>
                    <div className={style.text}>
                        <div className={style.boldtext}>
                            Emp. ID:
                        </div>
                        <div className={style.regulartext}>
                            {employeedetails.employeeid}
                        </div>
                    </div>
                    <div className={style.text}>
                        <div className={style.boldtext}>
                            Name:
                        </div>
                        <div className={style.regulartext}>
                            {employeedetails.firstname} {employeedetails.lastname}
                        </div>
                    </div>
                    <div className={style.text}>
                        <div className={style.boldtext}>
                            Role:
                        </div>
                        <div className={style.regulartext}>
                            {employeedetails.designation}
                        </div>
                    </div>
                    <div className={style.text}>
                        <div className={style.boldtext}>
                            Status:
                        </div>
                        <div className={style.regulartext}>
                            {employeedetails.employeestatus}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
