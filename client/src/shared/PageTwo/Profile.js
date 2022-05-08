import React from 'react';

//images
import user from '../../images/user.svg';

//SCSS Style
import style from './Profile.module.scss';

export default function Profile() {

    const employeedetails = JSON.parse(sessionStorage.getItem("Auth"));

    return (
        <div className={style.container}>

            <div className={style.imageRow}>
                <img src={employeedetails.employeeimage ? `http://${employeedetails.employeeimage}` : user} alt="" />
            </div>

            <div className={style.infoRow}>
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
